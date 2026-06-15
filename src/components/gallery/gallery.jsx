import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import styled from 'styled-components';
import NextImage from 'next/image';

const Carousel = dynamic(() => import('components/carousel/carousel.jsx'));

/* Next.js Image renderer for react-photo-album */
const renderNextImage = (
  { alt, title, sizes },
  { photo, width, height }
) => {
  const src = typeof photo === 'string' ? photo : (photo.src ?? photo.url);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <NextImage
        fill
        src={src}
        alt={alt}
        title={title}
        sizes={sizes}
        loading="eager"
        placeholder={'blurDataURL' in photo ? 'blur' : undefined}
      />
    </div>
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

    return {
      src: photo.src,
      width: constrainedWidth,
      height: targetRowHeight,
      alt: photo.description || photo.alt || '',
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

const GalleryContainer = styled.div`
  margin: ${(props) => props.$spacing}px;
  max-width: ${(props) => props.$containerWidth}px;

  /* Override react-photo-album CSS to ensure valid position for Next.js...[truncated]
  .react-photo-album--photo {
    position: relative !important;
  }
`;

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
    () => mapToPhotoAlbumFormat(images, targetRowHeight),
    [images, targetRowHeight]
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
