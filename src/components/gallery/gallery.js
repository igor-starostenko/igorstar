import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as PhotoGallery } from 'react-photo-gallery';
import Img from 'gatsby-image';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { ImageWrapper } from './gallery.css';

const titleFromPath = path => {
  const dirs = path.split('/');
  return dirs[dirs.length - 1].split('.')[0].replace('-', ' ');
};

/* Inspired with bushblade-knives-website
 * https://github.com/bushblade/bushblade-knives-website/blob/master/src/components/Gallery.js
 */

const GatsbyImage = ({ index, onClick, photo, margin }) => (
  <ImageWrapper
    style={{ margin, height: photo.height, width: photo.width }}
    onClick={e => onClick(e, { index, photo })}
    key={photo.key}
  >
    <Img
      fixed={typeof window === 'undefined' ? { src: {} } : undefined}
      fluid={photo.fluid}
      alt={photo.key}
    />
  </ImageWrapper>
);

GatsbyImage.propTypes = {
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

const getImages = imageArray => {
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
      fluid,
      key: titleFromPath(key),
    })
  );
};

const styleFn = styleObj => ({ ...styleObj, zIndex: 100 });

const Gallery = ({ photos, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const images = getImages(photos);

  const imageClick = (e, obj) => {
    setCurrent(obj.index);
    setOpen(true);
  };

  return (
    <div>
      {photos.length > 1 && (
        <PhotoGallery
          photos={images}
          onClick={imageClick}
          renderImage={GatsbyImage}
          targetRowHeight={250}
          margin={5}
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
};

export default Gallery;
