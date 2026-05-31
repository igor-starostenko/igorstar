import { test, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';

// Mock next/dynamic to return our components directly
vi.mock('next/dynamic', () => ({
  default: (loader) => {
    const modulePath = loader.toString();

    if (modulePath.includes('image.jsx')) {
      const ImageMock = ({ style, onClick, alt }) => (
        <div data-testid="mock-image" style={style} onClick={onClick}>
          {alt || ''}
        </div>
      );
      ImageMock.displayName = 'ImageMock';
      return ImageMock;
    }

    if (modulePath.includes('carousel.jsx')) {
      const CarouselMock = ({ onClose, views, currentIndex }) => (
        <div data-testid="mock-carousel" onClick={onClose}>
          {views.map((v, i) => (
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
  RowsPhotoAlbum: ({ photos, onClick }) => (
    <div data-testid="mock-rows-photo-album">
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
}));

import Gallery from './gallery.jsx';

// Helper to create fresh array instances for each test
const getUnsortedPhotos = () => [
  { id: '2', src: 'b.jpg', alt: 'B image', width: 200, height: 100 },
  { id: '1', src: 'a.jpg', alt: 'A image', width: 100, height: 200 },
];

test('renders image gallery when photos are provided', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const images = screen.getAllByTestId('mock-rows-photo-album-image');
  expect(images.length).toBe(2);
});

test('sorts photos by width ascending when orderBy and order are set', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="asc" orderBy="width" />);
  });

  const images = screen.getAllByTestId('mock-rows-photo-album-image');
  expect(images[0]).toHaveTextContent('A image');
});

test('opens carousel on image click', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const images = screen.getAllByTestId('mock-rows-photo-album-image');
  expect(images.length).toBeGreaterThan(0);

  fireEvent.click(images[0]);

  expect(screen.getByTestId('mock-carousel')).toBeInTheDocument();
});

test('sorts photos by width descending when order is desc', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="desc" orderBy="width" />);
  });

  const images = screen.getAllByTestId('mock-rows-photo-album-image');
  expect(images[0]).toHaveTextContent('B image');
});

test('returns unsorted array when orderBy is not provided', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const images = screen.getAllByTestId('mock-rows-photo-album-image');
  expect(images[0]).toHaveTextContent('B image');
});

test('returns unsorted array when order direction is invalid', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="invalid" orderBy="width" />);
  });

  const images = screen.getAllByTestId('mock-rows-photo-album-image');
  expect(images[0]).toHaveTextContent('B image');
});

test('renders gallery with empty photos array', async () => {
  await act(async () => {
    render(<Gallery photos={[]} />);
  });

  expect(screen.queryByTestId('mock-rows-photo-album-image')).not.toBeInTheDocument();
});

test('renders gallery with single photo', async () => {
  await act(async () => {
    render(<Gallery photos={[{ id: '1', src: 'a.jpg', alt: 'Single image', width: 100, height: 200 }]} />);
  });

  const images = screen.getAllByTestId('mock-rows-photo-album-image');
  expect(images.length).toBe(1);
});
