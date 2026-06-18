import { imageQuality, imageFormat } from '../constants/imageConfig.js';

/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
 */
const addContentfulParams = (url, width, height) => {
  if (!url || !width || !height) return url;
  if (!url.includes('images.ctfassets.net')) return url;

  try {
    const u = new URL(url);
    u.searchParams.set('w', String(width));
    u.searchParams.set('h', String(height));
    u.searchParams.set('q', String(imageQuality));
    u.searchParams.set('fm', imageFormat);
    return u.toString();
  } catch {
    // Fallback: just append params without URL parsing
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&h=${height}`;
  }
};

export { addContentfulParams };
