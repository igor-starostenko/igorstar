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

import FeedPage from 'pages/feed.jsx';

test('renders Feed with images', () => {
  const mockProps = {
    page: { title: 'Photo Feed' },
    feed: {
      limit: 10,
      skip: 0,
      total: 2,
      images: [
        { src: '/a.jpg', alt: 'A' },
        { src: '/b.jpg', alt: 'B' },
      ],
    },
  };

  render(<FeedPage {...mockProps} />);

  expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
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

  expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
});

test('renders Feed with empty page', () => {
  const mockProps = {
    page: {},
    feed: { images: [] },
  };

  expect(() => render(<FeedPage {...mockProps} />)).not.toThrow();
});
