# Graph Report - igorstar  (2026-07-22)

## Corpus Check
- 145 files · ~100,006 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3905 nodes · 11683 edges · 284 communities (221 shown, 63 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 870 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f53c3b69`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- index.test.jsx
- vite.config.js
- gallery.css.js
- @testing-library/dom
- @testing-library/jest-dom
- @testing-library/react
- breakpoints.js
- isSymbolicLink
- find
- constructor
- Bc
- Cache Components (Next.js 16+)
- jM
- createCacheableRequest
- match
- Oh
- What You Must Do When Invoked
- ad
- concat
- abort
- Qn
- LL
- .write
- verify
- makeMethodCaller
- Self-Hosting Next.js
- fromJSON
- reduce
- findExtension
- Mn
- alert
- test
- .unshift
- split
- Nl
- forEach
- Next.js Best Practices
- qKe
- sort
- Metadata
- wE
- nFe
- parse
- Rr
- Parallel & Intercepting Routes
- oOe
- SKILL.md
- Aa
- Pf
- up
- kn
- Data Patterns
- getBufferAndClose
- tae
- from
- jh
- Bundling
- Vi
- .end
- an
- ip
- render
- rF
- wi
- _onResponseBase
- exec
- preorderDepthFirstWalk
- mE
- ah
- lm
- .indexOf
- Yf
- submit
- shift
- query
- $Xe
- Error Handling
- File Conventions
- j2t
- ZP
- oM
- Font Optimization
- package.json
- iqe
- oqe
- makeBound
- Async Params and SearchParams
- Common Causes and Fixes
- aHe
- l9e
- left
- $H
- splice
- Ea
- graphify reference: extra exports and benchmark
- isContextSpecific
- fBt
- compare
- fM
- makeLibzipError
- callRuntimeCallbacks
- Xht
- createReadStream
- Sn
- k2e
- Directives
- Detection Rules
- Runtime Selection
- article.jsx
- Uwe
- warn
- kd
- zvt
- Uwe
- xFe
- i$
- Lh
- toChoice
- oG
- Cgt
- clear
- Wot
- p3e
- t_
- XP
- graphify reference: commit hook and native CLAUDE.md integration
- hydrateDirectory
- o4e
- mtt
- DCe
- Aue
- edt
- gallery.css.js
- build
- Fdt
- getProjectDatabase
- toDate
- E4
- toInteger
- pushPointer
- az
- graphify reference: GitHub clone and cross-repo merge
- Tye
- compare
- c8e
- toBoolean
- ize
- _fillStorage
- hasDependency
- xIt
- o1e
- Wk
- @babel/plugin-transform-modules-commonjs
- core-js
- extraction-spec.md
- g_e
- addMethod
- wU
- B9
- kgt
- SBt
- bitString
- Cht
- Cnt
- Py
- xQ
- F2
- findRoot
- Gme
- Sy
- Tye
- ivt
- S9
- renderScale
- unplugPackageIfNeeded

## God Nodes (most connected - your core abstractions)
1. `a()` - 280 edges
2. `n()` - 275 edges
3. `c()` - 258 edges
4. `execute()` - 143 edges
5. `constructor()` - 112 edges
6. `find()` - 95 edges
7. `emit()` - 93 edges
8. `split()` - 90 edges
9. `match()` - 83 edges
10. `has()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `Tests Workflow` --conceptually_related_to--> `Amplify Workflow Skill`  [INFERRED]
  .github/workflows/test.yml → .agents/skills/amplify-workflow/SKILL.md
- `getStaticProps()` --indirect_call--> `date()`  [INFERRED]
  src/pages/feed.jsx → .yarn/releases/yarn-4.15.0.cjs
- `Amplify Workflow Skill` --references--> `Igorstar Skill`  [EXTRACTED]
  .agents/skills/amplify-workflow/SKILL.md → SKILL.md
- `Yarn Configuration` --conceptually_related_to--> `Amplify Workflow Skill`  [INFERRED]
  .yarnrc.yml → .agents/skills/amplify-workflow/SKILL.md
- `Project README` --cites--> `Amplify Workflow Skill`  [INFERRED]
  readme.md → .agents/skills/amplify-workflow/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **MCP Debugging Tools** — get_errors, get_routes, get_project_metadata, get_page_metadata, get_logs, get_server_action_by_id [EXTRACTED 1.00]
- **Next.js Deployment and CI/CD Workflows** — .agents_skills_amplify_workflow, .agents_skills_next_best_practices_self_hosting, amplify, .github_workflows_lighthouse, .github_workflows_test [INFERRED]
- **Next.js Development Best Practices Ecosystem** — .agents_skills_next_best_practices, .agents_skills_amplify_workflow_references_backend, .agents_skills_amplify_workflow_references_frontend [INFERRED]
- **CI/CD and Quality Assurance Pipeline** — .github_workflows_codeql_analysis, .github_workflows_lighthouse, .github_workflows_test [EXTRACTED]

## Communities (284 total, 63 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (36): addAlgoliaAgent(), addWorkspace(), appendFile(), art(), aSt(), attachCustomData(), CL(), computeCandidateName() (+28 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (23): accessSync(), C2t(), changeFileBufferSync(), changeFileSync(), changeFileTextSync(), chmodSync(), copyFileSync(), copySync() (+15 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (60): a(), Ait(), ame(), ax(), Bqe(), createTimestamp(), defaults(), downloadBytes() (+52 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (65): add(), Ae(), Aot(), AP(), applyLightResolution(), Bht(), Bot(), c0t() (+57 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (50): addPlugin(), changeFileBufferPromise(), changeFilePromise(), changeFileTextPromise(), copyPromise(), cs(), Dpe(), e5() (+42 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (18): bZ(), cSt(), [d6](), [Dv](), eSt(), Hle(), isSymbolicLink(), jle() (+10 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (34): a8e(), a_e(), B_e(), BX(), c_e(), Ca(), Ch(), cRe() (+26 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (45): _9e(), B9e(), C9e(), D9e(), eqe(), F9e(), fx(), G2() (+37 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (42): _4(), aI(), anchoredPackage(), cacheCleanup(), commit(), cot(), exit(), FB() (+34 more)

### Community 9 - "Community 9"
Cohesion: 0.05
Nodes (38): Backend Phase Instructions, Critical Constraints, Error Handling, Phase Complete, Prerequisites Confirmed, Retrieve and Follow the SOP, SOP Overrides, Deploy Phase Instructions (+30 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (16): b5(), Ctt(), dj(), Fde(), FXe(), jot(), nK(), QC() (+8 more)

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (8): axe(), ixe(), KK(), NXe(), oxe(), pxe(), sxe(), wce()

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (6): captureString(), clean(), getLocatorUrl(), inc(), isConventionalTarballUrl(), TK()

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (23): bf(), bh(), da(), Eu(), Fo(), gc(), Gg(), Hg() (+15 more)

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (28): addListener(), B2t(), _beforeError(), _checkIterableAdaptar(), clear(), clearCache(), constructor(), _finalizeBody() (+20 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (32): A0(), aHe(), attachExternalDependents(), braceExpand(), debug(), getDiskInformation(), Hje(), Jje() (+24 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (17): Container, Copyright, Social, Footer(), validSocial, FivehundredpxIcon(), FlickrIcon(), GithubIcon() (+9 more)

### Community 17 - "Community 17"
Cohesion: 0.24
Nodes (11): aqe(), BNe(), cNe(), cqe(), lqe(), lz(), oqe(), sqe() (+3 more)

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (17): BV(), eBt(), enable(), forEach(), Fyt(), H6e(), h7(), jke() (+9 more)

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (23): cancel(), checksumFilePromise(), close(), closeFreeSessions(), closePromise(), closeSync(), destroy(), [I6]() (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (14): BaseImage(), FlickrImage(), parseFlickrImage(), parser, ImageContainer, ImageCopyright, ImageFooter, ImageFrame (+6 more)

### Community 21 - "Community 21"
Cohesion: 0.07
Nodes (27): B6e(), [BBe](), Bgt(), [BN](), CZ(), emit(), eTe(), [eV]() (+19 more)

### Community 22 - "Community 22"
Cohesion: 0.06
Nodes (35): @babel/core, @babel/preset-react, contentful-cli, contentful-management, contentful-migration, eslint-config-prettier, favicons, jsdom (+27 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (23): a1t(), addOption(), commonFieldsFromJSON(), dg(), di(), e1t(), Es(), fromJSON() (+15 more)

### Community 24 - "Community 24"
Cohesion: 0.09
Nodes (32): Amplify Workflow Skill, Backend Phase Reference, Deploy Phase Reference, Frontend Phase Reference, Next Best Practices Skill, Async Patterns Guide, Bundling Guide, Data Patterns Guide (+24 more)

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (30): A5e(), ate(), B5e(), c5e(), CE(), d5e(), e5e(), EE() (+22 more)

### Community 26 - "Community 26"
Cohesion: 0.20
Nodes (10): addOnPreRun(), cmt(), ex(), [HR](), Lmt(), preRun(), RPe(), shift() (+2 more)

### Community 27 - "Community 27"
Cohesion: 0.24
Nodes (8): Aa(), ao(), Gn(), K1e(), lo(), OA(), ou(), W0t()

### Community 28 - "Community 28"
Cohesion: 0.07
Nodes (39): $b(), B0t(), bindDescriptor(), Bw(), c9(), Cw(), DQ(), F1e() (+31 more)

### Community 29 - "Community 29"
Cohesion: 0.09
Nodes (26): By(), componentDidCatch(), dh(), dt(), Eh(), Hn(), ip(), J1() (+18 more)

### Community 30 - "Community 30"
Cohesion: 0.06
Nodes (39): decode(), Dvt(), e2t(), ensureJSsource(), Fbe(), findGeneralName(), Gde(), getIdentityToken() (+31 more)

### Community 31 - "Community 31"
Cohesion: 0.07
Nodes (29): babel-plugin-styled-components, contentful, @contentful/rich-text-react-renderer, dotenv, fast-xml-parser, framer-motion, next, dependencies (+21 more)

### Community 32 - "Community 32"
Cohesion: 0.08
Nodes (16): configuration, dir, { favicons }, fs, path, siteConfig, config, { resolve } (+8 more)

### Community 33 - "Community 33"
Cohesion: 0.06
Nodes (46): $6(), addDirectory(), allocateBuffer(), allocateSource(), allocateUnattachedSource(), clearProgress(), d4(), dd() (+38 more)

### Community 34 - "Community 34"
Cohesion: 0.07
Nodes (61): av(), bI(), Bpe(), CB(), cloneFromRemote(), cpe(), D0(), del() (+53 more)

### Community 35 - "Community 35"
Cohesion: 0.09
Nodes (25): abort(), abortOnCannotGrowMemory(), allocate(), assert(), demangle(), demangleAll(), enlargeMemory(), getCFunc() (+17 more)

### Community 36 - "Community 36"
Cohesion: 0.07
Nodes (26): 1. Static (Auto-Prerendered), 2. Cached (`use cache`), 3. Dynamic (Suspense), Built-in Profiles, Cache Components (Next.js 16+), Cache Invalidation, Cache Key Generation, Cache Profiles (+18 more)

### Community 37 - "Community 37"
Cohesion: 0.09
Nodes (30): formatCaption(), getStaticProps(), aGe(), _ageValue(), _allowsStoringAuthenticated(), _assertRequestHasHeaders(), buffer(), _copyWithoutHopByHopHeaders() (+22 more)

### Community 38 - "Community 38"
Cohesion: 0.10
Nodes (24): adjascentGlobstarOptimize(), ape(), createEntry(), firstPhasePreProcess(), gdt(), _getKeyUnprefix(), Ih(), Int() (+16 more)

### Community 39 - "Community 39"
Cohesion: 0.05
Nodes (45): aM(), are(), BTe(), dle(), dz(), Ff(), fLe(), fMe() (+37 more)

### Community 40 - "Community 40"
Cohesion: 0.07
Nodes (11): Eht(), Iht(), mht(), [mm](), On(), pushNode(), qWe(), removeNode() (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.07
Nodes (30): cUe(), fUe(), gHe(), gUe(), hUe(), i_e(), iUe(), jme() (+22 more)

### Community 42 - "Community 42"
Cohesion: 0.08
Nodes (26): _8e(), _createIndexRecord(), e6e(), _filter(), _getEntryLevel(), getFilter(), _getMatcher(), _getNegativePatternsRe() (+18 more)

### Community 43 - "Community 43"
Cohesion: 0.11
Nodes (22): aj(), collect(), createStreamReporter(), createWriteStream(), Fmt(), getSubprocessStreams(), hdt(), kn() (+14 more)

### Community 44 - "Community 44"
Cohesion: 0.10
Nodes (25): choiceMessage(), choiceSeparator(), E8(), getConditions(), getResolverByLocator(), getWorkspace(), getWorkspaceByCwd(), gw() (+17 more)

### Community 45 - "Community 45"
Cohesion: 0.12
Nodes (22): altDown(), altUp(), complete(), completion(), cutForward(), cutLeft(), deleteForward(), element() (+14 more)

### Community 47 - "Community 47"
Cohesion: 0.12
Nodes (23): ask(), cit(), definition(), definitions(), dre(), error(), format(), GSt() (+15 more)

### Community 48 - "Community 48"
Cohesion: 0.10
Nodes (28): anyNeedsWireRead(), anyNeedsWireWrite(), buildCallerFunction(), buildJSCallerFunction(), constructType(), getDynCall(), getType(), getTypes() (+20 more)

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (12): HBe(), Hwt(), i1t(), isEnd(), isStart(), toJSON(), toMMPattern(), toRegExpSource() (+4 more)

### Community 50 - "Community 50"
Cohesion: 0.09
Nodes (22): Build-time vs Runtime, Docker Compose, Docker Deployment, Dockerfile, Environment Variables, Health Check Endpoint, Image Optimization, ISR and Cache Handlers (+14 more)

### Community 51 - "Community 51"
Cohesion: 0.09
Nodes (23): dump(), [e6](), epe(), [f6](), _final(), [Hj](), hpe(), [jpe]() (+15 more)

### Community 52 - "Community 52"
Cohesion: 0.09
Nodes (23): extAuthorityKeyID(), extBasicConstraints(), extension(), extKeyUsage(), extSCT(), extSubjectAltName(), extSubjectKeyID(), findExtension() (+15 more)

### Community 53 - "Community 53"
Cohesion: 0.40
Nodes (5): fj(), ftt(), $H(), yu(), Zf()

### Community 54 - "Community 54"
Cohesion: 0.19
Nodes (14): bt(), compareDigest(), compareSignature(), Fh(), h2(), jBt(), kl(), kXe() (+6 more)

### Community 55 - "Community 55"
Cohesion: 0.10
Nodes (20): Async Patterns, Bundling, Data Patterns, Debug Tricks, Directives, Error Handling, File Conventions, Font Optimization (+12 more)

### Community 56 - "Community 56"
Cohesion: 0.15
Nodes (7): ah(), _flush(), getTransformer(), NB(), O2e(), Pdt(), xdt()

### Community 57 - "Community 57"
Cohesion: 0.16
Nodes (23): alert(), append(), backward(), default(), disable(), dispatch(), forward(), getItem() (+15 more)

### Community 58 - "Community 58"
Cohesion: 0.08
Nodes (27): _at(), But(), capture(), D1t(), DCe(), dit(), EGe(), exec() (+19 more)

### Community 59 - "Community 59"
Cohesion: 0.14
Nodes (18): deleteEntry(), fat(), isDirectory(), JZ(), KZ(), mktempSync(), [n6](), _onlyDirectoryFilter() (+10 more)

### Community 60 - "Community 60"
Cohesion: 0.07
Nodes (70): a0t(), a1e(), accessPromise(), appendFilePromise(), appendFileSync(), attachInternalDependencies(), c(), chmodPromise() (+62 more)

### Community 61 - "Community 61"
Cohesion: 0.11
Nodes (18): Avoid Duplicate Fetches, Basic OG Image, Custom Fonts, Dynamic Metadata, Dynamic OG Image, File Naming, Important Rules, Important: Server Components Only (+10 more)

### Community 62 - "Community 62"
Cohesion: 0.11
Nodes (19): scripts, analyze, build, build:analyze, build:dir, build:favicons, build:images, build:sitemap (+11 more)

### Community 63 - "Community 63"
Cohesion: 0.11
Nodes (19): aFe(), dFe(), eFe(), fFe(), gFe(), hFe(), iFe(), im() (+11 more)

### Community 64 - "Community 64"
Cohesion: 0.20
Nodes (11): Cdt(), first(), Idt(), Jze(), mQ(), Ny(), Sh(), T2e() (+3 more)

### Community 65 - "Community 65"
Cohesion: 0.08
Nodes (26): a9e(), Ade(), aG(), Bit(), c0e(), c6e(), eme(), gKe() (+18 more)

### Community 66 - "Community 66"
Cohesion: 0.11
Nodes (17): 1. Missing `default.tsx` → 404 on Refresh, 2. Modal Persists After Navigation, 3. Nested Parallel Routes Need Defaults Too, 4. Intercepted Route Shows Wrong Content, 5. TypeScript Errors with `params`, Common Gotchas, Complete Example: Photo Gallery Modal, File Structure (+9 more)

### Community 67 - "Community 67"
Cohesion: 0.14
Nodes (13): BaseImage, calculateRowHeight(), DateText, filterObject(), FlickrImage, getStaticProps(), isFlickrEmbed(), isFlickrNode() (+5 more)

### Community 68 - "Community 68"
Cohesion: 0.08
Nodes (36): addKey(), Ase(), compile(), DE(), intArrayToString(), iyt(), LJe(), _llvm_stacksave() (+28 more)

### Community 69 - "Community 69"
Cohesion: 0.12
Nodes (22): ave(), Ayt(), clone(), copyIn(), cve(), fromGlob(), getBlock(), getUint16() (+14 more)

### Community 70 - "Community 70"
Cohesion: 0.15
Nodes (15): AQ(), BKe(), createWorker(), cze(), Ele(), lE(), Lle(), makeInterval() (+7 more)

### Community 71 - "Community 71"
Cohesion: 0.12
Nodes (13): Always Use next/image, Blur Placeholder, Common Mistakes, Image Optimization, Priority Loading, Remote Images Configuration, Required Props, Responsive Images (+5 more)

### Community 72 - "Community 72"
Cohesion: 0.12
Nodes (15): Avoiding Data Waterfalls, Client Component Data Fetching, Data Patterns, Decision Tree, Option 1: Pass from Server Component (Preferred), Option 2: Fetch on Mount (When Necessary), Option 3: Server Action for Reads (Works But Not Ideal), Pattern 1: Server Components (Preferred for Reads) (+7 more)

### Community 73 - "Community 73"
Cohesion: 0.29
Nodes (11): a4e(), Ale(), e3e(), FKe(), h4e(), iqe(), l4e(), od() (+3 more)

### Community 74 - "Community 74"
Cohesion: 0.15
Nodes (14): B1e(), chmod(), Ght(), Jht(), Kht(), qht(), t0t(), u1e() (+6 more)

### Community 75 - "Community 75"
Cohesion: 0.15
Nodes (13): dgt(), from(), ggt(), Gmt(), jmt(), k2e(), mgt(), ngt() (+5 more)

### Community 76 - "Community 76"
Cohesion: 0.33
Nodes (7): activatePlugin(), create(), importSettings(), package(), preAuthEncoding(), prepare(), testify()

### Community 77 - "Community 77"
Cohesion: 0.24
Nodes (10): Ct(), dP(), e2(), fP(), gh(), hc(), Pt(), QNe() (+2 more)

### Community 78 - "Community 78"
Cohesion: 0.40
Nodes (5): getWorkspaceByFilePath(), Mde(), tryWorkspaceByFilePath(), Ude(), Wot()

### Community 79 - "Community 79"
Cohesion: 0.25
Nodes (3): a2e(), Sgt(), Vi()

### Community 80 - "Community 80"
Cohesion: 0.22
Nodes (9): addOrCreate(), Bze(), Kle(), kX(), M$(), QLe(), Rc(), release() (+1 more)

### Community 81 - "Community 81"
Cohesion: 0.22
Nodes (9): B4e(), d4e(), e4e(), g4e(), i3e(), n3e(), p4e(), t4e() (+1 more)

### Community 82 - "Community 82"
Cohesion: 0.08
Nodes (33): amt(), appendChar(), appendUint16(), appendUint24(), appendView(), buildPaths(), Cbe(), CBt() (+25 more)

### Community 83 - "Community 83"
Cohesion: 0.11
Nodes (24): Ac(), Bce(), Bdt(), fc(), HL(), Ia(), Lct(), Mi() (+16 more)

### Community 84 - "Community 84"
Cohesion: 0.09
Nodes (24): aNe(), aOe(), BM(), BOe(), cOe(), dNe(), gNe(), hNe() (+16 more)

### Community 85 - "Community 85"
Cohesion: 0.13
Nodes (14): Bundle Analysis, Bundling, Common Problematic Packages, CSS Imports, Error Signs, Error Signs, ESM/CommonJS Issues, Migrating from Webpack to Turbopack (+6 more)

### Community 86 - "Community 86"
Cohesion: 0.15
Nodes (13): BS(), fre(), hHe(), IKe(), Joe(), kqe(), NKe(), pHe() (+5 more)

### Community 87 - "index.test.jsx"
Cohesion: 0.17
Nodes (16): $5e(), dte(), gPe(), gte(), hte(), HU(), isEmpty(), J5e() (+8 more)

### Community 88 - "vite.config.js"
Cohesion: 0.08
Nodes (31): c0(), C4(), d0t(), dOe(), e_e(), f0(), Goe(), gX() (+23 more)

### Community 89 - "gallery.css.js"
Cohesion: 0.16
Nodes (19): cast(), choices(), down(), focus(), initialize(), isDisabled(), isTrue(), isValue() (+11 more)

### Community 90 - "@testing-library/dom"
Cohesion: 0.19
Nodes (14): Co(), createSession(), dat(), dme(), fetchNextAnswer(), genEnforcedDependencies(), genEnforcedFields(), lookup() (+6 more)

### Community 91 - "@testing-library/jest-dom"
Cohesion: 0.22
Nodes (9): Bc(), bje(), Dje(), nU(), Rje(), Sje(), throwIfClosed(), Tje() (+1 more)

### Community 92 - "@testing-library/react"
Cohesion: 0.17
Nodes (12): Debug Tricks, --debug-build-paths Option, get_errors Tool, get_logs Tool, get_page_metadata Tool, get_project_metadata Tool, get_routes Tool, get_server_action_by_id Tool (+4 more)

### Community 93 - "breakpoints.js"
Cohesion: 0.17
Nodes (11): Auth Errors, Error Boundaries, Error Handling, Error Hierarchy, `error.tsx`, `global-error.tsx`, Not Found, `not-found.tsx` (+3 more)

### Community 94 - "isSymbolicLink"
Cohesion: 0.17
Nodes (11): File Conventions, File Conventions Reference, Intercepting Routes, Middleware / Proxy, Next.js 14-15: `middleware.ts`, Next.js 16+: `proxy.ts`, Parallel Routes, Private Folders (+3 more)

### Community 95 - "find"
Cohesion: 0.18
Nodes (10): author, engines, node, greenkeeper, ignore, license, name, packageManager (+2 more)

### Community 96 - "constructor"
Cohesion: 0.32
Nodes (8): an(), Bxe(), cxe(), ile(), lxe(), mKe(), sz(), vKe()

### Community 97 - "Bc"
Cohesion: 0.12
Nodes (18): addOnExit(), addOnInit(), addOnPreMain(), _atexit(), fGe(), FVe(), Hce(), LB() (+10 more)

### Community 98 - "Cache Components (Next.js 16+)"
Cohesion: 0.08
Nodes (48): accepts(), Be(), d8(), dB(), dl(), ensureDependencyMeta(), ensurePeerDependencyMeta(), eRe() (+40 more)

### Community 100 - "createCacheableRequest"
Cohesion: 0.18
Nodes (11): Common Mistakes, Display Strategy, Don't Use Manual Font Links, Font in Specific Components, Font Optimization, Font Weights and Styles, Google Fonts, Local Fonts (+3 more)

### Community 101 - "match"
Cohesion: 0.20
Nodes (12): Ba(), bre(), gQe(), hqe(), hx(), jQe(), Qre(), Sre() (+4 more)

### Community 103 - "What You Must Do When Invoked"
Cohesion: 0.25
Nodes (8): e9e(), i9e(), kd(), n9e(), r9e(), t9e(), Tte(), yte()

### Community 104 - "ad"
Cohesion: 0.24
Nodes (11): checkFinalSnapsnot(), checkFinalTimestamp(), isDelegatedRole(), isExpired(), loadTrustedRoot(), updateDelegatedTargets(), updateRoot(), updateSnapshot() (+3 more)

### Community 105 - "concat"
Cohesion: 0.18
Nodes (16): bU(), cx(), dn(), gE(), ir(), Kg(), kU(), pc() (+8 more)

### Community 106 - "abort"
Cohesion: 0.18
Nodes (11): __decorate(), _defineHidden(), disableMember(), __extends(), makeBound(), __nbind_get_value_object(), _nbind_value(), pop64() (+3 more)

### Community 107 - "Qn"
Cohesion: 0.20
Nodes (9): Async Cookies and Headers, Async Params and SearchParams, Async Patterns, generateMetadata, Migration Codemod, Pages and Layouts, Route Handlers, SearchParams (+1 more)

### Community 108 - "LL"
Cohesion: 0.20
Nodes (9): After Response, Common Examples, Functions, Generate Functions, Navigation, Navigation Hooks (Client), Request/Response, Server Functions (+1 more)

### Community 109 - ".write"
Cohesion: 0.20
Nodes (9): Browser-only APIs, Common Causes and Fixes, Date/Time Rendering, Debugging, Error Signs, Hydration Errors, Invalid HTML Nesting, Random Values or IDs (+1 more)

### Community 110 - "verify"
Cohesion: 0.20
Nodes (9): Basic Usage, Dynamic Route Handlers, Environment Behavior, GET Handler Conflicts with page.tsx, Request Helpers, Response Helpers, Route Handlers, Supported Methods (+1 more)

### Community 111 - "makeMethodCaller"
Cohesion: 0.20
Nodes (9): Don't Put Script in Head, Google Analytics, Google Tag Manager, Inline Scripts Need ID, Loading Strategies, Other Third-Party Scripts, Quick Reference, Scripts (+1 more)

### Community 112 - "Self-Hosting Next.js"
Cohesion: 0.29
Nodes (5): Carousel, createSortFunction(), Gallery(), mapToPhotoAlbumFormat(), orderArray()

### Community 113 - "fromJSON"
Cohesion: 0.39
Nodes (6): Card, Container, Details, SLink, Thumb, ThumbWrapper

### Community 114 - "reduce"
Cohesion: 0.20
Nodes (10): a7e(), Dse(), i7e(), kse(), l7e(), n7e(), o7e(), Pse() (+2 more)

### Community 115 - "findExtension"
Cohesion: 0.08
Nodes (30): e0t(), eDe(), EEt(), Et(), fromString(), gBe(), GVe(), ht() (+22 more)

### Community 116 - "Mn"
Cohesion: 0.28
Nodes (9): bK(), dSt(), fromFile(), fromText(), genCommitMessage(), loadFile(), loadFromText(), Qce() (+1 more)

### Community 117 - "alert"
Cohesion: 0.38
Nodes (5): addBlurDataURLs(), BLUR_CONCURRENCY, blurDataURLCache, fetchWithTimeout(), makeBlurDataURL()

### Community 118 - "test"
Cohesion: 0.22
Nodes (14): createReadStream(), d2t(), downloadTarget(), findCachedTarget(), generateTargetPath(), getTargetInfo(), loadLocalMetadata(), loadRoot() (+6 more)

### Community 119 - ".unshift"
Cohesion: 0.36
Nodes (6): Categories, Container, Counter, TitleHeader, Filter(), filters

### Community 120 - "split"
Cohesion: 0.39
Nodes (8): client, getAllEntries(), getCategoriesPaths(), getEntries(), getPostsPaths(), parseFields(), parseImage(), parseItem()

### Community 121 - "Nl"
Cohesion: 0.40
Nodes (5): aBt(), dBt(), gBt(), lBt(), validForDate()

### Community 122 - "forEach"
Cohesion: 0.33
Nodes (5): [Cv](), Ea(), encode(), encodeBody(), encodeField()

### Community 123 - "Next.js Best Practices"
Cohesion: 0.13
Nodes (18): btt(), Dtt(), ej(), firstHook(), getLocalPath(), GXe(), Js(), normalizeLocator() (+10 more)

### Community 124 - "qKe"
Cohesion: 0.43
Nodes (5): DateBase, DateMain, DateMobile, DateText(), formatDate()

### Community 125 - "sort"
Cohesion: 0.29
Nodes (7): exe(), gre(), mxe(), Pe(), Sn(), [TI](), zXe()

### Community 126 - "Metadata"
Cohesion: 0.08
Nodes (27): dKe(), Dqe(), dX(), fM(), fz(), hke(), iNe(), kke() (+19 more)

### Community 127 - "wE"
Cohesion: 0.40
Nodes (5): Aht(), fht(), pht(), uht(), Uwe()

### Community 128 - "nFe"
Cohesion: 0.14
Nodes (14): B8e(), bo(), Do(), Ga(), ha(), jL(), Mg(), oo() (+6 more)

### Community 129 - "parse"
Cohesion: 0.40
Nodes (5): getExtractHint(), n2(), s2(), W(), yh()

### Community 130 - "Rr"
Cohesion: 0.18
Nodes (13): api(), _emitEntry(), _getReaderOptions(), _getRootDirectory(), _handleDirectory(), _handleEntry(), _handleError(), _handleQueue() (+5 more)

### Community 131 - "Parallel & Intercepting Routes"
Cohesion: 0.14
Nodes (21): $1(), B2(), d2(), Dy(), ed(), Ei(), FA(), Fy() (+13 more)

### Community 132 - "oOe"
Cohesion: 0.29
Nodes (8): qSt(), reportCommandName(), reportDependencyCount(), reportPackageExtension(), reportPluginName(), reportValue(), reportVersion(), reportWorkspaceCount()

### Community 133 - "SKILL.md"
Cohesion: 0.29
Nodes (6): Directives, Next.js Directive, React Directives, `'use cache'`, `'use client'`, `'use server'`

### Community 134 - "Aa"
Cohesion: 0.29
Nodes (6): 1. Async Client Components Are Invalid, 2. Non-Serializable Props to Client Components, 3. Server Actions Are the Exception, Detection Rules, Quick Reference, RSC Boundaries

### Community 135 - "Pf"
Cohesion: 0.29
Nodes (6): Detection, Edge Runtime, Node.js Runtime (Default), Runtime Selection, Use Node.js Runtime by Default, When to Use Each

### Community 136 - "up"
Cohesion: 0.33
Nodes (5): client, limit, replaceImages, saveAllAssets(), saveFile()

### Community 137 - "kn"
Cohesion: 0.29
Nodes (6): Card, Description, Row, SLink, Thumb, Title

### Community 138 - "Data Patterns"
Cohesion: 0.09
Nodes (26): a3e(), B3e(), c3e(), d3e(), e8e(), g3e(), jM(), jXe() (+18 more)

### Community 140 - "tae"
Cohesion: 0.11
Nodes (14): a8(), addPath(), avt(), commitBuffer(), o8(), popArray(), pushArray(), pushBuffer() (+6 more)

### Community 142 - "jh"
Cohesion: 0.33
Nodes (7): cte(), fTe(), lte(), S5e(), ute(), v5e(), wz()

### Community 143 - "Bundling"
Cohesion: 0.09
Nodes (25): connect(), createConnection(), flushHeaders(), _getEntry(), _getFullEntryPath(), getSession(), _getStat(), iet() (+17 more)

### Community 144 - "Vi"
Cohesion: 0.33
Nodes (6): extensionsObj(), findSequenceMember(), isContextSpecific(), keyIdentifier(), signedAttrsObj(), signedDataObj()

### Community 145 - ".end"
Cohesion: 0.08
Nodes (27): ad(), BLe(), BMe(), c4e(), cMe(), e9(), EB(), eUe() (+19 more)

### Community 150 - "wi"
Cohesion: 0.33
Nodes (4): client, contentful, fs, limit

### Community 151 - "_onResponseBase"
Cohesion: 0.33
Nodes (5): client, contentful, data, fs, json

### Community 153 - "preorderDepthFirstWalk"
Cohesion: 0.33
Nodes (7): CarouselModal(), CloseButton, GalleryImage, ImageContainer, ModalContent, ModalOverlay, mockViews

### Community 154 - "mE"
Cohesion: 0.53
Nodes (3): Container, Tag, Hashtags()

### Community 155 - "ah"
Cohesion: 0.53
Nodes (3): Container, Logo, Header()

### Community 156 - "lm"
Cohesion: 0.53
Nodes (3): Image, ImageWrapper, Selfie()

### Community 157 - ".indexOf"
Cohesion: 0.23
Nodes (15): bL(), Cf(), D6e(), Fg(), fu(), GU(), Gy(), jte() (+7 more)

### Community 158 - "Yf"
Cohesion: 0.22
Nodes (10): decrement(), lines(), move(), pageUp(), prev(), restore(), save(), scrollUp() (+2 more)

### Community 159 - "submit"
Cohesion: 0.33
Nodes (6): [Cm](), eNe(), kFe(), Qz(), tNe(), xFe()

### Community 160 - "shift"
Cohesion: 0.25
Nodes (8): aU(), isBlockDevice(), isCharacterDevice(), isFIFO(), isSocket(), kt(), Ph(), xy()

### Community 161 - "query"
Cohesion: 0.29
Nodes (7): _3e(), j3e(), k4e(), Q4e(), w4e(), x4e(), xX()

### Community 162 - "$Xe"
Cohesion: 0.40
Nodes (5): fNe(), uNe(), vM(), wNe(), yLe()

### Community 167 - "ZP"
Cohesion: 0.43
Nodes (7): chown(), chownSync(), fchownPromise(), fchownSync(), [k6](), [Q6](), utimes()

### Community 168 - "oM"
Cohesion: 0.27
Nodes (11): b8(), cq(), dF(), dxe(), FQ(), g8(), hF(), lq() (+3 more)

### Community 169 - "Font Optimization"
Cohesion: 0.40
Nodes (5): B2e(), ddt(), edt(), ndt(), tdt()

### Community 170 - "package.json"
Cohesion: 0.40
Nodes (5): cHe(), fHe(), lHe(), [rhe](), uHe()

### Community 171 - "iqe"
Cohesion: 0.20
Nodes (10): Hh(), i4e(), j4e(), nme(), s4e(), Wme(), wUe(), Xat() (+2 more)

### Community 172 - "oqe"
Cohesion: 0.14
Nodes (32): a2(), as(), BP(), ci(), cP(), dc(), dr(), Ds() (+24 more)

### Community 173 - "makeBound"
Cohesion: 0.29
Nodes (7): componentDidMount(), componentWillUnmount(), cursorHide(), cursorShow(), hide(), isRawModeSupported(), show()

### Community 174 - "Async Params and SearchParams"
Cohesion: 0.29
Nodes (7): EKe(), nle(), tke(), tle(), $Xe(), XK(), xM()

### Community 176 - "Common Causes and Fixes"
Cohesion: 0.40
Nodes (5): h3e(), k3e(), p3e(), Q3e(), x3e()

### Community 177 - "aHe"
Cohesion: 0.33
Nodes (6): addOnPostRun(), callRuntimeCallbacks(), ensureInitRuntime(), exitRuntime(), postRun(), preMain()

### Community 178 - "l9e"
Cohesion: 0.38
Nodes (7): applyChanges(), getRegistryPath(), readJsonSync(), sendReport(), startBuffer(), writeJsonSync(), zH()

### Community 179 - "left"
Cohesion: 0.40
Nodes (5): addChoice(), isChoice(), isSelected(), newItem(), toChoice()

### Community 180 - "$H"
Cohesion: 0.10
Nodes (21): Aat(), bse(), concat(), filterChanges(), gB(), K$(), kwe(), map() (+13 more)

### Community 184 - "graphify reference: extra exports and benchmark"
Cohesion: 0.50
Nodes (4): _4e(), o4e(), u4e(), vx()

### Community 185 - "isContextSpecific"
Cohesion: 0.08
Nodes (33): delete(), deleteDescriptor(), deleteLocator(), forgetResolution(), forgetTransientResolutions(), get(), _getKeyPrefix(), _getKeyPrefixArray() (+25 more)

### Community 186 - "fBt"
Cohesion: 0.50
Nodes (4): Aue(), CKe(), iz(), uke()

### Community 187 - "compare"
Cohesion: 0.50
Nodes (4): eyt(), JBe(), Xmt(), zmt()

### Community 188 - "fM"
Cohesion: 0.14
Nodes (17): A5(), catch(), D5(), dK(), finally(), makeFetcher(), makeResolver(), p5() (+9 more)

### Community 189 - "makeLibzipError"
Cohesion: 0.50
Nodes (4): fullSource(), getDeclarations(), getProjectDatabase(), V0()

### Community 190 - "callRuntimeCallbacks"
Cohesion: 0.50
Nodes (4): genTime(), notAfter(), notBefore(), toDate()

### Community 192 - "createReadStream"
Cohesion: 0.50
Nodes (4): pathLenConstraint(), status(), toInteger(), version()

### Community 193 - "Sn"
Cohesion: 0.33
Nodes (6): BFe(), cFe(), _Fe(), lFe(), vFe(), wFe()

### Community 198 - "article.jsx"
Cohesion: 0.47
Nodes (4): Article(), calculateConstrainedDimensions(), DateText, mockArticleProps

### Community 203 - "warn"
Cohesion: 0.67
Nodes (3): addPositional(), addProxy(), addRest()

### Community 204 - "kd"
Cohesion: 0.33
Nodes (6): Cgt(), Egt(), i2e(), Igt(), l2e(), wgt()

### Community 205 - "zvt"
Cohesion: 0.40
Nodes (6): fBt(), hBt(), OBt(), pBt(), UJ(), yBt()

### Community 206 - "Uwe"
Cohesion: 0.40
Nodes (5): _fillStorage(), _getPatternSegments(), makeRe(), Pje(), _splitSegmentsIntoSections()

### Community 207 - "xFe"
Cohesion: 0.67
Nodes (3): BCt(), SCt(), vCt()

### Community 208 - "i$"
Cohesion: 0.40
Nodes (5): check(), i$(), n6e(), result(), sync()

### Community 209 - "Lh"
Cohesion: 0.50
Nodes (4): Att(), downloadHosted(), reduceHook(), zB()

### Community 210 - "toChoice"
Cohesion: 0.67
Nodes (3): c8e(), l8e(), u8e()

### Community 211 - "oG"
Cohesion: 0.67
Nodes (3): critical(), isCA(), toBoolean()

### Community 212 - "Cgt"
Cohesion: 0.20
Nodes (16): fchmodSync(), fdToPath(), Fgt(), fstatPromise(), fstatSync(), ftruncatePromise(), ftruncateSync(), getFileSource() (+8 more)

### Community 213 - "clear"
Cohesion: 0.50
Nodes (4): Fdt(), j2e(), kdt(), Ldt()

### Community 214 - "Wot"
Cohesion: 0.67
Nodes (3): due(), mUe(), yUe()

### Community 215 - "p3e"
Cohesion: 0.67
Nodes (3): Eze(), ize(), u3()

### Community 216 - "t_"
Cohesion: 0.67
Nodes (3): hasDependency(), hasHardDependency(), hasSoftDependency()

### Community 217 - "XP"
Cohesion: 0.50
Nodes (4): Fje(), gZ(), pOe(), XP()

### Community 218 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.67
Nodes (3): o1e(), RW(), s1e()

### Community 219 - "hydrateDirectory"
Cohesion: 0.50
Nodes (4): hydrateDirectory(), Ott(), registerListing(), utimesImpl()

### Community 220 - "o4e"
Cohesion: 0.67
Nodes (3): uxe(), w4(), Wk()

### Community 226 - "build"
Cohesion: 0.67
Nodes (3): build(), command(), commands()

### Community 231 - "E4"
Cohesion: 0.67
Nodes (3): E4(), lae(), uae()

### Community 239 - "compare"
Cohesion: 0.50
Nodes (4): compare(), compareMain(), comparePre(), m8()

### Community 257 - "g_e"
Cohesion: 0.67
Nodes (3): d_e(), g_e(), h$e()

### Community 263 - "kgt"
Cohesion: 0.08
Nodes (26): _1t(), [bhe](), cle(), _d(), e0e(), end(), F2e(), fit() (+18 more)

## Knowledge Gaps
- **379 isolated node(s):** `DateText`, `Carousel`, `next_config`, `BLUR_CONCURRENCY`, `blurDataURLCache` (+374 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **63 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `c()` connect `Community 60` to `Community 0`, `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 17`, `Community 18`, `Community 19`, `Community 21`, `Community 25`, `Community 26`, `Community 28`, `Community 29`, `Community 33`, `Community 34`, `Community 38`, `Community 39`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 47`, `Community 51`, `Community 54`, `Community 57`, `Community 58`, `Community 65`, `Community 68`, `Community 69`, `Community 70`, `Community 73`, `Community 74`, `Community 77`, `Community 78`, `Community 80`, `Community 82`, `Community 83`, `Community 86`, `index.test.jsx`, `gallery.css.js`, `@testing-library/dom`, `Cache Components (Next.js 16+)`, `match`, `concat`, `abort`, `reduce`, `findExtension`, `Next.js Best Practices`, `nFe`, `Rr`, `Parallel & Intercepting Routes`, `tae`, `Bundling`, `.end`, `.indexOf`, `Yf`, `ZP`, `oM`, `Font Optimization`, `oqe`, `l9e`, `$H`, `isContextSpecific`, `compare`, `fM`, `zvt`, `i$`, `Lh`, `Cgt`, `clear`, `XP`, `Tye`, `kgt`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `On()` connect `Community 40` to `Community 0`, `Community 2`, `Community 68`, `Community 43`, `Community 18`, `Community 51`, `Community 21`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `a()` connect `Community 2` to `Community 0`, `Community 1`, `Rr`, `Community 3`, `Community 4`, `Community 5`, `oOe`, `Community 7`, `Community 8`, `kgt`, `Data Patterns`, `Community 10`, `tae`, `Community 13`, `Community 14`, `Bundling`, `Community 18`, `Community 19`, `Parallel & Intercepting Routes`, `Community 23`, `Community 25`, `Community 26`, `.indexOf`, `Community 30`, `Community 33`, `Community 34`, `Community 37`, `Community 38`, `Community 40`, `Font Optimization`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Async Params and SearchParams`, `Community 49`, `oqe`, `Community 51`, `$H`, `Community 57`, `isContextSpecific`, `Community 59`, `fM`, `Community 60`, `Community 64`, `Community 65`, `Community 68`, `Community 69`, `Community 70`, `Community 74`, `Community 75`, `kd`, `zvt`, `Community 76`, `Community 79`, `i$`, `Community 80`, `Community 82`, `Community 83`, `Cgt`, `Lh`, `index.test.jsx`, `vite.config.js`, `gallery.css.js`, `@testing-library/dom`, `Cache Components (Next.js 16+)`, `What You Must Do When Invoked`, `ad`, `abort`, `findExtension`, `test`, `Nl`, `Next.js Best Practices`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Are the 233 inferred relationships involving `a()` (e.g. with `a1e()` and `a2e()`) actually correct?**
  _`a()` has 233 INFERRED edges - model-reasoned connections that need verification._
- **Are the 226 inferred relationships involving `n()` (e.g. with `_9e()` and `A5()`) actually correct?**
  _`n()` has 226 INFERRED edges - model-reasoned connections that need verification._
- **Are the 173 inferred relationships involving `c()` (e.g. with `_9e()` and `a1e()`) actually correct?**
  _`c()` has 173 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `execute()` (e.g. with `Be()` and `g()`) actually correct?**
  _`execute()` has 6 INFERRED edges - model-reasoned connections that need verification._