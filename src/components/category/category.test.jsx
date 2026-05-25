import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    asPath: '/test',
  }),
}));

vi.mock('next/dynamic', () => ({
  default: (loader) => {
    const MockDynamic = ({ children }) => <div data-testid="mock-dynamic">{children}</div>;
    return MockDynamic;
  },
}));

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children, isMain }) => (
    <div data-testid="mock-box" data-ismain={isMain ? 'true' : 'false'}>{children}</div>
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => <title data-testid="mock-head">{pageTitle}</title>,
}));

vi.mock('components/filter/filter.jsx', () => ({
  default: ({ path, title, displayCount, totalCount }) => (
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
    <div data-testid="mock-pagination">Page {pageNum} of {totalPages}</div>
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

  expect(screen.getByText('Tech Posts')).toBeInTheDocument();
  // Filter mock shows title, displayCount, totalCount
  expect(screen.getByText('25')).toBeInTheDocument();
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

  expect(screen.getByText('Tech Posts')).toBeInTheDocument();
  expect(screen.getByText('0')).toBeInTheDocument();
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

  expect(screen.getByText('10')).toBeInTheDocument();
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
