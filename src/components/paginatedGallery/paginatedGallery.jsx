import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';

const Gallery = dynamic(() => import('components/gallery/gallery.jsx'));
const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

// Import InfiniteScroll from react-photo-album/scroll (v3 default export)
const InfiniteScroll = dynamic(
  () => import('react-photo-album/scroll').then((mod) => mod?.default || mod),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const PaginatedGallery = ({
  title,
  total,
  images,
  pageSize,
  targetRowHeight,
}) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;

  // Initial offset for the current page
  const initialOffset = (page - 1) * pageSize;

  // Initial photos for this page
  const initialPhotos = images.slice(initialOffset, initialOffset + pageSize);

  // Fetch callback for InfiniteScroll - returns empty after initial page
  const fetchPhotos = useCallback(async (index) => {
    // Only load the first page from preloaded data
    if (index < initialOffset) {
      return [];
    }

    // If we're within the first page range, return empty (already loaded)
    if (index < initialOffset + pageSize) {
      return [];
    }

    // Beyond first page - no more data (all preloaded)
    return null;
  }, [initialOffset, pageSize]);

  const handlePhotoClick = useCallback(({ photos, index }) => {
    // Store all photos for carousel
  }, []);

  const handleCloseModal = useCallback(() => {
    // Handle modal close
  }, []);

  // InfiniteScroll children receives photos array as argument
  const renderGallery = (photos) => (
    <Gallery photos={photos} targetRowHeight={targetRowHeight} spacing={2} />
  );

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        <InfiniteScroll
          photos={initialPhotos}
          fetch={fetchPhotos}
          onClick={handlePhotoClick}
          finished={<p>All photos loaded</p>}
        >
          {renderGallery}
        </InfiniteScroll>
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
