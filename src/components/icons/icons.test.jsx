import { test, expect } from 'vitest';
import { render } from '@testing-library/react';

// Import the actual icon components
import {
  FivehundredpxIcon,
  FlickrIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from './index.jsx';

test('renders FivehundredpxIcon', () => {
  const { container } = render(<FivehundredpxIcon width="24" />);
  expect(container.firstChild.tagName).toBe('svg');
});

test('renders FlickrIcon', () => {
  const { container } = render(<FlickrIcon width="24" />);
  expect(container.firstChild.tagName).toBe('svg');
});

test('renders GithubIcon with isDark=false (default)', () => {
  const { container } = render(<GithubIcon width="24" />);
  expect(container.firstChild.tagName).toBe('svg');
});

test('renders GithubIcon with isDark=true', () => {
  const { container } = render(<GithubIcon width="24" isDark={true} />);
  expect(container.firstChild.tagName).toBe('svg');
});

test('renders LinkedinIcon', () => {
  const { container } = render(<LinkedinIcon width="24" />);
  expect(container.firstChild.tagName).toBe('svg');
});

test('renders TwitterIcon', () => {
  const { container } = render(<TwitterIcon width="24" />);
  expect(container.firstChild.tagName).toBe('svg');
});

test('renders YoutubeIcon', () => {
  const { container } = render(<YoutubeIcon width="24" />);
  expect(container.firstChild.tagName).toBe('svg');
});
