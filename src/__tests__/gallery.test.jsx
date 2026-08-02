import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children, style }) => (
    <div data-testid="mock-box" style={style}>
      {children}
    </div>
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => (
    <title data-testid="mock-head">{pageTitle}</title>
  ),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({ query: {}, isReady: true })),
}));

vi.mock('components/paginatedGallery/paginatedGallery.jsx', () => ({
  default: ({ title, total, images }) => (
    <div data-testid="mock-paginated-gallery">
      {title}-{total}-{images.length}
    </div>
  ),
}));

import GalleryPage from 'pages/gallery.jsx';

test('renders Gallery with images', () => {
  const mockProps = {
    title: 'Gallery',
    total: 3,
    images: [
      { src: '/a.jpg', alt: 'A' },
      { src: '/b.jpg', alt: 'B' },
      { src: '/c.jpg', alt: 'C' },
    ],
  };

  render(<GalleryPage {...mockProps} />);

  expect(screen.getByTestId('mock-paginated-gallery')).toBeInTheDocument();
});

test('renders Gallery with empty images', () => {
  const mockProps = {
    title: 'Gallery',
    total: 0,
    images: [],
  };

  render(<GalleryPage {...mockProps} />);

  expect(screen.getByTestId('mock-paginated-gallery')).toBeInTheDocument();
});

test('renders Gallery with empty page', () => {
  const mockProps = {
    title: '',
    total: 0,
    images: [],
  };

  expect(() => render(<GalleryPage {...mockProps} />)).not.toThrow();
});
