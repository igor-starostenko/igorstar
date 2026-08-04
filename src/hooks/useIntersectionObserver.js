import { useLayoutEffect } from 'react';

/**
 * Custom hook that observes a sentinel element and calls `onIntersect`
 * when it becomes visible.
 *
 * @param {React.RefObject} elementRef - Ref to the sentinel element to observe
 * @param {Function} onIntersect - Callback invoked with the first IntersectionObserverEntry
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Intersection threshold (default: 0.1)
 * @param {string} options.rootMargin - Root margin (default: '200px 0px 200px 0px')
 */
const useIntersectionObserver = (elementRef, onIntersect, options = {}) => {
  const { threshold = 0.1, rootMargin = '200px 0px 200px 0px' } = options;

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onIntersect(entry);
        }
      },
      { threshold, rootMargin }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [elementRef, onIntersect, threshold, rootMargin]);
};

export default useIntersectionObserver;