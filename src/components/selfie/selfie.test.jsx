/* eslint-disable @next/next/no-img-element */
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('./selfie.css.js', () => ({
  __esModule: true,
  ImageWrapper: ({ children }) => <div data-testid="mock-wrapper">{children}</div>,
  Image: ({ src, alt }) => <img data-testid="mock-image" src={src} alt={alt} />,
}));

import Selfie from './selfie.jsx';

test('renders image with src prop', () => {
  render(<Selfie src="test.jpg" />);
  expect(screen.getByRole('img').src).toContain('test.jpg');
});

test('renders with correct alt text', () => {
  render(<Selfie src="test.jpg" />);
  expect(screen.getByAltText('Selfie')).toBeInTheDocument();
});
