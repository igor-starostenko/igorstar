module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: ['http://localhost/'],
      numberOfRuns: 3,
      chromePath: process.env.CHROME_PATH || '/usr/bin/chromium',
      settings: {
        chromeFlags: '--headless --no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-reports',
    },
  },
};

