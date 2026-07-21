import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { GalleryContainer, GalleryImageWrapper } from './gallery.css.js';
import NextImage from 'next/image';
import { sizes, componentSizes } from 'constants/imageConfig.js';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

const renderNextImage = (
  { alt, title, sizes },
  { photo, width, height, index }
) => (
  <GalleryImageWrapper
    style={{
      width: `${width}px`,
      height: `${height}px`,
    }}
  >
    <NextImage
      fill
      src={photo.src ?? photo.url}
      alt={alt}
      title={title}
      sizes={sizes}
      priority={index <= 5}
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
    const originalWidth = photo.width || componentSizes.gallery.maxWidth;
    const originalHeight = photo.height || (componentSizes.gallery.maxHeight ?? 800);

    const aspectRatio = originalWidth / originalHeight;
    const constrainedWidth = Math.round(targetRowHeight * aspectRatio);

    const resolutionMultiplier = 2;
    const maxGalleryWidth = Math.round(constrainedWidth * resolutionMultiplier);

    return {
      src: photo.src,
      width: constrainedWidth,
      height: targetRowHeight,
      sizes: sizes.gallery,
      alt: photo.description || photo.alt || '',
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
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const sortedPhotos = useMemo(
    () => orderArray(photos, orderBy, order),
    [photos, orderBy, order]
  );

  const mappedPhotos = useMemo(
    () => mapToPhotoAlbumFormat(sortedPhotos, targetRowHeight),
    [sortedPhotos, targetRowHeight]
  );

  const handlePhotoClick = (event, arg) => {
    const idx =
      event.index ??
      (typeof arg === 'number' ? arg : undefined) ??
      (arg && typeof arg.index === 'number' ? arg.index : -1);
    if (idx >= 0) setCurrentPhoto(idx);
  };

  const handleCloseModal = () => {
    setCurrentPhoto(null);
  };

  return (
    <>
      <GalleryContainer>
        <RowsPhotoAlbum
          photos={mappedPhotos}
          renderNextImage={renderNextImage}
          onClick={handlePhotoClick}
        />
      </GalleryContainer>
      {currentPhoto !== null && currentPhoto >= 0 && (
        <Carousel
          views={mappedPhotos}
          currentIndex={currentPhoto}
          onClose={handleCloseModal}
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
    })
  ),
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  targetRowHeight: PropTypes.number,
};

export default Gallery;
