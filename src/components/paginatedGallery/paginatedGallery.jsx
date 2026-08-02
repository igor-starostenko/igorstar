import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
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

  // Map photos to expected format
  const mappedPhotos = mapToPhotoFormat(initialPhotos, targetRowHeight);

  // Fetch callback - returns empty after initial page
  const fetchPhotos = useCallback(async (index) => {
    // All data is preloaded, return empty for any fetch request
    return [];
  }, []);

  const [allPhotos, setAllPhotos] = useState([]);

  const handlePhotoClick = useCallback(({ photos, index }) => {
    if (index >= 0) {
      setAllPhotos(photos);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setAllPhotos([]);
  }, []);

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        <RowsPhotoAlbum
          photos={mappedPhotos}
          targetRowHeight={targetRowHeight}
          spacing={2}
          padding={0}
          onClick={handlePhotoClick}
        />
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
