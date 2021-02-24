import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { default as PhotoGallery } from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Image from 'components/image';

const titleFromPath = path => {
  const dirs = path.split('/');
  return dirs[dirs.length - 1].split('.')[0].replace('-', ' ');
};

/* Inspired with bushblade-knives-website
 * https://github.com/bushblade/bushblade-knives-website/blob/master/src/components/Gallery.js
 */

const GalleryImage = ({ index, onClick, photo, margin }) => (
  <Image
    style={{ margin, height: photo.height, width: photo.width }}
    onClick={e => onClick(e, { index, photo })}
    key={photo.key}
    fluid={photo.fluid}
    alt={photo.key}
  />
);

GalleryImage.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  photo: PropTypes.shape({
    key: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fluid: PropTypes.object.isRequired,
  }).isRequired,
  margin: PropTypes.number,
};

const matchCaption = (imageKey, captionArray) => {
  const caption = (captionArray || []).find(({ name }) =>
    imageKey.includes(name)
  );
  if (!caption) {
    return null;
  }

  const { desc, location, date } = caption;
  const day = date ? new Date(date).toDateString() : null;
  return `${desc}${desc && location ? ' - ' : ''}${location}${
    (desc || location) && day ? ', ' : ''
  }${day}`;
};

const orderArray = (array, order) => {
  const direction = String(order).toLowerCase();
  if (!['desc', 'asc'].includes(direction)) {
    return array;
  }
  array.sort();
  return direction === 'desc' ? array.reverse() : array;
};

const getImages = (imageArray, captionArray) => {
  return [...imageArray].map(
    ({
      image: {
        key,
        childImageSharp: { fluid, original },
      },
    }) => ({
      height: original.height,
      width: original.width,
      src: fluid.src,
      srcSet: fluid.srcSet,
      caption: matchCaption(key, captionArray),
      fluid,
      key: titleFromPath(key),
    })
  );
};

const styleFn = styleObj => ({ ...styleObj, zIndex: 100 });

const Gallery = ({ photos, order, captions, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(
    () => getImages(orderArray(photos, order), captions),
    []
  );

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
  captions: PropTypes.arrayOf(PropTypes.object),
};

export default Gallery;
