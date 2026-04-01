import test from 'ava';
import mediaTemplates from '../src/helpers/mediaTemplates.js';
import BREAKPOINTS from '../src/constants/breakpoints.js';

test('breakpoints object has correct values', (t) => {
  t.is(BREAKPOINTS.DESKTOP, 992);
  t.is(BREAKPOINTS.TABLET, 768);
  t.is(BREAKPOINTS.PHONE, 428);
});

test('creates PHONE media template function', (t) => {
  t.true(typeof mediaTemplates.PHONE === 'function');
});

test('creates MIN_PHONE media template function', (t) => {
  t.true(typeof mediaTemplates.MIN_PHONE === 'function');
});

test('creates TABLET media template function', (t) => {
  t.true(typeof mediaTemplates.TABLET === 'function');
});

test('creates MIN_TABLET media template function', (t) => {
  t.true(typeof mediaTemplates.MIN_TABLET === 'function');
});

test('creates DESKTOP media template function', (t) => {
  t.true(typeof mediaTemplates.DESKTOP === 'function');
});

test('creates MIN_DESKTOP media template function', (t) => {
  t.true(typeof mediaTemplates.MIN_DESKTOP === 'function');
});
