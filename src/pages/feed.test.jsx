import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children, style }) => (
    <div data-testid="mock-box" style={style}>{children}</div>
  ),
}));

vi.mock('components/gallery/gallery.jsx', () => ({
  default: ({ photos }) => (
    <div data-testid="mock-gallery">{photos.length} photos</div>
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => <title data-testid="mock-head">{pageTitle}</title>,
}));

vi.mock('components/title/title.jsx', () => ({
  default: ({ children, as }) => <h1 data-testid="mock-title">{children}</h1>,
}));

import FeedPage from './feed.jsx';

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
      ]
    }
  };
  
  render(<FeedPage {...mockProps} />);

  // Use getAllByText since title appears multiple times
  const titles = screen.getAllByText('Photo Feed');
  expect(titles.length).toBeGreaterThan(0);
});

test('renders Feed with empty images', () => {
  const mockProps = { 
    page: { title: 'Photo Feed' },
    feed: {
      limit: 10,
      skip: 0,
      total: 0,
      images: []
    }
  };
  
  render(<FeedPage {...mockProps} />);

  expect(screen.getByTestId('mock-box')).toBeInTheDocument();
});

test('renders Feed with empty page', () => {
  const mockProps = { 
    page: {},
    feed: { images: [] }
  };
  
  expect(() => render(<FeedPage {...mockProps} />)).not.toThrow();
});
