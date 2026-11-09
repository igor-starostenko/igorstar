# Admin Portal — Spec (v2.5.9)

Localhost-only tooling for managing the igorstar.com Contentful data (posts,
pages, gallery images, feed images). Reads the current state, allows add /
modify / delete, applies conventional formatting and naming, and pushes
changes back via the Contentful Management API.

Not deployable. Adds zero code to the main site bundle.

Content model below is **verified from the repo's own code** (`src/pages/*`,
`src/contentClient.js`, `scripts/contentful-import.js`), not guessed. Field
*required-flags* and the exact `sys` content-type IDs still need a live
`content_types` fetch to confirm — see §8.

---

## 1. Architecture

- **Separate Next.js app in `admin/`** with its own `package.json` and
  `next.config.js`. Runs only as `next dev` on **localhost:3001**.
- The root app (`output: 'export'`, Amplify) is untouched: its build scripts,
  lint/format globs, and CI never enter `admin/`. No new files in `src/`.
- API layer (Next API routes) talks to Contentful directly:
  - reads: `contentful` delivery SDK (already a root dep, v11)
  - writes: `contentful-management` (already a root dep, v12)
- Image processing: **sharp** (new dep, dev-only, scoped to the admin app).
- UI: plain React + one hand-written CSS file, monochrome theme matching the
  main site. No component framework, no auth (localhost only).

```
admin/
  package.json          # next, react, contentful, contentful-management, sharp, vitest
  next.config.js        # no output:export, dev-only
  .env.example          # committed; real .env is gitignored
  src/
    lib/
      contentful.js     # clients (delivery + management), ENV guard
      models.js         # field schemas per content type + validation
      conventions.js    # slugs, naming, image specs
      image.js          # sharp pipeline (webp, resize, orient, quality)
      snapshot.js       # pre-write JSON backup
    api/
      [content-type]/index.js    # list/create
      [content-type]/[id].js     # update/delete
      upload.js               # asset upload -> pipeline -> Asset
      assets.js             # asset library list/search
      dashboard.js            # counts + last-updated
  app pages: /  /posts  /pages  /gallery  /feed  /assets
```

### Target environment (corrected)

The repo's **delivery client** (`contentClient.js`) is created with no
environment, so it reads the **`master`** environment by default. The
existing **write tooling** (`scripts/contentful-import.js`) also targets
**`master`** explicitly. `igorstar.com` is a static export, so the content
that actually serves the site is whatever is published to **`master`** at the
last Amplify build.

Therefore the portal's default write target is **`master`**, made **explicit
and guarded**:

- `admin/.env` sets `CONTENTFUL_ENV` (default `master`).
- `lib/contentful.js` resolves the environment from that variable and every
  read/write routes through it.
- A hard guard: the management client wrapper throws if the resolved
  environment is not in an allow-list (`master`, `develop`). There is no UI
  path to an arbitrary environment, and no implicit fallback that could
  surprise the user.
- Staging in `develop` and promoting to `master` is supported by switching
  `CONTENTFUL_ENV`, but the develop→master promotion step is **out of MVP
  scope** (manual via Contentful Web UI for now).

> Note: because the site is a static export, edits to `master` appear on
> igorstar.com only after the next build/redeploy (Amplify). The portal edits
> the Contentful source of truth; it does not itself trigger a site rebuild.

### Credentials

- `admin/.env` (gitignored): `CONTENTFUL_SPACE_ID` (= `oibc438e8tog`),
  `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENV` (default `master`).
- The repo **reuses the same `CONTENTFUL_ACCESS_TOKEN`** for both the delivery
  client (`contentClient.js`) and the management client
  (`contentful-import.js`). The portal follows suit.
  - **Reads** work with this token as-is.
  - **Writes** require the token to be management-capable (a Personal Access
    Token). If the token in `.env` turns out to be delivery-only, the write
    endpoints will fail with a clear permission error and a PAT with
    entries/assets write scope on the target environment is required. This is
    the one thing to confirm at execution start (§8).

---

## 2. Content scope (LIVE-CONFIRMED via delivery `getContentTypes()`)

Space `oibc438e8tog`, environment = `CONTENTFUL_ENV` (default `master`).
Four content types. All fields written as `en-US` locale objects.

> **Live fetch confirmed** (2026-08-22) the exact field IDs and types below.
> Two corrections vs. the code-derived model: `post` also carries a `layout`
> (Symbol) field, and `gallery` carries more than `image` (it has `id`,
> `location`, `description` too). **Every field is `required: false` in the
> live API** — Contentful enforces nothing, so **the portal owns all
> validation** (see §3). Full machine-readable dump: `scripts/content-models.json`.

### `post` — blog article
From `[post].jsx`, `index.jsx`, `[category].jsx`:

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | required (page `<h1>`, Head `pageTitle`) |
| `category` | String | required; groups posts; site filters `fields.category` / `fields.category[in]` |
| `date` | Date | required; listing orders `-fields.date` |
| `layout` | Symbol | **live-confirmed extra field**; not currently consumed by the site — portal edits it pass-through (string), not modeled further in MVP |
| `path` | String | required; the URL slug, **unique within its category**; used as the `[post]` route param |
| `content` | RichText (Document) | required; rendered via `documentToReactComponents` |
| `draft` | Boolean | site only renders `fields.draft: false` |
| `thumbnail` | Asset link | parsed to `{src, alt, width, height, blurDataURL}`; used for listing + Head `imageUrl` |
| `images` | Asset links[] | in-post galleries; each parsed via `parseItem` |
| `recommendations` | String[] (post paths) | explicit cross-links; falls back to prev/next in category when empty |
| `description` | String | listing excerpt |
| `tags` | String[] | listing meta |
| `linkText` | String | listing meta |

### `page` — static/section page
From `about.jsx`, `index.jsx`, `gallery.jsx`, `feed.jsx` (distinguished by
`fields.title`):

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | required; the lookup key — existing values: `Blog`, `Gallery`, `Photo Feed`, `About` |
| `content` | RichText (Document) | required; proven by `about.jsx` destructuring `{ title, content }` |

### `gallery` — one entry per gallery image
From `gallery.jsx` + **live fetch** (2026-08-22):

| Field | Type | Notes |
|-------|------|-------|
| `id` | Integer | **live-confirmed**; sequential, portal-managed (mirrors feed) |
| `image` | Asset link | required; `parseItem(item.image)` → `{src, alt, width, height}` |
| `location` | Location | **live-confirmed extra field**; `{latitude, longitude}`; not rendered by the site — optional in MVP |
| `description` | Symbol | **live-confirmed extra field**; optional, not currently rendered |

(Unordered grid — no date field.)

### `feed` — one entry per dated feed image
From `feed.jsx` + `contentful-import.js` + **live fetch**:

| Field | Type | Notes |
|-------|------|-------|
| `date` | Date | required; listing orders `-fields.date` |
| `image` | Asset link | required; `parseItem(item.image)` |
| `location` | Location | **live-confirmed extra field**; `{latitude, longitude}`; optional in MVP |
| `locationText` | String | stored by import script; not currently rendered in `feed.jsx` |
| `description` | String | stored by import script; not currently rendered in `feed.jsx` |
| `id` | Number | sequential, set by the import script (not auto — portal manages it) |

### Asset (shared media object)
From `parseItem`/`parseImage` in `contentClient.js` and the `EMBEDDED_ASSET`
renderer in `[post].jsx`:

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | used as **alt text** |
| `file` | File | `file.url` (leading `//`), `file.fileName`, `file.contentType`, `file.details.image.{width,height}` |
| `description` | String | **optional**; in post body, if it starts with `http` it becomes the image's link target |

Local-image fallback: `[post].jsx` serves in-body images from
`/images/${sys.id}_${file.fileName}`, and `scripts/contentful-assets.js`
downloads assets with that exact `${sys.id}_${fileName}` naming — the portal
must preserve this `sys.id` + `fileName` convention for local caching to keep
working.

---

## 3. Conventions enforced by the portal

### Images (asset pipeline on upload)

1. Accept any common input format (jpg/png/webp).
2. Auto-rotate per EXIF orientation.
3. Resize so width ≤ **2048 px** (largest `deviceSizes` value in
   `next.config.js`), preserving aspect ratio.
4. Re-encode **WebP, quality 75** (matches the site's `qualities: [30, 75]`).
5. Store original width/height from the processed file.
6. Set `title` for alt — **required**, defaults to the entry title.
7. Keep `sys.id` + `fileName` so the site's `/images/${sys.id}_${fileName}`
   local cache still resolves.

### Naming / IDs

- Slugs: kebab-case from the title (lowercase, alphanumerics + hyphens,
  deduplicated with `-2`, `-3`… on collision).
- Post `path`: slug, **unique within its category** (validated against
  existing entries before save).
- Feed asset titles: `feed-NN` (zero-padded 2) — preserves the existing
  convention from `scripts/contentful-import.js`; the portal computes the next
  free number instead of hard-coding a start index.
- Post asset titles: `post-YYYY-MM-DD-<slug>`; gallery: `gallery-<slug>`.
- Entry `sys.id` values are assigned by Contentful (not client-chosen).

### Dates

- Form uses `YYYY-MM-DD` everywhere; stored as a Contentful Date.

### Validation gate

Every save runs `models.js` validation: required fields present, correct
types, `path` uniqueness within category, and at least one `images` entry for
posts (configurable). Invalid saves are blocked with field-level errors in the
UI.

---

## 4. Contentful Management API contract (installed `contentful-management` **v12.10.0**)

Verified against the installed SDK's actual API surface (probed at runtime,
2026-08-22) and the CMA docs:

- **Client (v12 "new" API — accessors are objects, not methods):**
  `createClient({ space, accessToken })` → `client.space.get(spaceId)` →
  `client.environment.get({ spaceId, environmentId })` → environment-scoped
  `createEntry` / `getEntries` / `createAsset` / `getAssets` / `publish`.
  There is **no** `client.getSpace(...)` in v12 (the old chain used by
  `scripts/contentful-import.js` will break under the installed version).
- **Updates are full-body, not merges.** When updating an entry/asset you must
  send the **entire** current body plus the changed fields; any omitted
  property is dropped. The client sends `X-Contentful-Version` (optimistic
  locking) automatically — on a version conflict the update is rejected, so
  re-fetch and retry.
- **Asset lifecycle is three steps:**
  1. `environment.createAsset({ fields: { title, file: { 'en-US': {
     contentType, fileName, upload } } } })` — `upload` is a URL Contentful
     can fetch (the portal publishes the processed WebP to a temp location or
     uses `createAssetFromFiles` with a stream).
  2. `asset.processForAllLocales()` — Contentful downloads + processes; poll
     `getAsset(id)` until `file.url` is present.
  3. `asset.publish()` — makes it publicly available.
- **Entry create/update:** `environment.createEntry(contentTypeId, { fields })`
  / `entry.update()` (full body + version) / `entry.publish()`.
- **Reads for the UI** can use the delivery SDK (already wired in
  `contentClient.js`) or the management `getEntries`/`getAssets`; reads via
  the delivery client are the existing pattern and are reused.
- **Query params** the portal relies on (all supported by both APIs):
  `content_type`, `fields.<field>` equality, `fields.<field>[in]`, `order`
  (e.g. `-fields.date`), `limit`, `skip`.

---

## 5. Feature set (MVP)

1. **Dashboard** — counts + last-updated per content type (post, page,
   gallery, feed) + asset count, for the target environment.
2. **Posts** — sortable list (category, date, title, draft badge); create;
   edit form for all fields incl. thumbnail/images (pick from asset library or
   upload); `recommendations` picked from existing post paths; delete.
3. **Pages** — list; edit `title` + `content`; create; delete.
4. **Gallery** — thumbnail grid; bulk multi-image upload (10 at a time);
   single/bulk delete; per-entry alt (`title`) edit.
5. **Feed** — date-sorted list; add (upload + auto `feed-NN` + date from
   filename `YYYY-MM-DD-…` if present, else EXIF, else today); edit
   location/description; delete.
6. **Asset library** — view existing assets in the target environment, search
   by title, copy title for reuse (used by post thumbnail/image pickers).
7. **Safe deletes** — typed confirmation ("delete") + local JSON snapshot of
   the entry (and its linked-asset list) written to `admin/.snapshots/` before
   the delete call.

Out of scope for MVP: users/auth, tags management UI (raw field edit only),
bulk publish/unpublish, draft workflow UI, develop→master promotion (manual
via Contentful Web UI for now).

---

## 6. Main-site isolation guarantees

- Root `package.json` scripts unchanged; `yarn build` output `out/` contains
  no admin code (admin has its own next config; root build compiles only
  `src/pages`).
- ESLint/Prettier globs (`src/**`) don't reach `admin/`; admin gets its own
  lint config if needed.
- `admin/` not referenced by `amplify.yml`, Dockerfile, or CI.
- Image specs are duplicated as constants in `admin/src/lib/conventions.js`
  (avoids coupling the two packages) — the root app is never imported.

---

## 7. Testing

- `vitest` (matches the root suite):
  - `conventions.js`: slug, dedupe, `feed-NN` sequencing, date parse.
  - `models.js`: validation matrix per content type (required fields, `path`
    uniqueness, asset-link shape).
  - `api/*` handlers with a mocked `contentful-management` (create/update/
    delete happy paths, env-guard rejection, validation rejection, full-body
    update semantics).
  - `image.js`: sharp pipeline output (format, dimensions ≤2048, quality,
    EXIF orientation) with fixture images.
- No E2E; manual localhost checklist at acceptance.

---

## 8. Acceptance criteria

- [ ] `yarn && yarn dev` in `admin/` → app at http://localhost:3001
- [ ] Dashboard shows live counts for all four types + assets for
      `CONTENTFUL_ENV`
- [ ] Create a test post with an uploaded image → entry + asset visible in the
      target environment; image served as WebP ≤2048px q75
- [ ] Edit + delete the test post (snapshot created in `admin/.snapshots/`)
- [ ] Upload 3 gallery images in one batch; titles auto-slugged
- [ ] Add a feed image; `feed-NN` auto-increments
- [ ] Root `yarn build` still succeeds; `out/` free of admin code; root lint
      unaffected
- [ ] `.env` and `.snapshots/` gitignored; `.env.example` committed
- [ ] Env guard: attempting to point `CONTENTFUL_ENV` at a non-allow-listed
      value throws

---

## 9. Open items

1. ~~**Live model confirmation**~~ — **RESOLVED** (2026-08-22): delivery
   `getContentTypes()` fetched live; `scripts/content-models.json` holds the
   machine-readable dump. All four types' field IDs/types confirmed; all
   fields `required: false`, so `models.js` owns validation. `post.thumbnail`
   is **not** mandatory.
2. ~~**Token write scope**~~ — **RESOLVED (blocking for writes)**: the token
   in `.env` is **delivery-only** — the Management API returns
   `401 Access token invalid`. Reads work; **writes need a separate PAT**
   with entries + assets write scope on `master`. The portal's write layer
   reads `CONTENTFUL_PAT` (falls back to `CONTENTFUL_ACCESS_TOKEN` for
   dev convenience) and returns a clear "delivery-only token" error when a
   PAT is absent.
3. **develop → master flow** — portal defaults to `master` (matches
   `contentClient.js` and `scripts/contentful-import.js`); promotion stays
   manual via the Contentful Web UI. Out of v2.5.9 MVP.
4. **Feed `id` field** — confirm whether the numeric `id` on feed entries is
   still consumed anywhere or can be dropped from the write model. (Live
   model confirms the field exists on `feed` and `gallery`.)
5. **`contentful-import.js` uses the pre-v12 API** (`client.getSpace()`)
   which the installed v12.10.0 does not expose — the script is effectively
   broken under the current deps. Out of admin-portal scope, but worth a
   separate fix.

---

## 10. Execution order (proposed)

1. Step 0: confirm token write scope (+ live `content_types` fetch once
   network is unblocked) → lock `models.js` field list + required flags.
2. `admin/` scaffold (package.json, next config, env guard, lib layer).
3. API routes: read endpoints + dashboard (wire to real env data).
4. Image pipeline + upload route (sharp, 3-step asset lifecycle).
5. UI: layout + Posts CRUD.
6. UI: Pages, Gallery, Feed, Asset library.
7. Snapshots + typed deletes.
8. Tests green, acceptance checklist, granular commits (one logical change
   each, tests separate — per repo convention).
