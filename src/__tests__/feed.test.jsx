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
  default: ({ children, _as }) => <h1 data-testid="mock-title">{children}</h1>,
}));

vi.mock('components/infinite-scroll/InfiniteScroll.jsx', () => ({
  default: ({ children }) => (
    <div data-testid="mock-infinite-scroll">
      {children}
      <div data-testid="infinite-scroll-sentinel" />
    </div>
  ),
}));

import FeedPage from 'pages/feed/[page].jsx';

test('renders Feed with images', () => {
  const mockProps = {
    page: { title: 'Photo Feed' },
    feed: {
      limit: 10,
      skip: 0,
      total: 2,
      images: [
        { sys: { id: '1' }, fields: {} },
        { sys: { id: '2' }, fields: {} },
      ],
    },
  };

  render(<FeedPage {...mockProps} />);

  // Use getByText since title appears once in the actual page
  const title = screen.getByText('Photo Feed');
  expect(title).toBeInTheDocument();
});

test('renders Feed with empty images', () => {
  const mockProps = {
    page: { title: 'Photo Feed' },
    feed: {
      limit: 10,
      skip: 0,
      total: 0,
      images: [],
    },
  };

  render(<FeedPage {...mockProps} />);

  expect(screen.getByTestId('mock-box')).toBeInTheDocument();
});

test('renders Feed with empty page', () => {
  const mockProps = {
    page: {},
    feed: { images: [] },
  };

  expect(() => render(<FeedPage {...mockProps} />)).not.toThrow();
});
