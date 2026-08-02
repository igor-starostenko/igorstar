import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

// Helper to map photos to expected format
const mapToPhotoFormat = (photos, targetRowHeight) =>
  photos.map((photo) => {
    const originalWidth = photo.width || 800;
    const originalHeight = photo.height || 600;
    const aspectRatio = originalWidth / originalHeight;
    const constrainedWidth = Math.round(targetRowHeight * aspectRatio);

    return {
      src: photo.src,
      width: constrainedWidth,
      height: targetRowHeight,
      alt: photo.description || photo.alt || '',
    };
  });

// Custom hook for infinite scroll
const useInfiniteScroll = (callback, pageSize) => {
  const observerRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!observerRef.current) return;

    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    }, options);

    observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback, hasMore]);

  return { observerRef, setHasMore };
};

const PaginatedGallery = ({
  title,
  total,
  images,
  pageSize,
  targetRowHeight,
}) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;

  // Current page of photos
  const [currentPhotos, setCurrentPhotos] = useState([]);

  // Track loaded pages to avoid duplicates
  const [loadedPages, setLoadedPages] = useState(new Set([page]));

  // Load initial page
  useEffect(() => {
    const initialOffset = (page - 1) * pageSize;
    const pagePhotos = images.slice(initialOffset, initialOffset + pageSize);
    setCurrentPhotos(mapToPhotoFormat(pagePhotos, targetRowHeight));
  }, [page, images, pageSize, targetRowHeight]);

  // Check if there are more pages
  const hasMore = page * pageSize < total;

  // Load next page when scrolled to bottom
  const loadMore = useCallback(() => {
    if (!hasMore) return;

    const nextPage = Math.floor(currentPhotos.length / pageSize) + 1;
    if (loadedPages.has(nextPage)) return;

    const offset = (nextPage - 1) * pageSize;
    const pagePhotos = images.slice(offset, offset + pageSize);
    
    if (pagePhotos.length > 0) {
      setCurrentPhotos((prev) => [
        ...prev,
        ...mapToPhotoFormat(pagePhotos, targetRowHeight),
      ]);
      setLoadedPages((prev) => new Set(prev).add(nextPage));
    }
  }, [hasMore, currentPhotos.length, pageSize, loadedPages, images, targetRowHeight]);

  // Intersection observer for infinite scroll
  const { observerRef } = useInfiniteScroll(loadMore, pageSize);

  const [allPhotos, setAllPhotos] = useState([]);

  const handlePhotoClick = useCallback(({ photos, index }) => {
    if (index >= 0) {
      setAllPhotos(photos);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setAllPhotos([]);
  }, []);

  // Calculate total mapped photos
  const totalMappedPhotos = Math.min(currentPhotos.length, total);

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        <div style={{ minHeight: '20px' }} ref={observerRef} />
      </Box>
      {allPhotos.length > 0 && (
        <Carousel
          views={allPhotos}
          currentIndex={0}
          onClose={handleCloseModal}
        />
      )}
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
