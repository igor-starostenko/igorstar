#!/usr/bin/env python3
"""Reply to PR review comments individually."""

import subprocess

comments = [
    {"id": 3619323241, "path": "src/components/article/article.jsx", "body": "Already implemented with nested sizes maxWidth maxHeight in componentSizes per component."},
    {"id": 3619332450, "path": "src/components/article/article.jsx", "body": "Structure matches suggestion with componentSizes.article sizes maxWidth maxHeight."},
    {"id": 3619339993, "path": "src/components/gallery/gallery.jsx", "body": "Updated to accept event plus argument for CarouselModal API compatibility."},
    {"id": 3619348356, "path": "src/components/recommendations/recommendations.css.js", "body": "CSS width 100 percent height auto is appropriate for responsive images."},
    {"id": 3619351985, "path": "src/helpers/contentful.js", "body": "Retired - Next.js Contentful loader handles transformation automatically."},
    {"id": 3619354472, "path": "src/helpers/schemaGenerator.js", "body": "Kept as-is - valid comment providing helpful context."},
    {"id": 3619355819, "path": "src/test/lighthouse.test.mjs", "body": "Removed debug logs - tests now stable without verbose logging."},
    {"id": 3619375680, "path": "src/components/gallery/gallery.jsx", "body": "Already implemented - componentSizes.gallery has maxWidth height."},
    {"id": 3619380655, "path": "src/components/image/baseImage.test.jsx", "body": "Removed - test was for retired addContentfulParams function."},
    {"id": 3619381469, "path": "src/components/image/baseImage.test.jsx", "body": "Removed - test was for retired addContentfulParams function."},
    {"id": 3619386687, "path": "src/helpers/contentful.test.js", "body": "Removed - all tests were for retired addContentfulParams function."},
    {"id": 3619926009, "path": "src/components/article/article.jsx", "body": "Removed - date display refactored out during Next.js Image migration."},
    {"id": 3619944249, "path": "src/constants/imageConfig.js", "body": "Not duplicating - sizes prop for Next.js componentSizes for layout constraints."},
]

for c in comments:
    print(f"Replying to comment {c['id']}...")
    result = subprocess.run([
        "gh", "api",
        "-X", "POST",
        "-H", "Accept: application/vnd.github+json",
        "/repos/igor-starostenko/igorstar/pulls/comments",
        "-f", f"body={c['body']}",
        "-f", f"path={c['path']}",
        "-f", "position=1",
        "-f", f"in_reply_to={c['id']}"
    ], capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"  Success")
    else:
        print(f"  Error: {result.stderr}")

print("Done!")
