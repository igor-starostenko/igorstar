import { test, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Image from 'next/image';

// Mock next/dynamic to return our components directly
vi.mock('next/dynamic', () => ({
  default: (loader) => {
    const modulePath = loader.toString();

    if (modulePath.includes('carousel.jsx')) {
      // Carousel component - returns a simple wrapper
      const CarouselMock = ({ children }) => (
        <div data-testid="mock-carousel">{children}</div>
      );
      CarouselMock.displayName = 'CarouselMock';
      return CarouselMock;
    }

    if (modulePath.includes('image.jsx')) {
      const ImageMock = ({ style, onClick, alt }) => (
        <div data-testid="mock-image" style={style} onClick={onClick}>
          {alt || ''}
        </div>
      );
      ImageMock.displayName = 'ImageMock';
      return ImageMock;
    }

    if (modulePath.includes('next/image')) {
      // Next.js Image component for custom rendering - returns a container with img
      const BaseNextImageMock = ({
        src,
        alt,
        fill,
        sizes: _sizes,
        placeholder: _placeholder,
        title,
        style,
      }) => {
        // Return a wrapper div that contains the Next.js Image element
        return (
          <div
            data-testid="mock-rows-photo-album-image"
            style={fill ? { position: 'relative', ...style } : {}}
            title={title}
          >
            <Image
              src={src}
              alt={alt || ''}
              fill={fill}
              style={style}
              sizes="100vw"
            />
            {alt}
          </div>
        );
      };
      BaseNextImageMock.displayName = 'BaseNextImageMock';
      return BaseNextImageMock;
    }

    if (modulePath.includes('carousel.jsx')) {
      const CarouselMock = ({ onClose, views, _currentIndex }) => (
        <div data-testid="mock-carousel" onClick={onClose}>
          {views.map((_v, i) => (
            <div key={i} data-testid="carousel-view" />
          ))}
        </div>
      );
      CarouselMock.displayName = 'CarouselMock';
      return CarouselMock;
    }

    return (props) => {
      const { renderImage, targetRowHeight, photos, ...rest } = props;
      return (
        <div
          data-testid="mock-dynamic-component"
          data-photos={JSON.stringify(photos)}
          {...rest}
        />
      );
    };
  },
}));

// Mock react-photo-album
vi.mock('react-photo-album', () => ({
  PhotoAlbum: ({ photos, onClick }) => (
    <div data-testid="mock-photo-album">
      {photos.map((photo, index) => (
        <div
          key={index}
          data-testid="mock-photo-album-image"
          onClick={(e) => onClick(e, { index })}
        >
          {photo.alt || ''}
        </div>
      ))}
    </div>
  ),
  RowsPhotoAlbum: ({ photos, onClick, render }) => {
    // When custom render is provided, use it instead of default rendering
    if (render && render.image) {
      return (
        <div data-testid="mock-rows-photo-album">
          {photos.map((photo, index) => (
            <div
              key={index}
              data-testid="mock-rows-photo-album-wrapper"
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e, { index });
              }}
            >
              {render.image(
                { alt: photo.alt },
                { photo, width: photo.width, height: photo.height }
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div data-testid="mock-rows-photo-album">
        {photos.map((photo, index) => (
          <div
            key={index}
            data-testid="mock-rows-photo-album-image"
            onClick={(e) => onClick && onClick(e, { index })}
          >
            {photo.alt || ''}
          </div>
        ))}
      </div>
    );
  },
  MasonryPhotoAlbum: ({ photos, onClick }) => (
    <div data-testid="mock-masonry-photo-album">
      {photos.map((photo, index) => (
        <div
          key={index}
          data-testid="mock-rows-photo-album-image"
          onClick={(e) => onClick(e, { index })}
        >
          {photo.alt || ''}
        </div>
      ))}
    </div>
  ),
  MouseClickZoom: () => <span data-testid="mock-mouse-click-zoom">Zoom</span>,
  ColumnsPhotoAlbum: ({ photos, onClick, render }) => {
    // When custom render is provided, use it instead of default rendering
    if (render && render.image) {
      return (
        <div data-testid="mock-columns-photo-album">
          {photos.map((photo, index) => (
            <div
              key={index}
              data-testid="mock-columns-photo-album-wrapper"
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e, { index });
              }}
            >
              {render.image(
                { alt: photo.alt },
                { photo, width: photo.width, height: photo.height }
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div data-testid="mock-columns-photo-album">
        {photos.map((photo, index) => (
          <div
            key={index}
            data-testid="mock-columns-photo-album-image"
            onClick={(e) => onClick && onClick(e, { index })}
          >
            {photo.alt || ''}
          </div>
        ))}
      </div>
    );
  },
}));

// Mock next/image for direct usage in gallery.jsx
vi.mock('next/image', () => ({
  default: ({ src: _src, alt, fill: _fill, sizes: _sizes, placeholder: _placeholder, title: _title, style }) => {
    // Return a wrapper div with an img element
    return (
      <div data-testid="mock-next-image" style={style}>
        {alt && <span>{alt}</span>}
      </div>
    );
  },
}));

import Gallery from './gallery.jsx';

// Helper to create fresh array instances for each test
const getUnsortedPhotos = () => [
  { id: '2', src: '/b.jpg', alt: 'B image', width: 200, height: 100 },
  { id: '1', src: '/a.jpg', alt: 'A image', width: 100, height: 200 },
];

// Test helper that gets images - adapts to which mock mode is used
const getGalleryImages = () => {
  // When using custom render (next/image), we get mock-next-image
  try {
    return screen.getAllByTestId('mock-next-image');
  } catch (_e) {
    // Fall back to mock-image
    try {
      return screen.getAllByTestId('mock-image');
    } catch (_e2) {
      // Fall back to default mock mode
      return screen.getAllByTestId('mock-rows-photo-album-image');
    }
  }
};

test('renders image gallery when photos are provided', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const images = getGalleryImages();
  expect(images.length).toBe(2);
});

test('sorts photos by width ascending when orderBy and order are set', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="asc" orderBy="width" />);
  });

  const images = getGalleryImages();
  expect(images[0]).toHaveTextContent('A image');
});

test('opens carousel on image click', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const images = getGalleryImages();
  expect(images.length).toBeGreaterThan(0);

  fireEvent.click(images[0]);

  expect(screen.getByTestId('mock-carousel')).toBeInTheDocument();
});

test('sorts photos by width descending when order is desc', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="desc" orderBy="width" />);
  });

  const images = getGalleryImages();
  expect(images[0]).toHaveTextContent('B image');
});

test('returns unsorted array when orderBy is not provided', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const images = getGalleryImages();
  expect(images[0]).toHaveTextContent('B image');
});

test('returns unsorted array when order direction is invalid', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="invalid" orderBy="width" />);
  });

  const images = getGalleryImages();
  expect(images[0]).toHaveTextContent('B image');
});

test('renders gallery with empty photos array', async () => {
  await act(async () => {
    render(<Gallery photos={[]} />);
  });

  expect(screen.queryByTestId('mock-image')).not.toBeInTheDocument();
});

test('renders gallery with single photo', async () => {
  await act(async () => {
    render(
      <Gallery
        photos={[
          {
            id: '1',
            src: '/a.jpg',
            alt: 'Single image',
            width: 100,
            height: 200,
          },
        ]}
      />
    );
  });

  const images = getGalleryImages();
  expect(images.length).toBe(1);
});
