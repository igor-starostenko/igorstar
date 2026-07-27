# Graph Report - igorstar-hercules  (2026-07-21)

## Corpus Check
- 145 files · ~99,940 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3905 nodes · 11687 edges · 274 communities (211 shown, 63 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 871 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `380e1dfa`
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
- xFe
- i$
- Lh
- toChoice
- oG
- Cgt
- Wot
- p3e
- t_
- graphify reference: commit hook and native CLAUDE.md integration
- o4e
- mtt
- DCe
- Aue
- edt
- build
- Fdt
- getProjectDatabase
- toDate
- E4
- toInteger
- pushPointer
- az
- graphify reference: GitHub clone and cross-repo merge
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

## Communities (274 total, 63 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (31): addAlgoliaAgent(), addWorkspace(), appendFile(), art(), aSt(), attachCustomData(), CL(), computeCandidateName() (+23 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (11): C2t(), chmodSync(), getUnixMode(), lutimesSync(), mkdirpSync(), mkdirSync(), Ott(), preserveTimeSync() (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (67): a(), a1e(), accessPromise(), accessSync(), ame(), ax(), createTimestamp(), defaults() (+59 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (80): add(), addPlugin(), Aot(), applyLightResolution(), Bot(), cde(), commitTips(), createEnvironment() (+72 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (40): B0t(), Bw(), changeFileBufferPromise(), changeFilePromise(), changeFileTextPromise(), cs(), Dpe(), executeRegular() (+32 more)

### Community 5 - "Community 5"
Cohesion: 0.20
Nodes (17): bZ(), copySync(), cSt(), [d6](), Hle(), isSymbolicLink(), jle(), lstatSync() (+9 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (35): a8e(), a_e(), B_e(), BX(), c_e(), Ca(), Ch(), cRe() (+27 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (45): _9e(), B9e(), C9e(), D9e(), dU(), eqe(), F9e(), fx() (+37 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (38): anchoredPackage(), C5(), cacheCleanup(), clearProgress(), commit(), cot(), e5(), executeStandard() (+30 more)

### Community 9 - "Community 9"
Cohesion: 0.05
Nodes (38): Backend Phase Instructions, Critical Constraints, Error Handling, Phase Complete, Prerequisites Confirmed, Retrieve and Follow the SOP, SOP Overrides, Deploy Phase Instructions (+30 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (18): adjascentGlobstarOptimize(), b5(), Ctt(), dj(), Fde(), firstPhasePreProcess(), jot(), nK() (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (5): FXe(), KK(), oxe(), rM(), VXe()

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (6): captureString(), clean(), getLocatorUrl(), inc(), isConventionalTarballUrl(), TK()

### Community 13 - "Community 13"
Cohesion: 0.10
Nodes (28): bf(), bh(), BP(), Ds(), Eu(), Fo(), Fy(), gc() (+20 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (30): B2t(), _beforeError(), _checkIterableAdaptar(), clear(), clearCache(), constructor(), _finalizeBody(), gCt() (+22 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (38): a9e(), Ade(), braceExpand(), c6e(), debug(), eme(), ensureJSsource(), gKe() (+30 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (17): Container, Copyright, Social, Footer(), validSocial, FivehundredpxIcon(), FlickrIcon(), GithubIcon() (+9 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (19): _8e(), aqe(), BNe(), cNe(), cqe(), e8e(), j8e(), lqe() (+11 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (26): BV(), eBt(), enable(), forEach(), Fyt(), h7(), iyt(), jke() (+18 more)

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (15): createReadStream(), d2t(), downloadTarget(), findCachedTarget(), findMount(), generateTargetPath(), [I6](), makeCallSync() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (14): BaseImage(), FlickrImage(), parseFlickrImage(), parser, ImageContainer, ImageCopyright, ImageFooter, ImageFrame (+6 more)

### Community 21 - "Community 21"
Cohesion: 0.07
Nodes (25): [BBe](), Bgt(), [BN](), cancel(), close(), closeFreeSessions(), closeSync(), destroy() (+17 more)

### Community 22 - "Community 22"
Cohesion: 0.06
Nodes (35): @babel/core, @babel/preset-react, contentful-cli, contentful-management, contentful-migration, eslint-config-prettier, favicons, jsdom (+27 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (24): a1t(), addOption(), commonFieldsFromJSON(), dg(), di(), e1t(), Es(), fromJSON() (+16 more)

### Community 24 - "Community 24"
Cohesion: 0.09
Nodes (32): Amplify Workflow Skill, Backend Phase Reference, Deploy Phase Reference, Frontend Phase Reference, Next Best Practices Skill, Async Patterns Guide, Bundling Guide, Data Patterns Guide (+24 more)

### Community 25 - "Community 25"
Cohesion: 0.16
Nodes (32): A5e(), ate(), B5e(), c5e(), CE(), d5e(), e5e(), EE() (+24 more)

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (27): _4(), aI(), av(), Bpe(), D0(), FB(), findInstallState(), findLocatorForLocation() (+19 more)

### Community 27 - "Community 27"
Cohesion: 0.11
Nodes (19): Aa(), ao(), dP(), e2(), FA(), fP(), gh(), Gn() (+11 more)

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (25): accepts(), $b(), bindDescriptor(), c9(), Cw(), dB(), DQ(), forgetVirtualResolutions() (+17 more)

### Community 29 - "Community 29"
Cohesion: 0.10
Nodes (28): as(), By(), componentDidCatch(), Do(), HL(), Hn(), Ia(), ip() (+20 more)

### Community 30 - "Community 30"
Cohesion: 0.06
Nodes (38): decode(), Dvt(), Fbe(), findGeneralName(), gB(), Gde(), getIdentityToken(), getRoleForTarget() (+30 more)

### Community 31 - "Community 31"
Cohesion: 0.07
Nodes (29): babel-plugin-styled-components, contentful, @contentful/rich-text-react-renderer, dotenv, fast-xml-parser, framer-motion, next, dependencies (+21 more)

### Community 32 - "Community 32"
Cohesion: 0.08
Nodes (16): configuration, dir, { favicons }, fs, path, siteConfig, config, { resolve } (+8 more)

### Community 33 - "Community 33"
Cohesion: 0.08
Nodes (32): $6(), addDirectory(), allocateBuffer(), allocateSource(), allocateUnattachedSource(), dd(), discardAndClose(), [ehe]() (+24 more)

### Community 34 - "Community 34"
Cohesion: 0.10
Nodes (36): c0t(), CB(), cloneFromRemote(), del(), dht(), eY(), F1e(), finalizeInstall() (+28 more)

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
Cohesion: 0.16
Nodes (18): ape(), cpe(), gE(), Ih(), jtt(), kR(), lm(), lpe() (+10 more)

### Community 39 - "Community 39"
Cohesion: 0.07
Nodes (32): axe(), BTe(), Ff(), fLe(), fMe(), hxe(), iTe(), ixe() (+24 more)

### Community 40 - "Community 40"
Cohesion: 0.07
Nodes (11): Eht(), Iht(), mht(), [mm](), On(), pushNode(), qWe(), removeNode() (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.09
Nodes (24): cUe(), gHe(), i_e(), iUe(), jme(), kM(), kUe(), LK() (+16 more)

### Community 42 - "Community 42"
Cohesion: 0.09
Nodes (24): aU(), _createIndexRecord(), e6e(), _filter(), isBlockDevice(), isCharacterDevice(), isDirectory(), _isDuplicateEntry() (+16 more)

### Community 43 - "Community 43"
Cohesion: 0.09
Nodes (24): addListener(), cle(), collect(), createStreamReporter(), createWriteStream(), Fmt(), getSubprocessStreams(), hdt() (+16 more)

### Community 44 - "Community 44"
Cohesion: 0.13
Nodes (19): Bqe(), choiceMessage(), choiceSeparator(), indent(), indicator(), [iT](), [nhe](), normalizeDependencyMap() (+11 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (19): altDown(), altUp(), complete(), completion(), cutForward(), deleteForward(), element(), footer() (+11 more)

### Community 46 - "Community 46"
Cohesion: 0.10
Nodes (21): aM(), are(), dle(), dz(), gle(), gM(), hRe(), jRe() (+13 more)

### Community 47 - "Community 47"
Cohesion: 0.08
Nodes (33): ask(), cit(), cmt(), definition(), definitions(), [Dv](), _emscripten_get_now(), _emscripten_set_main_loop() (+25 more)

### Community 48 - "Community 48"
Cohesion: 0.12
Nodes (24): anyNeedsWireRead(), anyNeedsWireWrite(), buildCallerFunction(), buildJSCallerFunction(), constructType(), getDynCall(), getType(), getTypes() (+16 more)

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (12): HBe(), Hwt(), i1t(), isEnd(), isStart(), toJSON(), toMMPattern(), toRegExpSource() (+4 more)

### Community 50 - "Community 50"
Cohesion: 0.09
Nodes (22): Build-time vs Runtime, Docker Compose, Docker Deployment, Dockerfile, Environment Variables, Health Check Endpoint, Image Optimization, ISR and Cache Handlers (+14 more)

### Community 51 - "Community 51"
Cohesion: 0.16
Nodes (14): hpe(), [ihe](), kj(), [l6](), [lT](), lv(), [o6](), Qj() (+6 more)

### Community 52 - "Community 52"
Cohesion: 0.09
Nodes (23): extAuthorityKeyID(), extBasicConstraints(), extension(), extKeyUsage(), extSCT(), extSubjectAltName(), extSubjectKeyID(), findExtension() (+15 more)

### Community 53 - "Community 53"
Cohesion: 0.17
Nodes (10): aj(), avt(), fj(), ftt(), $H(), lj(), pvt(), QU() (+2 more)

### Community 54 - "Community 54"
Cohesion: 0.18
Nodes (17): bt(), compareDigest(), compareSignature(), da(), Fh(), h2(), is(), jBt() (+9 more)

### Community 55 - "Community 55"
Cohesion: 0.10
Nodes (20): Async Patterns, Bundling, Data Patterns, Debug Tricks, Directives, Error Handling, File Conventions, Font Optimization (+12 more)

### Community 56 - "Community 56"
Cohesion: 0.15
Nodes (7): ah(), _flush(), getTransformer(), NB(), O2e(), Pdt(), xdt()

### Community 57 - "Community 57"
Cohesion: 0.14
Nodes (26): alert(), append(), backward(), decrement(), default(), disable(), dispatch(), forward() (+18 more)

### Community 58 - "Community 58"
Cohesion: 0.08
Nodes (28): Ase(), _at(), But(), capture(), DCe(), dit(), E8(), fse() (+20 more)

### Community 59 - "Community 59"
Cohesion: 0.21
Nodes (12): deleteEntry(), JZ(), KZ(), mktempSync(), moveSync(), removeSync(), rmdirSync(), rmSync() (+4 more)

### Community 60 - "Community 60"
Cohesion: 0.09
Nodes (70): a0t(), appendFilePromise(), attachInternalDependencies(), checksumFilePromise(), chmodPromise(), CK(), closePromise(), copyFilePromise() (+62 more)

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
Cohesion: 0.13
Nodes (16): Cdt(), Idt(), Jze(), k2e(), mdt(), mQ(), [NI](), Ny() (+8 more)

### Community 65 - "Community 65"
Cohesion: 0.33
Nodes (6): aG(), Bit(), c0e(), oG(), wit(), yit()

### Community 66 - "Community 66"
Cohesion: 0.11
Nodes (17): 1. Missing `default.tsx` → 404 on Refresh, 2. Modal Persists After Navigation, 3. Nested Parallel Routes Need Defaults Too, 4. Intercepted Route Shows Wrong Content, 5. TypeScript Errors with `params`, Common Gotchas, Complete Example: Photo Gallery Modal, File Structure (+9 more)

### Community 67 - "Community 67"
Cohesion: 0.14
Nodes (13): BaseImage, calculateRowHeight(), DateText, filterObject(), FlickrImage, getStaticProps(), isFlickrEmbed(), isFlickrNode() (+5 more)

### Community 68 - "Community 68"
Cohesion: 0.07
Nodes (40): addKey(), buildPaths(), compile(), copyIn(), DE(), eyt(), _final(), findIssuer() (+32 more)

### Community 69 - "Community 69"
Cohesion: 0.15
Nodes (18): ave(), Ayt(), cve(), fromGlob(), getBlock(), getUint16(), getUint8(), H9() (+10 more)

### Community 70 - "Community 70"
Cohesion: 0.05
Nodes (49): Aat(), AP(), AQ(), BKe(), c(), CBt(), check(), createWorker() (+41 more)

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
Cohesion: 0.10
Nodes (22): B1e(), Bht(), catch(), chmod(), _getEntry(), _getFullEntryPath(), _getStat(), getToken() (+14 more)

### Community 75 - "Community 75"
Cohesion: 0.18
Nodes (11): dgt(), from(), ggt(), Gmt(), jmt(), mgt(), ngt(), QBe() (+3 more)

### Community 76 - "Community 76"
Cohesion: 0.13
Nodes (16): D1t(), e9(), EB(), EGe(), exec(), G4(), ime(), JGe() (+8 more)

### Community 77 - "Community 77"
Cohesion: 0.19
Nodes (13): appendChar(), appendUint16(), appendUint24(), appendView(), clone(), ebe(), ensureCapacity(), H2t() (+5 more)

### Community 79 - "Community 79"
Cohesion: 0.14
Nodes (9): a2e(), Cgt(), Egt(), i2e(), Igt(), l2e(), Sgt(), Vi() (+1 more)

### Community 80 - "Community 80"
Cohesion: 0.22
Nodes (9): addOrCreate(), Bze(), Kle(), kX(), M$(), QLe(), Rc(), release() (+1 more)

### Community 81 - "Community 81"
Cohesion: 0.25
Nodes (9): Dqe(), fM(), fz(), mQe(), mX(), oUe(), sUe(), wqe() (+1 more)

### Community 82 - "Community 82"
Cohesion: 0.13
Nodes (18): aBt(), amt(), Cbe(), Dbe(), dBt(), dyt(), gBt(), getTarget() (+10 more)

### Community 83 - "Community 83"
Cohesion: 0.10
Nodes (23): Ac(), Bce(), bU(), ci(), EP(), Et(), fc(), GVe() (+15 more)

### Community 84 - "Community 84"
Cohesion: 0.07
Nodes (29): aNe(), aOe(), BM(), BOe(), cOe(), dNe(), fNe(), gNe() (+21 more)

### Community 85 - "Community 85"
Cohesion: 0.13
Nodes (14): Bundle Analysis, Bundling, Common Problematic Packages, CSS Imports, Error Signs, Error Signs, ESM/CommonJS Issues, Migrating from Webpack to Turbopack (+6 more)

### Community 86 - "Community 86"
Cohesion: 0.13
Nodes (15): BS(), Fje(), gZ(), hHe(), IKe(), Joe(), kqe(), NKe() (+7 more)

### Community 87 - "index.test.jsx"
Cohesion: 0.12
Nodes (22): $5e(), dte(), e9e(), gPe(), gte(), hte(), HU(), isEmpty() (+14 more)

### Community 88 - "vite.config.js"
Cohesion: 0.09
Nodes (29): c0(), C4(), d0t(), dOe(), e_e(), f0(), Goe(), gX() (+21 more)

### Community 89 - "gallery.css.js"
Cohesion: 0.16
Nodes (19): choices(), down(), focus(), isDisabled(), lines(), move(), pageDown(), pageUp() (+11 more)

### Community 90 - "@testing-library/dom"
Cohesion: 0.19
Nodes (14): Co(), createSession(), dat(), dme(), fetchNextAnswer(), genEnforcedDependencies(), genEnforcedFields(), lookup() (+6 more)

### Community 91 - "@testing-library/jest-dom"
Cohesion: 0.14
Nodes (14): Bc(), bje(), Dje(), _fillStorage(), _getPatternSegments(), makeRe(), nU(), Pje() (+6 more)

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
Cohesion: 0.24
Nodes (10): an(), Bxe(), cxe(), hz(), ile(), lxe(), mKe(), nre() (+2 more)

### Community 97 - "Bc"
Cohesion: 0.15
Nodes (13): checkPath(), createEntry(), cutLeft(), equals(), FVe(), gdt(), git(), odt() (+5 more)

### Community 98 - "Cache Components (Next.js 16+)"
Cohesion: 0.09
Nodes (41): Ae(), Be(), bI(), d4(), d8(), dl(), ensureDependencyMeta(), ensurePeerDependencyMeta() (+33 more)

### Community 99 - "jM"
Cohesion: 0.25
Nodes (8): end(), F2e(), _getKeyUnprefix(), Int(), _llvm_stackrestore(), Q1t(), splice(), unpipe()

### Community 100 - "createCacheableRequest"
Cohesion: 0.18
Nodes (11): Common Mistakes, Display Strategy, Don't Use Manual Font Links, Font in Specific Components, Font Optimization, Font Weights and Styles, Google Fonts, Local Fonts (+3 more)

### Community 101 - "match"
Cohesion: 0.20
Nodes (12): Ba(), bre(), gQe(), hqe(), hx(), jQe(), Qre(), Sre() (+4 more)

### Community 103 - "What You Must Do When Invoked"
Cohesion: 0.40
Nodes (6): cast(), isFalse(), isTrue(), isValue(), validate(), value()

### Community 104 - "ad"
Cohesion: 0.24
Nodes (11): checkFinalSnapsnot(), checkFinalTimestamp(), isDelegatedRole(), isExpired(), loadTrustedRoot(), updateDelegatedTargets(), updateRoot(), updateSnapshot() (+3 more)

### Community 105 - "concat"
Cohesion: 0.16
Nodes (19): Ait(), cx(), dn(), hE(), ir(), isChecksumCompatible(), Kg(), kU() (+11 more)

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
Cohesion: 0.24
Nodes (8): Carousel, createSortFunction(), GalleryContainer, GalleryImageWrapper, Gallery(), mapToPhotoAlbumFormat(), orderArray(), renderNextImage()

### Community 113 - "fromJSON"
Cohesion: 0.39
Nodes (6): Card, Container, Details, SLink, Thumb, ThumbWrapper

### Community 114 - "reduce"
Cohesion: 0.20
Nodes (10): a7e(), Dse(), i7e(), kse(), l7e(), n7e(), o7e(), Pse() (+2 more)

### Community 115 - "findExtension"
Cohesion: 0.07
Nodes (33): addOnExit(), addOnInit(), addOnPreMain(), addOnPreRun(), _atexit(), e0t(), eDe(), EEt() (+25 more)

### Community 116 - "Mn"
Cohesion: 0.28
Nodes (9): bK(), dSt(), fromFile(), fromText(), genCommitMessage(), loadFile(), loadFromText(), Qce() (+1 more)

### Community 117 - "alert"
Cohesion: 0.38
Nodes (5): addBlurDataURLs(), BLUR_CONCURRENCY, blurDataURLCache, fetchWithTimeout(), makeBlurDataURL()

### Community 118 - "test"
Cohesion: 0.23
Nodes (13): e2t(), getTargetInfo(), loadLocalMetadata(), loadRoot(), loadSnapshot(), loadTargets(), loadTimestamp(), persistMetadata() (+5 more)

### Community 119 - ".unshift"
Cohesion: 0.36
Nodes (6): Categories, Container, Counter, TitleHeader, Filter(), filters

### Community 120 - "split"
Cohesion: 0.39
Nodes (8): client, getAllEntries(), getCategoriesPaths(), getEntries(), getPostsPaths(), parseFields(), parseImage(), parseItem()

### Community 121 - "Nl"
Cohesion: 0.50
Nodes (4): A0(), Ltt(), mtt(), tv()

### Community 122 - "forEach"
Cohesion: 0.14
Nodes (13): Bdt(), [Cv](), Ea(), encode(), encodeBody(), encodeField(), [eV](), Fdt() (+5 more)

### Community 123 - "Next.js Best Practices"
Cohesion: 0.18
Nodes (11): getLocalPath(), getResolverByLocator(), getWorkspace(), getWorkspaceByCwd(), gw(), Js(), normalizeLocator(), PQ() (+3 more)

### Community 124 - "qKe"
Cohesion: 0.43
Nodes (5): DateBase, DateMain, DateMobile, DateText(), formatDate()

### Community 125 - "sort"
Cohesion: 0.50
Nodes (4): push64(), pushMutablePointer(), pushPointer(), pushValue()

### Community 126 - "Metadata"
Cohesion: 0.17
Nodes (12): dX(), iNe(), kke(), nz(), oM(), r_e(), sNe(), t3() (+4 more)

### Community 127 - "wE"
Cohesion: 0.40
Nodes (5): Aht(), fht(), pht(), uht(), Uwe()

### Community 128 - "nFe"
Cohesion: 0.16
Nodes (14): $1(), B2(), bo(), d2(), Ga(), gf(), ha(), hP() (+6 more)

### Community 129 - "parse"
Cohesion: 0.33
Nodes (6): getExtractHint(), n2(), s2(), vy(), W(), yh()

### Community 130 - "Rr"
Cohesion: 0.29
Nodes (7): _emitEntry(), _handleDirectory(), _handleEntry(), _handleError(), _handleQueue(), _pushToStorage(), _worker()

### Community 131 - "Parallel & Intercepting Routes"
Cohesion: 0.67
Nodes (3): attachExternalDependents(), getDiskInformation(), jW()

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
Cohesion: 0.12
Nodes (20): a3e(), B3e(), c3e(), d3e(), g3e(), jM(), jXe(), K0t() (+12 more)

### Community 140 - "tae"
Cohesion: 0.14
Nodes (11): a8(), addPath(), commitBuffer(), o8(), popArray(), pushArray(), pushBuffer(), pushExternal() (+3 more)

### Community 142 - "jh"
Cohesion: 0.67
Nodes (3): CZ(), eTe(), stop()

### Community 143 - "Bundling"
Cohesion: 0.08
Nodes (27): connect(), createConnection(), e$(), getSession(), iet(), l9e(), mf(), mh() (+19 more)

### Community 144 - "Vi"
Cohesion: 0.33
Nodes (6): extensionsObj(), findSequenceMember(), isContextSpecific(), keyIdentifier(), signedAttrsObj(), signedDataObj()

### Community 145 - ".end"
Cohesion: 0.07
Nodes (28): ad(), B8e(), BLe(), BMe(), c4e(), cMe(), eUe(), fUe() (+20 more)

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
Cohesion: 0.12
Nodes (22): bL(), Cf(), Ct(), Eh(), Fg(), fu(), GU(), Gy() (+14 more)

### Community 158 - "Yf"
Cohesion: 0.67
Nodes (3): kIt(), PIt(), xIt()

### Community 159 - "submit"
Cohesion: 0.33
Nodes (6): [Cm](), eNe(), kFe(), Qz(), tNe(), xFe()

### Community 167 - "ZP"
Cohesion: 0.13
Nodes (26): api(), chown(), chownPromise(), chownSync(), fchmodPromise(), fchmodSync(), fchownPromise(), fchownSync() (+18 more)

### Community 168 - "oM"
Cohesion: 0.09
Nodes (29): activatePlugin(), b8(), btt(), cq(), create(), dF(), Dtt(), dxe() (+21 more)

### Community 169 - "Font Optimization"
Cohesion: 0.40
Nodes (5): B2e(), ddt(), edt(), ndt(), tdt()

### Community 170 - "package.json"
Cohesion: 0.40
Nodes (5): cHe(), fHe(), lHe(), [rhe](), uHe()

### Community 171 - "iqe"
Cohesion: 0.05
Nodes (49): _3e(), B4e(), cte(), d4e(), dKe(), e4e(), exe(), fTe() (+41 more)

### Community 172 - "oqe"
Cohesion: 0.11
Nodes (40): a2(), cP(), D6e(), dc(), dh(), dr(), dt(), Dy() (+32 more)

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
Nodes (22): aHe(), bse(), concat(), filterChanges(), first(), Hce(), kwe(), LB() (+14 more)

### Community 184 - "graphify reference: extra exports and benchmark"
Cohesion: 0.50
Nodes (4): _4e(), o4e(), u4e(), vx()

### Community 185 - "isContextSpecific"
Cohesion: 0.11
Nodes (26): ensureVirtualLink(), fetch(), fetchFromDisk(), fetchFromNetwork(), fetchHostedRepository(), getDependencyMeta(), getFetcher(), getRealPath() (+18 more)

### Community 186 - "fBt"
Cohesion: 0.50
Nodes (4): Aue(), CKe(), iz(), uke()

### Community 188 - "fM"
Cohesion: 0.15
Nodes (17): A5(), D5(), fetchEverything(), finally(), getLocatorMirrorPath(), getLocatorPath(), getVersionFilename(), ju() (+9 more)

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

### Community 207 - "xFe"
Cohesion: 0.67
Nodes (3): BCt(), SCt(), vCt()

### Community 209 - "Lh"
Cohesion: 0.25
Nodes (8): Att(), downloadHosted(), Kvt(), P1(), reduceHook(), Xvt(), zB(), zvt()

### Community 210 - "toChoice"
Cohesion: 0.67
Nodes (3): c8e(), l8e(), u8e()

### Community 211 - "oG"
Cohesion: 0.67
Nodes (3): critical(), isCA(), toBoolean()

### Community 212 - "Cgt"
Cohesion: 0.18
Nodes (18): appendFileSync(), changeFileBufferSync(), changeFileSync(), changeFileTextSync(), copyFileSync(), eSt(), Fgt(), getFileSource() (+10 more)

### Community 214 - "Wot"
Cohesion: 0.67
Nodes (3): due(), mUe(), yUe()

### Community 215 - "p3e"
Cohesion: 0.67
Nodes (3): Eze(), ize(), u3()

### Community 216 - "t_"
Cohesion: 0.67
Nodes (3): hasDependency(), hasHardDependency(), hasSoftDependency()

### Community 218 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.67
Nodes (3): o1e(), RW(), s1e()

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
Cohesion: 0.07
Nodes (31): _1t(), [bhe](), _d(), e0e(), [e6](), epe(), [f6](), fit() (+23 more)

## Knowledge Gaps
- **377 isolated node(s):** `Carousel`, `componentSizes`, `DateText`, `next_config`, `BLUR_CONCURRENCY` (+372 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **63 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Aa()` connect `Community 27` to `Community 0`, `Community 2`, `Community 3`, `kgt`, `Community 10`, `Community 43`, `Community 83`, `Community 54`, `Community 58`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `Vi()` connect `Community 79` to `Community 0`, `Community 75`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `a()` connect `Community 2` to `Community 0`, `Community 1`, `Rr`, `Community 3`, `Community 4`, `Community 5`, `oOe`, `Community 7`, `kgt`, `Community 8`, `nFe`, `Community 11`, `tae`, `Community 14`, `Bundling`, `Community 15`, `Community 17`, `Community 18`, `Community 19`, `Community 23`, `Community 25`, `Community 26`, `Community 27`, `.indexOf`, `Community 30`, `Community 29`, `Yf`, `Community 33`, `Community 34`, `Community 37`, `Community 38`, `ZP`, `oM`, `Font Optimization`, `Community 40`, `Community 43`, `Community 44`, `oqe`, `Community 45`, `Community 47`, `Community 42`, `Community 49`, `Async Params and SearchParams`, `Community 51`, `Community 57`, `isContextSpecific`, `Community 59`, `Community 60`, `fM`, `Community 64`, `Community 68`, `Community 70`, `Community 74`, `Community 75`, `Community 79`, `Community 80`, `Lh`, `Community 82`, `Cgt`, `index.test.jsx`, `vite.config.js`, `gallery.css.js`, `@testing-library/dom`, `Cache Components (Next.js 16+)`, `ad`, `concat`, `abort`, `Next.js Best Practices`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Are the 233 inferred relationships involving `a()` (e.g. with `a1e()` and `a2e()`) actually correct?**
  _`a()` has 233 INFERRED edges - model-reasoned connections that need verification._
- **Are the 226 inferred relationships involving `n()` (e.g. with `_9e()` and `A5()`) actually correct?**
  _`n()` has 226 INFERRED edges - model-reasoned connections that need verification._
- **Are the 173 inferred relationships involving `c()` (e.g. with `_9e()` and `a1e()`) actually correct?**
  _`c()` has 173 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `execute()` (e.g. with `Be()` and `g()`) actually correct?**
  _`execute()` has 6 INFERRED edges - model-reasoned connections that need verification._