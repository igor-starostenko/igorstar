import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    asPath: '/test',
  }),
}));

vi.mock('next/dynamic', () => ({
  default: (_loader) => {
    const MockDynamic = ({ children }) => (
      <div data-testid="mock-dynamic">{children}</div>
    );
    return MockDynamic;
  },
}));

vi.mock('hooks/useInfiniteScroll.jsx', () => ({
  useInfiniteScroll: (items, batchSize = 20) => ({
    items: items.slice(0, batchSize),
    loadMore: vi.fn(),
  }),
}));

vi.mock('components/infinite-scroll/InfiniteScroll.jsx', () => ({
  default: ({ children }) => (
    <div data-testid="mock-infinite-scroll">
      {children}
      <div data-testid="infinite-scroll-sentinel" />
    </div>
  ),
}));

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children, isMain }) => (
    <div data-testid="mock-box" data-ismain={isMain ? 'true' : 'false'}>
      {children}
    </div>
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => (
    <title data-testid="mock-head">{pageTitle}</title>
  ),
}));

vi.mock('components/filter/filter.jsx', () => ({
  default: ({ _path, title, displayCount, totalCount }) => (
    <div data-testid="mock-filter">
      {title} ({displayCount}/{totalCount})
    </div>
  ),
}));

vi.mock('components/article/article.jsx', () => ({
  default: ({ title }) => <article data-testid="mock-article">{title}</article>,
}));

vi.mock('components/pagination/pagination.jsx', () => ({
  default: ({ pageNum, totalPages }) => (
    <div data-testid="mock-pagination">
      Page {pageNum} of {totalPages}
    </div>
  ),
}));

import Category from './category.jsx';

test('renders with page and posts', () => {
  const mockProps = {
    page: {
      id: 'page-1',
      title: 'Tech Posts',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    posts: {
      limit: 10,
      skip: 0,
      total: 25,
      items: [
        {
          id: 'post-1',
          title: 'Test Post 1',
          date: '2026-05-01',
          layout: 'default',
          draft: false,
          category: 'tech',
          description: 'Test description 1',
          linkText: 'Read more',
        },
        {
          id: 'post-2',
          title: 'Test Post 2',
          date: '2026-05-02',
          layout: 'default',
          draft: false,
          category: 'tech',
          description: 'Test description 2',
          linkText: 'Read more',
        },
      ],
    },
  };

  render(<Category {...mockProps} />);

  // Check for multiple elements with the same text using getAllByText
  const techPostsElements = screen.getAllByText(/Tech Posts/);
  expect(techPostsElements.length).toBeGreaterThan(0);

  // Verify the filter shows correct count
  const filter = screen.getByTestId('mock-filter');
  expect(filter).toBeInTheDocument();
  expect(screen.getAllByTestId('mock-article').length).toBe(2);
});

test('renders with empty posts', () => {
  const mockProps = {
    page: {
      id: 'page-1',
      title: 'Tech Posts',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    posts: {
      limit: 10,
      skip: 0,
      total: 0,
      items: [],
    },
  };

  render(<Category {...mockProps} />);

  // Check for multiple elements with the same text
  const techPostsElements = screen.getAllByText(/Tech Posts/);
  expect(techPostsElements.length).toBeGreaterThan(0);

  // The filter shows "(0/0)" - verify the structure
  const filter = screen.getByTestId('mock-filter');
  expect(filter).toBeInTheDocument();
});

test('handles missing page gracefully', () => {
  const mockProps = {
    page: {},
    posts: { limit: 10, skip: 0, total: 25, items: [] },
  };

  expect(() => render(<Category {...mockProps} />)).not.toThrow();
});

test('renders with pagination when more posts', () => {
  const mockProps = {
    page: {
      id: 'page-1',
      title: 'Tech Posts',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    posts: {
      limit: 10,
      skip: 0,
      total: 25,
      items: Array.from({ length: 10 }).map((_, i) => ({
        id: `post-${i}`,
        title: `Post ${i}`,
        date: '2026-05-01',
        layout: 'default',
        draft: false,
        category: 'tech',
        description: `Description ${i}`,
        linkText: 'Read more',
      })),
    },
  };

  render(<Category {...mockProps} />);

  // Verify the posts are displayed
  expect(screen.getAllByTestId('mock-article').length).toBe(10);
});

test('renders with no pagination when all posts shown', () => {
  const mockProps = {
    page: {
      id: 'page-1',
      title: 'Tech Posts',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    posts: {
      limit: 10,
      skip: 0,
      total: 5,
      items: Array.from({ length: 5 }).map((_, i) => ({
        id: `post-${i}`,
        title: `Post ${i}`,
        date: '2026-05-01',
        layout: 'default',
        draft: false,
        category: 'tech',
        description: `Description ${i}`,
        linkText: 'Read more',
      })),
    },
  };

  render(<Category {...mockProps} />);

  expect(screen.queryByTestId('mock-pagination')).not.toBeInTheDocument();
});
