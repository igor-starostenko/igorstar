import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Title from './title.jsx';

test('renders children correctly', () => {
  render(<Title>Test Title</Title>);
  expect(screen.getByText('Test Title').tagName).toBe('SPAN');
});

test('renders with custom element via as prop', () => {
  render(<Title as="h1">Test Title</Title>);
  expect(screen.getByRole('heading', { level: 1 }).tagName).toBe('H1');
});

test('applies default weight by not throwing', () => {
  render(<Title>Test</Title>);
  const element = screen.getByText('Test');
  expect(element).toBeInTheDocument();
});

test('applies large size by not throwing', () => {
  render(<Title size="large">Test</Title>);
  const element = screen.getByText('Test');
  expect(element).toBeInTheDocument();
});
