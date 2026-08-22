// src/lib/conventions.js — field ordering, required-flag rules, unique-path
// derivation, and next-id computation. Pure functions; unit-tested.

const { LOCALE } = require('./models');

/**
 * Ordered field list for editing an entry of a content type:
 * 1. existing fields, in their current order (preserve unknown fields in place)
 * 2. new fields appended in model order
 * This mirrors the admin-portal-spec: "ordered list = existing fields in order,
 * plus new fields appended."
 *
 * @param {string} type content type id
 * @param {string[]} existingFieldNames current field order from a live entry
 * @param {string[]} addableFieldNames  portal-addable fields (model order)
 * @returns {string[]} ordered field names
 */
function orderedFields(type, existingFieldNames, addableFieldNames) {
  const { fieldsFor } = require('./models');
  fieldsFor(type); // throws on unknown type
  const existing = [...(existingFieldNames || [])];
  const set = new Set(existing);
  // Spec: "ordered list = existing fields in order, plus new fields appended."
  const appended = (addableFieldNames || []).filter((n) => !set.has(n));
  return [...existing, ...appended];
}

/**
 * Required flags: live flags are all false in this space, so the site's
 * required-markers win. A field is "required" if the model marks it required.
 *
 * @param {import('./models').FieldDef[]} modelFields
 * @param {Array<{name:string, required: boolean}>} liveFields
 * @returns {Record<string, boolean>} name -> required
 */
function requiredFlags(modelFields, liveFields) {
  const live = new Map((liveFields || []).map((f) => [f.name, f]));
  const flags = {};
  for (const f of modelFields) {
    const liveFlag = live.get(f.name) ? live.get(f.name).required : false;
    // Site required-markers override the (all-false) live flags.
    flags[f.name] = f.required || liveFlag;
  }
  return flags;
}

/**
 * Unique path derivation for posts.
 *
 * - Clean the user's path: trim, lowercase, collapse whitespace, strip
 *   non-slug chars, collapse dashes.
 * - If it collides with an existing used path (case-insensitive), append -2,
 *   -3, ... until unique.
 *
 * @param {string} userPath
 * @param {Set<string>|string[]} usedPaths existing paths
 * @returns {string}
 */
function uniquePath(userPath, usedPaths) {
  const used = new Set((usedPaths || []).map((p) => String(p).toLowerCase()));
  const base = String(userPath || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!base) return 'untitled';
  let candidate = base;
  let i = 2;
  while (used.has(candidate.toLowerCase())) {
    candidate = `${base}-${i}`;
    i += 1;
  }
  return candidate;
}

/**
 * Next sequential id for feed/gallery entries: existing numeric ids -> max+1.
 * @param {number[]} existingIds
 * @returns {number}
 */
function nextId(existingIds) {
  const nums = (existingIds || []).filter((n) => Number.isFinite(n));
  if (!nums.length) return 1;
  return Math.max(...nums) + 1;
}

/**
 * Build a full entry body (create or update) from an existing entry body and
 * a flat payload of new values. CMA updates are full-body: we merge the
 * payload's locale values into the existing body, preserving all other
 * fields and the sys/version block.
 *
 * @param {object} existingBody full entry body ({sys, fields:{en-US:{...}}})
 * @param {Record<string, any>} payload flat {name: value}
 * @returns {object} new full body to send
 */
function mergeIntoBody(existingBody, payload) {
  const body = JSON.parse(
    JSON.stringify(existingBody || { sys: {}, fields: {} })
  );
  const locale = body.fields[LOCALE] ?? (body.fields[LOCALE] = {});
  for (const [name, value] of Object.entries(payload || {})) {
    if (value === undefined || value === null) continue;
    locale[name] = value;
  }
  return body;
}

module.exports = {
  LOCALE,
  orderedFields,
  requiredFlags,
  uniquePath,
  nextId,
  mergeIntoBody,
};
