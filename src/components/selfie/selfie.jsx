import PropTypes from 'prop-types';
import { Image } from './selfie.css.js';
import { componentSizes } from 'constants/imageConfig.js';

const {
  selfie: { width, height, sizes },
} = componentSizes;

const Selfie = ({ src }) => (
  <Image
    height={height}
    width={width}
    sizes={sizes}
    src={src}
    alt="Selfie"
    preload
  />
);

Selfie.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Selfie;
