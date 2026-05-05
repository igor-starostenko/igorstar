import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next/dynamic to return a component that excludes invalid DOM props
vi.mock('next/dynamic', () => ({
  default: (loader) => {
    const MockComponent = (props) => {
      // Exclude props that aren't valid DOM attributes to avoid React warnings
      const { renderImage, targetRowHeight, photos, ...rest } = props;
      return (
        <div
          data-testid="mock-dynamic-component"
          data-photos={JSON.stringify(photos)}
          {...rest}
        />
      );
    };
    return MockComponent;
  },
}));

// Mock ModalGateway from react-images
vi.mock('react-images', () => ({
  __esModule: true,
  ModalGateway: ({ children }) => <div data-testid="mock-modal-gateway">{children}</div>,
}));

import Gallery from './gallery.jsx';

const unsortedPhotos = [
  { id: '2', src: 'b.jpg', width: 200, height: 100 },
  { id: '1', src: 'a.jpg', width: 100, height: 200 },
];

test('renders PhotoGallery when photos are provided', () => {
  render(<Gallery photos={unsortedPhotos} />);
  const photoGallery = screen.getAllByTestId('mock-dynamic-component')[0];
  expect(photoGallery).toBeInTheDocument();
});
