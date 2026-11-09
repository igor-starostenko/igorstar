// src/lib/conventions.test.js — ordering, required flags, unique paths, ids,
// and full-body merge (pure, no network).
import { describe, it, expect } from 'vitest';
import {
  orderedFields,
  requiredFlags,
  uniquePath,
  nextId,
  mergeIntoBody,
} from './conventions';
import { fieldsFor, addableFields } from './models';

describe('conventions: orderedFields', () => {
  it('keeps existing fields in order, appends new ones', () => {
    const addable = addableFields('post');
    const existing = ['title', 'path', 'date'];
    const out = orderedFields('post', existing, addable);
    // Existing order preserved at the front...
    expect(out.slice(0, 3)).toEqual(['title', 'path', 'date']);
    // ...new fields appended.
    expect(out).toContain('category');
    expect(out).toContain('content');
    // Existing 3 (title/path/date all addable) + remaining addables.
    expect(out.length).toEqual(3 + (addable.length - 3));
  });

  it('does not duplicate fields present in both', () => {
    const addable = addableFields('page');
    const out = orderedFields('page', ['title', 'content'], addable);
    expect(new Set(out).size).toEqual(out.length);
  });

  it('throws on unknown type', () => {
    expect(() => orderedFields('ghost', [], [])).toThrow(
      /Unknown content type/
    );
  });
});

describe('conventions: requiredFlags', () => {
  it('site required-markers override all-false live flags', () => {
    const flags = requiredFlags(fieldsFor('post'), [
      { name: 'title', required: false },
      { name: 'layout', required: false },
    ]);
    expect(flags.title).toBe(true);
    expect(flags.layout).toBe(false);
  });

  it('honours a live required flag even if the model does not require it', () => {
    const flags = requiredFlags(fieldsFor('post'), [
      { name: 'layout', required: true },
    ]);
    expect(flags.layout).toBe(true);
  });
});

describe('conventions: uniquePath', () => {
  const used = ['my-trip', 'my-trip-2'];

  it('cleans and lowercases a slug', () => {
    expect(uniquePath('  My Trip! ', [])).toBe('my-trip');
  });

  it('appends -2 on collision', () => {
    expect(uniquePath('my trip', used)).toBe('my-trip-3');
  });

  it('collapses repeated dashes and strips empties', () => {
    expect(uniquePath('a--b---c', [])).toBe('a-b-c');
    expect(uniquePath('!!!', [])).toBe('untitled');
  });

  it('is case-insensitive for collisions', () => {
    expect(uniquePath('MY-TRIP', used)).toBe('my-trip-3');
  });
});

describe('conventions: nextId', () => {
  it('starts at 1 with no existing ids', () => {
    expect(nextId([])).toBe(1);
  });

  it('returns max+1', () => {
    expect(nextId([1, 3, 2, 10])).toBe(11);
  });

  it('ignores non-finite values', () => {
    expect(nextId([NaN, 5, 'x'])).toBe(6);
  });
});

describe('conventions: mergeIntoBody', () => {
  it('merges payload into the en-US locale, preserving other fields', () => {
    const body = {
      sys: { id: 'abc', version: 3 },
      fields: { 'en-US': { title: 'Old', category: 'travel' } },
    };
    const merged = mergeIntoBody(body, {
      title: 'New',
      date: '2026-08-22T00:00:00.000Z',
    });
    expect(merged.fields['en-US'].title).toBe('New');
    expect(merged.fields['en-US'].category).toBe('travel'); // preserved
    expect(merged.fields['en-US'].date).toBe('2026-08-22T00:00:00.000Z');
    expect(merged.sys.version).toBe(3); // version carried through
  });

  it('does not mutate the input body', () => {
    const body = {
      sys: { id: 'abc', version: 3 },
      fields: { 'en-US': { title: 'Old' } },
    };
    mergeIntoBody(body, { title: 'New' });
    expect(body.fields['en-US'].title).toBe('Old');
  });

  it('skips null/undefined payload values', () => {
    const body = { sys: { id: 'abc' }, fields: { 'en-US': { title: 'Old' } } };
    const merged = mergeIntoBody(body, { title: null, category: 'tech' });
    expect(merged.fields['en-US'].title).toBe('Old');
    expect(merged.fields['en-US'].category).toBe('tech');
  });
});
