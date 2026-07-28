import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = ({ children, hasMore, isLoading, loadMore }) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasMore && !isLoading) {
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
      <div
        ref={sentinelRef}
        style={{ height: 1, width: '100%' }}
        aria-hidden="true"
      />
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
