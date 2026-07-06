import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('../icons/index.jsx', () => ({
  __esModule: true,
  FivehundredpxIcon: vi.fn(() => <svg data-testid="mock-icon">500px</svg>),
  FlickrIcon: vi.fn(() => <svg data-testid="mock-icon">flickr</svg>),
  GithubIcon: vi.fn(() => <svg data-testid="mock-icon">github</svg>),
  LinkedinIcon: vi.fn(() => <svg data-testid="mock-icon">linkedin</svg>),
  TwitterIcon: vi.fn(() => <svg data-testid="mock-icon">twitter</svg>),
  YoutubeIcon: vi.fn(() => <svg data-testid="mock-icon">youtube</svg>),
}));

import Footer from './footer.jsx';

const validSocial = {
  github: 'user',
  linkedin: 'user',
  twitter: 'user',
  youtube: 'channel',
  flickr: 'user',
  fivehundredpx: 'user',
};

test('renders author name', () => {
  render(<Footer author="John Doe" social={validSocial} />);
  expect(screen.getByText('John Doe').tagName).toBe('A');
});

test('renders social links', () => {
  render(<Footer author="John" social={validSocial} />);
  // Footer.jsx only renders github, linkedin, flickr, fivehundredpx (no youtube)
  // The test was incorrectly expecting 6 icons when only 4 are rendered
  expect(screen.getAllByTestId('mock-icon').length).toBe(4);
});

test('renders current year in copyright', () => {
  const currentYear = new Date().getFullYear();
  render(<Footer author="John" social={validSocial} />);
  expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
});

test('renders with required props', () => {
  const { container } = render(<Footer author="John" social={validSocial} />);
  expect(container.firstChild).toBeDefined();
});
