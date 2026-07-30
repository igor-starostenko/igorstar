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
  useRouter: vi.fn(() => ({ query: {} })),
}));

import GalleryPage from 'pages/gallery.jsx';

test('renders Gallery with images', () => {
  const mockProps = {
    page: { title: 'Gallery' },
    gallery: {
      limit: 10,
      skip: 0,
      total: 3,
      images: [
        { src: '/a.jpg', alt: 'A' },
        { src: '/b.jpg', alt: 'B' },
        { src: '/c.jpg', alt: 'C' },
      ],
    },
  };

  render(<GalleryPage {...mockProps} />);

  expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
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

  expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
});

test('renders Gallery with empty page', () => {
  const mockProps = {
    page: {},
    gallery: { images: [] },
  };

  expect(() => render(<GalleryPage {...mockProps} />)).not.toThrow();
});
