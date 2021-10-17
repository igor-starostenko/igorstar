import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/box';
import { Image } from './selfie.css';

const Selfie = ({ src, ...rest }) => (
  <Box style={{ padding: '2rem 4rem 0rem 4rem' }} {...rest}>
    <Image height={100} width={100} src={src} alt="Selfie" />
  </Box>
);

Selfie.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Selfie;
