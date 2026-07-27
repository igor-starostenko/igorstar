# Graph Report - igorstar  (2026-07-26)

## Corpus Check
- 154 files · ~118,384 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3965 nodes · 11751 edges · 286 communities (209 shown, 77 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 872 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3d9d039d`
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
- JBe
- File Conventions
- j2t
- .read
- ZP
- oM
- xFe
- equals
- iqe
- oqe
- fetchPackageFromCache
- Async Params and SearchParams
- jW
- aHe
- l9e
- left
- Wot
- p3e
- date.css.js
- Hh
- graphify reference: extra exports and benchmark
- isContextSpecific
- fBt
- XP
- $Xe
- makeLibzipError
- k2e
- Directives
- Detection Rules
- Runtime Selection
- article.jsx
- Uwe
- applyChanges
- y8
- toString
- JBe
- HK
- article.test.jsx
- @babel/plugin-transform-modules-commonjs
- xFe
- @babel/register
- Lh
- toChoice
- oG
- @next/bundle-analyzer
- ns
- next-sitemap
- @testing-library/dom
- t_
- node-gyp
- graphify reference: commit hook and native CLAUDE.md integration
- source-map-explorer
- o4e
- mtt
- DCe
- sync
- edt
- baseImage.test.jsx
- getWorkspaceByCwd
- xR
- getProjectDatabase
- kgt
- az
- graphify reference: GitHub clone and cross-repo merge
- addMethod
- Igor Starostenko Project
- addPositional
- bAe
- BCt
- build
- c8e
- toBoolean
- Cnt
- el
- logo.test.jsx
- ize
- _fillStorage
- pushPointer
- xIt
- o1e
- Wk
- kqe
- core-js
- nde
- xIt
- g_e
- addMethod
- nde
- wh
- Agent Guidelines
- B9
- kgt
- SBt
- Agent Guidelines
- Cht
- Cnt
- Docker Compose Configuration
- Py
- Pgt
- prettier
- source-map-explorer
- @testing-library/react
- ake
- ns

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
- `makeBlurDataURL()` --indirect_call--> `error()`  [INFERRED]
  src/helpers/contentful.js → .yarn/releases/yarn-4.15.0.cjs
- `Tests Workflow` --conceptually_related_to--> `Amplify Workflow Skill`  [INFERRED]
  .github/workflows/test.yml → .agents/skills/amplify-workflow/SKILL.md
- `getStaticProps()` --indirect_call--> `date()`  [INFERRED]
  src/pages/feed.jsx → .yarn/releases/yarn-4.15.0.cjs
- `Amplify Workflow Skill` --references--> `Igorstar Skill`  [EXTRACTED]
  .agents/skills/amplify-workflow/SKILL.md → SKILL.md
- `Yarn Configuration` --conceptually_related_to--> `Amplify Workflow Skill`  [INFERRED]
  .yarnrc.yml → .agents/skills/amplify-workflow/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Logo Components** — public_logo_svg_path1, public_logo_svg_path2 [EXTRACTED 0.95]
- **MCP Debugging Tools** — get_errors, get_routes, get_project_metadata, get_page_metadata, get_logs, get_server_action_by_id [EXTRACTED 1.00]
- **Next.js Deployment and CI/CD Workflows** — .agents_skills_amplify_workflow, .agents_skills_next_best_practices_self_hosting, amplify, .github_workflows_lighthouse, .github_workflows_test [INFERRED]
- **Next.js Development Best Practices Ecosystem** — .agents_skills_next_best_practices, .agents_skills_amplify_workflow_references_backend, .agents_skills_amplify_workflow_references_frontend [INFERRED]
- **CI/CD and Quality Assurance Pipeline** — .github_workflows_codeql_analysis, .github_workflows_lighthouse, .github_workflows_test [EXTRACTED]

## Communities (286 total, 77 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (54): addAlgoliaAgent(), addKey(), addOption(), addWorkspace(), art(), aSt(), Att(), attachCustomData() (+46 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (61): ape(), av(), catch(), cit(), clear(), clearCache(), cpe(), delete() (+53 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (34): appendFileSync(), C2t(), changeFileBufferSync(), changeFileSync(), changeFileTextSync(), chmodSync(), copyFileSync(), copySync() (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (34): changeFileBufferPromise(), changeFilePromise(), changeFileTextPromise(), cs(), Cy(), existsPromise(), find(), findFolderRcFile() (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (37): accessPromise(), accessSync(), appendFile(), appendFilePromise(), chmodPromise(), chownPromise(), copyFilePromise(), eSt() (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (22): $1(), AP(), B2(), Dy(), ed(), Ei(), Fy(), gf() (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (37): addListener(), applyChanges(), B2t(), _checkIterableAdaptar(), componentDidMount(), componentWillUnmount(), constructor(), createWorker() (+29 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (20): _1t(), [bhe](), [Cv](), _d(), encode(), epe(), _gt(), jgt() (+12 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (45): aM(), axe(), BTe(), cte(), dle(), dz(), Ff(), fMe() (+37 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (35): _9e(), C9e(), eqe(), g9e(), H9e(), hz(), ii(), ire() (+27 more)

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (9): iyt(), LN(), nyt(), oyt(), ryt(), syt(), tyt(), XBe() (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (42): addPlugin(), Bot(), C5(), clearProgress(), commit(), cot(), D5(), e5() (+34 more)

### Community 12 - "Community 12"
Cohesion: 0.05
Nodes (38): Backend Phase Instructions, Critical Constraints, Error Handling, Phase Complete, Prerequisites Confirmed, Retrieve and Follow the SOP, SOP Overrides, Deploy Phase Instructions (+30 more)

### Community 13 - "Community 13"
Cohesion: 0.07
Nodes (59): add(), Ae(), Bht(), c0e(), c0t(), commitTips(), d4(), deleteDescriptor() (+51 more)

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (19): cle(), collect(), createStreamReporter(), Fmt(), hdt(), _je(), kn(), [lT]() (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.10
Nodes (17): Container, Copyright, Social, Footer(), validSocial, FivehundredpxIcon(), FlickrIcon(), GithubIcon() (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.07
Nodes (31): Dvt(), Fbe(), findGeneralName(), Gde(), getIdentityToken(), getRoleForTarget(), getRoles(), HEAPU8() (+23 more)

### Community 17 - "Community 17"
Cohesion: 0.07
Nodes (32): ask(), [BBe](), Bdt(), Bgt(), [BN](), close(), closeFreeSessions(), [d6]() (+24 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (17): bo(), d2(), Ga(), ha(), J1(), jL(), K1(), l2() (+9 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (20): downloadBytes(), downloadFile(), downloadHosted(), fetch(), fetchHostedRepository(), FXe(), getFetcher(), getLocalPath() (+12 more)

### Community 20 - "Community 20"
Cohesion: 0.06
Nodes (35): @babel/core, @babel/preset-react, contentful-cli, contentful-management, contentful-migration, eslint-config-prettier, favicons, jsdom (+27 more)

### Community 21 - "Community 21"
Cohesion: 0.08
Nodes (37): a8e(), a_e(), B_e(), BX(), c_e(), Ca(), cRe(), f8e() (+29 more)

### Community 22 - "Community 22"
Cohesion: 0.09
Nodes (32): Amplify Workflow Skill, Backend Phase Reference, Deploy Phase Reference, Frontend Phase Reference, Next Best Practices Skill, Async Patterns Guide, Bundling Guide, Data Patterns Guide (+24 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (31): bh(), BP(), dF(), Ds(), Eu(), firstHook(), Fo(), gc() (+23 more)

### Community 24 - "Community 24"
Cohesion: 0.07
Nodes (11): Eht(), Iht(), mht(), [mm](), On(), pushNode(), qWe(), removeNode() (+3 more)

### Community 25 - "Community 25"
Cohesion: 0.08
Nodes (16): configuration, dir, { favicons }, fs, path, siteConfig, config, { resolve } (+8 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (15): altDown(), altUp(), complete(), completion(), cutForward(), deleteForward(), home(), last() (+7 more)

### Community 27 - "Community 27"
Cohesion: 0.10
Nodes (26): aU(), bZ(), chmod(), e6e(), EZ(), genTraversePromise(), isBlockDevice(), isCharacterDevice() (+18 more)

### Community 28 - "Community 28"
Cohesion: 0.11
Nodes (17): Ch(), connect(), createConnection(), dump(), [e6](), end(), F2e(), [f6]() (+9 more)

### Community 29 - "Community 29"
Cohesion: 0.06
Nodes (45): $6(), ave(), Ayt(), clone(), copyIn(), cve(), dd(), discardAndClose() (+37 more)

### Community 30 - "Community 30"
Cohesion: 0.16
Nodes (29): A5e(), ate(), B5e(), c5e(), CE(), d5e(), e5e(), EE() (+21 more)

### Community 31 - "Community 31"
Cohesion: 0.09
Nodes (25): braceExpand(), debug(), ensureJSsource(), fd(), Hje(), j2(), jte(), k1t() (+17 more)

### Community 32 - "Community 32"
Cohesion: 0.07
Nodes (29): babel-plugin-styled-components, contentful, @contentful/rich-text-react-renderer, dotenv, fast-xml-parser, framer-motion, next, dependencies (+21 more)

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (15): _createIndexRecord(), _filter(), _getEntryLevel(), getFilter(), _getMatcher(), _getNegativePatternsRe(), _isDuplicateEntry(), _isMatchToPatterns() (+7 more)

### Community 34 - "Community 34"
Cohesion: 0.15
Nodes (15): abort(), allocate(), assert(), Fdt(), getCFunc(), _getValue(), kdt(), setValue() (+7 more)

### Community 35 - "Community 35"
Cohesion: 0.11
Nodes (24): Bqe(), choiceMessage(), choiceSeparator(), E8(), element(), footer(), getConditions(), indent() (+16 more)

### Community 36 - "Community 36"
Cohesion: 0.08
Nodes (29): _8e(), a3e(), B3e(), c3e(), d3e(), e8e(), g3e(), j8e() (+21 more)

### Community 37 - "Community 37"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 38 - "Community 38"
Cohesion: 0.07
Nodes (26): 1. Static (Auto-Prerendered), 2. Cached (`use cache`), 3. Dynamic (Suspense), Built-in Profiles, Cache Components (Next.js 16+), Cache Invalidation, Cache Key Generation, Cache Profiles (+18 more)

### Community 39 - "Community 39"
Cohesion: 0.11
Nodes (19): But(), DCe(), dit(), fse(), gae(), gB(), Gk(), I4() (+11 more)

### Community 40 - "Community 40"
Cohesion: 0.10
Nodes (31): Bce(), By(), ci(), dt(), EP(), Et(), GVe(), ht() (+23 more)

### Community 41 - "Community 41"
Cohesion: 0.08
Nodes (26): ad(), B8e(), BLe(), BMe(), c4e(), cMe(), eUe(), fUe() (+18 more)

### Community 42 - "Community 42"
Cohesion: 0.14
Nodes (23): _beforeError(), buffer(), createCacheableRequest(), createTimestamp(), default(), _finalizeBody(), fromObject(), iAe() (+15 more)

### Community 43 - "Community 43"
Cohesion: 0.09
Nodes (30): Aa(), ao(), bt(), da(), dP(), e2(), FA(), Fh() (+22 more)

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (21): cSt(), [Dv](), ex(), getFileSource(), Hle(), isSymbolicLink(), jle(), lstatSync() (+13 more)

### Community 45 - "Community 45"
Cohesion: 0.09
Nodes (24): a9e(), accepts(), Ade(), aG(), Bit(), c6e(), eme(), gKe() (+16 more)

### Community 46 - "Community 46"
Cohesion: 0.16
Nodes (25): A5(), Aot(), applyLightResolution(), cde(), execute(), executeStandard(), executeUpClassic(), executeUpRecursive() (+17 more)

### Community 47 - "Community 47"
Cohesion: 0.25
Nodes (8): getExtractHint(), lines(), n2(), s2(), up(), vy(), W(), yh()

### Community 48 - "Community 48"
Cohesion: 0.10
Nodes (19): BaseImage(), FlickrImage(), parseFlickrImage(), parser, ImageContainer, ImageCopyright, ImageFooter, ImageFrame (+11 more)

### Community 49 - "Community 49"
Cohesion: 0.06
Nodes (64): $b(), Be(), bindDescriptor(), c9(), Cw(), dB(), dl(), DQ() (+56 more)

### Community 50 - "Community 50"
Cohesion: 0.11
Nodes (19): a8(), avt(), bse(), concat(), filterChanges(), kwe(), lE(), merge() (+11 more)

### Community 51 - "Community 51"
Cohesion: 0.09
Nodes (28): a1t(), checkFinalSnapsnot(), checkFinalTimestamp(), commonFieldsFromJSON(), dg(), di(), e1t(), Es() (+20 more)

### Community 52 - "Community 52"
Cohesion: 0.15
Nodes (18): anyNeedsWireRead(), anyNeedsWireWrite(), constructType(), getDynCall(), getType(), getTypes(), makeCaller(), makeJSCaller() (+10 more)

### Community 53 - "Community 53"
Cohesion: 0.08
Nodes (25): cUe(), gHe(), gX(), i_e(), iUe(), jme(), kM(), kpe() (+17 more)

### Community 54 - "Community 54"
Cohesion: 0.09
Nodes (22): Build-time vs Runtime, Docker Compose, Docker Deployment, Dockerfile, Environment Variables, Health Check Endpoint, Image Optimization, ISR and Cache Handlers (+14 more)

### Community 55 - "Community 55"
Cohesion: 0.16
Nodes (19): _4(), aI(), anchoredPackage(), Bpe(), FB(), getLinkers(), getWorkspaceByLocator(), Jd() (+11 more)

### Community 56 - "Community 56"
Cohesion: 0.15
Nodes (16): AQ(), B1e(), BKe(), cze(), Ele(), Ght(), Lle(), o3() (+8 more)

### Community 57 - "Community 57"
Cohesion: 0.15
Nodes (7): ah(), _flush(), getTransformer(), NB(), O2e(), Pdt(), xdt()

### Community 58 - "Community 58"
Cohesion: 0.09
Nodes (23): extAuthorityKeyID(), extBasicConstraints(), extension(), extKeyUsage(), extSCT(), extSubjectAltName(), extSubjectKeyID(), findExtension() (+15 more)

### Community 59 - "Community 59"
Cohesion: 0.13
Nodes (17): adjascentGlobstarOptimize(), createEntry(), cutLeft(), firstPhasePreProcess(), _getKeyUnprefix(), Int(), levelOneOptimize(), _llvm_stackrestore() (+9 more)

### Community 60 - "Community 60"
Cohesion: 0.12
Nodes (18): api(), Cdt(), _getReaderOptions(), _getRootDirectory(), Idt(), Jze(), mdt(), mQ() (+10 more)

### Community 61 - "Community 61"
Cohesion: 0.10
Nodes (20): Async Patterns, Bundling, Data Patterns, Debug Tricks, Directives, Error Handling, File Conventions, Font Optimization (+12 more)

### Community 62 - "Community 62"
Cohesion: 0.17
Nodes (20): alert(), append(), backward(), decrement(), disable(), dispatch(), forward(), getItem() (+12 more)

### Community 63 - "Community 63"
Cohesion: 0.11
Nodes (18): dKe(), dX(), hke(), iNe(), kke(), nz(), oM(), PKe() (+10 more)

### Community 64 - "Community 64"
Cohesion: 0.16
Nodes (15): deleteEntry(), fat(), fLe(), KZ(), mktempSync(), moveSync(), [P6](), removeSync() (+7 more)

### Community 65 - "Community 65"
Cohesion: 0.07
Nodes (35): activatePlugin(), b8(), btt(), cq(), create(), D0(), Dtt(), dxe() (+27 more)

### Community 66 - "Community 66"
Cohesion: 0.20
Nodes (11): hpe(), [ihe](), kj(), [l6](), lv(), Qj(), [S6](), [she]() (+3 more)

### Community 67 - "Community 67"
Cohesion: 0.11
Nodes (18): Avoid Duplicate Fetches, Basic OG Image, Custom Fonts, Dynamic Metadata, Dynamic OG Image, File Naming, Important Rules, Important: Server Components Only (+10 more)

### Community 68 - "Community 68"
Cohesion: 0.11
Nodes (19): scripts, analyze, build, build:analyze, build:dir, build:favicons, build:images, build:sitemap (+11 more)

### Community 69 - "Community 69"
Cohesion: 0.11
Nodes (19): aFe(), dFe(), eFe(), fFe(), gFe(), hFe(), iFe(), im() (+11 more)

### Community 70 - "Community 70"
Cohesion: 0.24
Nodes (10): demangle(), demangleAll(), intArrayFromString(), jsStackTrace(), lengthBytesUTF8(), Pointer_stringify(), stackTrace(), stringToUTF8() (+2 more)

### Community 71 - "Community 71"
Cohesion: 0.22
Nodes (10): e9(), EB(), G4(), ime(), m4(), sme(), t9(), UC() (+2 more)

### Community 72 - "Community 72"
Cohesion: 0.11
Nodes (17): 1. Missing `default.tsx` → 404 on Refresh, 2. Modal Persists After Navigation, 3. Nested Parallel Routes Need Defaults Too, 4. Intercepted Route Shows Wrong Content, 5. TypeScript Errors with `params`, Common Gotchas, Complete Example: Photo Gallery Modal, File Structure (+9 more)

### Community 73 - "Community 73"
Cohesion: 0.14
Nodes (13): BaseImage, calculateRowHeight(), DateText, filterObject(), FlickrImage, getStaticProps(), isFlickrEmbed(), isFlickrNode() (+5 more)

### Community 74 - "Community 74"
Cohesion: 0.20
Nodes (10): BS(), eDe(), first(), hHe(), [HR](), [I6](), pHe(), shift() (+2 more)

### Community 75 - "Community 75"
Cohesion: 0.15
Nodes (15): aBt(), compareDigest(), compareSignature(), dBt(), fBt(), gBt(), hBt(), jBt() (+7 more)

### Community 76 - "Community 76"
Cohesion: 0.28
Nodes (9): bK(), dSt(), fromFile(), fromText(), genCommitMessage(), loadFile(), loadFromText(), Qce() (+1 more)

### Community 77 - "Community 77"
Cohesion: 0.12
Nodes (13): Always Use next/image, Blur Placeholder, Common Mistakes, Image Optimization, Priority Loading, Remote Images Configuration, Required Props, Responsive Images (+5 more)

### Community 78 - "Community 78"
Cohesion: 0.14
Nodes (18): $5e(), dte(), gPe(), gte(), Hn(), hte(), HU(), isEmpty() (+10 more)

### Community 79 - "Community 79"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 80 - "Community 80"
Cohesion: 0.05
Nodes (70): a0t(), attachInternalDependencies(), bI(), CB(), CK(), del(), dht(), eY() (+62 more)

### Community 81 - "Community 81"
Cohesion: 0.12
Nodes (15): Avoiding Data Waterfalls, Client Component Data Fetching, Data Patterns, Decision Tree, Option 1: Pass from Server Component (Preferred), Option 2: Fetch on Mount (When Necessary), Option 3: Server Action for Reads (Works But Not Ideal), Pattern 1: Server Components (Preferred for Reads) (+7 more)

### Community 82 - "Community 82"
Cohesion: 0.10
Nodes (20): addOnExit(), addOnInit(), addOnPreMain(), _atexit(), dn(), ensureVirtualLink(), fGe(), FVe() (+12 more)

### Community 83 - "Community 83"
Cohesion: 0.25
Nodes (9): c0(), C4(), dOe(), Goe(), Hoe(), l0(), mOe(), _oe() (+1 more)

### Community 84 - "Community 84"
Cohesion: 0.17
Nodes (13): Ac(), fc(), Fje(), fre(), gZ(), IKe(), NKe(), pOe() (+5 more)

### Community 85 - "Community 85"
Cohesion: 0.08
Nodes (27): aHe(), Ctt(), e0t(), EEt(), fromString(), gBe(), lc(), list() (+19 more)

### Community 86 - "Community 86"
Cohesion: 0.13
Nodes (14): Bundle Analysis, Bundling, Common Problematic Packages, CSS Imports, Error Signs, Error Signs, ESM/CommonJS Issues, Migrating from Webpack to Turbopack (+6 more)

### Community 87 - "index.test.jsx"
Cohesion: 0.05
Nodes (49): an(), Ba(), BFe(), bre(), Bxe(), cFe(), [Cm](), cxe() (+41 more)

### Community 88 - "vite.config.js"
Cohesion: 0.13
Nodes (17): Ale(), ame(), BV(), eBt(), enable(), forEach(), Fyt(), H6e() (+9 more)

### Community 89 - "gallery.css.js"
Cohesion: 0.29
Nodes (8): addDirectory(), allocateBuffer(), allocateSource(), allocateUnattachedSource(), getExternalAttributes(), makeLibzipError(), setExternalAttributes(), setMtime()

### Community 90 - "@testing-library/dom"
Cohesion: 0.24
Nodes (8): Carousel, createSortFunction(), GalleryContainer, GalleryImageWrapper, Gallery(), mapToPhotoAlbumFormat(), orderArray(), renderNextImage()

### Community 91 - "@testing-library/jest-dom"
Cohesion: 0.13
Nodes (18): are(), cqe(), Dqe(), fM(), fz(), gM(), hRe(), kRe() (+10 more)

### Community 92 - "@testing-library/react"
Cohesion: 0.28
Nodes (9): cast(), hint(), isFalse(), isTrue(), isValue(), submit(), toNumber(), validate() (+1 more)

### Community 93 - "breakpoints.js"
Cohesion: 0.19
Nodes (14): Co(), createSession(), dat(), dme(), fetchNextAnswer(), genEnforcedDependencies(), genEnforcedFields(), lookup() (+6 more)

### Community 94 - "isSymbolicLink"
Cohesion: 0.17
Nodes (12): Debug Tricks, --debug-build-paths Option, get_errors Tool, get_logs Tool, get_page_metadata Tool, get_project_metadata Tool, get_routes Tool, get_server_action_by_id Tool (+4 more)

### Community 95 - "find"
Cohesion: 0.17
Nodes (11): Auth Errors, Error Boundaries, Error Handling, Error Hierarchy, `error.tsx`, `global-error.tsx`, Not Found, `not-found.tsx` (+3 more)

### Community 96 - "constructor"
Cohesion: 0.17
Nodes (11): File Conventions, File Conventions Reference, Intercepting Routes, Middleware / Proxy, Next.js 14-15: `middleware.ts`, Next.js 16+: `proxy.ts`, Parallel Routes, Private Folders (+3 more)

### Community 97 - "Bc"
Cohesion: 0.18
Nodes (10): author, engines, node, greenkeeper, ignore, license, name, packageManager (+2 more)

### Community 98 - "Cache Components (Next.js 16+)"
Cohesion: 0.11
Nodes (25): formatCaption(), getStaticProps(), aGe(), _ageValue(), _allowsStoringAuthenticated(), _assertRequestHasHeaders(), _copyWithoutHopByHopHeaders(), date() (+17 more)

### Community 99 - "jM"
Cohesion: 0.09
Nodes (23): dgt(), from(), gdt(), ggt(), Gmt(), HBe(), Hwt(), i1t() (+15 more)

### Community 100 - "createCacheableRequest"
Cohesion: 0.11
Nodes (24): c(), Ct(), _emscripten_get_now(), _emscripten_set_main_loop(), _emscripten_set_main_loop_timing(), hc(), ir(), jke() (+16 more)

### Community 101 - "match"
Cohesion: 0.12
Nodes (22): e_e(), f0(), getLocatorUrl(), isConventionalTarballUrl(), Iw(), Iy(), Jc(), Joe() (+14 more)

### Community 102 - "Oh"
Cohesion: 0.18
Nodes (11): Common Mistakes, Display Strategy, Don't Use Manual Font Links, Font in Specific Components, Font Optimization, Font Weights and Styles, Google Fonts, Local Fonts (+3 more)

### Community 103 - "What You Must Do When Invoked"
Cohesion: 0.05
Nodes (47): _3e(), B4e(), BNe(), cNe(), d4e(), Dpe(), e$(), e4e() (+39 more)

### Community 104 - "ad"
Cohesion: 0.33
Nodes (10): a4e(), e3e(), FKe(), h4e(), iqe(), l4e(), od(), r3e() (+2 more)

### Community 105 - "concat"
Cohesion: 0.14
Nodes (22): aqe(), Cf(), D6e(), Eh(), Fg(), fu(), GU(), Gy() (+14 more)

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
Cohesion: 0.26
Nodes (10): Article(), calculateConstrainedDimensions(), Card, Description, Row, SLink, Thumb, Title (+2 more)

### Community 113 - "fromJSON"
Cohesion: 0.33
Nodes (7): CarouselModal(), CloseButton, GalleryImage, ImageContainer, ModalContent, ModalOverlay, mockViews

### Community 114 - "reduce"
Cohesion: 0.36
Nodes (7): Card, Container, Details, SLink, Thumb, ThumbWrapper, Recommendations()

### Community 115 - "findExtension"
Cohesion: 0.20
Nodes (10): a7e(), Dse(), i7e(), kse(), l7e(), n7e(), o7e(), Pse() (+2 more)

### Community 116 - "Mn"
Cohesion: 0.20
Nodes (10): Aat(), check(), i$(), K$(), n6e(), r6e(), result(), s$() (+2 more)

### Community 117 - "alert"
Cohesion: 0.08
Nodes (39): Bc(), bje(), checksumFilePromise(), chown(), chownSync(), closePromise(), closeSync(), Dje() (+31 more)

### Community 118 - "test"
Cohesion: 0.12
Nodes (17): aj(), cancel(), error(), GSt(), HSt(), iet(), jSt(), lj() (+9 more)

### Community 119 - ".unshift"
Cohesion: 0.12
Nodes (18): Ase(), cloneFromRemote(), D1t(), EGe(), exec(), JGe(), k5(), KGe() (+10 more)

### Community 120 - "split"
Cohesion: 0.09
Nodes (31): amt(), appendChar(), appendUint16(), appendUint24(), appendView(), buildPaths(), Cbe(), CBt() (+23 more)

### Community 121 - "Nl"
Cohesion: 0.29
Nodes (8): B0t(), Bw(), d8(), fetchPackageFromCache(), getLocatorMirrorPath(), getLocatorPath(), getVersionFilename(), readJsonPromise()

### Community 122 - "forEach"
Cohesion: 0.29
Nodes (10): Ait(), bU(), cx(), gE(), hE(), kU(), PU(), T2() (+2 more)

### Community 123 - "Next.js Best Practices"
Cohesion: 0.27
Nodes (11): e2t(), getTargetInfo(), loadLocalMetadata(), loadRoot(), loadSnapshot(), loadTargets(), loadTimestamp(), persistMetadata() (+3 more)

### Community 124 - "qKe"
Cohesion: 0.39
Nodes (8): client, getAllEntries(), getCategoriesPaths(), getEntries(), getPostsPaths(), parseFields(), parseImage(), parseItem()

### Community 125 - "sort"
Cohesion: 0.14
Nodes (9): a2e(), Cgt(), Egt(), i2e(), Igt(), l2e(), Sgt(), Vi() (+1 more)

### Community 126 - "Metadata"
Cohesion: 0.40
Nodes (5): _fillStorage(), _getPatternSegments(), makeRe(), Pje(), _splitSegmentsIntoSections()

### Community 127 - "wE"
Cohesion: 0.29
Nodes (7): compare(), compareMain(), comparePre(), m8(), Pce(), xce(), y8()

### Community 128 - "nFe"
Cohesion: 0.24
Nodes (11): captureString(), clean(), definition(), format(), getUsageByIndex(), getUsageByRegistration(), header(), inc() (+3 more)

### Community 130 - "Rr"
Cohesion: 0.36
Nodes (6): Categories, Container, Counter, TitleHeader, Filter(), filters

### Community 131 - "Parallel & Intercepting Routes"
Cohesion: 0.25
Nodes (8): addOnPostRun(), addOnPreRun(), callRuntimeCallbacks(), ensureInitRuntime(), exitRuntime(), postRun(), preMain(), preRun()

### Community 132 - "oOe"
Cohesion: 0.29
Nodes (7): getSession(), normalizeOptions(), normalizeOrigin(), request(), rvt(), _tryToCreateNewSession(), zT()

### Community 133 - "SKILL.md"
Cohesion: 0.67
Nodes (3): d_e(), g_e(), h$e()

### Community 134 - "Aa"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 135 - "Pf"
Cohesion: 0.29
Nodes (8): _emitEntry(), _handleDirectory(), _handleEntry(), _handleError(), _handleQueue(), _pushToQueue(), _pushToStorage(), _worker()

### Community 136 - "up"
Cohesion: 0.16
Nodes (19): B9e(), D9e(), dU(), e9e(), F9e(), fx(), G2(), i0() (+11 more)

### Community 137 - "kn"
Cohesion: 0.29
Nodes (6): Directives, Next.js Directive, React Directives, `'use cache'`, `'use client'`, `'use server'`

### Community 138 - "Data Patterns"
Cohesion: 0.29
Nodes (6): 1. Async Client Components Are Invalid, 2. Non-Serializable Props to Client Components, 3. Server Actions Are the Exception, Detection Rules, Quick Reference, RSC Boundaries

### Community 139 - "getBufferAndClose"
Cohesion: 0.29
Nodes (6): Detection, Edge Runtime, Node.js Runtime (Default), Runtime Selection, Use Node.js Runtime by Default, When to Use Each

### Community 140 - "tae"
Cohesion: 0.33
Nodes (5): client, limit, replaceImages, saveAllAssets(), saveFile()

### Community 141 - "from"
Cohesion: 0.53
Nodes (6): buildCallerFunction(), buildJSCallerFunction(), listResources(), makeArgList(), makeWireRead(), makeWireWrite()

### Community 142 - "jh"
Cohesion: 0.12
Nodes (41): a2(), as(), bf(), bL(), componentDidCatch(), cP(), dc(), dh() (+33 more)

### Community 143 - "Bundling"
Cohesion: 0.29
Nodes (7): Aht(), fht(), hF(), lq(), pht(), uht(), Uwe()

### Community 144 - "Vi"
Cohesion: 0.33
Nodes (6): extensionsObj(), findSequenceMember(), isContextSpecific(), keyIdentifier(), signedAttrsObj(), signedDataObj()

### Community 145 - ".end"
Cohesion: 0.50
Nodes (4): B6e(), F$(), w6e(), wU()

### Community 146 - "an"
Cohesion: 0.33
Nodes (6): Jht(), Kht(), t0t(), u1e(), writeFile(), Xht()

### Community 147 - "ip"
Cohesion: 0.48
Nodes (7): compile(), DE(), fqe(), nqe(), ore(), qs(), registerOptions()

### Community 148 - "render"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 149 - "rF"
Cohesion: 0.33
Nodes (4): client, contentful, fs, limit

### Community 150 - "wi"
Cohesion: 0.33
Nodes (5): client, contentful, data, fs, json

### Community 151 - "_onResponseBase"
Cohesion: 0.53
Nodes (3): Container, Tag, Hashtags()

### Community 152 - "exec"
Cohesion: 0.09
Nodes (24): aNe(), aOe(), BM(), BOe(), cOe(), dNe(), gNe(), hNe() (+16 more)

### Community 154 - "mE"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 155 - "ah"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 156 - "lm"
Cohesion: 0.50
Nodes (4): A0(), Ltt(), mtt(), tv()

### Community 157 - ".indexOf"
Cohesion: 0.15
Nodes (9): b5(), dj(), Fde(), jot(), nK(), Umt(), vGe(), wi() (+1 more)

### Community 159 - "submit"
Cohesion: 0.53
Nodes (3): Container, Logo, Header()

### Community 162 - "JBe"
Cohesion: 0.53
Nodes (3): Image, ImageWrapper, Selfie()

### Community 164 - "File Conventions"
Cohesion: 0.40
Nodes (5): addChoice(), isChoice(), isSelected(), newItem(), toChoice()

### Community 165 - "j2t"
Cohesion: 0.40
Nodes (5): B2e(), ddt(), edt(), ndt(), tdt()

### Community 166 - ".read"
Cohesion: 0.40
Nodes (5): cHe(), fHe(), lHe(), [rhe](), uHe()

### Community 167 - "ZP"
Cohesion: 0.47
Nodes (6): createReadStream(), d2t(), downloadTarget(), findCachedTarget(), generateTargetPath(), readLines()

### Community 168 - "oM"
Cohesion: 0.22
Nodes (13): choices(), down(), focus(), isDisabled(), pageDown(), pageUp(), scrollDown(), scrollUp() (+5 more)

### Community 172 - "oqe"
Cohesion: 0.43
Nodes (5): DateBase, DateMain, DateMobile, DateText(), formatDate()

### Community 173 - "fetchPackageFromCache"
Cohesion: 0.29
Nodes (7): addOrCreate(), Bze(), Kle(), QLe(), Rc(), release(), zLe()

### Community 176 - "jW"
Cohesion: 0.67
Nodes (3): attachExternalDependents(), getDiskInformation(), jW()

### Community 177 - "aHe"
Cohesion: 0.50
Nodes (4): _4e(), o4e(), u4e(), vx()

### Community 178 - "l9e"
Cohesion: 0.50
Nodes (4): Aue(), CKe(), iz(), uke()

### Community 179 - "left"
Cohesion: 0.50
Nodes (4): eyt(), JBe(), Xmt(), zmt()

### Community 180 - "Wot"
Cohesion: 0.50
Nodes (4): fullSource(), getDeclarations(), getProjectDatabase(), V0()

### Community 181 - "p3e"
Cohesion: 0.50
Nodes (4): genTime(), notAfter(), notBefore(), toDate()

### Community 182 - "date.css.js"
Cohesion: 0.67
Nodes (3): kIt(), PIt(), xIt()

### Community 183 - "Hh"
Cohesion: 0.09
Nodes (27): a(), ax(), defaults(), dre(), dynamic(), g2t(), isDelegatedPath(), isEnd() (+19 more)

### Community 184 - "graphify reference: extra exports and benchmark"
Cohesion: 0.50
Nodes (4): pathLenConstraint(), status(), toInteger(), version()

### Community 185 - "isContextSpecific"
Cohesion: 0.50
Nodes (4): push64(), pushMutablePointer(), pushPointer(), pushValue()

### Community 194 - "k2e"
Cohesion: 0.67
Nodes (3): addPositional(), addProxy(), addRest()

### Community 195 - "Directives"
Cohesion: 0.67
Nodes (3): BCt(), SCt(), vCt()

### Community 197 - "Runtime Selection"
Cohesion: 0.67
Nodes (3): build(), command(), commands()

### Community 198 - "article.jsx"
Cohesion: 0.67
Nodes (3): c8e(), l8e(), u8e()

### Community 199 - "Uwe"
Cohesion: 0.67
Nodes (3): critical(), isCA(), toBoolean()

### Community 200 - "applyChanges"
Cohesion: 0.67
Nodes (3): CZ(), eTe(), stop()

### Community 201 - "y8"
Cohesion: 0.67
Nodes (3): due(), mUe(), yUe()

### Community 203 - "JBe"
Cohesion: 0.67
Nodes (3): Eze(), ize(), u3()

### Community 204 - "HK"
Cohesion: 0.09
Nodes (30): cacheCleanup(), createEnvironment(), definitions(), getWorkspaceByFilePath(), h7(), insert(), iot(), j4() (+22 more)

### Community 205 - "article.test.jsx"
Cohesion: 0.67
Nodes (3): hasDependency(), hasHardDependency(), hasSoftDependency()

### Community 207 - "xFe"
Cohesion: 0.50
Nodes (4): a1e(), o1e(), RW(), s1e()

### Community 209 - "Lh"
Cohesion: 0.67
Nodes (3): uxe(), w4(), Wk()

### Community 247 - "ize"
Cohesion: 0.12
Nodes (14): addPath(), commitBuffer(), Ece(), GXe(), popArray(), pushArray(), pushBuffer(), pushExternal() (+6 more)

### Community 285 - "ns"
Cohesion: 0.24
Nodes (15): copyPromise(), detachTemp(), dK(), executeProxy(), fetchFromDisk(), generatePackage(), getSubprocessStreams(), lit() (+7 more)

## Knowledge Gaps
- **412 isolated node(s):** `config`, `baseUrl`, `next_config`, `name`, `license` (+407 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **77 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `error()` connect `test` to `Community 0`, `nFe`, `Community 1`, `jh`, `Community 48`, `Community 17`, `Hh`, `Community 26`, `Community 29`, `Community 31`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `makeBlurDataURL()` connect `Community 48` to `test`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `date()` connect `Cache Components (Next.js 16+)` to `Community 0`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 233 inferred relationships involving `a()` (e.g. with `render()` and `a1e()`) actually correct?**
  _`a()` has 233 INFERRED edges - model-reasoned connections that need verification._
- **Are the 226 inferred relationships involving `n()` (e.g. with `_9e()` and `A5()`) actually correct?**
  _`n()` has 226 INFERRED edges - model-reasoned connections that need verification._
- **Are the 173 inferred relationships involving `c()` (e.g. with `_9e()` and `a1e()`) actually correct?**
  _`c()` has 173 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `execute()` (e.g. with `Be()` and `g()`) actually correct?**
  _`execute()` has 6 INFERRED edges - model-reasoned connections that need verification._