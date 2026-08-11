import { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { componentSizes, imageQuality } from 'constants/imageConfig.js';
import contentfulLoader from 'helpers/contentfulLoader.js';
import {
  ModalOverlay,
  ModalContent,
  ModalImageContainer,
  ModalImage,
  BlurPlaceholder,
  CloseButton,
  Description,
  PrevButton,
  NextButton,
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
  const description = view?.description ?? '';
  const blurDataURL = view?.blurDataURL ?? null;

  // Preload previous and next images for faster transitions
  useEffect(() => {
    if (!views.length) return;
    const prevIndex = currentIndex === 0 ? views.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === views.length - 1 ? 0 : currentIndex + 1;
    [prevIndex, nextIndex].forEach((i) => {
      const rawSrc = views[i]?.src;
      if (rawSrc) {
        // Use the same loader transformation as ModalImage so the preloaded
        // URL matches exactly what Next.js Image will request.
        const preloadSrc = contentfulLoader({
          src: rawSrc,
          width: 1280,
          quality: imageQuality,
        });
        const img = new Image();
        img.src = preloadSrc;
      }
    });
  }, [currentIndex, views]);

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
        <ModalImageContainer>
          {blurDataURL && (
            <BlurPlaceholder
              src={blurDataURL}
              alt={altText}
              aria-hidden="true"
              loading="eager"
            />
          )}
          <ModalImage
            fill
            src={src}
            alt={altText}
            sizes={componentSizes.carousel.sizes}
            quality={30}
            loading="eager"
          />
        </ModalImageContainer>
        {description && (
          <Description $hasArrows={views.length > 1}>{description}</Description>
        )}
        {views.length > 1 && (
          <>
            <PrevButton
              onClick={handlePrev}
              aria-label="Previous image"
            >
              &#8249;
            </PrevButton>
            <NextButton
              onClick={handleNext}
              aria-label="Next image"
            >
              &#8250;
            </NextButton>
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
      blurDataURL: PropTypes.string,
    }).isRequired
  ).isRequired,
  onIndexChange: PropTypes.func.isRequired,
};

export default CarouselModal;
