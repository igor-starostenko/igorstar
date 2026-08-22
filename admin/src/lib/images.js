// src/lib/images.js — image intake + processing for the admin portal.
//
// Pipeline (spec §5):
//   1. Read the upload (a Buffer + filename from multipart).
//   2. Read metadata with sharp.
//   3. Make Image file (JPG/WebP): long-edge capped at 800px, q80.
//   4. Grid thumbnails (gallery/feed): 640x640 cover, q80.
//   5. Post thumbnails: 1200x450 (contentful-import.js target).
//   Returns the processed buffers + metadata so the caller can upload to
//   Contentful via createAsset.
//
// sharp is already in the root node_modules (v0.35.3) and is listed in
// admin/package.json so `yarn --cwd admin` resolves it.

const sharp = require('sharp');

const TARGETS = {
  gallery: { width: 640, height: 640, fit: 'cover' },
  feed: { width: 640, height: 640, fit: 'cover' },
  post: { width: 1200, height: 450, fit: 'cover' },
};

const MAX_LONG_EDGE = 800;
const QUALITY = 80;

/**
 * Metadata only — no pixel processing.
 * @param {Buffer} buffer
 */
async function metadata(buffer) {
  const img = sharp(buffer, { animated: false }).rotate();
  const meta = await img.metadata();
  return {
    width: meta.width,
    height: meta.height,
    format: meta.format,
    size: meta.size,
  };
}

function pickFormat(inputFormat) {
  // WebP is preferred (used by the site's imageFormat constant), with JPG
  // fallback for inputs that WebP encode poorly (rare for photos).
  return inputFormat === 'jpeg' || inputFormat === 'jpg' ? 'jpeg' : 'webp';
}

/**
 * Process an upload for a given content type.
 *
 * @param {Buffer} buffer original image bytes
 * @param {string} filename original filename
 * @param {'gallery'|'feed'|'post'} target content type
 * @returns {Promise<{
 *   file: Buffer, filename: string, contentType: string,
 *   width: number, height: number,
 *   thumb?: { file: Buffer, filename: string, contentType: string, width: number, height: number },
 * }>}
 */
async function processUpload(buffer, filename, target) {
  const t = TARGETS[target];
  if (!t) throw new Error(`processUpload: unknown target "${target}"`);

  const meta = await metadata(buffer);
  const format = pickFormat(meta.format);
  const ext = format === 'jpeg' ? 'jpg' : 'webp';
  const base =
    (filename || 'image')
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_') || 'image';

  // Main file: long-edge capped at MAX_LONG_EDGE.
  const scale = Math.min(1, MAX_LONG_EDGE / Math.max(meta.width, meta.height));
  const outW = Math.max(1, Math.round(meta.width * scale));
  const outH = Math.max(1, Math.round(meta.height * scale));
  const file = await sharp(buffer, { animated: false })
    .rotate()
    .resize({
      width: outW,
      height: outH,
      fit: 'inside',
      withoutEnlargement: true,
    })
    [format]({ quality: QUALITY })
    .toBuffer();

  // Thumbnail per target.
  const thumb = await sharp(buffer, { animated: false })
    .rotate()
    .resize({ width: t.width, height: t.height, fit: t.fit })
    [format]({ quality: QUALITY })
    .toBuffer();

  return {
    file,
    filename: `${base}.${ext}`,
    contentType: format === 'jpeg' ? 'image/jpeg' : 'image/webp',
    width: outW,
    height: outH,
    thumb: {
      file: thumb,
      filename: `${base}-thumb.${ext}`,
      contentType: format === 'jpeg' ? 'image/jpeg' : 'image/webp',
      width: t.width,
      height: t.height,
    },
  };
}

module.exports = { TARGETS, MAX_LONG_EDGE, QUALITY, metadata, processUpload };
