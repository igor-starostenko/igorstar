import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-photo-album/scroll';
import { RowsPhotoAlbum } from 'react-photo-album';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';

const Gallery = dynamic(() => import('components/gallery/gallery.jsx'));
const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

// Helper to return empty array for preloaded data (InfiniteScroll expects async)
const getEmptyResult = () => Promise.resolve({ items: [], total: 0 });

const PaginatedGallery = ({
  title,
  total,
  images,
  pageSize,
  targetRowHeight,
}) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;

  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);

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
    if (index >= 0) {
      setCurrentPhoto(index);
      setAllPhotos(photos); // Store all photos for carousel
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setCurrentPhoto(null);
  }, []);

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
          <RowsPhotoAlbum
            targetRowHeight={targetRowHeight}
            spacing={2}
            padding={0}
          />
        </InfiniteScroll>

        {currentPhoto !== null && currentPhoto >= 0 && (
          <Carousel
            views={allPhotos}
            currentIndex={currentPhoto}
            onClose={handleCloseModal}
          />
        )}
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
