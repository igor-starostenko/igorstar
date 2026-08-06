import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver.js';

let observers;

beforeEach(() => {
  observers = [];
  global.IntersectionObserver = vi.fn(function IntersectionObserver(callback) {
    const observer = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      trigger: (entries) => callback(entries),
    };
    observers.push(observer);
    return observer;
  });
});

afterEach(() => {
  observers = null;
});

// Test component that uses the hook
const TestComponent = ({ onIntersect, options }) => {
  const ref = useRef(null);
  useIntersectionObserver(ref, onIntersect, options);
  return <div ref={ref} data-testid="target">Target</div>;
};

test('calls onIntersect when element becomes visible', () => {
  const onIntersect = vi.fn();
  render(<TestComponent onIntersect={onIntersect} />);

  const entry = { isIntersecting: true, target: screen.getByTestId('target') };
  act(() => {
    observers[0].trigger([entry]);
  });

  expect(onIntersect).toHaveBeenCalledWith(entry);
});

test('does not call onIntersect when element is not intersecting', () => {
  const onIntersect = vi.fn();
  render(<TestComponent onIntersect={onIntersect} />);

  const entry = { isIntersecting: false, target: screen.getByTestId('target') };
  act(() => {
    observers[0].trigger([entry]);
  });

  expect(onIntersect).not.toHaveBeenCalled();
});

test('uses custom threshold and rootMargin', () => {
  const onIntersect = vi.fn();
  render(
    <TestComponent
      onIntersect={onIntersect}
      options={{ threshold: 0.5, rootMargin: '100px' }}
    />
  );

  expect(global.IntersectionObserver).toHaveBeenCalledWith(
    expect.any(Function),
    { threshold: 0.5, rootMargin: '100px' }
  );
});

test('uses default threshold and rootMargin when options not provided', () => {
  const onIntersect = vi.fn();
  render(<TestComponent onIntersect={onIntersect} />);

  expect(global.IntersectionObserver).toHaveBeenCalledWith(
    expect.any(Function),
    { threshold: 0.1, rootMargin: '200px 0px 200px 0px' }
  );
});