import test from 'ava';
import mediaTemplates from '../src/helpers/mediaTemplates.js';

const baseInput = { prop: 'color', value: 'red' };

test('PHONE template returns css object with isCss flag', (t) => {
  const cssFn = mediaTemplates.PHONE`${baseInput.prop}: ${baseInput.value};`;
  t.true(cssFn.isCss);
});

test('MIN_PHONE template returns css object with isCss flag', (t) => {
  const cssFn = mediaTemplates.MIN_PHONE`${baseInput.prop}: ${baseInput.value};`;
  t.true(cssFn.isCss);
});

test('TABLET template returns css object with isCss flag', (t) => {
  const cssFn = mediaTemplates.TABLET`${baseInput.prop}: ${baseInput.value};`;
  t.true(cssFn.isCss);
});

test('MIN_TABLET template returns css object with isCss flag', (t) => {
  const cssFn = mediaTemplates.MIN_TABLET`${baseInput.prop}: ${baseInput.value};`;
  t.true(cssFn.isCss);
});

test('DESKTOP template returns css object with isCss flag', (t) => {
  const cssFn = mediaTemplates.DESKTOP`${baseInput.prop}: ${baseInput.value};`;
  t.true(cssFn.isCss);
});

test('MIN_DESKTOP template returns css object with isCss flag', (t) => {
  const cssFn = mediaTemplates.MIN_DESKTOP`${baseInput.prop}: ${baseInput.value};`;
  t.true(cssFn.isCss);
});
