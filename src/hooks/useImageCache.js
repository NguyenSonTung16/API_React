import { useCallback } from 'react';
import imageCacheService from '../services/imageCacheService';

/**
 * Hook để fetch và cache ảnh
 * Tự động giải phóng cache khi component unmount
 */
export default function useImageCache() {
  // Fetch ảnh và lưu vào cache
  const prefetchImage = useCallback(async (url) => {
    if (!url) return null;
    return await imageCacheService.fetchAndCache(url);
  }, []);

  // Lấy ảnh từ cache
  const getCachedImage = useCallback((url) => {
    if (!url) return null;
    return imageCacheService.getFromCache(url);
  }, []);

  // Xóa ảnh khỏi cache
  const removeFromCache = useCallback((url) => {
    imageCacheService.remove(url);
  }, []);

  // Xóa toàn bộ cache
  const clearCache = useCallback(() => {
    imageCacheService.clear();
  }, []);

  return {
    prefetchImage,    // Fetch và cache ảnh
    getCachedImage,   // Lấy ảnh từ cache
    removeFromCache,  // Xóa một ảnh
    clearCache,       // Xóa tất cả
  };
}
