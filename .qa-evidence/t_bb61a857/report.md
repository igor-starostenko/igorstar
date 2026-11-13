# QA Gate Report — LOC-22 follow-up: dead week-selector fix (PR #26)

**Task:** t_bb61a857 · **Verdict: PASS — MERGE-READY**
**PR:** https://github.com/igor-starostenko/FamilyChef/pull/26 (open, NOT merged — PM routes merge via t_df40d67e)
**Exact head verified:** `d2f875cccebbd2ffc7d7052d031ba6c2dd23e6e4` (branch `loc-22-followup-week-selector`, merge-base = main `496158ede428cd239f386c7f17de0b4c242f63a2` — clean rebase, no drift)
**Verified in:** isolated worktree at the exact head + real Postgres (dedicated gate DB `qa_bb61a857`, fresh migrate + demo seed + own 2nd-week fixture) + headless Chromium over CDP.

---

## Gate 0 — Implementation handoff: ✅ READ
Parent t_3afd72b3 reported: PR #26, head d2f875cc…, CI run 43389148972 (5/5), 321/321 local, file list (page.tsx + new test + vitest/jsdom infra), 409-doc check (no doc change needed — verified consistent with repo: only 409 mentions are LOC-17 no_match and lib/http.ts house-map notes on a different route).

## Gate 1 — Live PR/CI: ✅ PASS
- `gh pr view 26` (live): state=**OPEN**, isDraft=false, mergeable=**MERGEABLE**, mergeStateStatus=**CLEAN**, headRefOid=`d2f875cccebbd2ffc7d7052d031ba6c2dd23e6e4` (exact match), mergedAt=null, base=main.
- **CI on exact head: run 43389148972 = 5/5 success.** Check-run ids (live via commits/d2f875c…/check-runs):
  | check-run id | name | conclusion |
  |---|---|---|
  | 131764637927 | Migrations apply to clean Postgres | success |
  | 131764637868 | Docker image build + smoke (real Postgres) | success |
  | 131764637854 | Local compose stack (prod image + postgres + migrate/seed) | success |
  | 131764637844 | Typecheck, lint, test, build | success |
  | 131764637571 | Docker image build (linux/arm64) | success |
- **main head: `496158ede428cd239f386c7f17de0b4c242f63a2`** — exactly the PR #25 merge commit (this family's drop-list fix; green run 43385404739 on main). Expected per handoff (post-PR-#23, advanced only via PR #25). No unexpected movement.
- Historical consistency: first push 4115ddd failed 4/5 with the known 42P07 (slot_plates) class pre-rebase — matches handoff; the rebased exact head is green, i.e. rebase landed correctly on post-#25 main.

## Gate 2 — The fix, in-browser (CDP, real dev server + real Postgres): ✅ PASS 10/10
Household fixture: demo household (demo@familychef.local) in gate DB with **2 planned weeks** — 2026-11-16 (seeded, 16 lines: chicken breast 4 pcs, jasmine rice 700 g, …) and 2099-01-04 (own fixture, 3 distinct lines: oat flakes 1 kg, dark chocolate 200 g, feta cheese 1 pcs).

**Original defect reproduced pre-fix (old head `abacd29` — the LOC-22 head where I found qa22-1):** its `page.tsx:33` reads `weekStart` from `params` (always undefined on a static route). CDP at `?weekStart=2099-01-04`:
- **D1 PASS** — default week's 16 lines render, 2099 fixture absent, selector stuck at `Week of 2026-11-16`. (screenshot qa22f-D-prefix-defect-repro.png)

**Post-fix (exact head d2f875c):**
- **A1 PASS** — plain `/household/grocery` renders default week 2026-11-16 (16 lines incl. chicken breast / jasmine rice / soy sauce); no 2099 fixture.
- **A2 PASS** — 2099 fixture lines absent on plain URL.
- **A3 PASS** — selector shows `2026-11-16` selected. (qa22f-A-default-week.png)
- **B1 PASS** — `?weekStart=2099-01-04` renders **that week's own** 3 fixture lines.
- **B2 PASS** — default week's lines absent → data is week-specific, parameter genuinely consumed (not the default list re-shown).
- **B3 PASS** — selector shows `2099-01-04` selected. (qa22f-B-weekstart-deeplink.png)
- **C1 PASS** — selecting 2026-11-16 in the selector navigates: URL becomes `?weekStart=2026-11-16`, 16-line list renders, fixture gone.
- **C2 PASS** — selecting 2099-01-04 navigates: URL `?weekStart=2099-01-04`, fixture renders.
- **C3 PASS** — hard reload (re-render) at `?weekStart=2099-01-04`: fixture still renders, selector value still 2099-01-04 → **selection persists**. (qa22f-C-selector-roundtrip.png, byte-identical to B — same final state, expected)

Both weeks exercised via the selector ("works for every week" — household has exactly 2; both directions covered).

## Gate 3 — No regression of run-106 default-week fix: ✅ PASS
- CDP pass on plain URL: A1–A3 above (default resolves via `selectDefaultWeek`: no week contains today 2026-11-13, none started → earliest upcoming = 2026-11-16; far-future 2099 week does **not** hide the actual list).
- `selectDefaultWeek` unit tests (tests/grocery-ui.test.ts, describe @ line 379) all green inside my full-suite run (321/321).

## Gate 4 — Scope check: ✅ PASS (selector-scoped only)
Diff `496158e...d2f875c` (5 files, +811/−3):
| file | change |
|---|---|
| app/household/grocery/page.tsx | 14 lines: `params` → awaited `searchParams`, repeated-key `[0]` handling, doc comment. No other logic touched. |
| tests/grocery-week-selector.integration.test.ts | NEW, 444 lines — 4 real-Postgres tests: (a) deep-link renders 2nd week, (a2) default week also selectable, (b) selector click navigates + persists on re-render, (c) plain URL default. |
| vitest.config.ts | +10 — oxc JSX automatic runtime for .tsx imports under test. |
| package.json / package-lock.json | + jsdom ^31.0.0 devDependency. |

- No changes to grocery builder / aisle / chips / PWA / offline queue / check-off route. ✅
- PM note (3): `slot_plates` is verbatim in the TABLES_DROP_SQL of tests/grocery-ui.integration.test.ts (lines 64–71, 16-table drop list), matching the other four integration suites. ✅
- 409-doc: no in-repo doc asserts 409 on the check-off PATCH — no doc change needed (handoff claim verified).

## Gate 5 — Own run at exact head: ✅ PASS
- **vitest: 17/17 files, 321/321 tests, exit 0** (317 pre-existing + 4 new; real Postgres). Matches implementer's reported count exactly.
- **tsc --noEmit: exit 0.**
- **eslint: exit 0** — 0 errors, 2 pre-existing warnings in scripts/smoke-cdp.mjs (unchanged).
- **next build: exit 0** — /household/grocery emits as dynamic (ƒ) route, 3.74 kB / 110 kB first load.

Environment note: the sandbox shared repo was checked out at the old head without the new jsdom devDependency, so the first local run loaded 16/17 files (jsdom suite: ERR_MODULE_NOT_FOUND — environment gap, not a code defect). After installing the PR's exact dependency set into the worktree's node_modules (npm per PR package-lock; jsdom 31.0.1), the full suite runs 321/321 green.

---

## Defect status
- **qa22-1 (MEDIUM, dead week selector): FIXED** — reproduced pre-fix (D1), verified fixed post-fix (B1–C3).
- **run-106 default-week behavior: preserved** (A1–A3 + 4 unit tests green).

**Verdict: PASS — MERGE-READY.** Do not merge here — PM routes the merge (t_df40d67e, parented to this task); its pre-merge live gates remain independently re-verifiable (PR still open/clean at head d2f875c as of 2026-11-13 ~09:45 UTC).

## Evidence (sha256)
```
bedc4c0f32a0d003d069595eaaad190c7ae9bf245fa195f39a18c29a1ffff98e  qa22f-A-default-week.png
42ac7df1b518fb014d90fb441412b7375a7b9d36546d06210cb1819a0c9530f2  qa22f-B-weekstart-deeplink.png
42ac7df1b518fb014d90fb441412b7375a7b9d36546d06210cb1819a0c9530f2  qa22f-C-selector-roundtrip.png
3af5cf073cc6343bb1fbdf64364e83ea288e86946a7786fe33209e7c04c8586e  qa22f-D-prefix-defect-repro.png
a198bbaf94bceb6c7928f78b8f173345301993763e15479aec56297457a3ec51  vitest-postfix-2.log (321/321, exit 0)
```
