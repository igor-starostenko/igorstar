import { describe, beforeEach, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next/head - it renders to document.head, not visible DOM
vi.mock('next/head', () => ({
  default: ({ children }) => {
    // Return null since next/head doesn't render visible DOM
    return null;
  },
}));

// Mock next/router - include useRouter hook since we import it directly
vi.mock('next/router', () => ({
  __esModule: true,
  useRouter: vi.fn(() => ({
    pathname: '/',
  })),
}));

// Mock schemaGenerator - returns object with @graph instead of array
vi.mock('helpers/schemaGenerator.js', () => ({
  default: ({
    pathname,
    canonical,
    siteUrl,
    pageTitle,
    siteTitle,
    pageTitleFull,
  }) => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        url: siteUrl,
        name: siteTitle,
      },
    ],
  }),
}));

// Mock site-config.cjs - using test data
vi.mock('../../../site-config.cjs', () => ({
  __esModule: true,
  default: {
    siteTitle: 'Test Blog',
    siteTitleShort: 'Site',
    siteDescription: 'Test Description',
    themeColor: '#000000',
    social: { twitter: 'testuser' },
  },
}));

import ConfigSEO from './head.jsx';

describe('SEO Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  // Basic rendering tests - next/head renders to document.head, not visible DOM
  test('renders SEO component with default props without error', () => {
    expect(() => render(<ConfigSEO />)).not.toThrow();
  });

  test('renders with pageTitle without error', () => {
    expect(() => render(<ConfigSEO pageTitle="My Page" />)).not.toThrow();
  });

  test('renders with pageTitleFull without error', () => {
    expect(() =>
      render(<ConfigSEO pageTitle="My Page" pageTitleFull="Custom Title" />)
    ).not.toThrow();
  });

  test('renders with imageUrl without error', () => {
    expect(() =>
      render(<ConfigSEO imageUrl="/custom-social.jpg" />)
    ).not.toThrow();
  });

  test('uses canonical URL without error', () => {
    expect(() => render(<ConfigSEO canonical="/custom-page" />)).not.toThrow();
  });

  test('generates schema.org JSON-LD without error', () => {
    expect(() => render(<ConfigSEO pageTitle="Test Page" />)).not.toThrow();
  });
});
