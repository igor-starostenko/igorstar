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
// Uses the same image but with very small dimensions and low quality
const addBlurDataURL = (url) => {
  if (!url || !url.includes('images.ctfassets.net')) return undefined;

  try {
    const u = new URL(url);
    // Create a tiny 20x20px blurred version
    u.searchParams.set('w', '20');
    u.searchParams.set('h', '20');
    u.searchParams.set('q', '10');
    return u.toString();
  } catch {
    // Fallback: append params without URL parsing
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=20&h=20&q=10`;
  }
};

export { addBlurDataURL, addContentfulParams };
