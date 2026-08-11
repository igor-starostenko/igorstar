import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock next/image before importing components that use it
vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }) => <img src={src} alt={alt || ''} {...rest} />,
}));

import CarouselModal from './carousel.jsx';

const mockViews = [
  { id: '0', src: '/a.jpg', alt: 'A', description: 'A description', width: 100, height: 100 },
  { id: '1', src: '/b.jpg', alt: 'B', description: 'B description', width: 200, height: 200 },
];

const mockViewsWithBlur = [
  { id: '0', src: '/a.jpg', alt: 'A', description: 'A description', width: 100, height: 100, blurDataURL: 'data:image/jpeg;base64,abc123' },
  { id: '1', src: '/b.jpg', alt: 'B', description: 'B description', width: 200, height: 200, blurDataURL: 'data:image/jpeg;base64,def456' },
];

test('renders modal overlay with close button', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
});

test('renders current view image', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  const img = screen.getByAltText('A');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', '/a.jpg');
});

test('renders description when available', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  expect(screen.getByText('A description')).toBeInTheDocument();
});

test('does not render description when not available', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={[{ ...mockViews[0], description: '' }]} />
  );

  expect(screen.queryByText('A description')).not.toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(onClose).toHaveBeenCalled();
});

test('renders navigation buttons when multiple views exist', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
});

test('calls onClose when clicking on modal overlay (keyboard)', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  // Keyboard handler is attached to document, not a DOM element
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

test('calls handleNext when clicking next button', () => {
  const onClose = vi.fn();
  const onIndexChange = vi.fn();
  render(
    <CarouselModal
      onClose={onClose}
      currentIndex={0}
      views={mockViews}
      onIndexChange={onIndexChange}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(onIndexChange).toHaveBeenCalledWith(1);
});

test('calls handlePrev when clicking previous button', () => {
  const onClose = vi.fn();
  const onIndexChange = vi.fn();
  render(
    <CarouselModal
      onClose={onClose}
      currentIndex={1}
      views={mockViews}
      onIndexChange={onIndexChange}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /previous/i }));
  expect(onIndexChange).toHaveBeenCalledWith(0);
});

test('calls onClose on Escape keydown', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  // Keyboard handler is attached to document
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

test('does not pass blurDataURL to main image (only to placeholder)', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViewsWithBlur} />
  );

  // Main image (ModalImage) should NOT have placeholder or blurDataURL
  const imgs = screen.getAllByAltText('A');
  const mainImg = imgs.find((img) => !img.getAttribute('aria-hidden'));
  expect(mainImg).not.toHaveAttribute('placeholder');
  expect(mainImg).not.toHaveAttribute('blurDataURL');
});

test('renders blur placeholder img when blurDataURL is available', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViewsWithBlur} />
  );

  // BlurPlaceholder should be rendered with the blur data URL as src
  const imgs = screen.getAllByAltText('A');
  const blurPlaceholder = imgs.find((img) => img.getAttribute('aria-hidden') === 'true');
  expect(blurPlaceholder).toBeInTheDocument();
  expect(blurPlaceholder).toHaveAttribute('src', 'data:image/jpeg;base64,abc123');
});

test('does not render blur placeholder when blurDataURL is not available', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  // Only the main image should be rendered (no blur placeholder)
  const imgs = screen.queryAllByAltText('A');
  expect(imgs).toHaveLength(1);
  const mainImg = imgs[0];
  expect(mainImg).not.toHaveAttribute('placeholder', 'blur');
});

test('preloads adjacent images for faster transitions', () => {
  const mockImage = vi.fn();
  global.Image = mockImage;

  const views = [
    { id: '0', src: '/a.jpg', alt: 'A', description: '', width: 100, height: 100 },
    { id: '1', src: '/b.jpg', alt: 'B', description: '', width: 100, height: 100 },
    { id: '2', src: '/c.jpg', alt: 'C', description: '', width: 100, height: 100 },
  ];

  render(
    <CarouselModal onClose={vi.fn()} currentIndex={1} views={views} />
  );

  // Should preload previous (index 0) and next (index 2) images
  expect(mockImage).toHaveBeenCalledTimes(2);
  const preloadedSrcs = mockImage.mock.instances.map((img) => img.src);
  expect(preloadedSrcs).toContain('/a.jpg');
  expect(preloadedSrcs).toContain('/c.jpg');
});