/* eslint-disable @next/next/no-img-element */
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/dynamic', () => ({
  default: (loader) => {
    if (typeof loader === 'function' && loader.toString().includes('next/image')) {
      const ImageMock = ({ height, width, src, alt, priority }) => (
        <img
          data-testid="mock-image"
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      );
      ImageMock.displayName = 'ImageMock';
      return ImageMock;
    }
    return () => <div data-testid="mock-dynamic" />;
  },
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
