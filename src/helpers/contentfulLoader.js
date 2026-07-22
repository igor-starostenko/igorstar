import { imageQuality as defaultQuality } from 'constants/imageConfig.js';

export default function contentfulLoader({ src, width, quality = defaultQuality }) {
  // For Contentful images, apply optimization parameters
  if (src.includes('images.ctfassets.net')) {
    try {
      const normalizedSrc = src.startsWith('//') ? `https:${src}` : src;
      const url = new URL(normalizedSrc);
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
