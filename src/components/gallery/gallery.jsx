import { useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { GalleryContainer, GalleryImageWrapper } from './gallery.css.js';
import NextImage from 'next/image';
import { componentSizes } from 'constants/imageConfig.js';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

const renderNextImage = (
  { alt, title, sizes },
  { photo, width, height, index }
) => (
  <GalleryImageWrapper
    style={{
      width: `${width}px`,
      height: `${height}px`,
      aspectRatio: `${width} / ${height}`,
    }}
  >
    <NextImage
      fill
      src={photo.src ?? photo.url}
      alt={alt}
      title={title}
      sizes={sizes}
      loading={index === 0 ? 'eager' : 'lazy'}
      preload={index === 0}
      quality={30}
      placeholder={
        photo.blurDataURL && typeof photo.blurDataURL === 'string'
          ? 'blur'
          : undefined
      }
      blurDataURL={photo.blurDataURL}
    />
  </GalleryImageWrapper>
);

const mapToPhotoAlbumFormat = (photos, targetRowHeight) =>
  photos.map((photo) => {
    const originalWidth = photo.width || componentSizes.gallery.width;
    const originalHeight = photo.height || componentSizes.gallery.height;

    const aspectRatio = originalWidth / originalHeight;
    const constrainedHeight = targetRowHeight;
    const constrainedWidth = Math.round(constrainedHeight * aspectRatio);

    return {
      src: photo.src,
      width: constrainedWidth,
      height: constrainedHeight,
      alt: photo.description || photo.alt || '',
      description: photo.description || '',
      date: photo.date,
      blurDataURL: photo.blurDataURL,
    };
  });

const createSortFunction = (orderBy) => {
  if (!orderBy) return () => 0;
  return (a, b) => {
    if (a[orderBy] < b[orderBy]) return -1;
    if (a[orderBy] > b[orderBy]) return 1;
    return 0;
  };
};

const orderArray = (array, orderBy, order) => {
  if (!orderBy) return array;
  const direction = String(order).toLowerCase();
  if (!['desc', 'asc'].includes(direction)) return array;
  const sortFun = createSortFunction(orderBy);
  const sortedArray = [...array].sort(sortFun);
  return direction === 'desc' ? sortedArray.reverse() : sortedArray;
};

const Gallery = ({
  photos,
  orderBy,
  order = 'desc',
  targetRowHeight = 150,
  spacing = 2,
  containerWidth = componentSizes.gallery.width,
  onGetNextPage,
  pageKey,
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const prevPageKeyRef = useRef(pageKey);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  // Reset current photo when page changes (e.g. carousel triggered next-page nav)
  useLayoutEffect(() => {
    if (pageKey !== prevPageKeyRef.current && currentPhoto !== null) {
      setCurrentPhoto(0);
    }
    prevPageKeyRef.current = pageKey;
  }, [pageKey, currentPhoto]);

  const sortedPhotos = useMemo(
    () => orderArray(photos, orderBy, order),
    [photos, order, orderBy]
  );

  const mappedPhotos = useMemo(
    () => mapToPhotoAlbumFormat(sortedPhotos, targetRowHeight),
    [sortedPhotos, targetRowHeight]
  );

  // carouselViews derives from mappedPhotos so it stays in sync when
  // onGetNextPage expands the photos prop (via increased displayCount).
  const carouselViews = mappedPhotos;

  const handleLoadMore = useCallback(() => {
    if (!onGetNextPage || !hasMoreImages) return false;
    const result = onGetNextPage();
    if (result === false) {
      setHasMoreImages(false);
      return false;
    }
    return true;
  }, [onGetNextPage, hasMoreImages]);

  const handlePhotoClick = (event, arg) => {
    const idx =
      event?.index ??
      (typeof arg === 'number' ? arg : undefined) ??
      (arg && typeof arg.index === 'number' ? arg.index : -1);
    if (idx >= 0) {
      const clickedSrc = mappedPhotos[idx]?.src;
      const viewIndex = carouselViews.findIndex(
        (photo) => photo.src === clickedSrc
      );
      const targetIndex = viewIndex >= 0 ? viewIndex : idx;
      setCurrentPhoto(targetIndex);
      // Load more images when clicking a photo near the end
      if (
        hasMoreImages &&
        onGetNextPage &&
        targetIndex >= carouselViews.length - 2
      ) {
        handleLoadMore();
      }
    }
  };

  const handleCloseModal = () => {
    setCurrentPhoto(null);
  };

  const handleIndexChange = (newIndex) => {
    setCurrentPhoto(newIndex);
    // Load more images when navigating near the end
    if (
      hasMoreImages &&
      onGetNextPage &&
      newIndex >= carouselViews.length - 2
    ) {
      handleLoadMore();
    }
  };

  return (
    <>
      <GalleryContainer $spacing={spacing} $containerWidth={containerWidth}>
        <RowsPhotoAlbum
          photos={mappedPhotos}
          render={{ image: renderNextImage }}
          onClick={handlePhotoClick}
          spacing={spacing}
          padding={0}
          containerWidth={containerWidth}
          defaultContainerWidth={containerWidth}
          sizes={{
            size: componentSizes.gallery.size,
            sizes: componentSizes.gallery.sizes,
          }}
          targetRowHeight={targetRowHeight}
        />
      </GalleryContainer>
      {currentPhoto !== null && currentPhoto >= 0 && (
        <Carousel
          views={carouselViews}
          currentIndex={currentPhoto}
          onClose={handleCloseModal}
          onIndexChange={handleIndexChange}
          onGetNextPage={handleLoadMore}
          pageKey={pageKey}
        />
      )}
    </>
  );
};

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      blurDataURL: PropTypes.string,
      description: PropTypes.string,
      alt: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  targetRowHeight: PropTypes.number,
  spacing: PropTypes.number,
  containerWidth: PropTypes.number,
  onGetNextPage: PropTypes.func,
  pageKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Gallery;