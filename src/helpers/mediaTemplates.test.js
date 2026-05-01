import { test, expect } from 'vitest';
import mediaTemplates from './mediaTemplates.js';

const baseInput = { prop: 'color', value: 'red' };

test('PHONE template returns css object with isCss flag', () => {
  const cssFn = mediaTemplates.PHONE`${baseInput.prop}: ${baseInput.value};`;
  expect(cssFn.isCss).toBe(true);
});

test('MIN_PHONE template returns css object with isCss flag', () => {
  const cssFn = mediaTemplates.MIN_PHONE`${baseInput.prop}: ${baseInput.value};`;
  expect(cssFn.isCss).toBe(true);
});

test('TABLET template returns css object with isCss flag', () => {
  const cssFn = mediaTemplates.TABLET`${baseInput.prop}: ${baseInput.value};`;
  expect(cssFn.isCss).toBe(true);
});

test('MIN_TABLET template returns css object with isCss flag', () => {
  const cssFn = mediaTemplates.MIN_TABLET`${baseInput.prop}: ${baseInput.value};`;
  expect(cssFn.isCss).toBe(true);
});

test('DESKTOP template returns css object with isCss flag', () => {
  const cssFn = mediaTemplates.DESKTOP`${baseInput.prop}: ${baseInput.value};`;
  expect(cssFn.isCss).toBe(true);
});

test('MIN_DESKTOP template returns css object with isCss flag', () => {
  const cssFn = mediaTemplates.MIN_DESKTOP`${baseInput.prop}: ${baseInput.value};`;
  expect(cssFn.isCss).toBe(true);
});
