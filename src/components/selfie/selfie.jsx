import PropTypes from 'prop-types';
import { Image, ImageWrapper } from './selfie.css.js';
import { componentSizes } from 'constants/imageConfig.js';

const { selfie: { width, height, sizes } } = componentSizes;

const Selfie = ({ src, ...rest }) => (
  <ImageWrapper {...rest}>
    <Image height={height} width={width} sizes={sizes} src={src} alt="Selfie" priority />
  </ImageWrapper>
);

Selfie.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Selfie;
