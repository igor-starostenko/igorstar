import React from 'react';
import PropTypes from 'prop-types';
import Img from 'next/image';
import { ImageWrapper } from './image.css';

const Image = ({ style, src, alt, ...rest }) => (
  <ImageWrapper style={style} {...rest}>
    <Img src={src} alt={alt} />
  </ImageWrapper>
);

Image.propTypes = {
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
