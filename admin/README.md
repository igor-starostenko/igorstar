# Admin Portal

Localhost-only tool for managing the site's Contentful content: **post / page / gallery / feed**.
This app is **never deployed** — it exists to make day-to-day editing of the space easier.
Design details live in [`docs/admin-portal-spec.md`](../docs/admin-portal-spec.md).

## First run

Prereqs: **Node 24** (see root `.nvmrc`) and a Contentful **delivery token** (the same one the main site uses — it's in the root `.env`).

```bash
cd admin
yarn install                     # installs next, contentful, contentful-management, sharp, vitest
cp .env.example .env             # .env is gitignored — never commit tokens
yarn dev                         # → http://localhost:3001
```

### Fill in `admin/.env`

| Variable | Required? | Where to get it |
|---|---|---|
| `CONTENTFUL_SPACE_ID` | yes | pre-filled (same as the main site) |
| `CONTENTFUL_ACCESS_TOKEN` | yes | delivery token — copy from the root `.env` (read-only; powers all reads) |
| `CONTENTFUL_PAT` | for writes only | a **management** Personal Access Token with entries + assets read/write on the target environment. The delivery token will **not** work for writes (401). |
| `CONTENTFUL_ENV` | no (default `master`) | `master` or `develop` — anything else is rejected at boot |

**Without a PAT the portal is read-only on purpose**: list and detail pages work fully; every write endpoint returns a clear structured error instead of failing mysteriously.

## Using it

- `http://localhost:3001` — dashboard: one tab per content type with live entry counts, env badge, localhost-only notice.
- Pick a type → list → open an entry to edit, or `/new` to create.
- Every write is **two-step**: preflight validates (required fields, types, PAT presence) and shows a diff against the local snapshot; you confirm, then it writes + publishes.
- Image uploads are processed locally first (long-edge 800px, q80, WebP-preferred) with per-type thumbnails (gallery/feed 640×640, post 1200×450).
- First edit of an entry saves a snapshot to `admin/.snapshots/` (gitignored) so the confirm dialog can show what actually changed.

## Verifying

```bash
yarn test          # 27 unit tests: field model, validation, conventions, richtext round-trip
yarn dev           # then open http://localhost:3001 — the dashboard must show live counts
```

## Boundaries (by design)

- Runs on `127.0.0.1:3001` only; there is no auth layer and none is planned.
- Environment is allow-listed (`master`, `develop`) in `src/lib/contentful.js`.
- Root site untouched: separate `package.json`, own `node_modules`, never part of the root build, lint, or CI.
- `.env` and `.snapshots/` are gitignored.
