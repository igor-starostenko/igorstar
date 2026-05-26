import { test, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';

vi.mock('next/dynamic', () => ({
  default: (loader) => {
    const modulePath = loader.toString();

    if (modulePath.includes('image.jsx')) {
      return ({ style, onClick, alt }) => (
        <div data-testid="mock-image" style={style} onClick={onClick}>
          {alt}
        </div>
      );
    }

    if (modulePath.includes('carousel.jsx')) {
      return ({ onClose, views, currentIndex }) => (
        <div data-testid="mock-carousel" onClick={onClose}>
          {views.map((v, i) => (
            <div key={i} data-testid="carousel-view" />
          ))}
        </div>
      );
    }

    if (modulePath.includes('react-photo-gallery')) {
      return ({ photos, onClick, renderImage }) => {
        const renderedImages = photos.map((photo, index) =>
          renderImage({ photo, index, onClick })
        );
        return (
          <div data-testid="mock-photo-gallery" data-photos={JSON.stringify(photos)}>
            {renderedImages}
          </div>
        );
      };
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

vi.mock('react-images', () => ({
  __esModule: true,
  ModalGateway: ({ children }) => <div data-testid="mock-modal-gateway">{children}</div>,
}));

import Gallery from './gallery.jsx';

// Helper to create fresh array instances for each test
const getUnsortedPhotos = () => [
  { id: '2', src: 'b.jpg', width: 200, height: 100 },
  { id: '1', src: 'a.jpg', width: 100, height: 200 },
];

test('renders PhotoGallery when photos are provided', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  expect(screen.getByTestId('mock-photo-gallery')).toBeInTheDocument();
});

test('sorts photos by width ascending when orderBy and order are set', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="asc" orderBy="width" />);
  });

  const gallery = screen.getByTestId('mock-photo-gallery');
  const photosAttr = gallery.getAttribute('data-photos');
  const parsedPhotos = JSON.parse(photosAttr);

  expect(parsedPhotos[0].width).toBeLessThan(parsedPhotos[1].width);
});

test('opens carousel on image click', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const images = screen.getAllByTestId('mock-image');
  expect(images.length).toBeGreaterThan(0);

  fireEvent.click(images[0]);

  const modal = screen.getByTestId('mock-modal-gateway');
  expect(screen.getByTestId('mock-carousel')).toBeInTheDocument();
});

test('sorts photos by width descending when order is desc', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="desc" orderBy="width" />);
  });

  const gallery = screen.getByTestId('mock-photo-gallery');
  const photosAttr = gallery.getAttribute('data-photos');
  const parsedPhotos = JSON.parse(photosAttr);

  expect(parsedPhotos[0].width).toBeGreaterThan(parsedPhotos[1].width);
});

test('returns unsorted array when orderBy is not provided', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} />);
  });

  const gallery = screen.getByTestId('mock-photo-gallery');
  const photosAttr = gallery.getAttribute('data-photos');
  const parsedPhotos = JSON.parse(photosAttr);

  expect(parsedPhotos[0].id).toBe('2');
});

test('returns unsorted array when order direction is invalid', async () => {
  const photos = getUnsortedPhotos();
  await act(async () => {
    render(<Gallery photos={photos} order="invalid" orderBy="width" />);
  });

  const gallery = screen.getByTestId('mock-photo-gallery');
  const photosAttr = gallery.getAttribute('data-photos');
  const parsedPhotos = JSON.parse(photosAttr);

  expect(parsedPhotos[0].id).toBe('2');
});

test('renders gallery with empty photos array', async () => {
  await act(async () => {
    render(<Gallery photos={[]} />);
  });

  expect(screen.queryByTestId('mock-photo-gallery')).not.toBeInTheDocument();
});

test('renders gallery with single photo', async () => {
  await act(async () => {
    render(<Gallery photos={[{ id: '1', src: 'a.jpg', width: 100, height: 200 }]} />);
  });

  expect(screen.getByTestId('mock-photo-gallery')).toBeInTheDocument();
});
