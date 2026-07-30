import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-box">{children}</div>,
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => (
    <title data-testid="mock-head">{pageTitle}</title>
  ),
}));

vi.mock('components/title/title.jsx', () => ({
  default: ({ children }) => <h1 data-testid="mock-title">{children}</h1>,
}));

vi.mock('components/gallery/gallery.jsx', () => ({
  default: ({ photos }) => (
    <div data-testid="mock-gallery">{photos.length} photos</div>
  ),
}));

vi.mock('components/pagination/pagination.jsx', () => ({
  default: ({ pageNum, totalPages }) => (
    <div data-testid="mock-pagination">
      Page {pageNum} of {totalPages}
    </div>
  ),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({ query: {} })),
}));

import ImageGrid from './grid.jsx';

test('renders page with images', () => {
  const mockProps = {
    page: { title: 'Test Gallery' },
    data: {
      limit: 12,
      skip: 0,
      total: 3,
      images: [
        { src: '/a.jpg', alt: 'A' },
        { src: '/b.jpg', alt: 'B' },
        { src: '/c.jpg', alt: 'C' },
      ],
    },
  };

  render(<ImageGrid {...mockProps} />);

  expect(screen.getByText('Test Gallery')).toBeInTheDocument();
});

test('renders with empty images array', () => {
  const mockProps = {
    page: { title: 'Test Gallery' },
    data: {
      limit: 12,
      skip: 0,
      total: 0,
      images: [],
    },
  };

  render(<ImageGrid {...mockProps} />);

  expect(screen.queryByTestId('mock-gallery')).not.toBeInTheDocument();
});

test('does not show pagination when on last page (single page)', () => {
  const mockProps = {
    page: { title: 'Test Gallery' },
    data: {
      limit: 12,
      skip: 0,
      total: 3,
      images: [
        { src: '/a.jpg', alt: 'A' },
        { src: '/b.jpg', alt: 'B' },
        { src: '/c.jpg', alt: 'C' },
      ],
    },
  };

  render(<ImageGrid {...mockProps} />);

  expect(screen.queryByTestId('mock-pagination')).not.toBeInTheDocument();
});

test('applies formatImage function to images', () => {
  const mockProps = {
    page: { title: 'Test Gallery' },
    data: {
      limit: 12,
      skip: 0,
      total: 3,
      images: [
        { src: '/a.jpg', alt: 'A' },
        { src: '/b.jpg', alt: 'B' },
      ],
    },
    formatImage: (image) => ({ ...image, caption: 'Formatted' }),
  };

  render(<ImageGrid {...mockProps} />);

  expect(screen.getByText('2 photos')).toBeInTheDocument();
});
