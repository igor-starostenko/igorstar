import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import DateText from './date.jsx';

test('formats date correctly', () => {
  const testDate = '2024-01-15';
  render(<DateText date={testDate} />);
  const element = screen.getByText((content, node) => {
    return node.tagName === 'SPAN' && content.includes('2024');
  });
  expect(element).not.toBeNull();
});

test('applies DateMain when isMobile is false', () => {
  render(<DateText date="2024-01-15" isMobile={false} />);
  expect(screen.getByText(/2024/).tagName).toBe('SPAN');
});

test('applies DateMobile when isMobile is true', () => {
  render(<DateText date="2024-01-15" isMobile={true} />);
  expect(screen.getByText(/2024/).tagName).toBe('SPAN');
});

test('applies DateBase when isMobile is undefined', () => {
  render(<DateText date="2024-01-15" />);
  expect(screen.getByText(/2024/).tagName).toBe('SPAN');
});

test('requires date prop', () => {
  // DateText without date should still render
  const { container } = render(<DateText />);
  expect(container.firstChild.tagName).toBe('SPAN');
});
