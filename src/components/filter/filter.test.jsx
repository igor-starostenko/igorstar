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
  expect(screen.getByRole('link', { name: 'All' }).tagName).toBe('A');
});

test('applies active class to current path', () => {
  render(
    <Filter path="/travel" title="Test" displayCount={5} totalCount={10} />
  );
  const activeLink = screen.getByRole('link', { name: 'Travel' });
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

test('applies active class to All filter on home page', () => {
  render(<Filter path="/" title="Blog" displayCount={5} totalCount={10} />);
  const allLink = screen.getByRole('link', { name: 'All' });
  expect(allLink).toHaveClass('active');
  // Travel and Tech should NOT be active
  expect(screen.getByRole('link', { name: 'Travel' })).not.toHaveClass(
    'active'
  );
  expect(screen.getByRole('link', { name: 'Tech' })).not.toHaveClass('active');
});

test('does not apply active class to All filter on category pages', () => {
  render(
    <Filter path="/travel" title="Travel" displayCount={5} totalCount={10} />
  );
  const allLink = screen.getByRole('link', { name: 'All' });
  expect(allLink).not.toHaveClass('active');
  // Travel should be active
  expect(screen.getByRole('link', { name: 'Travel' })).toHaveClass('active');
});

test('applies active class to Travel filter on travel page', () => {
  render(
    <Filter path="/travel" title="Travel" displayCount={5} totalCount={10} />
  );
  expect(screen.getByRole('link', { name: 'Travel' })).toHaveClass('active');
  expect(screen.getByRole('link', { name: 'Tech' })).not.toHaveClass('active');
});

test('applies active class to Tech filter on tech page', () => {
  render(<Filter path="/tech" title="Tech" displayCount={5} totalCount={10} />);
  expect(screen.getByRole('link', { name: 'Tech' })).toHaveClass('active');
  expect(screen.getByRole('link', { name: 'Travel' })).not.toHaveClass(
    'active'
  );
});
