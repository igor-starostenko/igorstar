import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Box from './box.jsx';

test('renders children correctly', () => {
  render(<Box>Test Content</Box>);
  expect(screen.getByText('Test Content').tagName).toBe('DIV');
});

test('applies isMain prop', () => {
  render(<Box isMain>Test Content</Box>);
  expect(screen.getByText('Test Content').tagName).toBe('DIV');
});

test('renders empty children', () => {
  const { container } = render(<Box>{''}</Box>);
  expect(container.firstChild.tagName).toBe('DIV');
});
