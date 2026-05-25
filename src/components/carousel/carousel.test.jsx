import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('react-images', () => {
  const MockModal = ({ onClose, children }) => (
    <div data-testid="mock-modal" onClick={onClose}>
      {children}
    </div>
  );

  const MockCarousel = ({ views, currentIndex }) => (
    <div data-testid="mock-carousel">
      {views.map((v, i) => (
        <div key={i} data-testid="carousel-view" data-index={i} />
      ))}
    </div>
  );

  return { __esModule: true, default: MockCarousel, Modal: MockModal, Carousel: MockCarousel };
});

import CarouselModal from './carousel.jsx';

const mockViews = [
  { src: 'a.jpg', alt: 'A', width: 100, height: 100 },
  { src: 'b.jpg', alt: 'B', width: 200, height: 200 },
];

test('renders modal and carousel with provided props', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={1} views={mockViews} />
  );

  expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
  const viewElements = screen.getAllByTestId('carousel-view');
  expect(viewElements).toHaveLength(mockViews.length);
});

test('calls onClose when modal is clicked', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={0} views={mockViews} />
  );
  fireEvent.click(screen.getByTestId('mock-modal'));
  expect(onClose).toHaveBeenCalled();
});

test('renders views with correct currentIndex', () => {
  const onClose = vi.fn();
  render(
    <CarouselModal onClose={onClose} currentIndex={1} views={mockViews} />
  );

  const viewElements = screen.getAllByTestId('carousel-view');
  expect(viewElements[0].getAttribute('data-index')).toBe('0');
  expect(viewElements[1].getAttribute('data-index')).toBe('1');
});
