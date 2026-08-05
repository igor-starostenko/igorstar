import { imageQuality as defaultQuality } from 'constants/imageConfig.js';

// Contentful image loader. Next.js determines width from `sizes` + DPR
// and selects the closest `deviceSize`. We pass through width and quality.
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