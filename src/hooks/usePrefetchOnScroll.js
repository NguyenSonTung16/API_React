// Hook that starts prefetching thumbnails when the user nears the list end.
import { useCallback, useRef } from 'react';

/**
 * Prefetch images for upcoming items when scroll approaches the end
 * Triggers prefetch when user scrolls within threshold distance from end
 */
export default function usePrefetchOnScroll(allPhotos, currentVisibleCount = 20, threshold = 5) {
  const prefetchedCountRef = useRef(currentVisibleCount);

  const prefetchUpcoming = useCallback(() => {
    // Prefetch next batch of images when approaching the end
    const nextBatch = Math.min(currentVisibleCount + threshold * 2, allPhotos.length);
    
    for (let i = prefetchedCountRef.current; i < nextBatch; i++) {
      const photo = allPhotos[i];
      if (photo) {
        const img = new Image();
        img.src = `https://picsum.photos/id/${photo.id}/300/200`;
      }
    }
    
    prefetchedCountRef.current = nextBatch;
  }, [allPhotos, currentVisibleCount, threshold]);

  return { prefetchUpcoming, resetPrefetch: () => { prefetchedCountRef.current = currentVisibleCount; } };
}
