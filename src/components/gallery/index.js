import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
// import { default as PhotoGallery } from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Image from 'components/image';

/* To avoid 'useLayoutEffect does nothing on the server' warning */
const PhotoGallery = dynamic(() => import('react-photo-gallery'), {
  ssr: false,
});

/* Inspired with bushblade-knives-website
 * https://github.com/bushblade/bushblade-knives-website/blob/master/src/components/Gallery.js
 */

const GalleryImage = ({ index, onClick, photo, margin }) => (
  <Image
    style={{ margin }}
    onClick={e => onClick(e, { index, photo })}
    key={photo.id}
    src={photo.src}
    alt={photo.title}
    width={photo.width}
    height={photo.height}
  />
);

GalleryImage.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  margin: PropTypes.number,
};

const orderArray = (array, order) => {
  const direction = String(order).toLowerCase();
  if (!['desc', 'asc'].includes(direction)) {
    return array;
  }
  array.sort();
  return direction === 'desc' ? array.reverse() : array;
};

const styleFn = styleObj => ({ ...styleObj, zIndex: 100 });

const Gallery = ({ photos, order, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(() => orderArray(photos, order), []);

  const imageClick = (e, obj) => {
    setCurrent(obj.index);
    setOpen(true);
  };

  return (
    <div>
      {photos.length > 0 && (
        <PhotoGallery
          photos={images}
          onClick={imageClick}
          renderImage={GalleryImage}
          targetRowHeight={250}
          margin={1}
          {...rest}
        />
      )}

      <ModalGateway>
        {isOpen ? (
          <Modal
            onClose={() => {
              setCurrent(0);
              setOpen(false);
            }}
            styles={{ blanket: styleFn, positioner: styleFn }}
          >
            <Carousel views={images} currentIndex={current} />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
};

export default Gallery;
