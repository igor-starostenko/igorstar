/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
*/

import { imageQuality, imageFormat } from '../constants/imageConfig.js';

const BLUR_CONCURRENCY = Number(process.env.BLUR_CONCURRENCY ?? 1);
const CONTENTFUL_TIMEOUT = 15000;

// Cache to avoid duplicate fetches for the same src
const blurDataURLCache = new Map();

// Timeout helper for fetch requests
const fetchWithTimeout = async (url, options = {}, timeout = CONTENTFUL_TIMEOUT) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
};

// Generate a blur placeholder base64 data URL for Contentful images
// Fetches a tiny image with low quality and returns base64
export async function makeBlurDataURL(src) {
  if (!src || !src.includes('images.ctfassets.net')) return undefined;

  if (blurDataURLCache.has(src)) return blurDataURLCache.get(src);

  try {
    // Use a tiny 20x20px with very low quality for minimal payload
    const u = new URL(src);
    u.searchParams.set('w', '20');
    u.searchParams.set('h', '20');
    u.searchParams.set('q', '10');
    u.searchParams.set('fm', imageFormat);
    const blurSrc = u.toString();
    const response = await fetchWithTimeout(blurSrc, {}, CONTENTFUL_TIMEOUT);
    if (!response.ok) {
      console.warn(
        `Failed to fetch blur placeholder (status ${response.status}): ${blurSrc}`
      );
      return undefined;
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = Buffer.from(buffer).toString('base64');

    const dataURL = `data:${contentType};base64,${base64}`;
    blurDataURLCache.set(src, dataURL);
    return dataURL;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`Timeout fetching blur placeholder: ${src}`);
    } else {
      console.warn(`Error generating blurDataURL for ${src}:`, error);
    }
    return undefined;
  }
}

// Add Contentful image optimization parameters (w, h, f, q)
export const addContentfulParams = (
  url,
  width,
  height,
  { format = imageFormat, quality = imageQuality } = {}
) => {
  if (!url || !width || !height) return url;
  if (!url.includes('images.ctfassets.net')) return url;

  try {
    const u = new URL(url);
    u.searchParams.set('w', String(width));
    u.searchParams.set('h', String(height));
    if (format) {
      u.searchParams.set('fm', format);
    }
    if (quality) {
      u.searchParams.set('q', String(quality));
    }
    return u.toString();
  } catch {
    // Fallback: just append params without URL parsing
    let result = url;
    const separator = url.includes('?') ? '&' : '?';
    if (format) {
      result += separator + 'fm=' + format;
    }
    if (quality) {
      const nextSeparator = result.includes('?') ? '&' : '?';
      result += nextSeparator + 'q=' + String(quality);
    }
    return result + separator + 'w=' + width + '&h=' + height;
  }
};

// Add blurDataURL property to each image in an array if not already set
export async function addBlurDataURLs(images = [], { path } = {}) {
  const results = new Array(images.length);

  for (let i = 0; i < images.length; i += BLUR_CONCURRENCY) {
    const batch = images.slice(i, i + BLUR_CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        // If path is provided, navigate to nested object and add blurDataURL there
        if (path) {
          const keys = path.split('.');
          let current = item;

          // Navigate to the nested object
          for (let j = 0; j < keys.length - 1; j += 1) {
            if (!current || !current[keys[j]]) return item;
            current = current[keys[j]];
          }

          const lastKey = keys[keys.length - 1];
          if (!current || !current[lastKey]) return item;

          const image = current[lastKey];
          // Only add blurDataURL if not already set
          if (image && !('blurDataURL' in image)) {
            const blurDataURL = image.src?.includes('images.ctfassets.net')
              ? ((await makeBlurDataURL(image.src)) ?? null)
              : null;
            current[lastKey] = { ...image, blurDataURL };
          }

          return item;
        }

        // Direct array of image objects
        if (item && !('blurDataURL' in item)) {
          const blurDataURL = item.src?.includes('images.ctfassets.net')
            ? ((await makeBlurDataURL(item.src)) ?? null)
            : null;
          return { ...item, blurDataURL };
        }
        return item;
      })
    );

    for (let k = 0; k < batchResults.length; k += 1) {
      results[i + k] = batchResults[k];
    }
  }

  return results;
}

// Exported for testing only – clears the in-memory blur data URL cache
export function clearBlurDataURLCache() {
  blurDataURLCache.clear();
}
