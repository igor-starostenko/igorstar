import PropTypes from 'prop-types';
import BaseImage from './image';
import { ImageWrapper } from './image.css';

const CustomImage = ({ style, alt, ...rest }) => (
  <ImageWrapper style={style}>
    <BaseImage alt={alt} {...rest} />
  </ImageWrapper>
);

CustomImage.propTypes = {
  style: PropTypes.object,
  alt: PropTypes.string.isRequired,
};

export default CustomImage;
