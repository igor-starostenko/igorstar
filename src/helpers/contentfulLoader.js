export default function contentfulLoader({ src, width, quality }) {
  try {
    const normalizedSrc = src.startsWith('//') ? `https:${src}` : src
    const url = new URL(normalizedSrc)
    url.searchParams.set('w', String(width))
    url.searchParams.set('q', String(quality || 75))
    url.searchParams.set('fm', 'webp')
    return url.toString()
  } catch {
    // Return original src if URL parsing fails
    return src
  }
}
