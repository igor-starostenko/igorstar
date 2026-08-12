import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

const Gallery = dynamic(() => import('components/gallery/gallery.jsx'));
const Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

const PaginatedGallery = ({
  title,
  total,
  images,
  page,
  pageSize,
  targetRowHeight,
}) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || page || 1;
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
    rootMargin: '0px 0px 1800px 0px',
  });

  const pageNum = Math.ceil(displayCount / pageSize) || 1;

  // Don't show pagination if we've loaded all items (reached the end)
  const hasMoreItems = displayCount < total;

  const startIndex = currentPage > 1 ? (currentPage - 1) * pageSize : 0;
  // Show images from startIndex, up to displayCount items
  const endIndex = Math.min(startIndex + displayCount, images.length);
  const displayImages = images.slice(startIndex, endIndex);

  // Track how many images have been returned to the carousel via loadMoreImages.
  // This ref persists across renders so each call returns the next batch.
  const loadedCountRef = useRef(0);

  // Provide a loadMoreImages callback that returns the next batch of
  // images from the full set, starting after the initial displayImages.
  // This allows the carousel to request more images on demand without
  // receiving all images upfront via an allPhotos prop.
  const loadMoreImages = useCallback(() => {
    const startIdx = startIndex + displayImages.length + loadedCountRef.current;
    if (startIdx >= images.length) return [];
    const nextBatch = images.slice(startIdx, startIdx + pageSize);
    loadedCountRef.current += nextBatch.length;
    return nextBatch;
  }, [startIndex, displayImages.length, images, pageSize]);

  // Reset loadedCountRef when the page changes
  useEffect(() => {
    loadedCountRef.current = 0;
  }, [currentPage]);

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        {displayImages.length > 0 && (
          <Gallery
            photos={displayImages}
            loadMoreImages={loadMoreImages}
            targetRowHeight={targetRowHeight}
          />
        )}
        {hasMoreItems && pageNum < totalPages ? (
          <Pagination pageNum={pageNum} totalPages={totalPages} />
        ) : (
          ''
        )}
        {/* Sentinel element for Intersection Observer */}
        {hasMoreItems && <div ref={lastItemRef} />}
      </Box>
    </Layout>
  );
};

PaginatedGallery.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  targetRowHeight: PropTypes.number.isRequired,
};

export default PaginatedGallery;