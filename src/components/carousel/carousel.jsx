import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  z-index: 101;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GalleryImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

const CarouselModal = ({ onClose, currentIndex, views }) => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  const [visibleIndex, setVisibleIndex] = useState(currentIndex);

  const handlePrev = () => {
    setVisibleIndex((prev) => (prev === 0 ? views.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setVisibleIndex((prev) => (prev === views.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, views.length]);

  const view = views[visibleIndex];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
        <ImageContainer>
          <GalleryImage src={view.src} alt={(view.alt || view.description) ?? ''} />
        </ImageContainer>
        {views.length > 1 && (
          <>
            <CloseButton
              style={{ left: '20px', right: 'auto' }}
              onClick={handlePrev}
              aria-label="Previous image"
            >
              &#8249;
            </CloseButton>
            <CloseButton
              style={{ right: '60px' }}
              onClick={handleNext}
              aria-label="Next image"
            >
              &#8250;
            </CloseButton>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

CarouselModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      description: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default CarouselModal;
