import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GalleryPage from '../pages/gallery.jsx';

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-box">{children}</div>,
}));

vi.mock('components/gallery/gallery.jsx', () => ({
  default: ({ photos }) => <div data-testid="mock-gallery">{photos.length} photos</div>,
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => <title>{pageTitle}</title>,
}));

vi.mock('components/title/title.jsx', () => ({
  default: ({ children }) => <h1>{children}</h1>,
}));

test('renders gallery page with title', () => {
  render(
    <GalleryPage
      page={{ title: 'Test Gallery' }}
      gallery={{ images: [] }}
    />
  );

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Test Gallery'
  );
});

test('renders gallery component when images exist', () => {
  const mockImages = [{ src: 'test1.jpg' }, { src: 'test2.jpg' }];
  render(
    <GalleryPage
      page={{ title: 'Test Gallery' }}
      gallery={{ images: mockImages }}
    />
  );

  expect(screen.getByTestId('mock-gallery')).toHaveTextContent('2 photos');
});

test('does not render gallery when no images', () => {
  const { container } = render(
    <GalleryPage
      page={{ title: 'Test Gallery' }}
      gallery={{ images: [] }}
    />
  );

  // The gallery div has margin but no Gallery component inside
  expect(container.innerHTML).not.toContain('mock-gallery');
});
