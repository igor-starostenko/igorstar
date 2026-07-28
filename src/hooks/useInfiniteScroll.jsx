import { useState, useMemo, useCallback } from 'react';

/**
 * useInfiniteScroll
 *
 * Provides infinite scrolling functionality with pre-fetched data.
 * Uses visibleCount as the single source of truth, deriving items and hasMore
 * from it to avoid stale state when allItems changes.
 *
 * @param {Array} allItems - All items fetched at build time
 * @param {number} batchSize - Number of items to show per scroll (default: 20)
 * @returns {Object} - Items to render, hasMore flag, loadMore function
 */
export const useInfiniteScroll = (allItems = [], batchSize = 20) => {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [isLoading, setIsLoading] = useState(false);

  // Derive items from visible count to avoid stale state
  const items = useMemo(
    () => allItems.slice(0, visibleCount),
    [allItems, visibleCount]
  );

  // hasMore is derived from count and total length
  const hasMore = visibleCount < allItems.length;

  // loadMore increments count by batchSize (or to end of array)
  const loadMore = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    setVisibleCount((count) => {
      const newCount = Math.min(count + batchSize, allItems.length);
      setIsLoading(false);
      return newCount;
    });
  }, [batchSize, allItems.length, isLoading]);

  // reset to initial batch size
  const reset = useCallback(() => {
    setVisibleCount(batchSize);
    setIsLoading(false);
  }, [batchSize]);

  return {
    items,
    hasMore,
    isLoading,
    loadMore,
    reset,
  };
};
