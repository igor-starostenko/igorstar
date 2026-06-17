import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }) => (
    <div data-testid="mock-animate">{children}</div>
  ),
}));

vi.mock('global.css.js', () => ({
  default: () => <style data-testid="mock-global-style" />,
}));

const MockComponent = () => <div data-testid="test-component">Content</div>;

import MyApp from 'pages/_app.jsx';

test('renders children within AnimatePresence and GlobalStyle', () => {
  const mockPageProps = { foo: 'bar' };
  render(
    <MyApp
      Component={MockComponent}
      pageProps={mockPageProps}
      router={{ route: '/test' }}
    />
  );

  expect(screen.getByTestId('mock-animate')).toBeInTheDocument();
  expect(screen.getByTestId('test-component')).toHaveTextContent('Content');
});

test('renders multiple pages with different routes', () => {
  const mockPageProps = { foo: 'bar' };
  render(
    <MyApp
      Component={MockComponent}
      pageProps={mockPageProps}
      router={{ route: '/another' }}
    />
  );

  expect(screen.getByTestId('mock-animate')).toBeInTheDocument();
});
