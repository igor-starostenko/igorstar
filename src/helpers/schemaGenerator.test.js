import { test, expect } from 'vitest';
import schemaGenerator from './schemaGenerator.js';

const baseInput = {
  siteUrl: 'https://example.com',
  siteTitle: 'Demo Site',
};

test('generates WebSite and WebPage schema for homepage', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: '',
    pageTitleFull: 'Demo Site',
  });

  expect(result['@context']).toBe('https://schema.org');
  expect(result['@graph']).toHaveLength(2);
  
  // WebSite always uses siteUrl
  expect(result['@graph'][0]).toEqual({
    '@type': 'WebSite',
    url: 'https://example.com',
    name: 'Demo Site',
  });
  
  // WebPage uses the canonical (homepage URL)
  expect(result['@graph'][1]).toEqual({
    '@type': 'WebPage',
    url: 'https://example.com',
    name: 'Demo Site',
  });
});

test('generates WebSite and WebPage schema for subpage', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/services',
    canonical: 'https://example.com/services',
    pageTitle: 'Services',
    pageTitleFull: 'Services | Demo Site',
  });

  expect(result['@context']).toBe('https://schema.org');
  expect(result['@graph']).toHaveLength(2);

  // WebSite always uses siteUrl
  expect(result['@graph'][0]).toEqual({
    '@type': 'WebSite',
    url: 'https://example.com',
    name: 'Demo Site',
  });

  // WebPage uses the page's canonical
  expect(result['@graph'][1]).toEqual({
    '@type': 'WebPage',
    url: 'https://example.com/services',
    name: 'Services | Demo Site',
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

  expect(result['@context']).toBe('https://schema.org');
  expect(result['@graph'][0].name).toBe('Demo Site');
});

test('uses siteTitle when pathname is / and pageTitle is empty', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: '',
    pageTitleFull: 'Demo Site',
  });

  expect(result['@context']).toBe('https://schema.org');
  expect(result['@graph'][0].name).toBe('Demo Site');
});

test('returns object with @context and @graph', () => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/contact',
    canonical: 'https://example.com/contact',
    pageTitle: 'Contact',
    pageTitleFull: 'Contact | Demo Site',
  });

  expect(typeof result).toBe('object');
  expect(result['@context']).toBe('https://schema.org');
  expect(result['@graph']).toHaveLength(2);
});
