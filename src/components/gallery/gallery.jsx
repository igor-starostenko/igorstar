import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { RowsPhotoAlbum } from 'react-photo-album';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

// Map gallery photos to react-photo-album format
const mapToPhotoAlbumFormat = (photos) =>
  photos.map((photo) => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.description || photo.alt || '',
  }));

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

const Gallery = ({ photos, order, orderBy, targetRowHeight = 150, rowGap = 4, containerWidth = 788 }) => {
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

  const photoAlbumPhotos = useMemo(() => mapToPhotoAlbumFormat(images), [images]);

  return (
    <div>
      {photos.length > 0 && (
        <>
          {/* Use RowsPhotoAlbum for responsive grid with CSS 3-column constraint */}
          <div style={{ margin: `-${rowGap}px`, maxWidth: `${containerWidth}px` }}>
            <RowsPhotoAlbum
              photos={photoAlbumPhotos}
              onClick={handlePhotoClick}
              targetRowHeight={targetRowHeight}
              rowGap={rowGap}
            />
          </div>
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

export default Gallery;
