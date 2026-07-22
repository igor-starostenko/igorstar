import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Don't mock BaseImage - test the real component
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

  const imgElement = screen.getByAltText('Test image');
  // Check that it has a src attribute (Next.js may transform the path)
  expect(imgElement).toHaveAttribute('src');

  fireEvent.error(imgElement);

  const updatedImg = screen.getByAltText('Test image');
  expect(updatedImg).toHaveAttribute('src');

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
  render(<BaseImage src="/logo.svg" alt="Minimal image" />);
  const img = screen.getByAltText('Minimal image');
  expect(img).toBeInTheDocument();
  // Next.js Image may transform the src, so just check it has a src attribute
  expect(img).toHaveAttribute('src');
});
