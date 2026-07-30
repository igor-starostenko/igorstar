import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('next/dynamic', () => ({
  default: (_loader) => {
    const MockDynamic = ({ children }) => (
      <div data-testid="mock-dynamic">{children}</div>
    );
    return MockDynamic;
  },
}));

vi.mock('@contentful/rich-text-types', () => ({
  BLOCKS: { PARAGRAPH: 'paragraph' },
  INLINES: { HYPERLINK: 'hyperlink' },
  MARKS: { CODE: 'code' },
}));

vi.mock('@contentful/rich-text-react-renderer', () => ({
  documentToReactComponents: (node, _options) => (
    <div data-testid="mock-rich-text">{String(node)}</div>
  ),
}));

vi.mock('components/gallery/gallery.jsx', () => ({
  default: ({ photos }) => (
    <div data-testid="mock-gallery">{photos.length} photos</div>
  ),
}));

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-box">{children}</div>,
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle, imageUrl }) => (
    <div data-testid="mock-head">
      {pageTitle}
      {imageUrl && <img src={imageUrl} alt="preview" />}
    </div>
  ),
}));

vi.mock('components/date/date.jsx', () => ({
  default: ({ date }) => <span data-testid="mock-date">{date}</span>,
}));

vi.mock('components/recommendations/recommendations.jsx', () => ({
  default: ({ category, posts }) => (
    <div data-testid="mock-recommendations">
      {category} | {posts.length}
    </div>
  ),
}));

vi.mock('components/image/image.jsx', () => ({
  default: ({ src, alt }) => (
    <img data-testid="mock-base-image" src={src} alt={alt} />
  ),
}));

vi.mock('components/image/flickrImage.jsx', () => ({
  default: ({ xml }) => <div data-testid="mock-flickr">{xml}</div>,
}));

vi.mock('react-syntax-highlighter', () => ({
  default: ({ children }) => <pre data-testid="mock-code">{children}</pre>,
}));

import Post from '../pages/[category]/[post].jsx';

const mockPost = {
  id: 'post-1',
  title: 'Test Post',
  date: '2026-05-01',
  category: 'tech',
  path: '/tech/post-1',
  description: 'Test description',
  content: { nodeType: 'document', content: [] },
  thumbnail: {
    src: '/thumb.jpg',
    alt: 'Thumbnail',
  },
  images: [],
  targetRowHeight: 250,
};

test('renders post with all props', () => {
  const mockProps = {
    post: { ...mockPost, layout: 'default', draft: false },
    recommendations: [],
  };

  render(<Post {...mockProps} />);

  // Use getAllByText since title appears multiple times (in head and h1)
  const titles = screen.getAllByText('Test Post');
  expect(titles.length).toBeGreaterThan(0);
});

test('renders with image gallery', () => {
  const mockPostWithImages = {
    ...mockPost,
    images: [
      { src: '/img1.jpg', alt: 'Image 1' },
      { src: '/img2.jpg', alt: 'Image 2' },
    ],
  };

  const mockProps = {
    post: { ...mockPostWithImages, layout: 'default', draft: false },
    recommendations: [],
  };

  render(<Post {...mockProps} />);

  expect(screen.getByTestId('mock-gallery')).toHaveTextContent('2 photos');
});

test('handles post without thumbnail', () => {
  const mockProps = {
    post: { ...mockPost, thumbnail: null, layout: 'default', draft: false },
    recommendations: [],
  };

  render(<Post {...mockProps} />);

  // Use getAllByText since title appears multiple times
  const titles = screen.getAllByText('Test Post');
  expect(titles.length).toBeGreaterThan(0);
});
