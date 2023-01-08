import React from 'react';
import PropTypes from 'prop-types';
import { ImageWrapper, Image } from './selfie.css';

const Selfie = ({ src, ...rest }) => (
  <ImageWrapper {...rest}>
    <Image height={100} width={100} src={src} alt="Selfie" priority />
  </ImageWrapper>
);

Selfie.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Selfie;
