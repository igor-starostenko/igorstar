import { imageQuality as defaultQuality } from 'constants/imageConfig.js';

// Maximum width for Contentful images.
// Article listing thumbnails display at most 778px wide (from sizes attribute).
// Article page gallery images display at most 528px wide (from sizes attribute).
// Capping at 828 (closest deviceSize) prevents downloading oversized images.
const MAX_IMAGE_WIDTH = 750;

export default function contentfulLoader({
  src,
  width,
  quality = defaultQuality,
}) {
  // For Contentful images, apply optimization parameters
  if (src.includes('images.ctfassets.net')) {
    try {
      const normalizedSrc = src.startsWith('//') ? `https:${src}` : src;
      const url = new URL(normalizedSrc);
      // Cap the width to avoid downloading oversized images for thumbnails
      const effectiveWidth = Math.min(width, MAX_IMAGE_WIDTH);
      url.searchParams.set('w', String(effectiveWidth));
      url.searchParams.set('q', String(quality));
      url.searchParams.set('fm', 'webp');
      return url.toString();
    } catch {
      return src;
    }
  }

  // For static assets, just return the src (Next.js will handle it natively)
  return src;
}