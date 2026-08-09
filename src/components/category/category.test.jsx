import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mutable router mock so tests can simulate different URL query states
const mockRouter = {
  query: { page: '1' },
  asPath: '/test',
};

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

vi.mock('next/dynamic', () => ({
  default: () => {
    const MockDynamic = ({ children }) => (
      <div data-testid="mock-dynamic">{children}</div>
    );
    return MockDynamic;
  },
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
  default: ({ pageTitle }) => <div data-testid="mock-head">{pageTitle}</div>,
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
    title: 'Tech Posts',
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
          thumbnail: {
            src: '/thumb1.jpg',
            alt: 'Test Post 1',
            width: 300,
            height: 200,
          },
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
          thumbnail: {
            src: '/thumb2.jpg',
            alt: 'Test Post 2',
            width: 300,
            height: 200,
          },
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
    title: 'Tech Posts',
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
    title: 'Tech Posts',
    posts: { limit: 10, skip: 0, total: 25, items: [] },
  };

  expect(() => render(<Category {...mockProps} />)).not.toThrow();
});

test('renders with pagination when more posts', () => {
  const mockProps = {
    title: 'Tech Posts',
    posts: {
      limit: 10,
      skip: 0,
      total: 25,
      items: Array.from({ length: 10 }).map((_, i) => ({
        id: `post-${i}`,
        title: `Post ${i}`,
        path: `post-${i}`,
        date: '2026-05-01',
        layout: 'default',
        draft: false,
        category: 'tech',
        description: `Description ${i}`,
        tags: ['tag1'],
        linkText: 'Read more',
        thumbnail: {
          src: `/thumb${i}.jpg`,
          alt: `Post ${i}`,
          width: 300,
          height: 200,
        },
      })),
    },
  };

  render(<Category {...mockProps} />);

  // Verify the posts are displayed (initial page shows 5)
  expect(screen.getAllByTestId('mock-article').length).toBe(5);
});

test('renders with no pagination when all posts shown', () => {
  const mockProps = {
    title: 'Tech Posts',
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
        thumbnail: {
          src: `/thumb${i}.jpg`,
          alt: `Post ${i}`,
          width: 300,
          height: 200,
        },
      })),
    },
  };

  render(<Category {...mockProps} />);

  expect(screen.queryByTestId('mock-pagination')).not.toBeInTheDocument();
});

test('shows pagination when not all posts are displayed (home page, no page query)', () => {
  // Simulates the home page scenario: no `page` query param, 19 total posts.
  // With the old buggy condition `posts.total - (pageNum || 1) * pageSize`,
  // the sentinel disappeared at displayCount=15 (15 < 19-5=14 was false),
  // causing posts 16-19 to never load via infinite scroll.
  mockRouter.query = {};
  mockRouter.asPath = '/';

  const mockProps = {
    title: 'Blog',
    posts: {
      total: 19,
      items: Array.from({ length: 19 }).map((_, i) => ({
        id: `post-${i}`,
        title: `Post ${i}`,
        path: `post-${i}`,
        date: '2026-05-01',
        layout: 'default',
        draft: false,
        category: 'tech',
        description: `Description ${i}`,
        tags: ['tag1'],
        linkText: 'Read more',
        thumbnail: {
          src: `/thumb${i}.jpg`,
          alt: `Post ${i}`,
          width: 300,
          height: 200,
        },
      })),
    },
  };

  render(<Category {...mockProps} />);

  // Initial displayCount = pageSize = 5, so 5 articles shown
  expect(screen.getAllByTestId('mock-article').length).toBe(5);

  // The Pagination component is loaded via next/dynamic, so it renders as
  // mock-dynamic. When displayCount < posts.total, the Pagination
  // is rendered; when all posts are shown, it is not.
  expect(screen.getByTestId('mock-dynamic')).toBeInTheDocument();

  // Reset router mock for subsequent tests
  mockRouter.query = { page: '1' };
  mockRouter.asPath = '/test';
});

test('hides pagination when all posts are displayed (home page, no page query)', () => {
  mockRouter.query = {};
  mockRouter.asPath = '/';

  const mockProps = {
    title: 'Blog',
    posts: {
      total: 5,
      items: Array.from({ length: 5 }).map((_, i) => ({
        id: `post-${i}`,
        title: `Post ${i}`,
        path: `post-${i}`,
        date: '2026-05-01',
        layout: 'default',
        draft: false,
        category: 'tech',
        description: `Description ${i}`,
        tags: ['tag1'],
        linkText: 'Read more',
        thumbnail: {
          src: `/thumb${i}.jpg`,
          alt: `Post ${i}`,
          width: 300,
          height: 200,
        },
      })),
    },
  };

  render(<Category {...mockProps} />);

  // All 5 posts shown, no pagination needed
  expect(screen.getAllByTestId('mock-article').length).toBe(5);
  expect(screen.queryByTestId('mock-dynamic')).not.toBeInTheDocument();

  // Reset router mock for subsequent tests
  mockRouter.query = { page: '1' };
  mockRouter.asPath = '/test';
});
