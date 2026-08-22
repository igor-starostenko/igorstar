// src/lib/content.js — content service: all Contentful read/write operations
// for the admin portal.
//
// READS  -> delivery client (works with the delivery-only token).
// WRITES -> management client (needs a PAT; delivery-only token => 401).
//
// Locale-shape note (verified live, 2026-08-22): the delivery client returns
// entry fields FLAT (fields.title), while the management client nests them
// per locale (fields['en-US'].title). `localeFields()` normalizes both.
//
// All mutations use the write-preflight + confirm flow (spec §6):
//   preflight  -> { ok, version, errors? }
//   confirm    -> performs the mutation, returns the new body

const {
  deliveryClient,
  managementClient,
  resolveEnv,
  hasPat,
} = require('./contentful');
const { LOCALE, validate } = require('./models');
const { mergeIntoBody } = require('./conventions');
const snapshots = require('./snapshots');

/**
 * Normalize entry fields to flat {name: value}.
 * Handles delivery (flat) and management (locale-nested) shapes.
 */
function localeFields(fields) {
  if (!fields || typeof fields !== 'object') return {};
  const nested = fields[LOCALE];
  if (nested && typeof nested === 'object') return nested;
  return fields;
}

/**
 * List entries of a type (READ — delivery client, flat fields).
 */
async function listEntries(type, opts = {}) {
  const client = deliveryClient();
  const params = { content_type: type, limit: Math.min(opts.limit || 50, 100) };
  if (opts.order) params.order = opts.order;
  for (const [k, v] of Object.entries(opts.fields || {}))
    params[`fields.${k}`] = v;
  const res = await client.getEntries(params);
  return {
    total: res.total,
    skip: res.skip,
    entries: res.items.map((e) => ({
      id: e.sys.id,
      version: e.sys.revision,
      updatedAt: e.sys.updatedAt,
      published: Boolean(e.sys.publishedVersion),
      fields: localeFields(e.fields),
    })),
  };
}

/**
 * Fetch one entry via the DELIVERY client (flat fields) — always works with
 * the delivery token. Used for the read/detail endpoint.
 */
async function getEntryDelivery(_type, id) {
  const client = deliveryClient();
  const entry = await client.getEntry(id);
  return {
    sys: {
      id: entry.sys.id,
      version: entry.sys.revision,
      published: Boolean(entry.sys.publishedVersion),
      updatedAt: entry.sys.updatedAt,
    },
    fields: localeFields(entry.fields),
  };
}

/**
 * Fetch one entry body via the MANAGEMENT client (locale-nested + version).
 * Needed for full-body updates. Requires a PAT.
 */
async function getEntryBody(_type, id) {
  const c = managementClient();
  const space = await c.space.get();
  const environment = await space.environment.get({
    environmentId: resolveEnv(),
  });
  const entry = await environment.entry.get(id);
  return entry; // raw body: entry.body.sys.version, entry.body.fields['en-US']
}

async function createEntry(type, payload) {
  const c = managementClient();
  const space = await c.space.get();
  const environment = await space.environment.get({
    environmentId: resolveEnv(),
  });
  const created = await environment.entry.create({
    content_type: type,
    fields: { [LOCALE]: { ...payload } },
  });
  const published = await created.publish();
  return published.body;
}

async function updateEntry(_type, id, payload) {
  const c = managementClient();
  const space = await c.space.get();
  const environment = await space.environment.get({
    environmentId: resolveEnv(),
  });
  const current = await environment.entry.get(id);
  const body = mergeIntoBody(current.body, payload);
  const updated = await environment.entry.update({
    id,
    version: current.body.sys.version,
    ...body,
  });
  const published = await updated.publish();
  return published.body;
}

async function deleteEntry(_type, id) {
  const c = managementClient();
  const space = await c.space.get();
  const environment = await space.environment.get({
    environmentId: resolveEnv(),
  });
  const entry = await environment.entry.get(id);
  try {
    if (entry.body.sys.publishedVersion) await entry.unpublish();
  } catch {
    // already unpublished
  }
  await entry.delete();
  return { ok: true };
}

async function createAsset(title, file, contentType, filename) {
  const c = managementClient();
  const space = await c.space.get();
  const environment = await space.environment.get({
    environmentId: resolveEnv(),
  });
  const asset = await environment.asset.createWithUpload({
    fields: {
      title,
      file: {
        [LOCALE]: {
          contentType,
          fileName: filename,
          content: file.toString('base64'),
        },
      },
    },
  });
  const processed = await asset.processForAllLocales();
  const published = await processed.publish();
  const f = published.body.fields.file[LOCALE];
  return {
    assetId: published.body.sys.id,
    url: f.url,
    width: f.width,
    height: f.height,
    size: f.size,
  };
}

function assetLink(assetId) {
  return { sys: { type: 'Link', linkType: 'Asset', id: assetId } };
}

/**
 * Resolve asset links in flat fields to `_assetUrl_<id>` keys (previews).
 */
async function resolveAssetUrls(fields) {
  const client = deliveryClient();
  const ids = new Set();
  const walk = (v) => {
    if (!v || typeof v !== 'object') return;
    if (v.sys && v.sys.type === 'Link' && v.sys.linkType === 'Asset')
      ids.add(v.sys.id);
    else if (Array.isArray(v)) v.forEach(walk);
    else Object.values(v).forEach(walk);
  };
  walk(fields);
  if (!ids.size) return fields;
  const out = { ...fields };
  for (const id of ids) {
    try {
      const asset = await client.getAsset(id);
      const af = localeFields(asset.fields);
      out[`_assetUrl_${id}`] = af.file && af.file.url ? af.file.url : null;
    } catch {
      out[`_assetUrl_${id}`] = null;
    }
  }
  return out;
}

function patError() {
  return {
    ok: false,
    errors: [
      'Writes require CONTENTFUL_PAT (the delivery token is read-only). Set it in admin/.env.',
    ],
  };
}

/**
 * Write-preflight (spec §6): validate + (for edits) load current + snapshot.
 */
async function preflight(type, id, payload) {
  const v = validate(type, payload, { requireAddable: !id });
  if (!v.ok) return { ok: false, errors: v.errors };
  if (!hasPat()) return patError();

  if (id) {
    let current;
    try {
      current = await getEntryBody(type, id);
    } catch (e) {
      const msg = /401|unauthorized|invalid/i.test(e.message)
        ? patError().errors[0]
        : `Could not load entry ${id}: ${e.message}`;
      return { ok: false, errors: [msg] };
    }
    if (!snapshots.exists(type, id)) {
      snapshots.write(type, id, current.body);
    }
    return { ok: true, version: current.body.sys.version };
  }
  return { ok: true };
}

/**
 * Confirm a write (spec §6).
 */
async function confirmWrite(type, id, payload, _expectedVersion) {
  if (!hasPat()) return patError();
  if (id) {
    const updated = await updateEntry(type, id, payload);
    snapshots.write(type, id, updated);
    return updated;
  }
  const created = await createEntry(type, payload);
  snapshots.write(type, created.sys.id, created);
  return created;
}

/**
 * Diff local snapshot vs current values (first-edit confirmation, spec §10).
 */
function diffFromSnapshot(type, id, payload) {
  const snap = snapshots.read(type, id);
  if (!snap) return null;
  const before = localeFields(snap.fields);
  const after = payload || {};
  const added = [];
  const removed = [];
  const changed = [];
  for (const k of new Set([...Object.keys(before), ...Object.keys(after)])) {
    const a = before[k];
    const b = after[k];
    if (JSON.stringify(a) === JSON.stringify(b)) continue;
    if (a === undefined || a === null) added.push(k);
    else if (b === undefined || b === null) removed.push(k);
    else changed.push(k);
  }
  return { added, removed, changed };
}

module.exports = {
  LOCALE,
  localeFields,
  listEntries,
  getEntryDelivery,
  getEntryBody,
  createEntry,
  updateEntry,
  deleteEntry,
  createAsset,
  assetLink,
  resolveAssetUrls,
  preflight,
  confirmWrite,
  diffFromSnapshot,
};
