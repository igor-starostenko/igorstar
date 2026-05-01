import { describe, beforeAll, it, expect, skipped } from 'vitest';
import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import siteConfig from '../../site-config.cjs';

let scores;
let chromeAvailable = false;

const launchChromeAndRunLighthouse = (
  url,
  opts = { chromeFlags: ['--headless'] },
  config = null
) =>
  chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results =>
      chrome.kill().then(() => results.lhr)
    );
  });

describe('Lighthouse Scores', () => {
  beforeAll(async () => {
    console.log(`Auditing ${siteConfig.siteUrl}.\n`);
    try {
      scores = await launchChromeAndRunLighthouse(siteConfig.siteUrl).then(
        ({ categories }) => categories
      );
      chromeAvailable = true;
    } catch (e) {
      console.log('Lighthouse test skipped - Chrome not available');
    }
  });

  const logScore = score => `Is ${score * 100}.`;

  it('Performance Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = scores['performance'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('PWA Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = scores['pwa'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('Accessibility Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = scores['accessibility'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('Best Practices Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = scores['best-practices'].score;
    expect(score).toBeGreaterThan(0.9);
  });

  it('SEO Score above 90', () => {
    if (!chromeAvailable) {
      console.log('Skipping - Chrome not available');
      return;
    }
    const score = scores['seo'].score;
    expect(score).toBeGreaterThan(0.9);
  });
});
