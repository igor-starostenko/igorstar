 
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children, style }) => (
    <div data-testid="mock-box" style={style}>
      {children}
    </div>
  ),
}));

vi.mock('components/selfie/selfie.jsx', () => ({
  default: ({ src, alt }) => (
    <img data-testid="mock-selfie" src={src} alt={alt} />
  ),
}));

vi.mock('components/head/head.jsx', () => ({
  default: ({ pageTitle }) => (
    <title data-testid="mock-head">{pageTitle}</title>
  ),
}));

vi.mock('@contentful/rich-text-react-renderer', () => ({
  documentToReactComponents: (_node) => (
    <div data-testid="mock-rich-text">About content</div>
  ),
}));

import About from 'pages/about.jsx';

test('renders About page with content', () => {
  const mockProps = {
    page: { title: 'About', content: {} },
  };

  render(<About {...mockProps} />);

  expect(screen.getByText('About content')).toBeInTheDocument();
});

test('renders About with empty page object', () => {
  const mockProps = { page: {} };

  expect(() => render(<About {...mockProps} />)).not.toThrow();
});
