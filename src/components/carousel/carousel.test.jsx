import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('react-images', () => {
  const mockCarousel = vi.fn(({ views, currentIndex }) => (
    <div data-testid="mock-carousel">
      {views.map((v, i) => {
        return (
          <div key={i} data-testid="carousel-view" data-index={i}>
            <img src={v.src} alt={v.alt} width={v.width} height={v.height} />
          </div>
        );
      })}
    </div>
  ));

  const mockModal = ({ onClose, children }) => (
    <div data-testid="mock-modal" onClick={onClose}>
      {children}
    </div>
  );

  return {
    __esModule: true,
    default: mockCarousel,
    Modal: mockModal,
  };
});

import CarouselModal from './carousel.jsx';
const { default: mockCarousel } = await import('react-images');

const mockViews = [
  { id: '0', src: 'a.jpg', alt: 'A', width: 100, height: 100 },
  { id: '1', src: 'b.jpg', alt: 'B', width: 200, height: 200 },
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

test('currentIndex prop controls view rendering', () => {
  const onClose = vi.fn();

  render(
    <CarouselModal onClose={onClose} currentIndex={1} views={mockViews} />
  );

  const viewElements = screen.getAllByTestId('carousel-view');

  // Verify we have the expected number of elements
  expect(viewElements).toHaveLength(2);

  // Verify first element has correct index
  expect(viewElements[0]).toHaveAttribute('data-index', '0');

  // Verify second element has correct index
  expect(viewElements[1]).toHaveAttribute('data-index', '1');

  // Verify carousel mock was called with correct props
  const lastCall = mockCarousel.mock.calls[mockCarousel.mock.calls.length - 1][0];
  expect(lastCall).toMatchObject({ views: mockViews, currentIndex: 1 });
});
