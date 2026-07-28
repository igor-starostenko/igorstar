import { test, expect, vi } from 'vitest';
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

vi.mock('components/gallery/gallery.jsx', () => ({
  default: ({ photos }) => (
    <div data-testid="mock-gallery">{photos.length} photos</div>
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => (
    <title data-testid="mock-head">{pageTitle}</title>
  ),
}));

vi.mock('components/title/title.jsx', () => ({
  default: ({ children }) => <h1 data-testid="mock-title">{children}</h1>,
}));

vi.mock('components/infinite-scroll/InfiniteScroll.jsx', () => ({
  default: ({ children }) => (
    <div data-testid="mock-infinite-scroll">
      {children}
      <div data-testid="infinite-scroll-sentinel" />
    </div>
  ),
}));

import GalleryPage from 'pages/gallery/[page].jsx';

test('renders Gallery with images', () => {
  const mockProps = {
    page: { title: 'Gallery' },
    gallery: {
      limit: 10,
      skip: 0,
      total: 3,
      images: [
        { sys: { id: '1' }, fields: {} },
        { sys: { id: '2' }, fields: {} },
        { sys: { id: '3' }, fields: {} },
      ],
    },
  };

  render(<GalleryPage {...mockProps} />);

  expect(screen.getByText('3 photos')).toBeInTheDocument();
});

test('renders Gallery with empty images', () => {
  const mockProps = {
    page: { title: 'Gallery' },
    gallery: {
      limit: 10,
      skip: 0,
      total: 0,
      images: [],
    },
  };

  render(<GalleryPage {...mockProps} />);

  // When images is empty, Gallery component isn't rendered, so check box instead
  expect(screen.getByTestId('mock-box')).toBeInTheDocument();
});

test('renders Gallery with empty page', () => {
  const mockProps = {
    page: {},
    gallery: { images: [] },
  };

  expect(() => render(<GalleryPage {...mockProps} />)).not.toThrow();
});
