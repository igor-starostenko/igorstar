import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { ImageWrapper } from './selfie.css.js';

const NextImage = dynamic(() => import('next/image'));

const Selfie = ({ src, ...rest }) => (
  <ImageWrapper {...rest}>
    <NextImage
      height={100}
      width={100}
      src={src}
      alt="Selfie"
      priority
      style={{ border: '2px solid powderblue !important', borderRadius: '50%' }}
    />
  </ImageWrapper>
);

Selfie.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Selfie;
