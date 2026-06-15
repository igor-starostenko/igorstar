import { test, expect, vi } from 'vitest';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { render, screen } from '@testing-library/react';

vi.mock('./baseImage.jsx', () => ({
  default: ({ alt, src, ...rest }) => (
    <img
      data-testid="mock-base-image"
      src={src}
      alt={alt || ''}
      {...rest}
    />
  ),
}));

vi.mock('./image.css.js', () => ({
  __esModule: true,
  ImageWrapper: ({ children, style }) => (
    <div data-testid="mock-image-wrapper" style={style}>
      {children}
    </div>
  ),
}));

import Image from './image.jsx';

const mockProps = {
  src: 'photo.jpg',
  alt: 'Sample Photo',
  width: 800,
  height: 600,
};

test('renders ImageWrapper and passes style prop', () => {
  render(<Image {...mockProps} style={{ margin: '10px' }} />);
  const wrapper = screen.getByTestId('mock-image-wrapper');
  expect(wrapper).toBeInTheDocument();
  expect(wrapper).toHaveStyle({ margin: '10px' });
});

test('renders BaseImage with correct src and alt', () => {
  render(<Image {...mockProps} />);
  const img = screen.getByTestId('mock-base-image');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'photo.jpg');
  expect(img).toHaveAttribute('alt', 'Sample Photo');
});
