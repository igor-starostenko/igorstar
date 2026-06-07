/* eslint-disable @next/next/no-img-element */
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('next/dynamic', () => ({
  default: (loader) => {
    const MockDynamicComponent = ({ children, ...props }) => {
      const { isMobile, ...rest } = props;
      return (
        <div data-testid="mock-dynamic-component" {...rest}>
          {children}
        </div>
      );
    };
    return MockDynamicComponent;
  },
}));

vi.mock('components/image/image.jsx', () => ({
  default: ({ src, alt, fill, priority }) => (
    <img
      data-testid="mock-image"
      src={src}
      alt={alt}
      data-fill={fill}
      data-priority={priority}
    />
  ),
}));

vi.mock('components/hashtags/hashtags.jsx', () => ({
  default: ({ tags }) => <div data-testid="mock-hashtags">{tags.join(', ')}</div>,
}));

vi.mock('./article.css.js', () => ({
  __esModule: true,
  Card: ({ children }) => <div data-testid="mock-card">{children}</div>,
  SLink: ({ children, href }) => <a href={href}>{children}</a>,
  Row: ({ children }) => <div>{children}</div>,
  Thumb: ({ children, className }) => <div data-testid="mock-thumb" className={className}>{children}</div>,
  Title: ({ children }) => <h2>{children}</h2>,
  Description: ({ children }) => <p>{children}</p>,
}));

import Article from './article.jsx';

const mockArticleProps = {
  index: 1,
  category: 'travel',
  path: 'my-trip',
  title: 'My Amazing Trip',
  description: 'A wonderful journey through the mountains.',
  image: {
    src: 'trip.jpg',
    alt: 'Trip Image',
    width: 800,
    height: 600,
  },
  date: '2026-05-04',
  tags: ['travel', 'mountains'],
  linkText: 'Read more details',
};

test('renders article with all provided props', () => {
  render(<Article {...mockArticleProps} />);

  expect(screen.getByText('My Amazing Trip')).toBeInTheDocument();
  expect(screen.getByText('A wonderful journey through the mountains.')).toBeInTheDocument();
  expect(screen.getByTestId('mock-hashtags')).toHaveTextContent('travel, mountains');
  expect(screen.getByTestId('mock-image')).toHaveAttribute('src', 'trip.jpg');
  expect(screen.getAllByTestId('mock-dynamic-component')[0]).toBeInTheDocument();
});

test('renders link with custom text if provided', () => {
  render(<Article {...mockArticleProps} />);
  expect(screen.getByText('Read more details')).toBeInTheDocument();
});

test('renders default link text if not provided', () => {
  const { linkText, ...propsWithoutLinkText } = mockArticleProps;
  render(<Article {...propsWithoutLinkText} />);
  expect(screen.getByText('Read more')).toBeInTheDocument();
});

test('applies priority to image if index is 0', () => {
  render(<Article {...mockArticleProps} index={0} />);
  expect(screen.getByTestId('mock-image')).toHaveAttribute('data-priority', 'true');
});

test('does not apply priority to image if index is not 0', () => {
  render(<Article {...mockArticleProps} index={1} />);
  expect(screen.getByTestId('mock-image')).not.toHaveAttribute('data-priority', 'true');
});

test('renders thumb with correct margin for index 0', () => {
  render(<Article {...mockArticleProps} index={0} />);
  expect(screen.getByTestId('mock-thumb')).toHaveClass('first');
});

test('renders thumb with correct margin for index > 0', () => {
  render(<Article {...mockArticleProps} index={1} />);
  expect(screen.getByTestId('mock-thumb')).not.toHaveClass('first');
});

test('renders image only if provided', () => {
  const { image, ...propsWithoutImage } = mockArticleProps;
  render(<Article {...propsWithoutImage} />);
  expect(screen.queryByTestId('mock-image')).not.toBeInTheDocument();
});

test('constructs correct href for links', () => {
  render(<Article {...mockArticleProps} />);
  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveAttribute('href', '/travel/my-trip');
});
