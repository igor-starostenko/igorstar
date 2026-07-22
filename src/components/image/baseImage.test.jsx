import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('./image.css.js', () => ({
  SImage: ({ src, alt, onError, fill, placeholder, title, loading, className, width, height, ...rest }) => (
    <img
      data-testid="mock-simage"
      src={src}
      alt={alt}
      onError={onError}
      width={width}
      height={height}
      {...rest}
    />
  ),
}));

import BaseImage from './baseImage.jsx';

test('renders image with valid src', () => {
  render(<BaseImage src="/test.jpg" alt="Test image" width={100} height={100} />);

  expect(screen.getByAltText('Test image')).toBeInTheDocument();
});

test('falls back to backupSrc on error', () => {
  render(
    <BaseImage
      src="/nonexistent.jpg"
      alt="Test image"
      backupSrc="/fallback.jpg"
      width={100}
      height={100}
    />
  );

  const imgElement = screen.getByTestId('mock-simage');
  expect(imgElement).toHaveAttribute('src', '/nonexistent.jpg');

  fireEvent.error(imgElement);

  const updatedImg = screen.getByAltText('Test image');
  expect(updatedImg).toHaveAttribute('src', '/fallback.jpg');

  expect(updatedImg).toBeInTheDocument();
});

test('accepts additional props', () => {
  render(<BaseImage src="/test.jpg" alt="Test image" width={800} height={600} />);

  const img = screen.getByAltText('Test image');
  expect(img).toHaveAttribute('width', '800');
  expect(img).toHaveAttribute('height', '600');
});

test('error handler sets isError state', () => {
  render(
    <BaseImage src="/error.jpg" alt="Error test" backupSrc="/fallback.jpg" width={100} height={100} />
  );

  const imgElement = screen.getByAltText('Error test');

  fireEvent.error(imgElement);

  expect(screen.getByAltText('Error test')).toBeInTheDocument();
});

test('does not add fill prop when fill is false (explicit false)', () => {
  render(<BaseImage src="/test.jpg" alt="Test image" fill={false} width={100} height={100} />);

  const img = screen.getByAltText('Test image');
  expect(img).not.toHaveAttribute('fill');
});

test('passes width and height props correctly', () => {
  render(
    <BaseImage src="/test.jpg" alt="Test image" width={800} height={600} />
  );

  const img = screen.getByAltText('Test image');
  expect(img).toHaveAttribute('width', '800');
  expect(img).toHaveAttribute('height', '600');
});

test('renders with only required props (no explicit width/height)', () => {
  render(<BaseImage src="/test.jpg" alt="Minimal image" />);
  const img = screen.getByAltText('Minimal image');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', '/test.jpg');
});
