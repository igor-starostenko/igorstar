import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { ImageWrapper } from './image.css';

const MyImage = ({ style, alt, ...rest }) => (
  <ImageWrapper style={style}>
    <Image alt={alt} {...rest} />
  </ImageWrapper>
);

MyImage.propTypes = {
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default MyImage;
