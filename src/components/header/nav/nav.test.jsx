import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

import Nav from './nav.jsx';

test('renders nav container', () => {
  render(<Nav />);
  expect(screen.getByRole('navigation').tagName).toBe('NAV');
});

test('renders correct number of links', () => {
  render(<Nav />);
  expect(screen.getAllByRole('link').length).toBe(3);
});

test('renders links with text content', () => {
  render(<Nav />);
  const links = screen.getAllByRole('link');
  expect(links.every(link => link.textContent.length > 0)).toBe(true);
});
