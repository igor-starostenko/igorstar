import { test, expect } from 'vitest';
import {
  filterObject,
  addBlurDataURLs,
  clearBlurDataURLCache,
} from '../helpers/contentful';

// Clear cache before each test
beforeEach(() => {
  clearBlurDataURLCache();
});

test('filterObject returns empty object when props is not an array', () => {
  expect(filterObject({ name: 'test' }, 'not-an-array')).toEqual({});
  expect(filterObject({ name: 'test' }, null)).toEqual({});
  expect(filterObject({ name: 'test' }, undefined)).toEqual({});
});

test('filterObject returns empty object when props array is empty', () => {
  expect(filterObject({ name: 'test', age: 30 }, [])).toEqual({});
});

test('filterObject returns empty object when property not in object', () => {
  expect(filterObject({ name: 'test' }, ['age', 'address'])).toEqual({});
});

test('filterObject returns only specified properties that exist in object', () => {
  const obj = { name: 'John', age: 30, city: 'New York' };
  const props = ['name', 'age', 'country'];

  expect(filterObject(obj, props)).toEqual({
    name: 'John',
    age: 30,
  });
});

test('filterObject preserves all matching properties', () => {
  const obj = { id: '123', title: 'Test', date: '2026-01-01' };
  const props = ['id', 'title', 'date', 'extra'];

  expect(filterObject(obj, props)).toEqual({
    id: '123',
    title: 'Test',
    date: '2026-01-01',
  });
});

test('filterObject handles nested properties correctly', () => {
  const obj = { user: { name: 'John' }, title: 'Post' };
  const props = ['user', 'title'];

  expect(filterObject(obj, props)).toEqual({
    user: { name: 'John' },
    title: 'Post',
  });
});

test('filterObject returns shallow copy of object', () => {
  const obj = { name: 'John' };
  const result = filterObject(obj, ['name']);

  // Should be equal but not the same reference
  expect(result).toEqual(obj);
  expect(result).not.toBe(obj);
});

test('addBlurDataURLs handles empty array', async () => {
  const result = await addBlurDataURLs([]);
  expect(result).toEqual([]);
});

test('addBlurDataURLs handles array with non-image items', async () => {
  const images = [{ id: '1' }, { id: '2', src: null }];
  const result = await addBlurDataURLs(images, {});

  expect(result).toHaveLength(2);
  expect(result[0]).toEqual({ id: '1', blurDataURL: null });
  expect(result[1]).toEqual({ id: '2', src: null, blurDataURL: null });
});

test('addBlurDataURLs does not add blurDataURL for non-Contentful images', async () => {
  const images = [{ src: '/local/image.jpg' }];
  const result = await addBlurDataURLs(images, {});

  expect(result[0]).toEqual({ src: '/local/image.jpg', blurDataURL: null });
});

test('addBlurDataURLs adds blurDataURL for Contentful images', async () => {
  const src = 'https://images.ctfassets.net/abc123/image.jpg';
  const images = [{ src }];

  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    headers: { get: () => 'image/jpeg' },
    arrayBuffer: async () => new ArrayBuffer(10),
  });

  const result = await addBlurDataURLs(images, {});

  expect(result[0]).toHaveProperty('blurDataURL');
  expect(result[0].blurDataURL).toMatch(/^data:image\/jpeg;base64,/);
});

test('addBlurDataURLs uses cache for repeated images', async () => {
  const src = 'https://images.ctfassets.net/abc123/image.jpg';
  const images = [{ src }, { src }];

  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    headers: { get: () => 'image/jpeg' },
    arrayBuffer: async () => new ArrayBuffer(10),
  });

  const result = await addBlurDataURLs(images, {});

  // Both should have the same blurDataURL from cache
  expect(result[0].blurDataURL).toBe(result[1].blurDataURL);
});

test('filterObject handles object with null/undefined values', () => {
  const obj = { name: 'John', age: null, city: undefined };

  expect(filterObject(obj, ['name', 'age', 'city'])).toEqual({
    name: 'John',
    age: null,
    city: undefined,
  });
});

test('filterObject handles object with falsy values', () => {
  const obj = { count: 0, flag: false, message: '' };

  expect(filterObject(obj, ['count', 'flag', 'message'])).toEqual({
    count: 0,
    flag: false,
    message: '',
  });
});

test('addBlurDataURLs handles multiple images', async () => {
  const src1 = 'https://images.ctfassets.net/abc/image1.jpg';
  const src2 = 'https://images.ctfassets.net/def/image2.jpg';

  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    headers: { get: () => 'image/jpeg' },
    arrayBuffer: async () => new ArrayBuffer(10),
  });

  const images = [{ src: src1 }, { src: src2 }];
  const result = await addBlurDataURLs(images, {});

  expect(result).toHaveLength(2);
  expect(result[0]).toHaveProperty('blurDataURL');
  expect(result[1]).toHaveProperty('blurDataURL');
});
