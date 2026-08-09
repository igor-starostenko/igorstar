import { useEffect, useRef } from 'react';

/**
 * Custom hook that observes a sentinel element and calls `onIntersect`
 * when it becomes visible.
 *
 * Uses a ref to hold the latest `onIntersect` callback so that the
 * IntersectionObserver is created only once (not recreated when the
 * callback identity changes), preventing unnecessary teardown/recreate
 * cycles during re-renders.
 *
 * @param {React.RefObject} elementRef - Ref to the sentinel element to observe
 * @param {Function} onIntersect - Callback invoked with the first IntersectionEntry
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Intersection threshold (default: 0.1)
 * @param {string} options.rootMargin - Root margin (default: '200px 0px 200px 0px')
 */
const useIntersectionObserver = (elementRef, onIntersect, options = {}) => {
  const { threshold = 0.1, rootMargin = '200px 0px 200px 0px' } = options;

  // Keep the latest callback in a ref so the observer callback always
  // invokes the most recent onIntersect without recreating the observer.
  const latestCallback = useRef(onIntersect);
  useEffect(() => {
    latestCallback.current = onIntersect;
  });

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          latestCallback.current(entry);
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
  }, [elementRef, threshold, rootMargin]);
};

export default useIntersectionObserver;
