import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { GalleryContainer, GalleryImageWrapper } from './gallery.css.js';
import NextImage from 'next/image';
import { sizes as defaultSizes } from 'constants/imageConfig.js';
import { addContentfulParams } from 'helpers/contentful';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

/* Next.js Image renderer for react-photo-album */
const renderNextImage = (
  { alt, title, sizes },
  { photo, width, height, index }
) => {
  // Only use blur placeholder if blurDataURL is truthy
  const hasBlur = photo.blurDataURL && typeof photo.blurDataURL === 'string';

  return (
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
        placeholder={hasBlur ? 'blur' : undefined}
        blurDataURL={photo.blurDataURL}
      />
    </GalleryImageWrapper>
  );
};

// Map gallery photos to react-photo-album format
const mapToPhotoAlbumFormat = (photos, targetRowHeight) =>
  photos.map((photo) => {
    // Get original dimensions or use fallbacks
    const originalWidth = photo.width || 1200;
    const originalHeight = photo.height || 800;

    // Calculate aspect ratio from original dimensions
    const aspectRatio = originalWidth / originalHeight;

    // Use targetRowHeight as the height constraint, calculate proportional width
    const constrainedWidth = Math.round(targetRowHeight * aspectRatio);

    // Add Contentful image optimization params for better performance
    const resolutionMultiplier = 2;
    const optimizedSrc = addContentfulParams(
      photo.src,
      Math.round(constrainedWidth * resolutionMultiplier),
      Math.round(targetRowHeight * resolutionMultiplier)
    );

    // Note: blurDataURL is now pre-generated during data fetching and passed via props

    return {
      src: optimizedSrc || photo.src,
      width: constrainedWidth,
      height: targetRowHeight,
      sizes: defaultSizes,
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
  array.sort(sortFun);
  return direction === 'desc' ? array.reverse() : array;
};

const Gallery = ({
  photos,
  order,
  orderBy,
  targetRowHeight = 150,
  spacing = 2,
  containerWidth = 900,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(
    () => orderArray([...photos], orderBy, order),
    [photos, order, orderBy]
  );

  // Handle click on photo in PhotoAlbum (returns index)
  const handlePhotoClick = (_event, arg) => {
    // react-photo-album passes index/photo info in different ways:
    // - _event.index (direct property on event)
    // - arg.index (second parameter object)
    // - arg directly as index number
    const idx =
      _event.index ??
      _event.detail?.index ??
      (typeof arg === 'object' && arg !== null ? arg.index : undefined) ??
      (typeof arg === 'number' ? arg : undefined);
    if (typeof idx === 'number' && idx >= 0) {
      setCurrent(idx);
      setOpen(true);
    }
  };

  const photoAlbumPhotos = useMemo(
    () => mapToPhotoAlbumFormat(images, targetRowHeight, containerWidth),
    [images, targetRowHeight, containerWidth]
  );

  return (
    <div>
      {photos.length > 0 && (
        <GalleryContainer $spacing={spacing} $containerWidth={containerWidth}>
          <RowsPhotoAlbum
            photos={photoAlbumPhotos}
            onClick={handlePhotoClick}
            render={{ image: renderNextImage }}
            targetRowHeight={targetRowHeight}
            spacing={spacing}
            padding={0}
          />
        </GalleryContainer>
      )}

      {isOpen && (
        <Carousel
          onClose={() => {
            setCurrent(0);
            setOpen(false);
          }}
          views={images}
          currentIndex={current}
          onIndexChange={setCurrent}
        />
      )}
    </div>
  );
};

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  targetRowHeight: PropTypes.number,
  spacing: PropTypes.number,
  containerWidth: PropTypes.number,
};

export default Gallery;
