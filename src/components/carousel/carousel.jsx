import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ImageContainer,
  GalleryImage,
} from './carousel.css.js';

const CarouselModal = ({ onClose, currentIndex, views }) => {
  const [visibleIndex, setVisibleIndex] = useState(currentIndex);

  // Avoid calling setState synchronously in effect - use derived state instead
  const effectiveVisibleIndex = useMemo(() => currentIndex, [currentIndex]);

  const handlePrev = useCallback(() => {
    setVisibleIndex((prev) => (prev === 0 ? views.length - 1 : prev - 1));
  }, [views.length]);

  const handleNext = useCallback(() => {
    setVisibleIndex((prev) => (prev === views.length - 1 ? 0 : prev + 1));
  }, [views.length]);

  useEffect(() => {
    const handleKeyDownHandler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDownHandler);
    return () => document.removeEventListener('keydown', handleKeyDownHandler);
  }, [onClose, handlePrev, handleNext]);

  const view = views[effectiveVisibleIndex];
  const src = view?.src ?? '';
  const altText = (view?.alt || view?.description) ?? '';

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
        <ImageContainer>
          <GalleryImage src={src} alt={altText} />
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
