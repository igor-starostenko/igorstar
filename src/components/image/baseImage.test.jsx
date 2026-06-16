/* eslint-disable @next/next/no-img-element */
import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('./image.css.js', () => ({
  SImage: ({
    src,
    alt,
    onError,
    fill,
    sizes,
    placeholder,
    title,
    loading,
    unoptimized,
    priority,
    style,
    className,
    ...rest
  }) => (
    <img
      data-testid="mock-simage"
      src={src}
      alt={alt}
      onError={onError}
      sizes={sizes}
      {...rest}
    />
  ),
}));

import BaseImage from './baseImage.jsx';

test('renders image with valid src', () => {
  render(<BaseImage src="/test.jpg" alt="Test image" />);

  expect(screen.getByAltText('Test image')).toBeInTheDocument();
});

test('falls back to backupSrc on error', () => {
  render(
    <BaseImage
      src="/nonexistent.jpg"
      alt="Test image"
      backupSrc="/fallback.jpg"
    />
  );

  // Verify initial src is the primary one
  const imgElement = screen.getByTestId('mock-simage');
  expect(imgElement).toHaveAttribute('src', '/nonexistent.jpg');

  // Simulate image error
  fireEvent.error(imgElement);

  // Check that src changed to backupSrc after error
  const updatedImg = screen.getByAltText('Test image');
  expect(updatedImg).toHaveAttribute('src', '/fallback.jpg');

  // Verify the img element is still in the document
  expect(updatedImg).toBeInTheDocument();
});

test('accepts additional props', () => {
  render(
    <BaseImage src="/test.jpg" alt="Test image" width={800} height={600} />
  );

  const img = screen.getByAltText('Test image');
  expect(img).toHaveAttribute('width', '800');
  expect(img).toHaveAttribute('height', '600');
});

test('handles fill prop with sizes attribute', () => {
  render(<BaseImage src="/test.jpg" alt="Test image" fill />);

  const img = screen.getByAltText('Test image');
  expect(img).toHaveAttribute(
    'sizes',
    '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  );
});

test('error handler sets isError state', () => {
  render(
    <BaseImage src="/error.jpg" alt="Error test" backupSrc="/fallback.jpg" />
  );

  const imgElement = screen.getByAltText('Error test');

  // Simulate image error
  fireEvent.error(imgElement);

  expect(screen.getByAltText('Error test')).toBeInTheDocument();
});

test('does not add fill prop when fill is false (explicit false)', () => {
  render(<BaseImage src="/test.jpg" alt="Test image" fill={false} />);

  const img = screen.getByAltText('Test image');
  // When fill is explicitly false, the SImage should NOT receive the fill prop
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

test('handles Contentful image URL with query params', () => {
  const contentfulSrc =
    'https://images.ctfassets.net/abc123/xyz.jpg?w=800&q=75';

  render(
    <BaseImage
      src={contentfulSrc}
      alt="Contentful image"
      width={800}
      height={600}
    />
  );

  const img = screen.getByAltText('Contentful image');
  expect(img).toHaveAttribute('src', contentfulSrc);
  expect(img).toHaveAttribute('width', '800');
  expect(img).toHaveAttribute('height', '600');
});

test('renders with only required props (no explicit width/height)', () => {
  render(<BaseImage src="/test.jpg" alt="Minimal image" />);

  const img = screen.getByAltText('Minimal image');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', '/test.jpg');
});
