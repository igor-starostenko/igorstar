// Generate base64 blur placeholder for Contentful images
// Uses a small 20x20px blurred version of the original image

import sharp from 'sharp';

const BLUR_PLACEHOLDER = 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='; // A very small blurred placeholder

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

// For now, use a static low-quality placeholder
// In production, you would pre-generate base64 placeholders at build time
const addBlurDataURL = (url) => {
  if (!url || !url.includes('images.ctfassets.net')) return undefined;
  
  // Return a URL-based placeholder that Next.js can use
  // This creates a very small 20x20 version with low quality (q=10)
  return `${url}?w=20&h=20&q=10`;
};

export { addBlurDataURL, addContentfulParams };
