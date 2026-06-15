/* eslint-disable @next/next/no-img-element */
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('components/hashtags/hashtags.jsx', () => ({
  default: ({ tags, isSmall }) => (
    <div data-testid="mock-hashtags" data-small={isSmall ? 'true' : 'false'}>
      {tags?.join(', ') || ''}

    </div>
  ),
}));

vi.mock('components/image/baseImage.jsx', () => ({
  default: ({ src, backupSrc, alt, ...rest }) => (
    <img data-testid="mock-base-image" src={src} alt={alt} {...rest} />
  ),
}));

vi.mock('./recommendations.css.js', () => ({
  Container: ({ children }) => <div data-testid="mock-container">{children}</div>,
  Card: ({ children }) => <div data-testid="mock-card">{children}</div>,
  SLink: ({ children, href }) => <a data-testid="mock-link" href={href}>{children}</a>,
  ThumbWrapper: ({ children }) => <div data-testid="mock-thumb-wrapper">{children}</div>,
  Thumb: ({ src, alt, ...rest }) => (
    <img data-testid="mock-thumb" src={src} alt={alt} {...rest} />
  ),
  Details: ({ children }) => <div data-testid="mock-details">{children}</div>,
}));

import Recommendations from './recommendations.jsx';

test('renders with posts', () => {
  const mockProps = {
    category: 'tech',
    posts: [
      {
        id: 'post-1',
        title: 'Post 1',
        path: 'post-1',
        date: '2026-05-01',
        category: 'tech',
        tags: ['javascript', 'web'],
        description: 'Description 1',
        linkText: 'Read more',
      },
      {
        id: 'post-2',
        title: 'Post 2',
        path: 'post-2',
        date: '2026-05-02',
        category: 'tech',
        tags: ['react'],
        description: 'Description 2',
        linkText: 'Read more',
      },
    ],
  };

  render(<Recommendations {...mockProps} />);

  expect(screen.getByText('Read more about tech')).toBeInTheDocument();
  expect(screen.getAllByTestId('mock-card').length).toBe(2);
});

test('renders with empty posts', () => {
  const mockProps = {
    category: 'tech',
    posts: [],
  };

  render(<Recommendations {...mockProps} />);

  expect(screen.getByText('Read more about tech')).toBeInTheDocument();
});

test('handles missing thumbnail', () => {
  const mockProps = {
    category: 'tech',
    posts: [
      {
        id: 'post-1',
        title: 'Post 1',
        path: 'post-1',
        date: '2026-05-01',
        category: 'tech',
        description: 'Description 1',
        linkText: 'Read more',
      },
    ],
  };

  render(<Recommendations {...mockProps} />);

  expect(screen.getByText('Post 1')).toBeInTheDocument();
});

test('handles post with thumbnail', () => {
  const mockProps = {
    category: 'tech',
    posts: [
      {
        id: 'post-1',
        title: 'Post 1',
        path: 'post-1',
        date: '2026-05-01',
        category: 'tech',
        thumbnail: {
          src: '/thumb.jpg',
          backupSrc: '/backup-thumb.jpg',
          alt: 'Thumbnail',
        },
        description: 'Description 1',
        linkText: 'Read more',
      },
    ],
  };

  render(<Recommendations {...mockProps} />);

  expect(screen.getByAltText('Thumbnail')).toBeInTheDocument();
});

test('handles missing tags', () => {
  const mockProps = {
    category: 'tech',
    posts: [
      {
        id: 'post-1',
        title: 'Post 1',
        path: 'post-1',
        date: '2026-05-01',
        category: 'tech',
        description: 'Description 1',
        linkText: 'Read more',
      },
    ],
  };

  render(<Recommendations {...mockProps} />);

  expect(screen.getByText('Post 1')).toBeInTheDocument();
});
