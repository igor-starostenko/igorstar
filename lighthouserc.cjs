// LHCI configuration for auditing the locally-built static site.
// Set SITE_URL env var to test against production (e.g., SITE_URL=https://igorstar.com).
// When testing locally, the sitemap-xml assertion validates the production sitemap
// referenced in robots.txt, which is publicly accessible.
const siteUrl = process.env.SITE_URL || 'http://localhost';

const pages = ['/', '/about/', '/gallery/', '/feed/', '/travel/', '/tech/'];

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: './out',
      url: pages.map((p) => `${siteUrl}${p}`),
      chromePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
      settings: {
        chromeFlags:
          '--no-sandbox --disable-dev-shm-usage --disable-gpu --headless=new',
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
        label: ['error', { minScore: 0.9 }],
        'is-on-https': ['error', { minScore: 0.9 }],
        'uses-http2': ['error', { minScore: 0.9 }],
        'document-title': ['error', { minScore: 0.9 }],
        'meta-description': ['error', { minScore: 0.9 }],
        'robots-txt': ['error', { minScore: 0.9 }],
        'sitemap-xml': ['error', { minScore: 0.9 }],
        hreflang: ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-reports',
    },
  },
};
