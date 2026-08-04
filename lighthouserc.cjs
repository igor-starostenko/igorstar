const siteConfig = require('./site-config.cjs');

const isLocal = process.env.LHCI_LOCAL === 'true';

// Pages to audit
const pages = [
  '/',
  '/about.html',
  '/gallery.html',
  '/feed.html',
  '/travel.html',
  '/tech.html',
];

module.exports = {
  ci: {
    collect: {
      // When LHCI_LOCAL=true, serve the built static site from ./out
      // Otherwise, run against the production URL
      ...(isLocal
        ? { staticDistDir: './out' }
        : { url: pages.map((p) => `${siteConfig.siteUrl}${p}`) }),
      // For local mode, use the page paths; for remote mode, urls are set above
      ...(isLocal ? { url: pages } : {}),
      numberOfRuns: 1,
      chromePath: process.env.CHROME_PATH || '/usr/bin/chromium',
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-gpu --headless=new',
      },
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'color-contrast': ['error', { minScore: 0.9 }],
        'image-alt': ['error', { minScore: 0.9 }],
        'label': ['error', { minScore: 0.9 }],
        'is-on-https': ['error', { minScore: 0.9 }],
        'uses-http2': ['error', { minScore: 0.9 }],
        'document-title': ['error', { minScore: 0.9 }],
        'meta-description': ['error', { minScore: 0.9 }],
        'robots-txt': ['error', { minScore: 0.9 }],
        'sitemap-xml': ['error', { minScore: 0.9 }],
        'hreflang': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-reports',
    },
  },
};