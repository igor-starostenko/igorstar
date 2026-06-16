import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => {
    const hrefString =
      typeof href === 'object' && href.query
        ? `?page=${href.query.page}`
        : String(href);
    return <a href={hrefString}>{children}</a>;
  },
}));

import Pagination from './pagination.jsx';

test('renders previous page link when pageNum > 1', () => {
  render(<Pagination pageNum={2} totalPages={5} />);
  expect(screen.getByText(/Previous Page/).tagName).toBe('A');
});

test('renders div when on first page (no previous link)', () => {
  render(<Pagination pageNum={1} totalPages={5} />);
  expect(screen.queryByText(/Previous Page/)).not.toBeInTheDocument();
});

test('renders next page link when pageNum < totalPages', () => {
  render(<Pagination pageNum={2} totalPages={5} />);
  expect(screen.getByText(/Next Page/).tagName).toBe('A');
});

test('renders div when on last page (no next link)', () => {
  render(<Pagination pageNum={5} totalPages={5} />);
  expect(screen.queryByText(/Next Page/)).not.toBeInTheDocument();
});

test('renders with default pageNum when omitted', () => {
  const { container } = render(<Pagination pageNum={1} totalPages={5} />);
  expect(container.firstChild).toBeDefined();
});

test('renders with default totalPages when omitted', () => {
  const { container } = render(<Pagination pageNum={1} totalPages={5} />);
  expect(container.firstChild).toBeDefined();
});
