import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import CarouselModal from './carousel.jsx';

const mockViews = [
  { id: '0', src: 'a.jpg', alt: 'A', width: 100, height: 100 },
  { id: '1', src: 'b.jpg', alt: 'B', width: 200, height: 200 },
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
  expect(img).toHaveAttribute('src', 'a.jpg');
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

  // Test keyboard handler (Escape key)
  const overlay = screen.getByRole('button', { name: /close/i }).closest('div');
  if (overlay) {
    fireEvent.keyDown(overlay, { key: 'Escape' });
  }
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

test('calls onClose when clicking on modal content (keyboard)', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );

  // Test keyboard handler (Escape key)
  const dialog = screen.getByRole('dialog');
  fireEvent.keyDown(dialog, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});
