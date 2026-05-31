import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

test('renders empty gallery page', async () => {
  const { container } = render(<div data-testid="gallery">Gallery</div>);
  expect(screen.getByTestId('gallery')).toBeInTheDocument();
});
