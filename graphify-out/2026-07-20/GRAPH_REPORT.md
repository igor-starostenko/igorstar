# Graph Report - .  (2026-07-20)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 449 nodes · 533 edges · 87 communities (44 shown, 43 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `96b34856`
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
- Community 27
- Community 28
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
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
- Community 71
- Community 72
- Community 73
- Community 75
- Community 77

## God Nodes (most connected - your core abstractions)
1. `Next Best Practices Skill` - 20 edges
2. `scripts` - 19 edges
3. `Amplify Workflow Skill` - 11 edges
4. `Gallery()` - 5 edges
5. `getEntries()` - 5 edges
6. `Deploy Phase Reference` - 5 edges
7. `Data Patterns Guide` - 5 edges
8. `Agent Guidelines` - 5 edges
9. `FivehundredpxIcon()` - 4 edges
10. `FlickrIcon()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Tests Workflow` --conceptually_related_to--> `Amplify Workflow Skill`  [INFERRED]
  .github/workflows/test.yml → .agents/skills/amplify-workflow/SKILL.md
- `Amplify Configuration` --conceptually_related_to--> `Deploy Phase Reference`  [INFERRED]
  amplify.yml → .agents/skills/amplify-workflow/references/deploy.md
- `Amplify Workflow Skill` --references--> `Igorstar Skill`  [EXTRACTED]
  .agents/skills/amplify-workflow/SKILL.md → SKILL.md
- `Yarn Configuration` --conceptually_related_to--> `Amplify Workflow Skill`  [INFERRED]
  .yarnrc.yml → .agents/skills/amplify-workflow/SKILL.md
- `Project README` --cites--> `Amplify Workflow Skill`  [INFERRED]
  readme.md → .agents/skills/amplify-workflow/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Next.js Deployment and CI/CD Workflows** — .agents_skills_amplify_workflow, .agents_skills_next_best_practices_self_hosting, amplify, .github_workflows_lighthouse, .github_workflows_test [INFERRED]
- **Next.js Development Best Practices Ecosystem** — .agents_skills_next_best_practices, .agents_skills_amplify_workflow_references_backend, .agents_skills_amplify_workflow_references_frontend [INFERRED]
- **CI/CD and Quality Assurance Pipeline** — .github_workflows_codeql_analysis, .github_workflows_lighthouse, .github_workflows_test [EXTRACTED]

## Communities (87 total, 43 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (17): Container, Copyright, Social, Footer(), validSocial, FivehundredpxIcon(), FlickrIcon(), GithubIcon() (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (33): Amplify Workflow Skill, Backend Phase Reference, Deploy Phase Reference, Frontend Phase Reference, Next Best Practices Skill, Async Patterns Guide, Bundling Guide, Data Patterns Guide (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (30): core-js, author, core-js, engines, node, greenkeeper, ignore, license (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (29): babel-plugin-styled-components, contentful, @contentful/rich-text-react-renderer, dotenv, fast-xml-parser, framer-motion, next, dependencies (+21 more)

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (14): BaseImage(), FlickrImage(), parseFlickrImage(), parser, ImageContainer, ImageCopyright, ImageFooter, ImageFrame (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (13): BaseImage, calculateRowHeight(), DateText, filterObject(), FlickrImage, getStaticProps(), isFlickrEmbed(), isFlickrNode() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.26
Nodes (10): Article(), calculateConstrainedDimensions(), Card, Description, Row, SLink, Thumb, Title (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.24
Nodes (8): Carousel, createSortFunction(), GalleryContainer, GalleryImageWrapper, Gallery(), mapToPhotoAlbumFormat(), orderArray(), renderNextImage()

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (7): CarouselModal(), CloseButton, GalleryImage, ImageContainer, ModalContent, ModalOverlay, mockViews

### Community 9 - "Community 9"
Cohesion: 0.36
Nodes (7): Card, Container, Details, SLink, Thumb, ThumbWrapper, Recommendations()

### Community 10 - "Community 10"
Cohesion: 0.36
Nodes (6): Categories, Container, Counter, TitleHeader, Filter(), filters

### Community 11 - "Community 11"
Cohesion: 0.28
Nodes (5): addBlurDataURLs(), BLUR_CONCURRENCY, blurDataURLCache, fetchWithTimeout(), makeBlurDataURL()

### Community 12 - "Community 12"
Cohesion: 0.39
Nodes (8): client, getAllEntries(), getCategoriesPaths(), getEntries(), getPostsPaths(), parseFields(), parseImage(), parseItem()

### Community 13 - "Community 13"
Cohesion: 0.43
Nodes (5): DateBase, DateMain, DateMobile, DateText(), formatDate()

### Community 14 - "Community 14"
Cohesion: 0.36
Nodes (4): Container, Content, LayoutWithConfig(), mockConfig

### Community 15 - "Community 15"
Cohesion: 0.38
Nodes (7): eslint-config-next, devDependencies, eslint-config-next, @testing-library/dom, @testing-library/jest-dom, @testing-library/react, @testing-library/dom

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (5): client, limit, replaceImages, saveAllAssets(), saveFile()

### Community 17 - "Community 17"
Cohesion: 0.33
Nodes (4): client, contentful, fs, limit

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (5): client, contentful, data, fs, json

### Community 19 - "Community 19"
Cohesion: 0.53
Nodes (3): Container, Tag, Hashtags()

### Community 20 - "Community 20"
Cohesion: 0.53
Nodes (3): Container, Logo, Header()

### Community 21 - "Community 21"
Cohesion: 0.53
Nodes (3): Image, ImageWrapper, Selfie()

### Community 23 - "Community 23"
Cohesion: 0.60
Nodes (3): appendSiteUrl(), ConfigSEO(), SEO()

## Knowledge Gaps
- **121 isolated node(s):** `config`, `baseUrl`, `next_config`, `name`, `license` (+116 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 15` to `Community 2`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Amplify Workflow Skill` (e.g. with `Next Best Practices Skill` and `Next Cache Components Skill`) actually correct?**
  _`Amplify Workflow Skill` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `config`, `baseUrl`, `next_config` to the rest of the system?**
  _121 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0960960960960961 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09659090909090909 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._