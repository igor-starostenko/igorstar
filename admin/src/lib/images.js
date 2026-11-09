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
// Feed square crop: the crop UI offers a 1:1 selection that becomes the
// 1024x1024 WebP main file. MIN_CROP_SIDE keeps upscaling at or below 2x —
// smaller selections would turn into blur at 1024.
const FEED_SQUARE = 1024;
const MIN_CROP_SIDE = 512;

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
 * Validate + normalize a client-supplied square crop region.
 *
 * @param {object} crop { left, top, width, height } in SOURCE pixel space
 *   (EXIF-rotated orientation). May carry sub-pixel values from the crop UI.
 * @param {number} imageWidth source image width (post-rotation)
 * @param {number} imageHeight source image height (post-rotation)
 * @returns {{ left: number, top: number, width: number, height: number }}
 *   integer, clamped-to-bounds square region, side within
 *   [MIN_CROP_SIDE, min(imageWidth, imageHeight)]
 * @throws {Error} with a human-readable reason when the crop is unusable
 */
function validateCrop(crop, imageWidth, imageHeight) {
  if (!crop || typeof crop !== 'object') {
    throw new Error('crop must be an object { left, top, width, height }');
  }
  const num = (key) => {
    const v = Number(crop[key]);
    if (!Number.isFinite(v)) throw new Error(`crop.${key} must be a number`);
    return v;
  };
  let left = Math.floor(num('left'));
  let top = Math.floor(num('top'));
  // Enforce square: take the shorter side, so a sub-pixel drift from the
  // crop UI can never make sharp.extract() fail on a non-1:1 region.
  let side = Math.min(Math.floor(num('width')), Math.floor(num('height')));
  if (side <= 0) throw new Error('crop region is empty');
  if (left < 0 || top < 0) {
    throw new Error('crop region starts outside the image');
  }
  // Clamp to the inscribed square of the image.
  side = Math.min(side, imageWidth - left, imageHeight - top);
  if (side <= 0) throw new Error('crop region is outside the image');
  if (side < MIN_CROP_SIDE) {
    throw new Error(
      `crop region is too small (${side}px); select at least ${MIN_CROP_SIDE}px on a side for a ${FEED_SQUARE}px output`
    );
  }
  return { left, top, width: side, height: side };
}

/**
 * Process an upload for a given content type.
 *
 * @param {Buffer} buffer original image bytes
 * @param {string} filename original filename
 * @param {'gallery'|'feed'|'post'} target content type
 * @param {object} [crop] optional square crop for feed — see validateCrop.
 *   With a crop, the feed main file becomes a FEED_SQUARE x FEED_SQUARE
 *   WebP of the selected region (the thumbnail is derived from that result);
 *   without one, feed keeps the original-aspect, long-edge-capped behavior.
 * @returns {Promise<{
 *   file: Buffer, filename: string, contentType: string,
 *   width: number, height: number,
 *   thumb?: { file: Buffer, filename: string, contentType: string, width: number, height: number },
 *   cropped?: boolean,
 * }>}
 */
async function processUpload(buffer, filename, target, crop) {
  const t = TARGETS[target];
  if (!t) throw new Error(`processUpload: unknown target "${target}"`);

  const meta = await metadata(buffer);

  if (crop) {
    if (target !== 'feed') {
      throw new Error(`crop is only supported for feed (got target "${target}")`);
    }
    const region = validateCrop(crop, meta.width, meta.height);
    const base =
      (filename || 'image')
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_') || 'image';
    // Square region -> FEED_SQUARE WebP (main), then the thumbnail is a
    // straight downscale of that result (never a second crop of the source).
    const square = await sharp(buffer, { animated: false })
      .rotate()
      .extract(region)
      .resize({ width: FEED_SQUARE, height: FEED_SQUARE })
      .webp({ quality: QUALITY })
      .toBuffer();
    const thumb = await sharp(square)
      .resize({ width: t.width, height: t.height })
      .webp({ quality: QUALITY })
      .toBuffer();
    return {
      file: square,
      filename: `${base}.webp`,
      contentType: 'image/webp',
      width: FEED_SQUARE,
      height: FEED_SQUARE,
      cropped: true,
      thumb: {
        file: thumb,
        filename: `${base}-thumb.webp`,
        contentType: 'image/webp',
        width: t.width,
        height: t.height,
      },
    };
  }

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

module.exports = {
  TARGETS,
  MAX_LONG_EDGE,
  QUALITY,
  FEED_SQUARE,
  MIN_CROP_SIDE,
  metadata,
  validateCrop,
  processUpload,
};
