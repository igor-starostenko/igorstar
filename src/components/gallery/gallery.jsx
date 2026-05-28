import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));
const Image = dynamic(() => import('components/image/image.jsx'));

// Simple responsive photo gallery grid
const PhotoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.margin || 1}px;
`;

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

const Gallery = ({ photos, order, orderBy, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(
    () => orderArray(photos, orderBy, order),
    [photos, order, orderBy]
  );

  const imageClick = (_e, obj) => {
    setCurrent(obj.index);
    setOpen(true);
  };

  return (
    <div>
      {photos.length > 0 && (
        <PhotoGrid margin={1}>
          {images.map((photo, index) => (
            <GalleryImage
              key={photo.id}
              index={index}
              photo={photo}
              onClick={imageClick}
              margin={1}
            />
          ))}
        </PhotoGrid>
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
};

export default Gallery;
