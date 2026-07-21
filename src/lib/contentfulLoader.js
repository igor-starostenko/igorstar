export default function contentfulLoader({ src, width, quality }) {
  const url = new URL(src.startsWith('//') ? `https:${src}` : src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality || 75))
  url.searchParams.set('fm', 'webp')
  return url.toString()
}
