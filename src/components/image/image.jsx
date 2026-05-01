import PropTypes from 'prop-types';
import BaseImage from './baseImage.jsx';
import { ImageWrapper } from './image.css.js';

const Image = ({ style, alt, ...rest }) => (
  <ImageWrapper style={style}>
    <BaseImage alt={alt} {...rest} />
  </ImageWrapper>
);

CustomImage.propTypes = {
  style: PropTypes.object,
  alt: PropTypes.string.isRequired,
};

export default Image;
