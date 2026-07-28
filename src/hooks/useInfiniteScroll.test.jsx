import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll.jsx';

describe('useInfiniteScroll', () => {
  const mockItems = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  describe('initial render', () => {
    it('should return first batch of items by default (20)', () => {
      const { result } = renderHook(() => useInfiniteScroll(mockItems, 20));

      expect(result.current.items).toHaveLength(20);
    });

    it('should return first batch of items with custom batch size', () => {
      const { result } = renderHook(() => useInfiniteScroll(mockItems, 10));

      expect(result.current.items).toHaveLength(10);
    });

    it('should have hasMore true when total > batchSize', () => {
      const { result } = renderHook(() => useInfiniteScroll(mockItems, 20));

      expect(result.current.hasMore).toBe(true);
    });

    it('should have hasMore false when total <= batchSize', () => {
      const smallItems = mockItems.slice(0, 15);
      const { result } = renderHook(() => useInfiniteScroll(smallItems, 20));

      expect(result.current.hasMore).toBe(false);
    });

    it('should have isLoading false initially', () => {
      const { result } = renderHook(() => useInfiniteScroll(mockItems, 20));

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('loadMore', () => {
    it('should load next batch when loadMore is called', () => {
      const { result } = renderHook(() => useInfiniteScroll(mockItems, 20));

      act(() => {
        result.current.loadMore();
      });

      expect(result.current.items).toHaveLength(40);
    });

    it('should update hasMore correctly after loading', () => {
      const { result } = renderHook(() => useInfiniteScroll(mockItems, 20));

      act(() => {
        result.current.loadMore();
      });

      // Verify we have 40 items and hasMore is still true
      expect(result.current.items).toHaveLength(40);
      expect(result.current.hasMore).toBe(true);

      act(() => {
        result.current.loadMore();
      });

      // Now we have 50 items and hasMore should be false
      expect(result.current.items).toHaveLength(50);
      expect(result.current.hasMore).toBe(false);
    });

    it('should not load more when hasMore is false', () => {
      const smallItems = mockItems.slice(0, 15);
      const { result } = renderHook(() => useInfiniteScroll(smallItems, 20));

      act(() => {
        result.current.loadMore();
      });

      expect(result.current.items).toHaveLength(15);
    });
  });

  describe('reset', () => {
    it('should reset to first batch after loading more', () => {
      const { result } = renderHook(() => useInfiniteScroll(mockItems, 20));

      act(() => {
        result.current.loadMore();
      });

      // Verify we have 40 items
      expect(result.current.items).toHaveLength(40);

      act(() => {
        result.current.reset();
      });

      expect(result.current.items).toHaveLength(20);
    });
  });

  describe('edge cases', () => {
    it('should handle empty array', () => {
      const { result } = renderHook(() => useInfiniteScroll([], 20));

      expect(result.current.items).toHaveLength(0);
      expect(result.current.hasMore).toBe(false);
    });

    it('should handle items array smaller than batch size', () => {
      const smallItems = mockItems.slice(0, 10);
      const { result } = renderHook(() => useInfiniteScroll(smallItems, 20));

      expect(result.current.items).toHaveLength(10);
      expect(result.current.hasMore).toBe(false);
    });

    it('should handle exactly batch size items', () => {
      const exactItems = mockItems.slice(0, 20);
      const { result } = renderHook(() => useInfiniteScroll(exactItems, 20));

      expect(result.current.items).toHaveLength(20);
      expect(result.current.hasMore).toBe(false);
    });
  });

  describe('prop updates', () => {
    it('should reset when allItems changes', () => {
      const { result, rerender } = renderHook(
        ({ items }) => useInfiniteScroll(items, 20),
        { initialProps: { items: mockItems.slice(0, 30) } }
      );

      // Initially have 20 items
      expect(result.current.items).toHaveLength(20);

      act(() => {
        result.current.loadMore();
      });

      // Now have 30 items
      expect(result.current.items).toHaveLength(30);

      // Change to smaller array - should reset to batchSize
      rerender({ items: mockItems.slice(0, 15) });

      expect(result.current.items).toHaveLength(15);
      expect(result.current.hasMore).toBe(false);
    });
  });
});
