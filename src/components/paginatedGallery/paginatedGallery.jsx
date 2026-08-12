import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Pagination from 'components/pagination/pagination.jsx';
import {
  PlaceholderContainer,
  PlaceholderTile,
} from './paginatedGallery.css.js';

const GalleryPlaceholder = ({ targetRowHeight = 260 }) => (
  <PlaceholderContainer>
    {Array.from({ length: 12 }).map((_, i) => (
      <PlaceholderTile
        key={i}
        $targetRowHeight={targetRowHeight}
        data-testid="placeholder-tile"
      />
    ))}
  </PlaceholderContainer>
);

// Module-level dynamic Gallery. The loading placeholder reads from a ref
// object so it stays in sync with the component's targetRowHeight prop
// without recreating the dynamic component during render.
const placeholderHeightRef = { current: 260 };

const Gallery = dynamic(() => import('components/gallery/gallery.jsx'), {
  loading: () => (
    <GalleryPlaceholder targetRowHeight={placeholderHeightRef.current} />
  ),
});

const PaginatedGallery = ({
  title,
  total,
  images,
  pageSize,
  targetRowHeight,
}) => {
  // Update the module-level ref so the loading placeholder uses the correct height.
  // eslint-disable-next-line react-hooks/immutability
  placeholderHeightRef.current = targetRowHeight;

  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const totalPages = Math.ceil((images?.length || 0) / pageSize);

  const [displayCount, setDisplayCount] = useState(pageSize);
  const lastItemRef = useRef(null);

  const handleIntersection = useCallback(
    (entry) => {
      if (entry.isIntersecting && displayCount < total) {
        const newDisplayCount = Math.min(displayCount + pageSize, total);
        setDisplayCount(newDisplayCount);
      }
    },
    [displayCount, total, pageSize]
  );

  useIntersectionObserver(lastItemRef, handleIntersection, {
    threshold: 0.1,
    rootMargin: '200px 0px 200px 0px',
  });

  const pageNum = Math.ceil(displayCount / pageSize) || 1;

  // Don't show pagination if we've loaded all items (reached the end)
  const hasMoreItems = displayCount < total;

  const startIndex = page > 1 ? (page - 1) * pageSize : 0;
  // Show images from startIndex, up to displayCount items
  const endIndex = Math.min(startIndex + displayCount, images.length);
  const displayImages = images.slice(startIndex, endIndex);

  // Callback to load more photos when carousel reaches end.
  // Appends the next batch of photos (like infinite scroll) without
  // changing the route, so the user stays on the same page.
  // Returns true if more photos were loaded, false if at the end.
  const handleGetNextPage = useCallback(() => {
    if (displayCount < total) {
      const newDisplayCount = Math.min(displayCount + pageSize, total);
      setDisplayCount(newDisplayCount);
      return true;
    }
    return false;
  }, [displayCount, total, pageSize]);

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        {displayImages.length > 0 && (
          <Gallery
            photos={displayImages}
            targetRowHeight={targetRowHeight}
            onGetNextPage={handleGetNextPage}
            pageKey={page}
          />
        )}
        {hasMoreItems && pageNum < totalPages ? (
          <Pagination pageNum={pageNum} totalPages={totalPages} />
        ) : (
          ''
        )}
        {/* Sentinel element for IntersectionObserver */}
        {hasMoreItems && <div ref={lastItemRef} />}
      </Box>
    </Layout>
  );
};

PaginatedGallery.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number.isRequired,
  targetRowHeight: PropTypes.number.isRequired,
};

export default PaginatedGallery;
