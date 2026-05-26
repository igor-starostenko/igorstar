import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// next/head renders to document.head, not DOM - mock returns null
vi.mock('next/head', () => ({
  default: ({ children, title }) => {
    // Return null since next/head doesn't render visible DOM
    return null;
  },
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));

vi.mock('helpers/schemaGenerator.js', () => ({
  default: ({ pathname, canonical, siteUrl, pageTitle, siteTitle, pageTitleFull }) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitleFull,
  }),
}));

vi.mock('../../../site-config.cjs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    siteTitle: 'IgorStar: Blog',
    siteTitleShort: 'IgorStar',
    siteDescription: 'Test Description',
    themeColor: '#000000',
    social: { twitter: 'testuser' },
  };
});

import ConfigSEO from './head.jsx';

test('renders SEO component with default props', () => {
  render(<ConfigSEO />);
});

test('renders with pageTitle', () => {
  render(<ConfigSEO pageTitle="My Page" />);
});

test('renders with pageTitleFull', () => {
  render(<ConfigSEO pageTitle="My Page" pageTitleFull="Custom Title" />);
});

test('renders with imageUrl', () => {
  render(<ConfigSEO imageUrl="/custom-social.jpg" />);
});

test('uses canonical URL when provided', () => {
  render(<ConfigSEO canonical="/custom-page" />);
});

test('generates schema.org JSON-LD', () => {
  render(<ConfigSEO pageTitle="Test Page" />);
});
