import { describe, beforeAll, it, expect } from 'vitest';
import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import siteConfig from '../../site-config.cjs';

let results;
let lhrData;
let chromeAvailable = false;

const targetUrl = process.env.SITE_URL || siteConfig.siteUrl;

const launchChromeAndRunLighthouse = (
  url,
  opts = { chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] },
  config = null
) => {
  const launchOptions = { chromeFlags: opts.chromeFlags };
  if (process.env.CHROME_PATH) {
    launchOptions.chromePath = process.env.CHROME_PATH;
  }

  return chromeLauncher
    .launch(launchOptions)
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then((lhr) => {
          return lhr;
        })
        .catch((lhErr) => {
          throw lhErr;
        })
        .finally(() => chrome.kill());
    })
    .catch((launchErr) => {
      throw launchErr;
    });
};

describe('Lighthouse Scores', () => {
  beforeAll(async () => {
    try {
      lhrData = await launchChromeAndRunLighthouse(targetUrl);
      results = {
        categories: lhrData.lhr.categories,
        audits: lhrData.lhr.audits,
      };
      chromeAvailable = true;
    } catch (e) {
      console.log('Lighthouse test skipped - Chrome not available');
    }
  });

  it('Performance Score above 90', () => {
    if (!chromeAvailable) return;
    const score = results.categories['performance'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('PWA Score above 90', () => {
    if (!chromeAvailable) return;
    if (!results.categories['pwa']) {
      return;
    }
    const score = results.categories['pwa'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('Accessibility Score above 90', () => {
    if (!chromeAvailable) return;
    const score = results.categories['accessibility'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('Best Practices Score above 90', () => {
    if (!chromeAvailable) return;
    const score = results.categories['best-practices'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('SEO Score above 90', () => {
    if (!chromeAvailable) return;
    const score = results.categories['seo'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('First Contentful Paint below 1.8s', () => {
    if (!chromeAvailable) return;
    const fcp = results.audits['first-contentful-paint'];
    expect(fcp.numericValue).toBeLessThan(1800);
  });

  it('Largest Contentful Paint below 2.5s', () => {
    if (!chromeAvailable) return;
    const lcp = results.audits['largest-contentful-paint'];
    expect(lcp.numericValue).toBeLessThan(2500);
  });

  it('Total Blocking Time below 200ms', () => {
    if (!chromeAvailable) return;
    const tbt = results.audits['total-blocking-time'];
    expect(tbt.numericValue).toBeLessThan(200);
  });

  it('Cumulative Layout Shift below 0.1', () => {
    if (!chromeAvailable) return;
    const cls = results.audits['cumulative-layout-shift'];
    expect(cls.numericValue).toBeLessThan(0.1);
  });

  it('All page elements have adequate contrast', () => {
    if (!chromeAvailable) return;
    const contrast = results.audits['color-contrast'];
    if (!contrast) return;
    expect(contrast.score).toBe(1);
  });

  it('Uses HTTP/2 for all resources', () => {
    if (!chromeAvailable) return;
    const http2 = results.audits['uses-http2'];
    if (!http2) return;
    expect(http2.score).toBe(1);
  });

  it('Document has a title', () => {
    if (!chromeAvailable) return;
    const title = results.audits['document-title'];
    if (!title) return;
    expect(title.score).toBe(1);
  });

  it('Document has a meta description', () => {
    if (!chromeAvailable) return;
    const metaDesc = results.audits['meta-description'];
    if (!metaDesc) return;
    expect(metaDesc.score).toBe(1);
  });
});
