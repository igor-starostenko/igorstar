// src/lib/models.js — field registry + validation for the admin portal.
//
// Field definitions mirror the LIVE content model (fetched 2026-08-22 into
// scripts/content-models.json via the delivery API). In the live space ALL
// fields are required: false — so validation here is the ONLY enforcement.
// Required-markers in this file represent what the SITE needs, not what
// Contentful enforces.
//
// add: true  = portal creates a new entry with this field.
// add: false = portal edits it on existing entries only (or not at all).

const LOCALE = 'en-US';

const FIELDS = {
  post: [
    { name: 'title', type: 'string', required: true, add: true },
    { name: 'path', type: 'string', required: true, add: true },
    { name: 'date', type: 'date', required: true, add: true },
    {
      name: 'layout',
      type: 'symbol',
      required: false,
      add: true,
      note: 'live-confirmed; not rendered by the site — pass-through string',
    },
    { name: 'draft', type: 'boolean', required: false, add: true },
    { name: 'category', type: 'string', required: true, add: true },
    { name: 'tags', type: 'array', required: false, add: true },
    { name: 'description', type: 'string', required: false, add: true },
    { name: 'content', type: 'richtext', required: true, add: true },
    { name: 'thumbnail', type: 'asset', required: false, add: true },
    { name: 'images', type: 'assetArray', required: false, add: true },
    { name: 'linkText', type: 'string', required: false, add: true },
    {
      name: 'recommendations',
      type: 'entryLinks',
      required: false,
      add: false,
      note: 'edit only; the site renders recommended links from this array',
    },
  ],
  page: [
    { name: 'title', type: 'string', required: true, add: true },
    { name: 'content', type: 'richtext', required: true, add: true },
  ],
  gallery: [
    {
      name: 'id',
      type: 'integer',
      required: false,
      add: false,
      note: 'portal-managed sequential id (MVP: edit-only)',
    },
    { name: 'image', type: 'asset', required: true, add: true },
    {
      name: 'location',
      type: 'location',
      required: false,
      add: false,
      note: 'live-confirmed; optional, not rendered',
    },
    { name: 'description', type: 'string', required: false, add: true },
  ],
  feed: [
    { name: 'date', type: 'date', required: true, add: true },
    { name: 'image', type: 'asset', required: true, add: true },
    {
      name: 'location',
      type: 'location',
      required: false,
      add: false,
      note: 'live-confirmed; optional, not rendered',
    },
    { name: 'locationText', type: 'string', required: false, add: true },
    { name: 'description', type: 'string', required: false, add: true },
    {
      name: 'id',
      type: 'integer',
      required: false,
      add: false,
      note: 'import-script-managed; MVP: edit-only',
    },
  ],
};

const CONTENT_TYPES = Object.keys(FIELDS);

function fieldsFor(type) {
  const f = FIELDS[type];
  if (!f) throw new Error(`Unknown content type: ${type}`);
  return f;
}

/** Field names the portal is allowed to CREATE (add: true). */
function addableFields(type) {
  return fieldsFor(type)
    .filter((f) => f.add)
    .map((f) => f.name);
}

/**
 * Validate a payload against a content type.
 * @param {string} type content type id
 * @param {Record<string, any>} payload flat object: name -> value
 * @param {object} [opts]
 * @param {boolean} [opts.requireAddable=true] enforce required fields from the add set
 * @param {boolean[]} [opts.recommendationsOk] — reserved
 * @returns {{ok: true} | {ok: false, errors: string[]}}
 */
function validate(type, payload, opts = {}) {
  const errors = [];
  const requireAddable = opts.requireAddable !== false;
  const schema = fieldsFor(type);
  const p = payload || {};

  // Required fields (add set only — edit-only fields are never required on create).
  if (requireAddable) {
    for (const f of schema) {
      if (!f.add || !f.required) continue;
      if (isEmpty(p[f.name])) errors.push(`${f.name}: required`);
    }
  }

  // Type checks for every field present in the payload.
  for (const [key, value] of Object.entries(p)) {
    const f = schema.find((s) => s.name === key);
    if (!f) {
      errors.push(`${key}: not a field on '${type}'`);
      continue;
    }
    if (value === undefined || value === null) continue; // absence handled above
    if (!checkType(f.type, value)) {
      errors.push(`${key}: expected ${f.type}`);
    }
  }

  // Date fields: must be a valid Date or ISO string parseable as a date.
  for (const f of schema) {
    if (f.type !== 'date') continue;
    const v = p[f.name];
    if (v === undefined || v === null) continue;
    const d = v instanceof Date ? v : new Date(v);
    if (Number.isNaN(d.getTime())) errors.push(`${f.name}: not a valid date`);
  }

  // Integer fields: finite integer.
  for (const f of schema) {
    if (f.type !== 'integer') continue;
    const v = p[f.name];
    if (v === undefined || v === null) continue;
    if (!Number.isInteger(v)) errors.push(`${f.name}: expected integer`);
  }

  // Array fields: arrays.
  for (const f of schema) {
    if (f.type !== 'array') continue;
    const v = p[f.name];
    if (v === undefined || v === null) continue;
    if (!Array.isArray(v)) errors.push(`${f.name}: expected array`);
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}

function isEmpty(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string' && v.trim() === '') return true;
  if (v instanceof Date && Number.isNaN(v.getTime())) return true;
  if (typeof v === 'object' && !Array.isArray(v)) {
    // RichText/asset stubs: consider {en-US:...} with empty inside as empty.
    const inner = v[LOCALE] ?? v;
    if (inner === null || inner === undefined) return true;
    if (typeof inner === 'string' && inner.trim() === '') return true;
  }
  return false;
}

function checkType(type, value) {
  switch (type) {
    case 'string':
    case 'symbol':
      return typeof value === 'string';
    case 'integer':
      return Number.isInteger(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'date':
      return (
        value instanceof Date ||
        typeof value === 'string' ||
        typeof value === 'number'
      );
    case 'array':
      return Array.isArray(value);
    case 'richtext':
      return (
        typeof value === 'string' ||
        (value &&
          typeof value === 'object' &&
          (value.nodeType === 'document' ||
            value.node === 'document' ||
            value[LOCALE]))
      );
    case 'asset':
    case 'entryLinks':
      return (
        (value && typeof value === 'object' && (value.sys || value[LOCALE])) ||
        typeof value === 'object'
      );
    case 'assetArray':
      return Array.isArray(value);
    case 'location':
      return (
        value &&
        typeof value === 'object' &&
        (Number.isFinite(value.latitude) || Number.isFinite(value.longitude))
      );
    default:
      return false;
  }
}

module.exports = {
  LOCALE,
  FIELDS,
  CONTENT_TYPES,
  fieldsFor,
  addableFields,
  validate,
};
