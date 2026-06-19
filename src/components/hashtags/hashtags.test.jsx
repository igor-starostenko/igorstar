import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Hashtags from './hashtags.jsx';

test('renders hashtags correctly', () => {
  const tags = ['tag1', 'tag2', 'tag3'];
  render(<Hashtags tags={tags} />);
  expect(screen.getAllByTestId(/Tag/).length).toBe(3);
});

test('applies isSmall prop', () => {
  const tags = ['test'];
  render(<Hashtags tags={tags} isSmall />);
  expect(screen.getAllByTestId(/Tag/).length).toBe(1);
});

test('handles empty tags array', () => {
  const { container } = render(<Hashtags tags={[]} />);
  expect(container.children.length).toBe(0);
});

test('prefixes tag with hash symbol', () => {
  render(<Hashtags tags={['react']} />);
  expect(screen.getByText('#react')).toBeInTheDocument();
});
