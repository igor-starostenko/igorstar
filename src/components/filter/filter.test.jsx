import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

import Filter from './filter.jsx';

test('renders title', () => {
  render(
    <Filter path="/" title="Test Title" displayCount={5} totalCount={10} />
  );
  expect(screen.getByText('Test Title').tagName).toBe('H1');
});

test('renders filter categories', () => {
  render(<Filter path="/" title="Test" displayCount={5} totalCount={10} />);
  expect(screen.getByText('All').tagName).toBe('A');
});

test('applies active class to current path', () => {
  render(
    <Filter path="/travel" title="Test" displayCount={5} totalCount={10} />
  );
  const activeLink = screen.getByText('Travel');
  expect(activeLink).toHaveClass('active');
});

test('renders count text', () => {
  render(<Filter path="/" title="Test" displayCount={5} totalCount={10} />);
  expect(screen.getByText('Loaded 5 of 10 posts').tagName).toBe('SPAN');
});

test('renders with all required props', () => {
  const { container } = render(
    <Filter path="/" title="Test" displayCount={5} totalCount={10} />
  );
  expect(container.firstChild).toBeDefined();
});
