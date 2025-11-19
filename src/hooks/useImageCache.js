// Hook that provides helpers for caching and retrieving images.
import { useCallback } from 'react';
import imageCacheService from '../services/imageCacheService';

/**
 * Hook to fetch and cache images
 * Automatically clear cache when component unmount
 */
export default function useImageCache() {
  // Fetch and cache image
  const prefetchImage = useCallback(async (url) => {
    if (!url) return null;
    return await imageCacheService.fetchAndCache(url);
  }, []);

  // Get image from cache 
  const getCachedImage = useCallback((url) => {
    if (!url) return null;
    return imageCacheService.getFromCache(url);
  }, []);

  // Remove image from cache  
  const removeFromCache = useCallback((url) => {
    imageCacheService.remove(url);
  }, []);

  // Clear the whole cache  
  const clearCache = useCallback(() => {
    imageCacheService.clear();
  }, []);

  return {
    prefetchImage,    // Fetch and cache image  
    getCachedImage,   // Get image from cache
    removeFromCache,  // Remove image from cache
    clearCache,       // Clear the whole cache
  };
}
