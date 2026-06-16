import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { Image, ImageWrapper } from './selfie.css.js';

const _NextImage = dynamic(() => import('next/image'));

const Selfie = ({ src, ...rest }) => (
  <ImageWrapper {...rest}>
    <Image height={100} width={100} src={src} alt="Selfie" priority />
  </ImageWrapper>
);

Selfie.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Selfie;
