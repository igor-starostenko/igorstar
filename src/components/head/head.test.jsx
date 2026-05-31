import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next/head - it renders to document.head, not visible DOM
vi.mock('next/head', () => ({
  default: ({ children }) => {
    // Return null since next/head doesn't render visible DOM
    return null;
  },
}));

// Mock next/router
vi.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    pathname: '/',
  }),
}));

// Mock site-config.cjs - using test data
vi.mock('../../site-config.cjs', () => ({
  __esModule: true,
  default: {
    siteTitle: 'Test Blog',
    siteTitleShort: 'Site',
    siteDescription: 'Test Description',
    themeColor: '#000000',
    social: { twitter: 'testuser' },
  },
}));

import SEO from './head.jsx';

// Basic rendering tests - next/head renders to document.head, not visible DOM
test('renders SEO component with default props without error', () => {
  expect(() => render(<SEO />)).not.toThrow();
});

test('renders with pageTitle without error', () => {
  expect(() => render(<SEO pageTitle="My Page" />)).not.toThrow();
});

test('renders with pageTitleFull without error', () => {
  expect(() => render(<SEO pageTitle="My Page" pageTitleFull="Custom Title" />)).not.toThrow();
});

test('renders with imageUrl without error', () => {
  expect(() => render(<SEO imageUrl="/custom-social.jpg" />)).not.toThrow();
});

test('uses canonical URL without error', () => {
  expect(() => render(<SEO canonical="/custom-page" />)).not.toThrow();
});
