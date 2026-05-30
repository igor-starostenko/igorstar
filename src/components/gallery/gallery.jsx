import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PhotoAlbum, MouseClickZoom } from 'react-photo-album';

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

const Gallery = ({ photos, order, orderBy, targetRowHeight = 150, rowGap = 4 }) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(
    () => orderArray([...photos], orderBy, order),
    [photos, order, orderBy]
  );

  // Handle click on photo in PhotoAlbum (returns index)
  const handlePhotoClick = (_event, { index }) => {
    setCurrent(index);
    setOpen(true);
  };

  const photoAlbumPhotos = useMemo(() => mapToPhotoAlbumFormat(images), [images]);

  return (
    <div>
      {photos.length > 0 && (
        <>
          {/* Use PhotoAlbum for responsive grid */}
          <div style={{ margin: `-${rowGap}px` }}>
            <PhotoAlbum
              photos={photoAlbumPhotos}
              onClick={handlePhotoClick}
              layout="rows"
              targetRowHeight={targetRowHeight}
              rowGap={rowGap}
              mouseClickZoom={<MouseClickZoom />}
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
};

export default Gallery;
