import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the Modal and Carousel components from react-images
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
  // Export Carousel as default and Modal as named
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
  // Verify that carousel views are rendered inside the modal
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
