import { imageQuality as defaultQuality } from 'constants/imageConfig.js';

// Contentful image loader.
// Image dimensions are controlled by:
// 1. The `sizes` attribute on each NextImage component (primary mechanism)
// 2. `deviceSizes` in next.config.js (limits max width to 3840)
// No additional cap is needed in the loader — Next.js calculates the
// appropriate width from `sizes` + device DPR and picks the closest
// `deviceSize`. The `sizes` attribute ensures thumbnails only request
// ~1556px (2x DPR of 778px display), not 3840px.

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
      // Pass through the width requested by Next.js (based on sizes + DPR)
      url.searchParams.set('w', String(width));
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