import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { ImageWrapper } from './image.css';

const Image = ({ style, fluid, alt, ...rest }) => (
  <ImageWrapper style={style} {...rest}>
    <Img
      fixed={typeof window === 'undefined' ? { src: {} } : undefined}
      fluid={fluid}
      alt={alt}
    />
  </ImageWrapper>
);

Image.propTypes = {
  style: PropTypes.object,
  fluid: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
