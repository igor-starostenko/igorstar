module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: [
        '/',
        '/about.html',
        '/gallery.html',
        '/feed.html',
        '/travel.html',
        '/tech.html',
      ],
      numberOfRuns: 1,
      chromePath: process.env.CHROME_PATH || '/usr/bin/chromium',
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-gpu --headless=new',
      },
    },
    assert: {
      // Use individual audit assertions (LHCI 0.15.x doesn't support category-level assertions)
      assertions: {
        // Performance metrics
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        // Accessibility
        'color-contrast': ['error', { minScore: 0.9 }],
        'image-alt': ['error', { minScore: 0.9 }],
        'label': ['error', { minScore: 0.9 }],
        // Best practices
        'is-on-https': ['error', { minScore: 0.9 }],
        'uses-http2': ['error', { minScore: 0.9 }],
        // SEO
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
