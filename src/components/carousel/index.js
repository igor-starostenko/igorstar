import PropTypes from 'prop-types';
import Carousel, { Modal } from 'react-images';

const styleFn = (styleObj) => ({ ...styleObj, zIndex: 100 });

const CarouselModal = ({ onClose, currentIndex, views, ...rest }) => (
  <Modal
    onClose={onClose}
    styles={{ blanket: styleFn, positioner: styleFn }}
    {...rest}
  >
    <Carousel views={views} currentIndex={currentIndex} />
  </Modal>
);

CarouselModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default CarouselModal;
