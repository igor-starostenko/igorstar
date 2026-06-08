import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { ColumnsPhotoAlbum } from "react-photo-album";
import styled from 'styled-components';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

// Map gallery photos to react-photo-album format
const mapToPhotoAlbumFormat = (photos, targetRowHeight) =>
  photos.map((photo) => {
    // Get original dimensions or use fallbacks
    const originalWidth = photo.width || 1200;
    const originalHeight = photo.height || 800;
    
    // Calculate aspect ratio from original dimensions
    const aspectRatio = originalWidth / originalHeight;
    
    // Use targetRowHeight as the height constraint, calculate proportional width
    const constrainedWidth = Math.round(targetRowHeight * aspectRatio);
    
    return {
      src: photo.src,
      width: constrainedWidth,
      height: targetRowHeight,
      alt: photo.description || photo.alt || '',
    };
  });

const createSortFunction = (orderBy) => {
  if (!orderBy) return () => 0;

  return (a, b) => {
    if (a[orderBy] < b[orderBy]) return -1;
    if (a[orderBy] > b[orderBy]) return 1;
    return 0;
  };
};

const orderArray = (array, orderBy, order) => {
  if (!orderBy) return array;

  const direction = String(order).toLowerCase();
  if (!['desc', 'asc'].includes(direction)) return array;

  const sortFun = createSortFunction(orderBy);
  array.sort(sortFun);
  return direction === 'desc' ? array.reverse() : array;
};

const GalleryContainer = styled.div`
  margin: ${(props) => props.$rowGap}px;
  max-width: ${(props) => props.$containerWidth}px;
`;

const Gallery = ({ photos, order, orderBy, targetRowHeight = 150, rowGap = 4, containerWidth = 900 }) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(
    () => orderArray([...photos], orderBy, order),
    [photos, order, orderBy]
  );

  // Handle click on photo in PhotoAlbum (returns index)
  const handlePhotoClick = (_event, { index }) => {
    // react-photo-album passes (event, { index }) or just { index } depending on version
    const idx = index ?? (typeof _event === 'number' ? _event : 0);
    setCurrent(idx);
    setOpen(true);
  };

  const photoAlbumPhotos = useMemo(() => mapToPhotoAlbumFormat(images, targetRowHeight), [images, targetRowHeight]);

  return (
    <div>
      {photos.length > 0 && (
        <>
          {/* Use GridPhotoAlbum for responsive 3-column grid layout */}
          <GalleryContainer $rowGap={-rowGap} $containerWidth={containerWidth}>
            <ColumnsPhotoAlbum
              photos={photoAlbumPhotos}
              onClick={handlePhotoClick}
              targetRowHeight={targetRowHeight}
              rowGap={rowGap}
            />
          </GalleryContainer>
        </>
      )}

      {isOpen && (
        <Carousel
          onClose={() => {
            setCurrent(0);
            setOpen(false);
          }}
          views={images}
          currentIndex={current}
        />
      )}
    </div>
  );
};

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  targetRowHeight: PropTypes.number,
  rowGap: PropTypes.number,
  containerWidth: PropTypes.number,
};

const GlobalStyles = () => (

);

export default Gallery;
