import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

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

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    asPath: '/feed',
  }),
}));

vi.mock('next/dynamic', () => ({
  default: () => {
    const MockDynamic = ({ children }) => (
      <div data-testid="mock-dynamic">{children}</div>
    );
    return MockDynamic;
  },
}));

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-box">{children}</div>,
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => <div data-testid="mock-head">{pageTitle}</div>,
}));

vi.mock('components/gallery/gallery.jsx', () => ({
  default: ({ photos, targetRowHeight }) => (
    <div data-testid="mock-gallery">
      {photos?.length || 0} images at {targetRowHeight}px
    </div>
  ),
}));

vi.mock('components/pagination/pagination.jsx', () => ({
  default: ({ pageNum, totalPages }) => (
    <div data-testid="mock-pagination">
      Page {pageNum} of {totalPages}
    </div>
  ),
}));

import PaginatedGallery from './paginatedGallery.jsx';

const makeImage = (i) => ({
  id: `img-${i}`,
  src: `/img${i}.jpg`,
  width: 400,
  height: 300,
  alt: `Image ${i}`,
});

test('renders pagination when more items exist', () => {
  const images = Array.from({ length: 24 }, (_, i) => makeImage(i));
  render(
    <PaginatedGallery
      title="Photo Feed"
      total={24}
      images={images}
      pageSize={12}
      targetRowHeight={260}
    />
  );
  expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
});

test('does not render pagination when all items are shown', () => {
  const images = Array.from({ length: 5 }, (_, i) => makeImage(i));
  render(
    <PaginatedGallery
      title="Photo Feed"
      total={5}
      images={images}
      pageSize={12}
      targetRowHeight={260}
    />
  );
  expect(screen.queryByTestId('mock-pagination')).not.toBeInTheDocument();
});

test('renders sentinel element for infinite scroll', () => {
  const images = Array.from({ length: 24 }, (_, i) => makeImage(i));
  render(
    <PaginatedGallery
      title="Photo Feed"
      total={24}
      images={images}
      pageSize={12}
      targetRowHeight={260}
    />
  );
  const box = screen.getByTestId('mock-box');
  const sentinel = box.querySelector('div:last-child');
  expect(sentinel).not.toBeNull();
  expect(sentinel.tagName).toBe('DIV');
});

test('renders gallery placeholder while loading', () => {
  const images = Array.from({ length: 24 }, (_, i) => makeImage(i));
  render(
    <PaginatedGallery
      title="Photo Feed"
      total={24}
      images={images}
      pageSize={12}
      targetRowHeight={260}
    />
  );
  // Gallery renders as mock-dynamic (dynamic import mock)
  expect(screen.getByTestId('mock-dynamic')).toBeInTheDocument();
});
