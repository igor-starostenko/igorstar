const siteConfig = require('./site-config.cjs');

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
      url: pages.map((p) => `${siteConfig.siteUrl}${p}`),
      numberofRuns: 1,
      chromePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
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