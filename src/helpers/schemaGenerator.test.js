import { test, expect } from 'vitest';
import schemaGenerator from './schemaGenerator.js';

const baseInput = {
  siteUrl: 'https://example.com',
  siteTitle: 'Demo Site',
};

test('generates WebSite schema for homepage', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: '',
    pageTitleFull: 'Demo Site',
  });

  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: 'https://example.com',
    name: 'Demo Site',
    alternateName: 'Demo Site',
  });
});

test('generates WebSite and BreadcrumbList schema for subpage', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/services',
    canonical: 'https://example.com/services',
    pageTitle: 'Services',
    pageTitleFull: 'Services | Demo Site',
  });

  expect(result).toHaveLength(2);

  expect(result[0]).toEqual({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: 'https://example.com/services',
    name: 'Services',
    alternateName: 'Services | Demo Site',
  });

  expect(result[1]).toEqual({
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': 'https://example.com',
          name: 'Demo Site',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': 'https://example.com/services',
          name: 'Services',
        },
      },
    ],
  });
});

test('generates schema with pageTitle when pathname is / but pageTitle provided', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: 'Home',
    pageTitleFull: 'Home | Demo Site',
  });

  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Home');
});

test('uses siteTitle when pathname is / and pageTitle is empty', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: '',
    pageTitleFull: 'Demo Site',
  });

  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Demo Site');
});

test('returns array of schemas', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/contact',
    canonical: 'https://example.com/contact',
    pageTitle: 'Contact',
    pageTitleFull: 'Contact | Demo Site',
  });

  expect(Array.isArray(result)).toBe(true);
});
