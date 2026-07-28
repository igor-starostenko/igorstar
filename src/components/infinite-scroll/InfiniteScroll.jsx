import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = ({ children, hasMore, isLoading, loadMore }) => {
  const sentinelRef = useRef(null);
  const triggeredRef = useRef(false);

  // Reset triggered flag when loading starts
  useEffect(() => {
    if (!isLoading) {
      triggeredRef.current = false;
    }
  }, [isLoading]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry?.isIntersecting &&
          hasMore &&
          !isLoading &&
          !triggeredRef.current
        ) {
          triggeredRef.current = true;
          loadMore();
        }
      },
      { rootMargin: '0px 0px 300px 0px' }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return (
    <>
      {children}

      <div style={{ minHeight: '1px' }}>
        {/* Sentinel for automatic loading */}
        {hasMore && (
          <div
            ref={sentinelRef}
            style={{ height: 1, width: '100%' }}
            aria-hidden="true"
          />
        )}

        {/* Manual fallback button when observer is unavailable or user prefers it */}
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={isLoading}
            style={{
              display: 'block',
              margin: '1rem auto',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: isLoading ? '#ccc' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Loading more...' : 'Load more'}
          </button>
        )}
      </div>
    </>
  );
};

InfiniteScroll.propTypes = {
  children: PropTypes.node.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default InfiniteScroll;
