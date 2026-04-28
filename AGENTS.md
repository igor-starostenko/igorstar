# AGENTS.md
<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
<!-- END:nextjs-agent-rules -->

## Project guidelines
Use `yarn` instead of `npm` when possible.

## Static Site Constraints
- Use getStaticProps or App Router SSG only.
- No dynamic server features (cookies, headers).
- Set dynamic: 'force-static' or 'error'.
- Optimize for CDN: ISR where needed, lazy images.

## Build & Deploy
- Build output goes to `out/` (via `next export`)
- Run `yarn build` for full build: favicons, sitemap, images
- Use `yarn dev`, `yarn start` for local testing
- Bundle analysis: `ANALYZE=true yarn build`

## Contentful CMS
- Local backup of all Contentful data: `yarn contentful:backup`
- Images allowed from `images.ctfassets.net` and `live.staticflickr.com`

## Testing
- Address the relevant warnings as they appear
- Static site deployment via AWS Amplify
- Ensure new changes have test coverages
- Verify every change with unit tests: `yarn test`
- Run with `yarn test:lighthouse`
- Lighthouse testing only on demand

## Technical Constraints
- Up to date Node.js and `node_modules`
- Use ESLint and prettier
- Images should be lightweight, but look good
- Favicon generation via `favicons` package
