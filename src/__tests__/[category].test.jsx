import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('components/category/category.jsx', () => ({
  default: ({ page, posts }) => (
    <div data-testid="mock-category">
      <span>{page && page.title ? page.title : 'Blog'}</span>
      <span>Posts: {posts.total}</span>
    </div>
  ),
}));

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/filter/filter.jsx', () => ({
  default: ({ path, title, displayCount, totalCount }) => (
    <div data-testid="mock-filter">{title} ({displayCount}/{totalCount})</div>
  ),
}));

vi.mock('components/article/article.jsx', () => ({
  default: ({ title }) => <article>{title}</article>,
}));

vi.mock('components/pagination/pagination.jsx', () => ({
  default: ({ pageNum, totalPages }) => (
    <div data-testid="mock-pagination">Page {pageNum} of {totalPages}</div>
  ),
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children, isMain }) => (
    <div data-testid="mock-box">{children}</div>
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => <title data-testid="mock-head">{pageTitle}</title>,
}));

import CategoryIndex from 'pages/[category].jsx';

test('renders category page with posts', () => {
  const mockProps = { 
    page: { title: 'Blog' },
    posts: {
      limit: 10,
      skip: 0,
      total: 25,
      items: []
    }
  };
  
  render(<CategoryIndex {...mockProps} />);

  expect(screen.getByText('Blog')).toBeInTheDocument();
});

test('renders with empty posts', () => {
  const mockProps = { 
    page: { title: 'Blog' },
    posts: {
      limit: 10,
      skip: 0,
      total: 0,
      items: []
    }
  };
  
  render(<CategoryIndex {...mockProps} />);

  expect(screen.getByText('Posts: 0')).toBeInTheDocument();
});

test('handles missing page gracefully', () => {
  const mockProps = { 
    page: {},
    posts: { limit: 10, skip: 0, total: 25, items: [] }
  };
  
  expect(() => render(<CategoryIndex {...mockProps} />)).not.toThrow();
});
