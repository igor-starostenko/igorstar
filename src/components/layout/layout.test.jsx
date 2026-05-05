import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

vi.mock('components/header/header.jsx', () => ({
  default: ({ title }) => <header data-testid="mock-header">{title}</header>,
}));

vi.mock('components/footer/footer.jsx', () => ({
  default: ({ author, social }) => <footer data-testid="mock-footer">{author}</footer>,
}));

vi.mock('../../../site-config.cjs', () => ({
  default: {
    siteTitleShort: 'Test Site',
    author: 'Test Author',
    social: {},
  },
}));

vi.mock('./layout.css.js', () => ({
  __esModule: true,
  Content: ({ children }) => <main data-testid="mock-content">{children}</main>,
}));

import Layout from './layout.jsx';

const mockConfig = {
  siteTitleShort: 'Test Site',
  author: 'Test Author',
  social: {},
};

test('renders header, content, and footer', () => {
  render(
    <Layout config={mockConfig}>
      <div data-testid="child">Hello World</div>
    </Layout>
  );

  expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  expect(screen.getByTestId('mock-content')).toHaveTextContent('Hello World');
  expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
});

test('passes correct props to header', () => {
  render(
    <Layout config={mockConfig}>
      <div>Content</div>
    </Layout>
  );

  expect(screen.getByTestId('mock-header')).toHaveTextContent('Test Site');
});

test('passes correct props to footer', () => {
  render(
    <Layout config={mockConfig}>
      <div>Content</div>
    </Layout>
  );

  expect(screen.getByTestId('mock-footer')).toHaveTextContent('Test Author');
});
