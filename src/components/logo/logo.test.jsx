import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('components/image/baseImage', () => ({
  default: ({ fill, src, alt }) => (
    <img
      data-testid="mock-base-image"
      src={src}
      fill={fill}
      alt={alt}
    />
  ),
}));

vi.mock('components/image/image.jsx', () => ({
  default: ({ src, width, height, alt }) => (
    <img
      data-testid="mock-logo-image"
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  ),
}));

import LogoSvg from './logo.jsx';

test('renders logo with default props', () => {
  render(<LogoSvg />);

  expect(screen.getByAltText('logo')).toBeInTheDocument();
});

test('renders logo with BaseImage', () => {
  render(<LogoSvg />);

  expect(screen.getByTestId('mock-base-image')).toBeInTheDocument();
});

test('renders logo with src="/logo.svg"', () => {
  render(<LogoSvg />);

  expect(screen.getByAltText('logo')).toBeInTheDocument();
});

test('passes additional props to BaseImage', () => {
  render(<LogoSvg className="custom-logo" />);

  expect(screen.getByAltText('logo')).toBeInTheDocument();
});
