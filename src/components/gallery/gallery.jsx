import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { PhotoAlbum, MouseClickZoom } from 'react-photo-album';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));
const Image = dynamic(() => import('components/image/image.jsx'));

const GalleryImage = ({ index, onClick, photo, margin }) => (
  <Image
    style={{ margin }}
    onClick={(e) => onClick(e, { index, photo })}
    key={photo.id}
    src={photo.src}
    backupSrc={photo.backupSrc}
    alt={photo.description || photo.alt}
    width={photo.width}
    height={photo.height}
    {...(index === 0 ? { priority: true } : {})}
  />
);

GalleryImage.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    description: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    backupSrc: PropTypes.string,
    src: PropTypes.string.isRequired,
  }).isRequired,
  margin: PropTypes.number,
};

const createSortFunction = (orderBy) => (a, b) => {
  if (a[orderBy] < b[orderBy]) {
    return -1;
  }
  if (a[orderBy] > b[orderBy]) {
    return 1;
  }
  return 0;
};

const orderArray = (array, orderBy, order) => {
  if (!orderBy) {
    return array;
  }

  const direction = String(order).toLowerCase();
  if (!['desc', 'asc'].includes(direction)) {
    return array;
  }

  const sortFun = createSortFunction(orderBy);

  array.sort(sortFun);
  return direction === 'desc' ? array.reverse() : array;
};

// Map gallery photos to react-photo-album format
const mapToPhotoAlbumFormat = (photos) =>
  photos.map((photo) => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.description || photo.alt,
  }));

const Gallery = ({ photos, order, orderBy, targetRowHeight = 150, rowGap = 4, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(
    () => orderArray([...photos], orderBy, order),
    [photos, order, orderBy]
  );

  const imageClick = (_e, obj) => {
    setCurrent(obj.index);
    setOpen(true);
  };

  // Handle click on photo in PhotoAlbum (returns index)
  const handlePhotoClick = (event, { index }) => {
    setCurrent(index);
    setOpen(true);
  };

  const photoAlbumPhotos = useMemo(() => mapToPhotoAlbumFormat(images), [images]);

  return (
    <div>
      {photos.length > 0 && (
        <>
          {/* Use PhotoAlbum for responsive grid */}
          <div style={{ margin: '-4px' }}>
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
