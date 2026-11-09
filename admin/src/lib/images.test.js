// src/lib/images.test.js — image pipeline: feed square crop (sharp, no network).
import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import {
  processUpload,
  validateCrop,
  FEED_SQUARE,
  MIN_CROP_SIDE,
} from './images';

// 1200x1200 source: left half red, right half blue. Lets a test assert that
// the crop actually extracts the selected region (not just that it resized).
function makeTwoHalfImage(w = 1200, h = 1200) {
  const buf = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      if (x < w / 2) {
        buf[i] = 255; // red left
      } else {
        buf[i + 2] = 255; // blue right
      }
    }
  }
  return sharp(buf, { raw: { width: w, height: h, channels: 3 } })
    .png()
    .toBuffer();
}

async function avgPixel(buffer) {
  const { data } = await sharp(buffer)
    .resize(1, 1)
    .raw()
    .toBuffer({ resolveWithObject: true });
  return [data[0], data[1], data[2]];
}

describe('validateCrop', () => {
  it('accepts a valid crop and floors sub-pixel values', () => {
    const r = validateCrop({ left: 10.7, top: 20.9, width: 700.2, height: 700 }, 1200, 1200);
    expect(r).toEqual({ left: 10, top: 20, width: 700, height: 700 });
  });

  it('enforces square from the shorter side', () => {
    const r = validateCrop({ left: 0, top: 0, width: 800, height: 700 }, 1200, 1200);
    expect(r.width).toBe(700);
    expect(r.height).toBe(700);
  });

  it('clamps the region to the inscribed square', () => {
    // left+width would exceed the image; side must shrink to fit.
    const r = validateCrop({ left: 650, top: 0, width: 800, height: 800 }, 1200, 900);
    expect(r).toEqual({ left: 650, top: 0, width: 550, height: 550 });
  });

  it('rejects a crop that starts outside the image', () => {
    expect(() => validateCrop({ left: -1, top: 0, width: 600, height: 600 }, 1200, 1200)).toThrow(
      /starts outside/
    );
  });

  it('rejects a crop entirely outside the image', () => {
    expect(() => validateCrop({ left: 5000, top: 0, width: 600, height: 600 }, 1200, 1200)).toThrow(
      /outside the image/
    );
  });

  it('rejects regions smaller than the minimum side', () => {
    expect(() => validateCrop({ left: 0, top: 0, width: MIN_CROP_SIDE - 1, height: MIN_CROP_SIDE - 1 }, 1200, 1200)).toThrow(
      new RegExp(`at least ${MIN_CROP_SIDE}px`)
    );
  });

  it('rejects non-numeric or missing values', () => {
    expect(() => validateCrop({ left: 'x', top: 0, width: 600, height: 600 }, 1200, 1200)).toThrow(
      /must be a number/
    );
    expect(() => validateCrop(null, 1200, 1200)).toThrow(/must be an object/);
  });
});

describe('processUpload: feed square crop', () => {
  it('produces a 1024x1024 WebP main file + 640x640 WebP thumb', async () => {
    const src = await makeTwoHalfImage();
    const out = await processUpload(src, 'photo.png', 'feed', {
      left: 0,
      top: 0,
      width: 900,
      height: 900,
    });
    expect(out.cropped).toBe(true);
    expect(out.width).toBe(FEED_SQUARE);
    expect(out.height).toBe(FEED_SQUARE);
    expect(out.contentType).toBe('image/webp');
    expect(out.filename).toBe('photo.webp');
    expect(out.thumb.width).toBe(640);
    expect(out.thumb.height).toBe(640);
    expect(out.thumb.contentType).toBe('image/webp');
    // The buffer really is a WebP of the right dimensions.
    const meta = await sharp(out.file).metadata();
    expect(meta.format).toBe('webp');
    expect(meta.width).toBe(FEED_SQUARE);
    expect(meta.height).toBe(FEED_SQUARE);
  });

  it('extracts the selected region (pixel content check)', async () => {
    const src = await makeTwoHalfImage();
    // Right half of the source is blue.
    const out = await processUpload(src, 'photo.png', 'feed', {
      left: 600,
      top: 100,
      width: 600,
      height: 600,
    });
    const [r, g, b] = await avgPixel(out.file);
    expect(b).toBeGreaterThan(200);
    expect(r).toBeLessThan(50);
    expect(g).toBeLessThan(50);
  });

  it('keeps legacy behavior when no crop is given (aspect preserved, 800 cap)', async () => {
    const src = await makeTwoHalfImage(1600, 1200);
    const out = await processUpload(src, 'photo.png', 'feed');
    expect(out.cropped).toBeUndefined();
    expect(out.width).toBe(800); // long edge capped
    expect(out.height).toBe(600); // aspect preserved
    expect(out.thumb.width).toBe(640);
    expect(out.thumb.height).toBe(640);
  });

  it('rejects a crop on non-feed targets', async () => {
    const src = await makeTwoHalfImage();
    await expect(
      processUpload(src, 'photo.png', 'post', { left: 0, top: 0, width: 900, height: 900 })
    ).rejects.toThrow(/crop is only supported for feed/);
  });

  it('rejects when the source is too small for the minimum crop side', async () => {
    const small = await makeTwoHalfImage(400, 400);
    await expect(
      processUpload(small, 'small.png', 'feed', { left: 0, top: 0, width: 400, height: 400 })
    ).rejects.toThrow(new RegExp(`at least ${MIN_CROP_SIDE}px`));
  });
});
