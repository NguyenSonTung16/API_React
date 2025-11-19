// Hook exposing a ref that triggers when intersecting the viewport.
import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(callback, options = {}) {
  const observerRef = useRef();
  const nodeRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) callback();
      });
    }, options);

    const current = observerRef.current;
    const node = nodeRef.current;
    if (node) current.observe(node);
    return () => {
      if (node) current.unobserve(node);
      current.disconnect();
    };
  }, [callback, options]);

  return nodeRef;
}
