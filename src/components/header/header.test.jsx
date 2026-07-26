import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('components/header/nav/nav.jsx', () => ({
  default: () => <nav data-testid="mock-nav">Nav Content</nav>,
}));

vi.mock('components/logo/logo.jsx', () => ({
  __esModule: true,
  default: ({ className }) => (
    <a href="/" className={className} data-testid="mock-logo">
      Logo
    </a>
  ),
}));

vi.mock('./header.css.js', () => ({
  __esModule: true,
  Container: ({ children }) => (
    <header data-testid="mock-container">{children}</header>
  ),
}));

import Header from './header.jsx';

test('renders container with logo and nav', () => {
  render(<Header />);

  expect(screen.getByTestId('mock-container')).toBeInTheDocument();
  expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
  expect(screen.getByTestId('mock-nav')).toBeInTheDocument();
});

test('logo is wrapped in a link to home', () => {
  render(<Header />);
  const logoLink = screen.getByRole('link');
  expect(logoLink).toHaveAttribute('href', '/');
  expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
});
