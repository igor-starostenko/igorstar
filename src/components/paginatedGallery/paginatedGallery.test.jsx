import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import PaginatedGallery from './paginatedGallery.jsx';

// Mock dynamic imports
vi.mock('next/dynamic', () => ({
  default: (comp) => comp(),
}));

vi.mock('components/gallery/gallery.jsx', () => ({
  default: ({ photos, targetRowHeight }) => (
    <div data-testid="mock-gallery">
      Gallery: {photos.length} photos @ {targetRowHeight}px
    </div>
  ),
}));

vi.mock('components/carousel/carousel.jsx', () => ({
  default: ({ views, currentIndex, onClose }) => (
    <div data-testid="mock-carousel">
      Carousel: view {currentIndex} of {views.length}
    </div>
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => <div data-testid="mock-head">{pageTitle}</div>,
}));

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

// Mock InfiniteScroll from react-photo-album/scroll
vi.mock('react-photo-album/scroll', () => ({
  default: ({ photos, fetch, onClick, finished }) => {
    // Simple mock that just renders photos
    return (
      <div data-testid="mock-infinite-scroll">
        {photos.map((photo, idx) => (
          <div key={idx} onClick={() => onClick({ photos, index: idx })}>
            {photo.src || `Photo ${idx}`}
          </div>
        ))}
        <div>{finished}</div>
      </div>
    );
  },
}));

// Mock RowsPhotoAlbum
vi.mock('react-photo-album', () => ({
  RowsPhotoAlbum: ({ targetRowHeight, spacing, padding }) => (
    <div data-testid="mock-rows-photo-album">
      Photos @ {targetRowHeight}px row height
    </div>
  ),
}));

test('renders with preloaded images', () => {
  const mockImages = [
    { src: '/img1.jpg', width: 300, height: 200 },
    { src: '/img2.jpg', width: 300, height: 200 },
    { src: '/img3.jpg', width: 300, height: 200 },
    { src: '/img4.jpg', width: 300, height: 200 },
    { src: '/img5.jpg', width: 300, height: 200 },
    { src: '/img6.jpg', width: 300, height: 200 },
    { src: '/img7.jpg', width: 300, height: 200 },
    { src: '/img8.jpg', width: 300, height: 200 },
    { src: '/img9.jpg', width: 300, height: 200 },
    { src: '/img10.jpg', width: 300, height: 200 },
    { src: '/img11.jpg', width: 300, height: 200 },
    { src: '/img12.jpg', width: 300, height: 200 },
    { src: '/img13.jpg', width: 300, height: 200 },
    { src: '/img14.jpg', width: 300, height: 200 },
    { src: '/img15.jpg', width: 300, height: 200 },
    { src: '/img16.jpg', width: 300, height: 200 },
    { src: '/img17.jpg', width: 300, height: 200 },
    { src: '/img18.jpg', width: 300, height: 200 },
  ];

  const mockProps = {
    title: 'Test Gallery',
    total: mockImages.length,
    images: mockImages,
    pageSize: 10,
    targetRowHeight: 300,
  };

  render(<PaginatedGallery {...mockProps} />);

  expect(screen.getByTestId('mock-head')).toHaveTextContent('Test Gallery');
  expect(screen.getByTestId('mock-infinite-scroll')).toBeInTheDocument();
});

test('handles page offset correctly', () => {
  const mockImages = Array.from({ length: 25 }, (_, i) => ({
    src: `/img${i + 1}.jpg`,
    width: 300,
    height: 200,
  }));

  const mockProps = {
    title: 'Test Gallery',
    total: mockImages.length,
    images: mockImages,
    pageSize: 10,
    targetRowHeight: 300,
  };

  // Mock router with page=2
  vi.mock('next/router', () => ({
    useRouter: () => ({
      query: { page: '2' },
    }),
  }));

  // Re-import to get fresh mock
  delete require.cache[require.resolve('./paginatedGallery.jsx')];
});
