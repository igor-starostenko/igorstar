/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
 */

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
    return `${url}${separator}w=${width}&h=${height}`;
  }
};

// Generate a blur placeholder URL for Contentful images
// Creates a 20x20 pixel low-quality image using Contentful's resize params
const addBlurDataURL = (url) => {
  if (!url || !url.includes('images.ctfassets.net')) return undefined;

  try {
    const u = new URL(url);
    // Override width/height to create a small 20px blur image with very low quality (q=20)
    u.searchParams.set('w', '20');
    u.searchParams.set('h', '20');
    u.searchParams.set('q', '20');
    return u.toString();
  } catch {
    // Fallback: append params without URL parsing
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=20&h=20&q=20`;
  }
};

export { addContentfulParams, addBlurDataURL };
