import { test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href, title }) => <a href={href} title={title}>{children}</a>,
}));

vi.mock('components/icons/flickrIcon.jsx', () => ({
  default: () => <svg data-testid="mock-flickr-icon">icon</svg>,
}));

vi.mock('components/image/baseImage.jsx', () => ({
  default: ({ src, alt, ...rest }) => <img data-testid="mock-base-image" src={src} alt={alt} {...rest} />,
}));

vi.mock('./image.css.js', () => ({
  ImageContainer: ({ children }) => <div data-testid="mock-image-container">{children}</div>,
  ImageFrame: ({ children }) => <div data-testid="mock-image-frame">{children}</div>,
  ImageHeader: ({ children }) => <div data-testid="mock-image-header">{children}</div>,
  ImageFooter: ({ children }) => <div data-testid="mock-image-footer">{children}</div>,
  ImageTitle: ({ children }) => <span data-testid="mock-image-title">{children}</span>,
  ImageCopyright: ({ children }) => <span data-testid="mock-image-copyright">{children}</span>,
}));

vi.mock('xml2js', () => ({
  parseString: (xml, options, callback) => {
    // Mock successful parsing - always pass a valid object
    if (xml.includes('error')) {
      // Simulate an error case
      callback(new Error('Parse error'), null);
    } else if (xml.includes('incomplete')) {
      // Simulate missing required fields
      callback(null, { a: { href: 'https://flickr.com', title: 'Test' } });
    } else {
      // Mock successful parsing
      callback(null, {
        a: {
          href: 'https://flickr.com/photo/123',
          title: 'Test Photo',
          img: {
            src: '/test-photo.jpg',
            width: 1920,
            height: 1080,
          },
        },
      });
    }
  },
}));

import FlickrImage from './flickrImage.jsx';

test('renders Flickr image with valid XML', () => {
  const mockXml = `<xml><a href="https://flickr.com/photo/123" title="Test Photo"><img src="/test-photo.jpg" width="1920" height="1080"/></a></xml>`;

  render(<FlickrImage xml={mockXml} />);

  expect(screen.getByText('Test Photo')).toBeInTheDocument();
});

test('renders with isRaw=true', () => {
  const mockXml = '<xml>raw content</xml>';

  render(<FlickrImage xml={mockXml} isRaw={true} />);

  expect(screen.getByText('raw content')).toBeInTheDocument();
});

test('returns empty span when XML parsing fails', async () => {
  const mockXml = '<xml>error</xml>';

  render(<FlickrImage xml={mockXml} />);

  // Should return empty span when callback receives error
  await waitFor(() => {
    expect(document.body.innerHTML).toBe('<div><span></span></div>');
  });
});

test('returns empty span when required fields are missing', async () => {
  const mockXml = '<xml>incomplete</xml>';

  render(<FlickrImage xml={mockXml} />);

  // Should return empty span when required fields are missing
  await waitFor(() => {
    expect(document.body.innerHTML).toBe('<div><span></span></div>');
  });
});

test('renders image with backupSrc prop', () => {
  const mockXml = `<xml><a href="https://flickr.com/photo/123" title="Test Photo"><img src="/test-photo.jpg" width="1920" height="1080"/></a></xml>`;

  render(<FlickrImage xml={mockXml} backupSrc="/backup.jpg" />);

  expect(screen.getByText('Test Photo')).toBeInTheDocument();
});
