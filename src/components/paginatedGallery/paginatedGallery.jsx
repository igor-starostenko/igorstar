import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Pagination from 'components/pagination/pagination.jsx';

const GalleryPlaceholder = () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px',
      margin: '8px',
      width: 'calc(100% - 16px)',
    }}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        style={{
          flex: '1 1 calc(33.333% - 2px)',
          height: '260px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
        }}
      />
    ))}
  </div>
);

const Gallery = dynamic(() => import('components/gallery/gallery.jsx'), {
  loading: () => <GalleryPlaceholder />,
});

const PaginatedGallery = ({
  title,
  total,
  images,
  pageSize,
  targetRowHeight,
}) => {
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

  // Callback to load the next page when carousel reaches end.
  // Returns true if a next page was loaded, false if there are no more pages.
  const handleGetNextPage = useCallback(() => {
    if (page < totalPages) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: page + 1 },
        },
        undefined,
        { shallow: true }
      );
      setDisplayCount(pageSize); // Reset displayCount for the new page
      return true;
    }
    return false;
  }, [page, totalPages, router, pageSize]);

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
