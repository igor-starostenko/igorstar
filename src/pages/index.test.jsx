import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    query: { page: '1' },
    pathname: '/blog',
  }),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children, isMain }) => (
    <div data-testid="mock-box">{children}</div>
  ),
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

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => <title data-testid="mock-head">{pageTitle}</title>,
}));

import Category from 'components/category/category.jsx';

test('renders Category with page and posts', () => {
  const mockPage = { sys: { id: '1' }, fields: { title: 'Blog', description: '' } };
  const mockPosts = {
    limit: 10,
    skip: 0,
    total: 25,
    items: []
  };
  
  render(<Category page={mockPage} posts={mockPosts} />);
  
  // The mock head renders <title> which may not be visible in DOM, so we check the filter
  expect(screen.getByTestId('mock-filter')).toBeInTheDocument();
});

test('renders Category with empty posts', () => {
  const mockPage = { sys: { id: '1' }, fields: { title: 'Blog', description: '' } };
  const mockPosts = {
    limit: 10,
    skip: 0,
    total: 0,
    items: []
  };
  
  render(<Category page={mockPage} posts={mockPosts} />);
  
  expect(screen.getByTestId('mock-filter')).toBeInTheDocument();
});
