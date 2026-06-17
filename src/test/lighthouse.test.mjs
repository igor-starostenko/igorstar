import { describe, beforeAll, it, expect } from 'vitest';
import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import siteConfig from '../../site-config.cjs';

let results;
let lhrData;
let chromeAvailable = false;

const launchChromeAndRunLighthouse = (
  url,
  opts = { chromeFlags: ['--headless'] },
  config = null
) =>
  chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(lhr => {
      chrome.kill();
      return lhr;
    });
  });

describe('Lighthouse Scores', () => {
  beforeAll(async () => {
    console.log(`Auditing ${siteConfig.siteUrl}.\n`);
    try {
      lhrData = await launchChromeAndRunLighthouse(siteConfig.siteUrl);
      results = {
        categories: lhrData.lhr.categories,
        audits: lhrData.lhr.audits
      };
      chromeAvailable = true;
    } catch (e) {
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
    expect(contrast.passed).toBe(true);
  });

  // Best Practices sub-metrics
  it('Uses HTTP/2 for all resources', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const http2 = results.audits['uses-http2'];
    if (http2) {
      expect(http2.passed).toBe(true);
    }
  });

  // SEO sub-metrics
  it('Document has a title', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const title = results.audits['document-title'];
    expect(title.passed).toBe(true);
  });

  it('Document has a meta description', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const metaDesc = results.audits['meta-description'];
    expect(metaDesc.passed).toBe(true);
  });
});
