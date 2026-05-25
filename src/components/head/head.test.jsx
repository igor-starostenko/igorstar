import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/head', () => ({
  default: ({ children }) => <div data-testid="mock-head">{children}</div>,
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
    siteTitle: 'Test Site',
    siteDescription: 'Test Description',
    themeColor: '#000000',
    social: { twitter: 'testuser' },
  };
});

import ConfigSEO from './head.jsx';

test('renders SEO component with default props', () => {
  render(<ConfigSEO />);

  expect(screen.getByText('IgorStar: Blog')).toBeInTheDocument();
  expect(screen.getByTestId('mock-head')).toBeInTheDocument();
});

test('renders with pageTitle', () => {
  render(<ConfigSEO pageTitle="My Page" />);

  expect(screen.getByText('IgorStar: My Page')).toBeInTheDocument();
});

test('renders with pageTitleFull', () => {
  render(<ConfigSEO pageTitle="My Page" pageTitleFull="Custom Title" />);

  expect(screen.getByText('Custom Title')).toBeInTheDocument();
});

test('renders with imageUrl', () => {
  render(<ConfigSEO imageUrl="/custom-social.jpg" />);

  const ogImage = document.querySelector('meta[property="og:image"]');
  expect(ogImage).toBeInTheDocument();
});

test('uses canonical URL when provided', () => {
  render(<ConfigSEO canonical="/custom-page" />);

  const link = document.querySelector('link[rel="canonical"]');
  expect(link).toBeInTheDocument();
});

test('generates schema.org JSON-LD', () => {
  render(<ConfigSEO pageTitle="Test Page" />);

  const script = document.querySelector('script[type="application/ld+json"]');
  expect(script).toBeInTheDocument();
});
