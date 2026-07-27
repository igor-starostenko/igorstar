# Graph Report - igorstar  (2026-07-25)

## Corpus Check
- 146 files · ~99,993 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3904 nodes · 11698 edges · 278 communities (211 shown, 67 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 871 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `270f7784`
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
- Error Handling
- File Conventions
- j2t
- .read
- ZP
- Font Optimization
- package.json
- iqe
- oqe
- makeBound
- Async Params and SearchParams
- contentfulLoader.js
- Common Causes and Fixes
- aHe
- left
- pop
- splice
- Ea
- Hh
- graphify reference: extra exports and benchmark
- isContextSpecific
- fBt
- XP
- fM
- makeLibzipError
- callRuntimeCallbacks
- Xht
- createReadStream
- Sn
- k2e
- Directives
- Uwe
- applyChanges
- y8
- lte
- warn
- HK
- article.test.jsx
- xQ
- xFe
- i$
- Lh
- toChoice
- oG
- Cgt
- ns
- Wot
- p3e
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
- build
- Fdt
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
- ize
- _fillStorage
- hasDependency
- xIt
- o1e
- Wk
- @babel/plugin-transform-modules-commonjs
- core-js
- g_e
- addMethod
- nde
- B9
- kgt
- SBt
- bitString
- Agent Guidelines
- Cht
- Cnt
- Docker Compose Configuration
- License Document
- xQ

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

## Communities (278 total, 67 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (48): addKey(), addWorkspace(), aj(), aSt(), Att(), BKe(), But(), c9() (+40 more)

### Community 1 - "Community 1"
Cohesion: 0.04
Nodes (96): a(), ame(), AQ(), bI(), Bqe(), c(), CBt(), cmt() (+88 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (34): CB(), del(), finalizeInstallWithPnp(), findInstallState(), findLocatorForLocation(), findPackageLocation(), findPackageLocator(), getCustomDataKey() (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (63): accessSync(), appendFileSync(), C2t(), changeFileBufferSync(), changeFileSync(), changeFileTextSync(), chmodSync(), copyFilePromise() (+55 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (38): a0t(), a1e(), accessPromise(), attachInternalDependencies(), chmodPromise(), CK(), copyPromise(), e5() (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (29): _9e(), eqe(), g9e(), H9e(), i9e(), ii(), ire(), j9e() (+21 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (45): c0e(), definitions(), filterChanges(), generateLockfile(), getUsageByIndex(), getUsageByRegistration(), getWorkspaceByFilePath(), h7() (+37 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (61): Aot(), Bot(), C5(), cde(), commit(), commitTips(), cot(), execute() (+53 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (38): Backend Phase Instructions, Critical Constraints, Error Handling, Phase Complete, Prerequisites Confirmed, Retrieve and Follow the SOP, SOP Overrides, Deploy Phase Instructions (+30 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (28): attachCustomData(), catch(), F1e(), finalizeInstall(), getDependencyMeta(), getRealPath(), getSupportedArchitectures(), getWorkspaceByLocator() (+20 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (20): Ac(), ci(), fc(), HL(), Ia(), Lct(), mE(), Mi() (+12 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (46): add(), addAlgoliaAgent(), AP(), Bht(), c0(), c0t(), createEnvironment(), delete() (+38 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (17): Container, Copyright, Social, Footer(), validSocial, FivehundredpxIcon(), FlickrIcon(), GithubIcon() (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.07
Nodes (30): _8e(), aU(), _createIndexRecord(), _filter(), _getEntryLevel(), getFilter(), _getMatcher(), _getNegativePatternsRe() (+22 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (24): attachExternalDependents(), Bce(), braceExpand(), debug(), ensureJSsource(), getDiskInformation(), Hje(), Ih() (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (33): decode(), Dvt(), Fbe(), findGeneralName(), Gde(), getIdentityToken(), getRoleForTarget(), getRoles() (+25 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (32): as(), bf(), bL(), componentDidCatch(), cP(), dc(), dh(), dr() (+24 more)

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (26): axe(), BTe(), Ff(), fLe(), fMe(), hxe(), iTe(), Kme() (+18 more)

### Community 18 - "Community 18"
Cohesion: 0.08
Nodes (39): B2t(), _beforeError(), _checkIterableAdaptar(), componentDidMount(), componentWillUnmount(), constructor(), cursorHide(), cursorShow() (+31 more)

### Community 19 - "Community 19"
Cohesion: 0.08
Nodes (35): a8e(), a_e(), B_e(), BX(), c_e(), Ca(), cRe(), d2() (+27 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (39): addPlugin(), applyLightResolution(), changeFileBufferPromise(), changeFilePromise(), changeFileTextPromise(), cs(), dit(), executeStandard() (+31 more)

### Community 21 - "Community 21"
Cohesion: 0.06
Nodes (33): @babel/core, @babel/register, chrome-launcher, favicons, mkdirp, @next/bundle-analyzer, next-sitemap, node-gyp (+25 more)

### Community 22 - "Community 22"
Cohesion: 0.09
Nodes (32): Amplify Workflow Skill, Backend Phase Reference, Deploy Phase Reference, Frontend Phase Reference, Next Best Practices Skill, Async Patterns Guide, Bundling Guide, Data Patterns Guide (+24 more)

### Community 23 - "Community 23"
Cohesion: 0.17
Nodes (31): A5e(), ate(), B5e(), c5e(), CE(), d5e(), e5e(), EE() (+23 more)

### Community 24 - "Community 24"
Cohesion: 0.10
Nodes (19): addListener(), cle(), collect(), Fdt(), iet(), [_j](), _je(), kdt() (+11 more)

### Community 25 - "Community 25"
Cohesion: 0.10
Nodes (27): $6(), addDirectory(), allocateBuffer(), allocateSource(), allocateUnattachedSource(), dd(), discardAndClose(), [ehe]() (+19 more)

### Community 26 - "Community 26"
Cohesion: 0.08
Nodes (26): api(), [BBe](), Bdt(), Bgt(), [BN](), cancel(), close(), closeFreeSessions() (+18 more)

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (42): appendFile(), appendFilePromise(), art(), ax(), checksumFilePromise(), chown(), chownPromise(), chownSync() (+34 more)

### Community 28 - "Community 28"
Cohesion: 0.07
Nodes (29): babel-plugin-styled-components, contentful, @contentful/rich-text-react-renderer, dotenv, fast-xml-parser, framer-motion, next, prop-types (+21 more)

### Community 29 - "Community 29"
Cohesion: 0.08
Nodes (16): configuration, dir, { favicons }, fs, path, siteConfig, config, { resolve } (+8 more)

### Community 30 - "Community 30"
Cohesion: 0.11
Nodes (30): _4(), aI(), anchoredPackage(), av(), Bpe(), FB(), fetchEverything(), ftt() (+22 more)

### Community 31 - "Community 31"
Cohesion: 0.33
Nodes (6): captureString(), clean(), getLocatorUrl(), inc(), isConventionalTarballUrl(), TK()

### Community 32 - "Community 32"
Cohesion: 0.09
Nodes (25): abort(), abortOnCannotGrowMemory(), allocate(), assert(), demangle(), demangleAll(), enlargeMemory(), getCFunc() (+17 more)

### Community 33 - "Community 33"
Cohesion: 0.07
Nodes (11): Eht(), Iht(), mht(), [mm](), On(), pushNode(), qWe(), removeNode() (+3 more)

### Community 34 - "Community 34"
Cohesion: 0.07
Nodes (26): 1. Static (Auto-Prerendered), 2. Cached (`use cache`), 3. Dynamic (Suspense), Built-in Profiles, Cache Components (Next.js 16+), Cache Invalidation, Cache Key Generation, Cache Profiles (+18 more)

### Community 35 - "Community 35"
Cohesion: 0.06
Nodes (38): _1t(), ape(), [bhe](), cpe(), createStreamReporter(), [Cv](), _d(), [e6]() (+30 more)

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (8): qSt(), reportCommandName(), reportDependencyCount(), reportPackageExtension(), reportPluginName(), reportValue(), reportVersion(), reportWorkspaceCount()

### Community 37 - "Community 37"
Cohesion: 0.13
Nodes (30): Ae(), Be(), d4(), detachTemp(), executeInteractive(), g(), getSubprocessStreams(), jtt() (+22 more)

### Community 38 - "Community 38"
Cohesion: 0.17
Nodes (12): bse(), c6e(), Co(), concat(), dme(), I6e(), OJe(), ost() (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.06
Nodes (39): accepts(), cloneFromRemote(), dB(), downloadHosted(), ensureVirtualLink(), f9(), fetch(), fetchHostedRepository() (+31 more)

### Community 40 - "Community 40"
Cohesion: 0.09
Nodes (31): amt(), appendChar(), appendUint16(), appendUint24(), appendView(), buildPaths(), Cbe(), checkPath() (+23 more)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (8): k5(), Lde(), Ode(), QC(), qot(), RS(), tw(), ZP()

### Community 42 - "Community 42"
Cohesion: 0.11
Nodes (27): bh(), BP(), dF(), Ds(), Eu(), Fo(), G2(), getExtractHint() (+19 more)

### Community 43 - "Community 43"
Cohesion: 0.12
Nodes (21): By(), Do(), Et(), Ga(), GVe(), ha(), ht(), ip() (+13 more)

### Community 44 - "Community 44"
Cohesion: 0.09
Nodes (25): a1t(), addOption(), commonFieldsFromJSON(), dg(), di(), e1t(), Es(), fromJSON() (+17 more)

### Community 45 - "Community 45"
Cohesion: 0.19
Nodes (20): alert(), append(), backward(), decrement(), disable(), dispatch(), forward(), getItem() (+12 more)

### Community 46 - "Community 46"
Cohesion: 0.07
Nodes (29): aNe(), aOe(), BM(), BOe(), cOe(), dNe(), fNe(), gNe() (+21 more)

### Community 47 - "Community 47"
Cohesion: 0.36
Nodes (8): anyNeedsWireRead(), buildCallerFunction(), buildJSCallerFunction(), listResources(), makeArgList(), makeJSCaller(), makeWireRead(), makeWireWrite()

### Community 48 - "Community 48"
Cohesion: 0.06
Nodes (32): cUe(), fUe(), gHe(), gUe(), hUe(), i_e(), iUe(), jme() (+24 more)

### Community 49 - "Community 49"
Cohesion: 0.09
Nodes (22): Build-time vs Runtime, Docker Compose, Docker Deployment, Dockerfile, Environment Variables, Health Check Endpoint, Image Optimization, ISR and Cache Handlers (+14 more)

### Community 50 - "Community 50"
Cohesion: 0.15
Nodes (14): BaseImage(), FlickrImage(), parseFlickrImage(), parser, ImageContainer, ImageCopyright, ImageFooter, ImageFrame (+6 more)

### Community 51 - "Community 51"
Cohesion: 0.10
Nodes (33): $1(), a2(), B2(), dt(), Dy(), ed(), Ei(), En() (+25 more)

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (13): gPe(), Hn(), hte(), HU(), isEmpty(), J5e(), K5e(), Nn() (+5 more)

### Community 53 - "Community 53"
Cohesion: 0.18
Nodes (11): __decorate(), _defineHidden(), disableMember(), __extends(), makeBound(), __nbind_get_value_object(), _nbind_value(), pop64() (+3 more)

### Community 54 - "Community 54"
Cohesion: 0.13
Nodes (20): choiceMessage(), choiceSeparator(), E8(), getConditions(), indent(), indicator(), [iT](), [nhe]() (+12 more)

### Community 55 - "Community 55"
Cohesion: 0.12
Nodes (22): ask(), createWorker(), definition(), dre(), error(), format(), GSt(), HSt() (+14 more)

### Community 56 - "Community 56"
Cohesion: 0.09
Nodes (23): extAuthorityKeyID(), extBasicConstraints(), extension(), extKeyUsage(), extSCT(), extSubjectAltName(), extSubjectKeyID(), findExtension() (+15 more)

### Community 57 - "Community 57"
Cohesion: 0.08
Nodes (28): a3e(), B3e(), c3e(), d3e(), e8e(), g3e(), i3e(), jM() (+20 more)

### Community 58 - "Community 58"
Cohesion: 0.11
Nodes (27): A5(), $b(), B0t(), bindDescriptor(), Bw(), D5(), DQ(), getCandidates() (+19 more)

### Community 59 - "Community 59"
Cohesion: 0.12
Nodes (16): addOnExit(), addOnInit(), addOnPreMain(), _atexit(), e6e(), fGe(), FVe(), hdt() (+8 more)

### Community 60 - "Community 60"
Cohesion: 0.09
Nodes (30): formatCaption(), getStaticProps(), aGe(), _ageValue(), _allowsStoringAuthenticated(), _assertRequestHasHeaders(), buffer(), _copyWithoutHopByHopHeaders() (+22 more)

### Community 61 - "Community 61"
Cohesion: 0.19
Nodes (15): bt(), Cy(), da(), Fh(), fl(), h2(), is(), jg() (+7 more)

### Community 62 - "Community 62"
Cohesion: 0.29
Nodes (7): compare(), compareMain(), comparePre(), m8(), Pce(), xce(), y8()

### Community 63 - "Community 63"
Cohesion: 0.14
Nodes (19): ave(), Ayt(), cve(), fromGlob(), getBlock(), getUint16(), getUint8(), H9() (+11 more)

### Community 64 - "Community 64"
Cohesion: 0.09
Nodes (38): bZ(), cacheCleanup(), createEntry(), cSt(), dK(), e$(), eSt(), EZ() (+30 more)

### Community 65 - "Community 65"
Cohesion: 0.10
Nodes (20): Async Patterns, Bundling, Data Patterns, Debug Tricks, Directives, Error Handling, File Conventions, Font Optimization (+12 more)

### Community 66 - "Community 66"
Cohesion: 0.09
Nodes (30): activatePlugin(), b8(), btt(), cq(), create(), D0(), Dtt(), dxe() (+22 more)

### Community 67 - "Community 67"
Cohesion: 0.06
Nodes (31): ad(), B8e(), BLe(), BMe(), c4e(), cMe(), eUe(), Hh() (+23 more)

### Community 68 - "Community 68"
Cohesion: 0.22
Nodes (10): adjascentGlobstarOptimize(), firstPhasePreProcess(), _getKeyUnprefix(), Int(), _llvm_stackrestore(), partsMatch(), preprocess(), Q1t() (+2 more)

### Community 69 - "Community 69"
Cohesion: 0.11
Nodes (18): Avoid Duplicate Fetches, Basic OG Image, Custom Fonts, Dynamic Metadata, Dynamic OG Image, File Naming, Important Rules, Important: Server Components Only (+10 more)

### Community 70 - "Community 70"
Cohesion: 0.11
Nodes (19): scripts, analyze, build, build:analyze, build:dir, build:favicons, build:images, build:sitemap (+11 more)

### Community 71 - "Community 71"
Cohesion: 0.11
Nodes (19): aFe(), dFe(), eFe(), fFe(), gFe(), hFe(), iFe(), im() (+11 more)

### Community 72 - "Community 72"
Cohesion: 0.11
Nodes (17): 1. Missing `default.tsx` → 404 on Refresh, 2. Modal Persists After Navigation, 3. Nested Parallel Routes Need Defaults Too, 4. Intercepted Route Shows Wrong Content, 5. TypeScript Errors with `params`, Common Gotchas, Complete Example: Photo Gallery Modal, File Structure (+9 more)

### Community 73 - "Community 73"
Cohesion: 0.14
Nodes (13): BaseImage, calculateRowHeight(), DateText, filterObject(), FlickrImage, getStaticProps(), isFlickrEmbed(), isFlickrNode() (+5 more)

### Community 74 - "Community 74"
Cohesion: 0.12
Nodes (13): Always Use next/image, Blur Placeholder, Common Mistakes, Image Optimization, Priority Loading, Remote Images Configuration, Required Props, Responsive Images (+5 more)

### Community 75 - "Community 75"
Cohesion: 0.11
Nodes (21): connect(), createConnection(), _getEntry(), getSession(), _getStat(), lookup(), _makeEntry(), Mme() (+13 more)

### Community 76 - "Community 76"
Cohesion: 0.29
Nodes (10): Ait(), bU(), cx(), gE(), hE(), kU(), PU(), T2() (+2 more)

### Community 77 - "Community 77"
Cohesion: 0.12
Nodes (21): Aa(), ao(), bo(), dP(), e2(), FA(), fP(), gh() (+13 more)

### Community 78 - "Community 78"
Cohesion: 0.09
Nodes (22): Ch(), dump(), [Hj](), hpe(), [ihe](), kj(), [l6](), [lT]() (+14 more)

### Community 79 - "Community 79"
Cohesion: 0.12
Nodes (15): Avoiding Data Waterfalls, Client Component Data Fetching, Data Patterns, Decision Tree, Option 1: Pass from Server Component (Preferred), Option 2: Fetch on Mount (When Necessary), Option 3: Server Action for Reads (Works But Not Ideal), Pattern 1: Server Components (Preferred for Reads) (+7 more)

### Community 80 - "Community 80"
Cohesion: 0.11
Nodes (23): BV(), eBt(), enable(), forEach(), Fyt(), H6e(), iyt(), jke() (+15 more)

### Community 81 - "Community 81"
Cohesion: 0.16
Nodes (18): choices(), down(), focus(), initialize(), isDisabled(), pageDown(), pageUp(), reset() (+10 more)

### Community 82 - "Community 82"
Cohesion: 0.20
Nodes (11): aBt(), compareDigest(), compareSignature(), dBt(), gBt(), hBt(), jBt(), lBt() (+3 more)

### Community 83 - "Community 83"
Cohesion: 0.11
Nodes (22): altDown(), altUp(), complete(), completion(), cutForward(), deleteForward(), element(), footer() (+14 more)

### Community 84 - "Community 84"
Cohesion: 0.14
Nodes (15): FXe(), IKe(), Joe(), KK(), kqe(), kt(), NKe(), oxe() (+7 more)

### Community 85 - "Community 85"
Cohesion: 0.12
Nodes (18): Cdt(), clear(), clearCache(), first(), Idt(), Jze(), mdt(), mQ() (+10 more)

### Community 86 - "Community 86"
Cohesion: 0.38
Nodes (7): _emscripten_get_now(), _emscripten_set_main_loop(), _emscripten_set_main_loop_timing(), Lat(), setTimeout(), sweep(), toggleLightGC()

### Community 87 - "index.test.jsx"
Cohesion: 0.24
Nodes (14): B9e(), C9e(), D9e(), F9e(), fx(), hz(), i0(), Jf() (+6 more)

### Community 88 - "vite.config.js"
Cohesion: 0.15
Nodes (13): Bundle Analysis, Bundling, Common Problematic Packages, CSS Imports, Error Signs, ESM/CommonJS Issues, Migrating from Webpack to Turbopack, Polyfills (+5 more)

### Community 90 - "@testing-library/dom"
Cohesion: 0.15
Nodes (7): ah(), _flush(), getTransformer(), NB(), O2e(), Pdt(), xdt()

### Community 91 - "@testing-library/jest-dom"
Cohesion: 0.22
Nodes (11): an(), Bxe(), cxe(), gQe(), hqe(), ile(), jQe(), lxe() (+3 more)

### Community 92 - "@testing-library/react"
Cohesion: 0.40
Nodes (6): cast(), hint(), isFalse(), isTrue(), isValue(), value()

### Community 93 - "breakpoints.js"
Cohesion: 0.24
Nodes (8): Carousel, createSortFunction(), GalleryContainer, GalleryImageWrapper, Gallery(), mapToPhotoAlbumFormat(), orderArray(), renderNextImage()

### Community 94 - "isSymbolicLink"
Cohesion: 0.25
Nodes (11): createSession(), dat(), fetchNextAnswer(), genEnforcedDependencies(), genEnforcedFields(), lookupAsync(), makeQuery(), processClassic() (+3 more)

### Community 95 - "find"
Cohesion: 0.08
Nodes (31): C4(), d0t(), e_e(), eY(), f0(), gae(), gB(), Gk() (+23 more)

### Community 96 - "constructor"
Cohesion: 0.17
Nodes (12): Debug Tricks, --debug-build-paths Option, get_errors Tool, get_logs Tool, get_page_metadata Tool, get_project_metadata Tool, get_routes Tool, get_server_action_by_id Tool (+4 more)

### Community 97 - "Bc"
Cohesion: 0.17
Nodes (11): Auth Errors, Error Boundaries, Error Handling, Error Hierarchy, `error.tsx`, `global-error.tsx`, Not Found, `not-found.tsx` (+3 more)

### Community 98 - "Cache Components (Next.js 16+)"
Cohesion: 0.17
Nodes (11): File Conventions, File Conventions Reference, Intercepting Routes, Middleware / Proxy, Next.js 14-15: `middleware.ts`, Next.js 16+: `proxy.ts`, Parallel Routes, Private Folders (+3 more)

### Community 99 - "jM"
Cohesion: 0.17
Nodes (11): core-js, author, core-js, engines, node, greenkeeper, ignore, license (+3 more)

### Community 100 - "createCacheableRequest"
Cohesion: 0.26
Nodes (10): Article(), ArticleDetails, Card, Description, Row, SLink, Thumb, Title (+2 more)

### Community 101 - "match"
Cohesion: 0.18
Nodes (11): $5e(), dte(), e9e(), gte(), kd(), n9e(), pte(), r9e() (+3 more)

### Community 102 - "Oh"
Cohesion: 0.09
Nodes (23): aM(), are(), dle(), dz(), eRe(), gle(), gM(), hRe() (+15 more)

### Community 103 - "What You Must Do When Invoked"
Cohesion: 0.11
Nodes (27): Cf(), D6e(), Eh(), Fg(), fu(), GU(), Gy(), jte() (+19 more)

### Community 104 - "ad"
Cohesion: 0.20
Nodes (10): Ase(), D1t(), EGe(), exec(), JGe(), KGe(), myt(), xVe() (+2 more)

### Community 105 - "concat"
Cohesion: 0.14
Nodes (14): dgt(), from(), gdt(), ggt(), Gmt(), jmt(), k2e(), mgt() (+6 more)

### Community 106 - "abort"
Cohesion: 0.08
Nodes (27): dKe(), Dqe(), dX(), fM(), fz(), hke(), iNe(), kke() (+19 more)

### Community 107 - "Qn"
Cohesion: 0.17
Nodes (13): HBe(), Hwt(), i1t(), isEnd(), isStart(), RBe(), toJSON(), toMMPattern() (+5 more)

### Community 108 - "LL"
Cohesion: 0.18
Nodes (11): Common Mistakes, Display Strategy, Don't Use Manual Font Links, Font in Specific Components, Font Optimization, Font Weights and Styles, Google Fonts, Local Fonts (+3 more)

### Community 109 - ".write"
Cohesion: 0.18
Nodes (18): a4e(), Ale(), compile(), DE(), e3e(), FKe(), h4e(), iqe() (+10 more)

### Community 110 - "verify"
Cohesion: 0.06
Nodes (42): _3e(), aqe(), B4e(), BNe(), cNe(), cqe(), cte(), d4e() (+34 more)

### Community 111 - "makeMethodCaller"
Cohesion: 0.24
Nodes (11): checkFinalSnapsnot(), checkFinalTimestamp(), isDelegatedRole(), isExpired(), loadTrustedRoot(), updateDelegatedTargets(), updateRoot(), updateSnapshot() (+3 more)

### Community 112 - "Self-Hosting Next.js"
Cohesion: 0.20
Nodes (9): Async Cookies and Headers, Async Params and SearchParams, Async Patterns, generateMetadata, Migration Codemod, Pages and Layouts, Route Handlers, SearchParams (+1 more)

### Community 113 - "fromJSON"
Cohesion: 0.20
Nodes (9): After Response, Common Examples, Functions, Generate Functions, Navigation, Navigation Hooks (Client), Request/Response, Server Functions (+1 more)

### Community 114 - "reduce"
Cohesion: 0.20
Nodes (9): Browser-only APIs, Common Causes and Fixes, Date/Time Rendering, Debugging, Error Signs, Hydration Errors, Invalid HTML Nesting, Random Values or IDs (+1 more)

### Community 115 - "findExtension"
Cohesion: 0.20
Nodes (9): Basic Usage, Dynamic Route Handlers, Environment Behavior, GET Handler Conflicts with page.tsx, Request Helpers, Response Helpers, Route Handlers, Supported Methods (+1 more)

### Community 116 - "Mn"
Cohesion: 0.20
Nodes (9): Don't Put Script in Head, Google Analytics, Google Tag Manager, Inline Scripts Need ID, Loading Strategies, Other Third-Party Scripts, Quick Reference, Scripts (+1 more)

### Community 117 - "alert"
Cohesion: 0.33
Nodes (7): CarouselModal(), CloseButton, GalleryImage, ImageContainer, ModalContent, ModalOverlay, mockViews

### Community 118 - "test"
Cohesion: 0.36
Nodes (7): Card, Container, Details, SLink, Thumb, ThumbWrapper, Recommendations()

### Community 119 - ".unshift"
Cohesion: 0.20
Nodes (10): a7e(), Dse(), i7e(), kse(), l7e(), n7e(), o7e(), Pse() (+2 more)

### Community 120 - "split"
Cohesion: 0.40
Nodes (5): Aat(), K$(), r6e(), s$(), t6e()

### Community 121 - "Nl"
Cohesion: 0.22
Nodes (9): addOrCreate(), Bze(), Kle(), kX(), M$(), QLe(), Rc(), release() (+1 more)

### Community 122 - "forEach"
Cohesion: 0.31
Nodes (10): e2t(), loadLocalMetadata(), loadRoot(), loadSnapshot(), loadTargets(), loadTimestamp(), persistMetadata(), r2t() (+2 more)

### Community 123 - "Next.js Best Practices"
Cohesion: 0.22
Nodes (11): cit(), fetchFromDisk(), fetchFromNetwork(), generatePackage(), JZ(), KZ(), m5(), mktempPromise() (+3 more)

### Community 124 - "qKe"
Cohesion: 0.36
Nodes (6): Categories, Container, Counter, TitleHeader, Filter(), filters

### Community 125 - "sort"
Cohesion: 0.28
Nodes (6): componentSizes, addBlurDataURLs(), BLUR_CONCURRENCY, blurDataURLCache, fetchWithTimeout(), makeBlurDataURL()

### Community 126 - "Metadata"
Cohesion: 0.39
Nodes (8): client, getAllEntries(), getCategoriesPaths(), getEntries(), getPostsPaths(), parseFields(), parseImage(), parseItem()

### Community 127 - "wE"
Cohesion: 0.15
Nodes (8): a2e(), Cgt(), Egt(), i2e(), Igt(), Sgt(), Vi(), wgt()

### Community 128 - "nFe"
Cohesion: 0.13
Nodes (20): B1e(), cutLeft(), e0t(), EEt(), Ght(), list(), M1t(), Nct() (+12 more)

### Community 129 - "parse"
Cohesion: 0.27
Nodes (10): Ba(), bre(), hx(), pqe(), Qre(), Sre(), vRe(), xre() (+2 more)

### Community 130 - "Rr"
Cohesion: 0.11
Nodes (19): Bc(), bje(), Dje(), E4(), _fillStorage(), _getPatternSegments(), I4(), kje() (+11 more)

### Community 131 - "Parallel & Intercepting Routes"
Cohesion: 0.12
Nodes (25): bK(), d8(), dl(), dSt(), ensureDependencyMeta(), ensurePeerDependencyMeta(), executeRegular(), exportTo() (+17 more)

### Community 132 - "oOe"
Cohesion: 0.33
Nodes (6): dOe(), Goe(), l0(), mOe(), _oe(), u0()

### Community 133 - "SKILL.md"
Cohesion: 0.22
Nodes (10): e9(), EB(), eme(), ime(), m4(), rme(), sme(), t9() (+2 more)

### Community 134 - "Aa"
Cohesion: 0.33
Nodes (9): dn(), ir(), isChecksumCompatible(), Kg(), Pf(), Pr(), r2(), Uy() (+1 more)

### Community 135 - "Pf"
Cohesion: 0.32
Nodes (8): anyNeedsWireWrite(), constructType(), getDynCall(), getType(), getTypes(), makeCaller(), makeMethodCaller(), queryType()

### Community 137 - "kn"
Cohesion: 0.43
Nodes (5): DateBase, DateMain, DateMobile, DateText(), formatDate()

### Community 138 - "Data Patterns"
Cohesion: 0.25
Nodes (8): chmod(), Jht(), Kht(), t0t(), [the](), u1e(), writeFile(), Xht()

### Community 139 - "getBufferAndClose"
Cohesion: 0.16
Nodes (14): addOnPostRun(), addOnPreRun(), callRuntimeCallbacks(), eDe(), ensureInitRuntime(), exitRuntime(), [HR](), [I6]() (+6 more)

### Community 140 - "tae"
Cohesion: 0.32
Nodes (8): __nbind_register_callback_signature(), __nbind_register_class(), __nbind_register_function(), __nbind_register_type(), readAsciiString(), readPolicyList(), readTypeIdList(), _removeAccessorPrefix()

### Community 141 - "from"
Cohesion: 0.25
Nodes (7): avt(), merge(), nmt(), pvt(), r_(), Rmt(), sc()

### Community 142 - "jh"
Cohesion: 0.29
Nodes (8): _emitEntry(), _handleDirectory(), _handleEntry(), _handleError(), _handleQueue(), _pushToQueue(), _pushToStorage(), _worker()

### Community 143 - "Bundling"
Cohesion: 0.29
Nodes (6): addPath(), commitBuffer(), pushBuffer(), pushExternal(), register(), setContext()

### Community 144 - "Vi"
Cohesion: 0.29
Nodes (7): Aht(), fht(), hF(), lq(), pht(), uht(), Uwe()

### Community 145 - ".end"
Cohesion: 0.29
Nodes (6): Directives, Next.js Directive, React Directives, `'use cache'`, `'use client'`, `'use server'`

### Community 146 - "an"
Cohesion: 0.29
Nodes (6): 1. Async Client Components Are Invalid, 2. Non-Serializable Props to Client Components, 3. Server Actions Are the Exception, Detection Rules, Quick Reference, RSC Boundaries

### Community 147 - "ip"
Cohesion: 0.29
Nodes (6): Detection, Edge Runtime, Node.js Runtime (Default), Runtime Selection, Use Node.js Runtime by Default, When to Use Each

### Community 148 - "render"
Cohesion: 0.33
Nodes (5): client, limit, replaceImages, saveAllAssets(), saveFile()

### Community 149 - "rF"
Cohesion: 0.38
Nodes (7): applyChanges(), getRegistryPath(), readJsonSync(), sendReport(), startBuffer(), writeJsonSync(), zH()

### Community 150 - "wi"
Cohesion: 0.38
Nodes (7): createReadStream(), d2t(), downloadTarget(), findCachedTarget(), g2t(), generateTargetPath(), getTargetInfo()

### Community 151 - "_onResponseBase"
Cohesion: 0.29
Nodes (7): EKe(), nle(), tke(), tle(), $Xe(), XK(), xM()

### Community 152 - "exec"
Cohesion: 0.33
Nodes (6): extensionsObj(), findSequenceMember(), isContextSpecific(), keyIdentifier(), signedAttrsObj(), signedDataObj()

### Community 153 - "preorderDepthFirstWalk"
Cohesion: 0.40
Nodes (5): check(), i$(), n6e(), result(), sync()

### Community 154 - "mE"
Cohesion: 0.50
Nodes (5): clearProgress(), refreshProgress(), truncate(), writeLines(), writeProgress()

### Community 155 - "ah"
Cohesion: 0.50
Nodes (4): A0(), Ltt(), mtt(), tv()

### Community 156 - "lm"
Cohesion: 0.33
Nodes (4): client, contentful, fs, limit

### Community 157 - ".indexOf"
Cohesion: 0.33
Nodes (5): client, contentful, data, fs, json

### Community 158 - "Yf"
Cohesion: 0.53
Nodes (3): Container, Tag, Hashtags()

### Community 159 - "submit"
Cohesion: 0.53
Nodes (3): Container, Logo, Header()

### Community 160 - "shift"
Cohesion: 0.33
Nodes (6): BFe(), cFe(), _Fe(), lFe(), vFe(), wFe()

### Community 161 - "query"
Cohesion: 0.50
Nodes (4): _at(), capture(), DCe(), parseLine()

### Community 162 - "JBe"
Cohesion: 0.50
Nodes (4): Ct(), hc(), Pt(), Y1()

### Community 163 - "Error Handling"
Cohesion: 0.33
Nodes (6): [Cm](), eNe(), kFe(), Qz(), tNe(), xFe()

### Community 167 - "ZP"
Cohesion: 0.67
Nodes (3): BS(), hHe(), pHe()

### Community 169 - "Font Optimization"
Cohesion: 0.29
Nodes (7): addChoice(), isChoice(), isSelected(), newItem(), toChoice(), toChoices(), zst()

### Community 170 - "package.json"
Cohesion: 0.17
Nodes (13): a9e(), Ade(), aG(), Bit(), gKe(), oG(), Qse(), rle() (+5 more)

### Community 171 - "iqe"
Cohesion: 0.40
Nodes (5): cHe(), fHe(), lHe(), [rhe](), uHe()

### Community 172 - "oqe"
Cohesion: 0.67
Nodes (3): CZ(), eTe(), stop()

### Community 173 - "makeBound"
Cohesion: 0.67
Nodes (3): Fje(), gZ(), pOe()

### Community 175 - "contentfulLoader.js"
Cohesion: 0.40
Nodes (5): h3e(), k3e(), p3e(), Q3e(), x3e()

### Community 179 - "left"
Cohesion: 0.50
Nodes (4): _4e(), o4e(), u4e(), vx()

### Community 180 - "pop"
Cohesion: 0.50
Nodes (4): Aue(), CKe(), iz(), uke()

### Community 181 - "splice"
Cohesion: 0.40
Nodes (5): B2e(), ddt(), edt(), ndt(), tdt()

### Community 182 - "Ea"
Cohesion: 0.50
Nodes (4): eyt(), JBe(), Xmt(), zmt()

### Community 183 - "Hh"
Cohesion: 0.50
Nodes (4): fullSource(), getDeclarations(), getProjectDatabase(), V0()

### Community 184 - "graphify reference: extra exports and benchmark"
Cohesion: 0.50
Nodes (4): genTime(), notAfter(), notBefore(), toDate()

### Community 185 - "isContextSpecific"
Cohesion: 0.12
Nodes (17): b5(), Ctt(), dj(), Fde(), fromString(), iGe(), jot(), nGe() (+9 more)

### Community 187 - "XP"
Cohesion: 0.50
Nodes (4): pathLenConstraint(), status(), toInteger(), version()

### Community 188 - "fM"
Cohesion: 0.18
Nodes (9): a8(), o8(), popArray(), push64(), pushArray(), pushMutablePointer(), pushPointer(), pushValue() (+1 more)

### Community 199 - "Uwe"
Cohesion: 0.67
Nodes (3): addPositional(), addProxy(), addRest()

### Community 200 - "applyChanges"
Cohesion: 0.67
Nodes (3): BCt(), SCt(), vCt()

### Community 202 - "lte"
Cohesion: 0.67
Nodes (3): build(), command(), commands()

### Community 203 - "warn"
Cohesion: 0.67
Nodes (3): c8e(), l8e(), u8e()

### Community 204 - "HK"
Cohesion: 0.67
Nodes (3): critical(), isCA(), toBoolean()

### Community 205 - "article.test.jsx"
Cohesion: 0.67
Nodes (3): d_e(), g_e(), h$e()

### Community 206 - "xQ"
Cohesion: 0.67
Nodes (3): due(), mUe(), yUe()

### Community 208 - "i$"
Cohesion: 0.67
Nodes (3): Eze(), ize(), u3()

### Community 209 - "Lh"
Cohesion: 0.67
Nodes (3): hasDependency(), hasHardDependency(), hasSoftDependency()

### Community 210 - "toChoice"
Cohesion: 0.67
Nodes (3): o1e(), RW(), s1e()

### Community 212 - "Cgt"
Cohesion: 0.67
Nodes (3): uxe(), w4(), Wk()

## Knowledge Gaps
- **366 isolated node(s):** `DateText`, `config`, `baseUrl`, `replaceImages`, `limit` (+361 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **67 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `_d()` connect `Community 35` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `c()` connect `Community 1` to `Community 0`, `parse`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Parallel & Intercepting Routes`, `Community 9`, `Community 10`, `Community 11`, `Aa`, `Community 13`, `from`, `Rr`, `Community 16`, `Bundling`, `Community 18`, `Data Patterns`, `Community 20`, `rF`, `wi`, `Community 23`, `Community 24`, `preorderDepthFirstWalk`, `Community 25`, `Community 27`, `Community 26`, `Community 30`, `Community 31`, `SKILL.md`, `JBe`, `Community 35`, `Community 37`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Ea`, `splice`, `Community 58`, `fM`, `Community 61`, `Community 63`, `Community 64`, `Community 66`, `Community 75`, `Community 76`, `Community 77`, `Community 80`, `Community 81`, `Community 83`, `Community 86`, `isSymbolicLink`, `find`, `Community 19`, `match`, `Oh`, `What You Must Do When Invoked`, `.write`, `verify`, `.unshift`, `split`, `Nl`, `Next.js Best Practices`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `On()` connect `Community 33` to `Community 0`, `Community 1`, `Community 6`, `Community 78`, `Community 80`, `Community 24`, `Community 26`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Are the 233 inferred relationships involving `a()` (e.g. with `a1e()` and `a2e()`) actually correct?**
  _`a()` has 233 INFERRED edges - model-reasoned connections that need verification._
- **Are the 226 inferred relationships involving `n()` (e.g. with `_9e()` and `A5()`) actually correct?**
  _`n()` has 226 INFERRED edges - model-reasoned connections that need verification._
- **Are the 173 inferred relationships involving `c()` (e.g. with `_9e()` and `a1e()`) actually correct?**
  _`c()` has 173 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `execute()` (e.g. with `Be()` and `g()`) actually correct?**
  _`execute()` has 6 INFERRED edges - model-reasoned connections that need verification._