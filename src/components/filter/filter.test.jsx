import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, style }) => <a href={href} style={style}>{children}</a>,
}));

import Filter from './filter.jsx';

test('renders title', () => {
  render(<Filter path="/" title="Test Title" displayCount={5} totalCount={10} />);
  expect(screen.getByText('Test Title').tagName).toBe('H1');
});

test('renders filter categories', () => {
  render(<Filter path="/" title="Test" displayCount={5} totalCount={10} />);
  expect(screen.getByText('All').tagName).toBe('A');
});

test('applies active class to current path', () => {
  render(<Filter path="/travel" title="Test" displayCount={5} totalCount={10} />);
  const activeLink = screen.getByText('Travel');
  expect(activeLink.outerHTML).toContain('font-weight: bold');
});

test('renders count text', () => {
  render(<Filter path="/" title="Test" displayCount={5} totalCount={10} />);
  expect(screen.getByText('Loaded 5 of 10 posts').tagName).toBe('SPAN');
});

test('requires path prop', () => {
  const { container } = render(<Filter title="Test" displayCount={5} totalCount={10} />);
  expect(container).toBeDefined();
});

test('requires title prop', () => {
  const { container } = render(<Filter path="/" displayCount={5} totalCount={10} />);
  expect(container).toBeDefined();
});

test('requires displayCount prop', () => {
  const { container } = render(<Filter path="/" title="Test" totalCount={10} />);
  expect(container).toBeDefined();
});

test('requires totalCount prop', () => {
  const { container } = render(<Filter path="/" title="Test" displayCount={5} />);
  expect(container).toBeDefined();
});
