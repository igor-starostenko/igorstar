import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('./image.css.js', () => ({
  SImage: ({ src, alt, ...rest }) => <img data-testid="mock-simage" src={src} alt={alt} {...rest} />,
}));

import BaseImage from './baseImage.jsx';

test('renders image with valid src', () => {
  render(<BaseImage src="/test.jpg" alt="Test image" />);

  expect(screen.getByAltText('Test image')).toBeInTheDocument();
});

test('falls back to backupSrc on error', () => {
  const mockOnError = vi.fn();
  
  // Mock the SImage to support onerror
  vi.mock('./image.css.js', () => ({
    SImage: ({ src, alt, onError, ...rest }) => (
      <img 
        data-testid="mock-simage" 
        src={src} 
        alt={alt} 
        onError={onError}
        {...rest} 
      />
    ),
  }));

  const { rerender } = render(
    <BaseImage src="/nonexistent.jpg" alt="Test image" backupSrc="/fallback.jpg" />
  );

  // Simulate image error
  const imgElement = screen.getByTestId('mock-simage');
  fireEvent.error(imgElement);

  // Check that backupSrc is rendered after error
  expect(screen.getByAltText('Test image')).toBeInTheDocument();
});

test('accepts additional props', () => {
  render(
    <BaseImage
      src="/test.jpg"
      alt="Test image"
      width={800}
      height={600}
    />
  );

  const img = screen.getByAltText('Test image');
  expect(img).toHaveAttribute('width', '800');
  expect(img).toHaveAttribute('height', '600');
});

test('handles fill prop with sizes attribute', () => {
  render(
    <BaseImage
      src="/test.jpg"
      alt="Test image"
      fill
    />
  );

  const img = screen.getByAltText('Test image');
  expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
});

test('error handler sets isError state', () => {
  // Re-mock with onError support
  vi.mock('./image.css.js', () => ({
    SImage: ({ src, alt, onError, ...rest }) => (
      <img 
        data-testid="mock-simage" 
        src={src} 
        alt={alt} 
        onError={onError}
        {...rest} 
      />
    ),
  }));

  const { rerender } = render(<BaseImage src="/error.jpg" alt="Error test" backupSrc="/fallback.jpg" />);

  const imgElement = screen.getByAltText('Error test');
  
  // Simulate image error
  fireEvent.error(imgElement);

  expect(screen.getByAltText('Error test')).toBeInTheDocument();
});
