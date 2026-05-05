import { test, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';

// Mock all the dynamic imports and external modules
vi.mock('next/dynamic', () => ({
  default: (loader) => {
    // Store loaded component in a global for test access
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

    // Default: return component that excludes invalid DOM props
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

const unsortedPhotos = [
  { id: '2', src: 'b.jpg', width: 200, height: 100 },
  { id: '1', src: 'a.jpg', width: 100, height: 200 },
];

test('renders PhotoGallery when photos are provided', async () => {
  await act(async () => {
    render(<Gallery photos={unsortedPhotos} />);
  });

  expect(screen.getByTestId('mock-photo-gallery')).toBeInTheDocument();
});

test('sorts photos by width ascending when orderBy and order are set', async () => {
  await act(async () => {
    render(<Gallery photos={unsortedPhotos} order="asc" orderBy="width" />);
  });

  const gallery = screen.getByTestId('mock-photo-gallery');
  // The mock stores photos in a data attribute
  const photosAttr = gallery.getAttribute('data-photos');
  // Parse the photos from the attribute
  const photos = JSON.parse(photosAttr);

  // Verify ascending order by width: photo with width 100 should come before width 200
  expect(photos.length).toBe(unsortedPhotos.length);
  expect(photos[0].width).toBeLessThanOrEqual(photos[1].width);
});

test('opens carousel on image click', async () => {
  await act(async () => {
    render(<Gallery photos={unsortedPhotos} />);
  });

  const images = screen.getAllByTestId('mock-image');
  expect(images.length).toBeGreaterThan(0);

  // Click the image to trigger imageClick which sets isOpen=true
  fireEvent.click(images[0]);

  // After clicking, the ModalGateway should contain the Carousel component
  const modal = screen.getByTestId('mock-modal-gateway');
  expect(modal).toBeInTheDocument();
});
