import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  makeBlurDataURL,
  addBlurDataURLs,
  clearBlurDataURLCache,
} from 'helpers/contentful';

describe('makeBlurDataURL', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearBlurDataURLCache();
  });

  it('returns undefined for non-Contentful URLs', async () => {
    const result = await makeBlurDataURL('https://example.com/image.jpg');
    expect(result).toBeUndefined();
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
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const url = 'https://images.ctfassets.net/123/image.jpg';
    const result = await makeBlurDataURL(url);

    expect(result).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledOnce();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch blur placeholder (status 500):')
    );
    warnSpy.mockRestore();
  });

  it('handles non-OK response gracefully', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

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
    expect(warnSpy).toHaveBeenCalledOnce();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch blur placeholder (status 404):')
    );
    warnSpy.mockRestore();
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
      {
        src: 'https://images.ctfassets.net/123/image.jpg',
        blurDataURL: 'existing',
      },
      { src: 'https://images.ctfassets.net/456/image.jpg' },
    ];

    const result = await addBlurDataURLs(images);

    expect(result).toHaveLength(2);
    expect(result[0].blurDataURL).toBe('existing');
    expect(result[1].blurDataURL).toBe('data:image/jpeg;base64,Ymx1cg==');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('skips non-Contentful URLs', async () => {
    vi.stubGlobal('fetch', vi.fn());

    const images = [
      { src: 'https://example.com/image.jpg' },
      { src: '/local/image.jpg' },
    ];

    const result = await addBlurDataURLs(images);

    expect(result[0].blurDataURL).toBeNull();
    expect(result[1].blurDataURL).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('sets blurDataURL to null when fetch fails', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      })
    );

    const images = [{ src: 'https://images.ctfassets.net/123/image.jpg' }];
    const result = await addBlurDataURLs(images);

    expect(result[0].blurDataURL).toBeNull();
    expect(warnSpy).toHaveBeenCalledOnce();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch blur placeholder (status 503):')
    );
    warnSpy.mockRestore();
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

  it('processes all images (respects concurrency limit)', async () => {
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

  it('uses batch cache to avoid re-fetching on subsequent calls with same images', async () => {
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
    ];

    // First call fetches blur data URLs
    const result1 = await addBlurDataURLs(images);
    expect(fetchCount).toBe(2);
    expect(result1[0].blurDataURL).toBe('data:image/jpeg;base64,Ymx1cg==');

    // Second call with same images should use batch cache
    const result2 = await addBlurDataURLs(images);
    expect(fetchCount).toBe(2); // No additional fetches
    expect(result2[0].blurDataURL).toBe('data:image/jpeg;base64,Ymx1cg==');
  });

  it('does not use batch cache for different image sets', async () => {
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

    const images1 = [
      { src: 'https://images.ctfassets.net/1/image.jpg' },
    ];
    const images2 = [
      { src: 'https://images.ctfassets.net/2/image.jpg' },
    ];

    await addBlurDataURLs(images1);
    expect(fetchCount).toBe(1);

    await addBlurDataURLs(images2);
    expect(fetchCount).toBe(2);
  });
});
