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
- New tests should not contain hardcoded values that directly depend on the corresponding values in the files, being tested
- Verify every change with unit tests: `yarn test`
- Run with `yarn test:lighthouse`
- Lighthouse testing only on demand

## Technical Constraints
- Up to date Node.js and `node_modules`
- Use ESLint and prettier
- Images should be lightweight, but look good
- Favicon generation via `favicons` package

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
