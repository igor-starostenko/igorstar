import { imageFormat } from '../constants/imageConfig.js';

const BLUR_CONCURRENCY = Number(process.env.BLUR_CONCURRENCY ?? 1);
const CONTENTFUL_TIMEOUT = 15000;

export const filterObject = (object, props) => {
  if (!Array.isArray(props)) {
    return {};
  }

  return props
    .filter((property) => property in object)
    .map((property) => ({ [property]: object[property] }))
    .reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
};

const blurDataURLCache = new Map();
const blurBatchCache = new Map();

const fetchWithTimeout = async (
  url,
  options = {},
  timeout = CONTENTFUL_TIMEOUT
) => {
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

export async function makeBlurDataURL(src) {
  if (!src || !src.includes('images.ctfassets.net')) return undefined;

  if (blurDataURLCache.has(src)) return blurDataURLCache.get(src);

  try {
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

export async function addBlurDataURLs(images = [], { path } = {}) {
  // Check batch-level cache first to avoid iterating through all images.
  // Include path in the cache key to prevent collisions between
  // calls with different paths but the same set of srcs.
  const cacheKey = `${path ?? ''}|${images.map((img) => img?.src).join('|')}`;
  if (blurBatchCache.has(cacheKey)) {
    return blurBatchCache.get(cacheKey);
  }

  const results = new Array(images.length);

  for (let i = 0; i < images.length; i += BLUR_CONCURRENCY) {
    const batch = images.slice(i, i + BLUR_CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        if (path) {
          const keys = path.split('.');
          let current = item;
          for (let j = 0; j < keys.length - 1; j += 1) {
            if (!current || !current[keys[j]]) return item;
            current = current[keys[j]];
          }
          const lastKey = keys[keys.length - 1];
          if (!current || !current[lastKey]) return item;
          const image = current[lastKey];
          if (image && !('blurDataURL' in image)) {
            const blurDataURL = image.src?.includes('images.ctfassets.net')
              ? ((await makeBlurDataURL(image.src)) ?? null)
              : null;
            current[lastKey] = { ...image, blurDataURL };
          }
          return item;
        }

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

  // Store in batch cache for subsequent calls with same images
  blurBatchCache.set(cacheKey, results);
  return results;
}

export function clearBlurDataURLCache() {
  blurDataURLCache.clear();
  blurBatchCache.clear();
}
