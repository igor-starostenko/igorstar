import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock next/image before importing components that use it
vi.mock('next/image', () => ({
  default: ({ src, alt, ..._rest }) => <img src={src} alt={alt || ''} />,
}));

import CarouselModal from './carousel.jsx';

const mockViews = [
  {
    id: '0',
    src: '/a.jpg',
    alt: 'A',
    description: 'A description',
    width: 100,
    height: 100,
  },
  {
    id: '1',
    src: '/b.jpg',
    alt: 'B',
    description: 'B description',
    width: 200,
    height: 200,
  },
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
    <CarouselModal
      onClose={onClose}
      currentIndex={0}
      views={[{ ...mockViews[0], description: '' }]}
    />
  );

  expect(screen.queryByText('A description')).not.toBeInTheDocument();
});

test('renders date when available', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal
      onClose={onClose}
      currentIndex={0}
      views={[{ ...mockViews[0], date: '2024-01-15T10:00:00Z' }]}
    />
  );

  expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
});

test('does not render date when not available', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={[mockViews[0]]} />
  );

  // Should not have any element with the formatted date text
  expect(screen.queryByText(/Jan.*2024/)).not.toBeInTheDocument();
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

test('calls onGetNextPage and does NOT loop when at last image and next page available', () => {
  const onClose = vi.fn();
  const onIndexChange = vi.fn();
  const onGetNextPage = vi.fn(() => true);
  render(
    <CarouselModal
      onClose={onClose}
      currentIndex={1}
      views={mockViews}
      onIndexChange={onIndexChange}
      onGetNextPage={onGetNextPage}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(onGetNextPage).toHaveBeenCalled();
  expect(onIndexChange).not.toHaveBeenCalled();
});

test('loops back to first image when at last image and no next page available', () => {
  const onClose = vi.fn();
  const onIndexChange = vi.fn();
  const onGetNextPage = vi.fn(() => false);
  render(
    <CarouselModal
      onClose={onClose}
      currentIndex={1}
      views={mockViews}
      onIndexChange={onIndexChange}
      onGetNextPage={onGetNextPage}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(onGetNextPage).toHaveBeenCalled();
  expect(onIndexChange).toHaveBeenCalledWith(0);
});

test('loops back to first image when at last image and onGetNextPage is not provided', () => {
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

  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(onIndexChange).toHaveBeenCalledWith(0);
});
