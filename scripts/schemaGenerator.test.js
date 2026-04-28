import test from 'ava';
import schemaGenerator from '../src/helpers/schemaGenerator.js';

const baseInput = {
  siteUrl: 'https://example.com',
  siteTitle: 'Demo Site',
};

test('generates WebSite schema for homepage', (t) => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: '',
    pageTitleFull: 'Demo Site',
  });

  t.is(result.length, 1);
  t.deepEqual(result[0], {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: 'https://example.com',
    name: 'Demo Site',
    alternateName: 'Demo Site',
  });
});

test('generates WebSite and BreadcrumbList schema for subpage', (t) => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/services',
    canonical: 'https://example.com/services',
    pageTitle: 'Services',
    pageTitleFull: 'Services | Demo Site',
  });

  t.is(result.length, 2);

  t.deepEqual(result[0], {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: 'https://example.com/services',
    name: 'Services',
    alternateName: 'Services | Demo Site',
  });

  t.deepEqual(result[1], {
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

test('generates schema with pageTitle when pathname is / but pageTitle provided', (t) => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: 'Home',
    pageTitleFull: 'Home | Demo Site',
  });

  t.is(result.length, 1);
  t.is(result[0].name, 'Home');
});

test('uses siteTitle when pathname is / and pageTitle is empty', (t) => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/',
    canonical: 'https://example.com',
    pageTitle: '',
    pageTitleFull: 'Demo Site',
  });

  t.is(result.length, 1);
  t.is(result[0].name, 'Demo Site');
});

test('returns array of schemas', (t) => {
  const result = schemaGenerator({
    ...baseInput,
    pathname: '/contact',
    canonical: 'https://example.com/contact',
    pageTitle: 'Contact',
    pageTitleFull: 'Contact | Demo Site',
  });

  t.true(Array.isArray(result));
});
