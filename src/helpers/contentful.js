/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
*/

// Timeout helper for fetch requests
const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
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
// Fetches a tiny 12x12px image with low quality and returns base64
export async function makeBlurDataURL(src) {
  if (!src || !src.includes('images.ctfassets.net')) return undefined;

  try {
    // Use a tiny 12x12px with very low quality for minimal payload
    const blurSrc = `${src}?w=12&h=12&q=10`;
    const response = await fetchWithTimeout(blurSrc, {}, 15000);

    if (!response.ok) {
      console.warn(
        `Failed to fetch blur placeholder (status ${response.status}): ${blurSrc}`
      );
      return undefined;
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = Buffer.from(buffer).toString('base64');

    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`Timeout fetching blur placeholder: ${src}`);
    } else {
      console.warn(`Error generating blurDataURL for ${src}:`, error);
    }
    return undefined;
  }
}

// Add Contentful image optimization parameters (w, h)
const addContentfulParams = (url, width, height) => {
  if (!url || !width || !height) return url;
  if (!url.includes('images.ctfassets.net')) return url;

  try {
    const u = new URL(url);
    u.searchParams.set('w', String(width));
    u.searchParams.set('h', String(height));
    return u.toString();
  } catch {
    // Fallback: just append params without URL parsing
    const separator = url.includes('?') ? '&' : '?';
    return url + separator + 'w=' + width + '&h=' + height;
  }
};

// Add blurDataURL property to each image in an array if not already set
export async function addBlurDataURLs(images = [], { path } = {}) {
  return Promise.all(
    images.map(async (item) => {
      // If path is provided, navigate to nested object and add blurDataURL there
      if (path) {
        const keys = path.split('.');
        let current = item;

        // Navigate to the nested object
        for (let i = 0; i < keys.length - 1; i += 1) {
          if (!current || !current[keys[i]]) return item;
          current = current[keys[i]];
        }

        const lastKey = keys[keys.length - 1];
        if (!current || !current[lastKey]) return item;

        const image = current[lastKey];
        // Only add blurDataURL if not already set and has a valid Contentful src
        if (
          image &&
          !('blurDataURL' in image) &&
          image.src?.includes('images.ctfassets.net')
        ) {
          const blurDataURL = (await makeBlurDataURL(image.src)) ?? null;
          current[lastKey] = { ...image, blurDataURL };
        }

        return item;
      }

      // Direct array of image objects
      if (
        item &&
        !('blurDataURL' in item) &&
        item.src?.includes('images.ctfassets.net')
      ) {
        const blurDataURL = (await makeBlurDataURL(item.src)) ?? null;
        return { ...item, blurDataURL };
      }
      return item;
    })
  );
}

export { addContentfulParams };
