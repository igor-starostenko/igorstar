import test from 'ava';
import schemaGenerator from '../src/helpers/schemaGenerator.js';

test('generates WebSite schema for homepage', (t) => {
  const result = schemaGenerator({
    pathname: '/',
    canonical: 'https://igorstar.com',
    siteUrl: 'https://igorstar.com',
    pageTitle: '',
    siteTitle: 'Igor Starostenko',
    pageTitleFull: 'Igor Starostenko',
  });

  t.is(result.length, 1);
  t.deepEqual(result[0], {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: 'https://igorstar.com',
    name: 'Igor Starostenko',
    alternateName: 'Igor Starostenko',
  });
});

test('generates WebSite and BreadcrumbList schema for subpage', (t) => {
  const result = schemaGenerator({
    pathname: '/about',
    canonical: 'https://igorstar.com/about',
    siteUrl: 'https://igorstar.com',
    pageTitle: 'About',
    siteTitle: 'Igor Starostenko',
    pageTitleFull: 'About | Igor Starostenko',
  });

  t.is(result.length, 2);

  t.deepEqual(result[0], {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: 'https://igorstar.com/about',
    name: 'About',
    alternateName: 'About | Igor Starostenko',
  });

  t.deepEqual(result[1], {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': 'https://igorstar.com',
          name: 'Igor Starostenko',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': 'https://igorstar.com/about',
          name: 'About',
        },
      },
    ],
  });
});

test('generates schema with pageTitle when pathname is / but pageTitle provided', (t) => {
  const result = schemaGenerator({
    pathname: '/',
    canonical: 'https://igorstar.com',
    siteUrl: 'https://igorstar.com',
    pageTitle: 'Home',
    siteTitle: 'Igor Starostenko',
    pageTitleFull: 'Home | Igor Starostenko',
  });

  t.is(result.length, 1);
  t.is(result[0].name, 'Home');
});
