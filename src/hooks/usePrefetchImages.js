import { useEffect, useRef } from 'react';
import imageCacheService from '../services/imageCacheService';

/**
 * Prefetch images for visible and nearby items in viewport
 * Aggressively prefetches to match Pexels-like instant load experience
 * - Caches thumbnails for first 20 visible items
 * - Caches full-size download URLs for first 25 items
 * - Caches metadata for first 30 items
 */
export default function usePrefetchImages(photos, visibleRange = 5) {
  const prefetchedRef = useRef(new Set());

  useEffect(() => {
    if (!photos || photos.length === 0) return;

    // Prefetch thumbnails for visible + extended range (20 items) + cache them
    const thumbRange = Math.min(20, photos.length);
    photos.slice(0, thumbRange).forEach((photo) => {
      const photoKey = `thumb_${photo.id}`;
      if (!prefetchedRef.current.has(photoKey)) {
        prefetchedRef.current.add(photoKey);
        const thumbUrl = `https://picsum.photos/id/${photo.id}/300/200`;
        // Fetch và cache thumbnail
        imageCacheService.fetchAndCache(thumbUrl).catch(() => {});
      }
    });

    // Aggressively prefetch full-size download URLs (25 items) + cache them
    const downloadRange = Math.min(25, photos.length);
    photos.slice(0, downloadRange).forEach((photo) => {
      const downloadKey = `download_${photo.id}`;
      if (!prefetchedRef.current.has(downloadKey)) {
        prefetchedRef.current.add(downloadKey);
        // Fetch và cache full-size image
        imageCacheService.fetchAndCache(photo.download_url).catch(() => {});
      }
    });

    // Prefetch metadata JSON for common clicks (30 items)
    const metaRange = Math.min(30, photos.length);
    photos.slice(0, metaRange).forEach((photo) => {
      const metaKey = `meta_${photo.id}`;
      if (!prefetchedRef.current.has(metaKey)) {
        prefetchedRef.current.add(metaKey);
        fetch(`https://picsum.photos/id/${photo.id}/info`).catch(() => {});
      }
    });
  }, [photos, visibleRange]);

  // Clear prefetch cache when photos reset
  useEffect(() => {
    const cache = prefetchedRef.current;
    return () => {
      cache.clear();
    };
  }, []);
}
