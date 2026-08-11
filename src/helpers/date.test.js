import { test, expect } from 'vitest';
import { formatDate } from './date';

test('formats a date string correctly', () => {
  expect(formatDate('2024-01-15T10:00:00Z')).toBe('Jan 15, 2024');
});

test('formats another date correctly', () => {
  expect(formatDate('2023-12-01T00:00:00Z')).toBe('Dec 1, 2023');
});
