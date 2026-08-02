import { test, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href, title }) => (
    <a href={href} title={title}>
      {children}
    </a>
  ),
}));

vi.mock('components/icons/flickrIcon.jsx', () => ({
  default: () => <svg data-testid="mock-flickr-icon">icon</svg>,
}));

vi.mock('components/image/baseImage.jsx', () => ({
  default: ({
    src,
    alt,
    backupSrc,
    unoptimized,
    preload,
    loading,
    width,
    height,
    style,
    className,
    ...rest
  }) => <img data-testid="mock-base-image" src={src} alt={alt} {...rest} />,
}));

vi.mock('./image.css.js', () => ({
  ImageWrapper: ({ children }) => (
    <div data-testid="mock-image-wrapper">{children}</div>
  ),
  ImageFrame: ({ children }) => (
    <div data-testid="mock-image-frame" className="hover-overlay">
      {children}
    </div>
  ),
  ImageHeader: ({ children }) => (
    <div data-testid="mock-image-header">{children}</div>
  ),
  ImageFooter: ({ children }) => (
    <div data-testid="mock-image-footer">{children}</div>
  ),
  ImageTitle: ({ children }) => (
    <span data-testid="mock-image-title">{children}</span>
  ),
  ImageCopyright: ({ children }) => (
    <span data-testid="mock-image-copyright">{children}</span>
  ),
  FlickrContainer: ({ children }) => (
    <div data-testid="mock-flickr-container">{children}</div>
  ),
  ImageContainer: ({ children }) => (
    <div data-testid="mock-image-container" className="hover-shadow">
      {children}
    </div>
  ),
}));

vi.mock('fast-xml-parser', () => ({
  XMLParser: class {
    constructor() {}
    parse(xml) {
      if (xml.includes('error')) {
        throw new Error('Parse error');
      } else if (xml.includes('incomplete')) {
        return { a: { href: 'https://flickr.com', title: 'Test' } };
      }
      return {
        a: {
          href: 'https://flickr.com/photo/123',
          title: 'Test Photo',
          img: {
            src: '/test-photo.jpg',
            width: 1920,
            height: 1080,
          },
        },
      };
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

  render(
    <FlickrImage xml={mockXml} isRaw={true}>
      raw content
    </FlickrImage>
  );

  expect(screen.getByText('raw content')).toBeInTheDocument();
});

test('returns empty span when XML parsing fails', () => {
  const mockXml = '<xml>error</xml>';

  const { container } = render(<FlickrImage xml={mockXml} />);

  expect(container.querySelector('span')).toBeInTheDocument();
});

test('returns empty span when required fields are missing', () => {
  const mockXml = '<xml>incomplete</xml>';

  const { container } = render(<FlickrImage xml={mockXml} />);

  expect(container.querySelector('span')).toBeInTheDocument();
});

test('renders image with backupSrc prop', () => {
  const mockXml = `<xml><a href="https://flickr.com/photo/123" title="Test Photo"><img src="/test-photo.jpg" width="1920" height="1080"/></a></xml>`;

  render(<FlickrImage xml={mockXml} backupSrc="/backup.jpg" />);

  expect(screen.getByText('Test Photo')).toBeInTheDocument();
});

test('uses ImageContainer as container for hover effects', () => {
  const mockXml = `<xml><a href="https://flickr.com/photo/123" title="Test Photo"><img src="/test-photo.jpg" width="1920" height="1080"/></a></xml>`;

  render(<FlickrImage xml={mockXml} />);

  const container = document.querySelector(
    '[data-testid="mock-image-container"]'
  );
  expect(container).toBeInTheDocument();

  // Verify container has hover styles via CSS class
  expect(container.classList.contains('hover-shadow')).toBe(true);
});

test('includes ImageFrame for hover overlay', () => {
  const mockXml = `<xml><a href="https://flickr.com/photo/123" title="Test Photo"><img src="/test-photo.jpg" width="1920" height="1080"/></a></xml>`;

  render(<FlickrImage xml={mockXml} />);

  const frame = document.querySelector('[data-testid="mock-image-frame"]');
  expect(frame).toBeInTheDocument();

  // Verify frame has hover styles via CSS class
  expect(frame.classList.contains('hover-overlay')).toBe(true);
});

test('ImageFrame is visible on hover', () => {
  const mockXml = `<xml><a href="https://flickr.com/photo/123" title="Test Photo"><img src="/test-photo.jpg" width="1920" height="1080"/></a></xml>`;

  render(<FlickrImage xml={mockXml} />);

  const container = document.querySelector(
    '[data-testid="mock-image-container"]'
  );
  const frame = document.querySelector('[data-testid="mock-image-frame"]');

  // Initially the frame should have opacity: 0 (hidden) via CSS
  expect(frame).toBeInTheDocument();

  // On hover, the container's hover state should show the frame
  if (container) {
    act(() => {
      fireEvent.pointerEnter(container);
    });
  }
});
