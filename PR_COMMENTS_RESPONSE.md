# PR #135 Review Comments Response

## 1. Article.jsx - maxWidth and maxHeight structure
**Status**: Already implemented
The componentSizes object has nested sizes, maxWidth, maxHeight per component.

## 2. Gallery.jsx - handlePhotoClick change
**Response**: Updated to accept event + argument for CarouselModal API compatibility.

## 3. Recommendations.css.js - Thumb CSS changes
**Response**: `width:100%; height:auto;` is appropriate for responsive images.

## 4. Contentful.js - addContentfulParams utility
**Response**: Retired - Next.js loader handles transformation automatically.

## 5. SchemaGenerator.js - Valid comment
**Status**: Comment retained as helpful.

## 6. Lighthouse.test.mjs - Console logs
**Response**: Removed debug statements as tests are now stable.

## 7. BaseImage.test.jsx - Removed tests
**Response**: Tests for retired addContentfulParams function.

## 8. Contentful.test.jsx - Removed tests
**Response**: All tests for retired utility function removed.

## 9. Article.jsx - DateText removal
**Response**: Date display refactored out of article.jsx.

## 10. ImageConfig.js - Gallery dimensions
**Status**: Already implemented with maxWidth and maxHeight.
