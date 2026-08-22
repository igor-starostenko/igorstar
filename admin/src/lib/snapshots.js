// src/lib/snapshots.js — local JSON snapshots of Contentful content, kept
// for diff-on-first-edit and local previews when the network is unavailable.
// Snapshots are gitignored (contain live content, never commit).
//
// Local-only behavior: files live under admin/.snapshots/ and are optional.
// If absent, diff-on-first-edit is skipped (nothing to diff against) and
// the UI shows "no local snapshot" instead of failing.

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', '..', '.snapshots');

function filePath(type, id) {
  // id may contain characters unsafe for filenames; sanitize.
  const safe = String(id).replace(/[^a-zA-Z0-9_-]/g, '_');
  return path.join(DIR, `${type}`, `${safe}.json`);
}

function exists(type, id) {
  return fs.existsSync(filePath(type, id));
}

function read(type, id) {
  const p = filePath(type, id);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function write(type, id, body) {
  const p = filePath(type, id);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(body, null, 2) + '\n', 'utf8');
  return p;
}

function list(type) {
  const dir = path.join(DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

module.exports = {
  DIR,
  filePath,
  exists,
  read,
  write,
  list,
};
