// src/lib/models.test.js — field registry + validation (pure, no network).
import { describe, it, expect } from 'vitest';
import { validate, fieldsFor, addableFields, CONTENT_TYPES } from './models';

describe('models: field registry', () => {
  it('exposes the four live content types', () => {
    expect(CONTENT_TYPES).toEqual(['post', 'page', 'gallery', 'feed']);
  });

  it('throws on an unknown type', () => {
    expect(() => fieldsFor('nope')).toThrow(/Unknown content type/);
  });

  it('marks post.recommendations as edit-only (add: false)', () => {
    const rec = fieldsFor('post').find((f) => f.name === 'recommendations');
    expect(rec.add).toBe(false);
  });

  it('marks the new live-confirmed fields', () => {
    expect(fieldsFor('post').find((f) => f.name === 'layout')).toBeTruthy();
    expect(fieldsFor('gallery').find((f) => f.name === 'id')).toBeTruthy();
    expect(fieldsFor('feed').find((f) => f.name === 'location')).toBeTruthy();
  });

  it('lists addable fields in model order for post', () => {
    const addable = addableFields('post');
    expect(addable[0]).toBe('title');
    expect(addable).toContain('path');
    expect(addable).not.toContain('recommendations');
  });
});

describe('models: validate', () => {
  const validPost = {
    title: 'Hello',
    path: 'hello-world',
    date: new Date('2026-08-22T12:00:00Z'),
    category: 'tech',
    content: { nodeType: 'document', content: [] },
  };

  it('accepts a minimal valid post', () => {
    expect(validate('post', validPost)).toEqual({ ok: true });
  });

  it('flags missing required fields on create', () => {
    const { ok, errors } = validate('post', {});
    expect(ok).toBe(false);
    expect(errors).toContain('title: required');
    expect(errors).toContain('path: required');
    expect(errors).toContain('date: required');
    expect(errors).toContain('category: required');
    expect(errors).toContain('content: required');
  });

  it('rejects unknown field names', () => {
    const { ok, errors } = validate('post', { ...validPost, bogus: 1 });
    expect(ok).toBe(false);
    expect(errors).toContain("bogus: not a field on 'post'");
  });

  it('type-checks strings and integers', () => {
    expect(
      validate('gallery', {
        id: 3,
        image: { sys: { type: 'Link', linkType: 'Asset', id: 'x' } },
      })
    ).toEqual({ ok: true });
    const { ok, errors } = validate('gallery', { id: '3' });
    expect(ok).toBe(false);
    expect(errors).toContain('id: expected integer');
  });

  it('rejects an invalid date', () => {
    const { ok, errors } = validate('post', {
      ...validPost,
      date: 'not-a-date',
    });
    expect(ok).toBe(false);
    expect(errors).toContain('date: not a valid date');
  });

  it('accepts arrays for array fields', () => {
    expect(validate('post', { ...validPost, tags: ['a', 'b'] })).toEqual({
      ok: true,
    });
    const { ok, errors } = validate('post', { ...validPost, tags: 'a' });
    expect(ok).toBe(false);
    expect(errors).toContain('tags: expected array');
  });

  it('accepts a location with numeric coords', () => {
    expect(
      validate('feed', {
        date: new Date(),
        image: { sys: { type: 'Link', linkType: 'Asset', id: 'x' } },
        location: { latitude: 34, longitude: -118 },
      })
    ).toEqual({ ok: true });
  });
});
