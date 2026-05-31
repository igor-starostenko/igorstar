import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('components/layout/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('components/box/box.jsx', () => ({
  default: ({ children }) => <div data-testid="mock-box">{children}</div>,
}));

import NotFound from 'pages/404.jsx';

test('renders Not Found page with message', () => {
  render(<NotFound />);

  expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
  expect(screen.getByText('Not found.')).toBeInTheDocument();
});
