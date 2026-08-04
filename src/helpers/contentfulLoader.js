import { imageQuality as defaultQuality } from 'constants/imageConfig.js';

// Maximum width for Contentful images.
// Prevents downloading the full 3840px source (which can be 200KB+) while
// still allowing sufficient resolution for high-DPI screens.
// - Article thumbnails: sizes attribute limits requests to ~778px at 1x DPR,
//   ~1556px at 2x DPR. The 1920 cap doesn't affect these.
// - Gallery panoramas: can render at 1200px+ width at 300px row height with
//   4:1 aspect ratio. At 2x DPR, they need up to ~2400px — capped at 1920,
//   which is close enough to avoid visible blurriness on most screens.
const MAX_IMAGE_WIDTH = 1920;

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