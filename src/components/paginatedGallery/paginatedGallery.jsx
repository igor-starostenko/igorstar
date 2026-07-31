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

// Helper function to fetch a page of entries with Contentful
const fetchPage = async (contentType, pageSize, skip) => {
  const { getEntries } = await import('contentClient');
  
  let options = { content_type: contentType, limit: pageSize, skip };
  
  if (contentType === 'feed') {
    options = { ...options, order: '-fields.date' };
  }

  const result = await getEntries(options);
  
  // Map items to the image format expected by the gallery
  const images = result.items.map((item) => {
    if (contentType === 'gallery') {
      return item.image;
    } else {
      // feed content type has image field directly
      return item;
    }
  });

  return {
    items: images,
    total: result.total
  };
};

const PaginatedGallery = ({ title, contentType, pageSize, targetRowHeight }) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);
  
  // Initial offset for the current page
  const initialOffset = (page - 1) * pageSize;
  
  // Initial photos for this page
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  // Fetch initial page photos on mount
  useEffect(() => {
    if (initialOffset > 0) {
      fetchPage(contentType, pageSize, initialOffset).then((result) => {
        setInitialPhotos(result.items);
        setIsLoadingInitial(false);
      });
    } else {
      setIsLoadingInitial(false);
    }
  }, [initialOffset, contentType, pageSize]);

  const fetchPhotos = useCallback(async (index) => {
    try {
      // Skip if we're still in the initial page's photos
      if (index < initialOffset) {
        return [];
      }
      
      // Check if this is a page we've already loaded (from initial photos)
      if (index < initialOffset + pageSize) {
        // Already loaded as initial photos
        return [];
      }
      
      const result = await fetchPage(contentType, pageSize, index);
      
      if (result.items.length === 0) {
        return null; // Signal end of stream
      }
      
      return result.items;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return null;
    }
  }, [contentType, pageSize, initialOffset]);

  const handlePhotoClick = useCallback(({ photos, index }) => {
    if (index >= 0) {
      setCurrentPhoto(index);
      setAllPhotos(photos); // Store all photos for carousel
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setCurrentPhoto(null);
  }, []);

  // Initial photos for InfiniteScroll
  const infScrPhotos = initialOffset > 0 ? initialPhotos : [];

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        {isLoadingInitial ? (
          <div>Loading...</div>
        ) : (
          <InfiniteScroll
            photos={infScrPhotos}
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
        )}
        
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
  contentType: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  targetRowHeight: PropTypes.number.isRequired,
};

export default PaginatedGallery;
