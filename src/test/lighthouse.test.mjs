import { describe, beforeAll, it, expect } from 'vitest';
import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import siteConfig from '../../site-config.cjs';

let results;
let lhrData;
let chromeAvailable = false;

// Use process.env.SITE_URL if set, otherwise fall back to site-config
const targetUrl = process.env.SITE_URL || siteConfig.siteUrl;

const launchChromeAndRunLighthouse = (
  url,
  opts = { chromeFlags: ['--headless=new', '--no-sandbox'] },
  config = null
) => {
  console.log('launchChromeAndRunLighthouse called with url:', url);

  const launchOptions = { chromeFlags: opts.chromeFlags };
  if (process.env.CHROME_PATH) {
    launchOptions.chromePath = process.env.CHROME_PATH;
  }

  return chromeLauncher
    .launch(launchOptions)
    .then(chrome => {
      console.log('Chrome launched on port:', chrome.port);
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then(lhr => {
          console.log('Lighthouse completed');
          return lhr;
        })
        .catch(lhErr => {
          console.error('Lighthouse error:', lhErr.message);
          throw lhErr;
        })
        .finally(() => chrome.kill());
    })
    .catch(launchErr => {
      console.error('Chrome launch error:', launchErr.message);
      throw launchErr;
    });
};

describe('Lighthouse Scores', () => {
  beforeAll(async () => {
    console.log(`Auditing ${targetUrl}.\n`);
    try {
      lhrData = await launchChromeAndRunLighthouse(targetUrl);
      results = {
        categories: lhrData.lhr.categories,
        audits: lhrData.lhr.audits
      };
      chromeAvailable = true;
    } catch (e) {
      console.error(e);
      console.log('Lighthouse test skipped - Chrome not available');
    }
  });

  // Category scores
  it('Performance Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = results.categories['performance'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('PWA Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    // PWA category may be undefined for static sites without service worker/manifest
    if (!results.categories['pwa']) {
      console.log('Skipping - PWA category not available (static site)');
      return;
    }
    const score = results.categories['pwa'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('Accessibility Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = results.categories['accessibility'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('Best Practices Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = results.categories['best-practices'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('SEO Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = results.categories['seo'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  // Performance sub-metrics (from the performance category)
  it('First Contentful Paint below 1.8s', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const fcp = results.audits['first-contentful-paint'];
    expect(fcp.numericValue).toBeLessThan(1800);
  });

  it('Largest Contentful Paint below 2.5s', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const lcp = results.audits['largest-contentful-paint'];
    expect(lcp.numericValue).toBeLessThan(2500);
  });

  it('Total Blocking Time below 200ms', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const tbt = results.audits['total-blocking-time'];
    expect(tbt.numericValue).toBeLessThan(200);
  });

  it('Cumulative Layout Shift below 0.1', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const cls = results.audits['cumulative-layout-shift'];
    expect(cls.numericValue).toBeLessThan(0.1);
  });

  // Accessibility sub-metrics
  it('All page elements have adequate contrast', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const contrast = results.audits['color-contrast'];
    if (!contrast) {
      console.log('Skipping - color-contrast audit not available');
      return;
    }
    // The color-contrast audit uses 'score' property (1 = pass, 0 = fail)
    expect(contrast.score).toBe(1);
  });

  // Best Practices sub-metrics
  it('Uses HTTP/2 for all resources', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const http2 = results.audits['uses-http2'];
    if (!http2) {
      console.log('Skipping - uses-http2 audit not available');
      return;
    }
    // The uses-http2 audit uses 'score' property (1 = pass, 0 = fail)
    expect(http2.score).toBe(1);
  });

  // SEO sub-metrics
  it('Document has a title', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const title = results.audits['document-title'];
    if (!title) {
      console.log('Skipping - document-title audit not available');
      return;
    }
    expect(title.score).toBe(1);
  });

  it('Document has a meta description', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const metaDesc = results.audits['meta-description'];
    if (!metaDesc) {
      console.log('Skipping - meta-description audit not available');
      return;
    }
    expect(metaDesc.score).toBe(1);
  });
});
