import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  makeBlurDataURL,
  addBlurDataURLs,
  addContentfulParams,
  clearBlurDataURLCache,
} from 'helpers/contentful';

describe('addContentfulParams', () => {
  it('adds w and h params to Contentful URL', () => {
    const url = 'https://images.ctfassets.net/123/image.jpg';
    const result = addContentfulParams(url, 800, 600);
    expect(result).toBe(
      'https://images.ctfassets.net/123/image.jpg?w=800&h=600'
    );
  });

  it('adds w and h params to URL with existing query', () => {
    const url = 'https://images.ctfassets.net/123/image.jpg?token=abc';
    const result = addContentfulParams(url, 800, 600);
    expect(result).toBe(
      'https://images.ctfassets.net/123/image.jpg?token=abc&w=800&h=600'
    );
  });

  it('returns original URL if not Contentful', () => {
    const url = 'https://example.com/image.jpg';
    const result = addContentfulParams(url, 800, 600);
    expect(result).toBe('https://example.com/image.jpg');
  });

  it('returns original URL if missing required params', () => {
    const url = 'https://images.ctfassets.net/123/image.jpg';
    expect(addContentfulParams(url, 0, 600)).toBe(url);
    expect(addContentfulParams(url, 800, 0)).toBe(url);
    expect(addContentfulParams(url, undefined, 600)).toBe(url);
    expect(addContentfulParams(url, 800, undefined)).toBe(url);
  });

  it('handles URL with hash fragment', () => {
    const url = 'https://images.ctfassets.net/123/image.jpg#section';
    const result = addContentfulParams(url, 800, 600);
    expect(result).toBe(
      'https://images.ctfassets.net/123/image.jpg?w=800&h=600#section'
    );
  });
});

describe('makeBlurDataURL', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearBlurDataURLCache();
  });

  it('returns undefined for non-Contentful URLs', () => {
    expect(
      makeBlurDataURL('https://example.com/image.jpg')
    ).resolves.toBeUndefined();
  });

  it('returns undefined for null/empty URL', async () => {
    expect(await makeBlurDataURL(null)).toBeUndefined();
    expect(await makeBlurDataURL('')).toBeUndefined();
  });

  it('generates blur data URL for valid Contentful image', async () => {
    const mockBuffer = Buffer.from('mock-image-data');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: vi.fn().mockResolvedValue(mockBuffer),
        headers: {
          get: () => 'image/jpeg',
        },
      })
    );

    const url = 'https://images.ctfassets.net/123/image.jpg';
    const result = await makeBlurDataURL(url);

    expect(result).toBe('data:image/jpeg;base64,bW9jay1pbWFnZS1kYXRh');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('includes query params in blur URL', async () => {
    const mockBuffer = Buffer.from('test');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: vi.fn().mockResolvedValue(mockBuffer),
        headers: { get: () => 'image/png' },
      })
    );

    const url = 'https://images.ctfassets.net/123/image.jpg?token=abc';
    const result = await makeBlurDataURL(url);

    expect(result).toBe('data:image/png;base64,dGVzdA==');
  });

  it('handles fetch error gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error'))
    );

    const url = 'https://images.ctfassets.net/123/image.jpg';
    const result = await makeBlurDataURL(url);

    expect(result).toBeUndefined();
  });

  it('handles non-OK response gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    const url = 'https://images.ctfassets.net/123/image.jpg';
    const result = await makeBlurDataURL(url);

    expect(result).toBeUndefined();
  });
});

describe('addBlurDataURLs', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearBlurDataURLCache();
  });

  it('adds blurDataURL to Contentful images', async () => {
    const mockBuffer = Buffer.from('blur');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: vi.fn().mockResolvedValue(mockBuffer),
        headers: { get: () => 'image/jpeg' },
      })
    );

    const images = [
      { src: 'https://images.ctfassets.net/123/image1.jpg' },
      { src: 'https://images.ctfassets.net/456/image2.jpg' },
    ];

    const result = await addBlurDataURLs(images);

    expect(result).toHaveLength(2);
    expect(result[0].blurDataURL).toBe('data:image/jpeg;base64,Ymx1cg==');
    expect(result[1].blurDataURL).toBe('data:image/jpeg;base64,Ymx1cg==');
  });

  it('skips images with existing blurDataURL', async () => {
    const images = [
      {
        src: 'https://images.ctfassets.net/123/image.jpg',
        blurDataURL: 'existing',
      },
      { src: 'https://images.ctfassets.net/456/image.jpg' },
    ];

    const result = await addBlurDataURLs(images);

    expect(result).toHaveLength(2);
    expect(result[0].blurDataURL).toBe('existing');
    expect(result[1].blurDataURL).toBeNull();
  });

  it('skips non-Contentful URLs', async () => {
    const images = [
      { src: 'https://images.ctfassets.net/123/image.jpg' },
      { src: 'https://example.com/image.jpg' },
    ];

    const result = await addBlurDataURLs(images);

    expect(result[0].blurDataURL).toBeNull();
    expect(result[1].blurDataURL).toBeNull();
  });

  it('sets blurDataURL to null when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error'))
    );

    const images = [{ src: 'https://images.ctfassets.net/123/image.jpg' }];
    const result = await addBlurDataURLs(images);

    expect(result[0].blurDataURL).toBeNull();
  });

  it('handles nested path for thumbnail in posts', async () => {
    const mockBuffer = Buffer.from('blur');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: vi.fn().mockResolvedValue(mockBuffer),
        headers: { get: () => 'image/jpeg' },
      })
    );

    const posts = [
      {
        id: '1',
        thumbnail: { src: 'https://images.ctfassets.net/123/thumb.jpg' },
      },
      {
        id: '2',
        thumbnail: { src: 'https://images.ctfassets.net/456/thumb.jpg' },
      },
    ];

    const result = await addBlurDataURLs(posts, { path: 'thumbnail' });

    expect(result[0].thumbnail.blurDataURL).toBe(
      'data:image/jpeg;base64,Ymx1cg=='
    );
    expect(result[1].thumbnail.blurDataURL).toBe(
      'data:image/jpeg;base64,Ymx1cg=='
    );
  });

  it('handles nested path when thumbnail is missing', async () => {
    const posts = [{ id: '1' }, { id: '2', thumbnail: null }];

    const result = await addBlurDataURLs(posts, { path: 'thumbnail' });

    expect(result).toHaveLength(2);
    expect(result[0].thumbnail).toBeUndefined();
    expect(result[1].thumbnail).toBeNull();
  });

  it('processes images in parallel', async () => {
    let fetchCount = 0;
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => {
        fetchCount += 1;
        return Promise.resolve({
          ok: true,
          arrayBuffer: vi.fn().mockResolvedValue(Buffer.from('blur')),
          headers: { get: () => 'image/jpeg' },
        });
      })
    );

    const images = [
      { src: 'https://images.ctfassets.net/1/image.jpg' },
      { src: 'https://images.ctfassets.net/2/image.jpg' },
      { src: 'https://images.ctfassets.net/3/image.jpg' },
    ];

    await addBlurDataURLs(images);

    expect(fetchCount).toBe(3);
  });
});
