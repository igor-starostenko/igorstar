import { test, expect } from 'vitest';
import mediaTemplates from './mediaTemplates.js';

test('PHONE template returns a css object', () => {
  const cssFn = mediaTemplates.PHONE`color: red;`;
  expect(typeof cssFn).toBe('object');
});

test('MIN_PHONE template returns a css object', () => {
  const cssFn = mediaTemplates.MIN_PHONE`color: red;`;
  expect(typeof cssFn).toBe('object');
});

test('TABLET template returns a css object', () => {
  const cssFn = mediaTemplates.TABLET`color: red;`;
  expect(typeof cssFn).toBe('object');
});

test('MIN_TABLET template returns a css object', () => {
  const cssFn = mediaTemplates.MIN_TABLET`color: red;`;
  expect(typeof cssFn).toBe('object');
});

test('DESKTOP template returns a css object', () => {
  const cssFn = mediaTemplates.DESKTOP`color: red;`;
  expect(typeof cssFn).toBe('object');
});

test('MIN_DESKTOP template returns a css object', () => {
  const cssFn = mediaTemplates.MIN_DESKTOP`color: red;`;
  expect(typeof cssFn).toBe('object');
});
