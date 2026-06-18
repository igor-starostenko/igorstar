/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
 */

// Generate base64 blur placeholder for Contentful images
// Fetches a tiny 12px version with low quality and returns as base64 data URL
const makeBlurDataURL = async (src) => {
  if (!src || !src.includes('images.ctfassets.net')) return undefined;

  try {
    // Fetch a tiny version of the image (12px, q=20 for low quality)
    const tinySrc = src + '?w=12&q=20';
    const res = await fetch(tinySrc);
    
    if (!res.ok) {
      console.error('Failed to fetch blur placeholder:', tinySrc, res.status);
      return undefined;
    }
    
    const contentType = res.headers.get('content-type') || 'image/webp';
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return 'data:' + contentType + ';base64,' + buffer.toString('base64');
  } catch (error) {
    console.error('Failed to generate blur placeholder:', src, error.message);
    return undefined;
  }
};

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

export { makeBlurDataURL, addContentfulParams };
