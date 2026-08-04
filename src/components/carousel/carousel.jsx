import { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import NextImage from 'next/image';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ImageContainer,
} from './carousel.css.js';

const CarouselModal = ({ onClose, currentIndex, views, onIndexChange }) => {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handlePrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? views.length - 1 : currentIndex - 1;
    onIndexChange(newIndex);
  }, [currentIndex, views.length, onIndexChange]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === views.length - 1 ? 0 : currentIndex + 1;
    onIndexChange(newIndex);
  }, [currentIndex, views.length, onIndexChange]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) >= minSwipeDistance) {
      if (deltaX > 0) handleNext();
      else handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [handlePrev, handleNext]);

  const handleClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
        return;
      }

      const dialog = e.target.closest('[role="dialog"]');
      const rect = (dialog ?? e.currentTarget).getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const modalWidth = rect.width;

      if (clickX < modalWidth * 0.4) handlePrev();
      else if (clickX > modalWidth * 0.6) handleNext();
    },
    [onClose, handlePrev, handleNext]
  );

  const handleContentClick = useCallback((e) => {
    const button = e.target.closest('button');
    if (button) e.stopPropagation();
  }, []);

  useEffect(() => {
    const handleKeyDownHandler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDownHandler);
    return () => document.removeEventListener('keydown', handleKeyDownHandler);
  }, [onClose, handlePrev, handleNext]);

  const view = views[currentIndex];
  const src = view?.src ?? '';
  const altText = (view?.alt || view?.description) ?? '';
  const width = view?.width ?? 1920;
  const height = view?.height ?? 1080;

  return (
    <ModalOverlay onClick={handleClick}>
      <ModalContent
        role="dialog"
        aria-modal="true"
        onClick={handleContentClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
        <ImageContainer>
          <NextImage
            src={src}
            alt={altText}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            loading="eager"
            quality={75}
          />
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
  onIndexChange: PropTypes.func.isRequired,
};

export default CarouselModal;
