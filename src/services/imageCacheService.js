// Service for caching fetched images in memory so previews load faster.
/**
 * Image Cache Service
 * Store fetched images in memory to reuse  
 * Use Map to store URL → Blob data
 */

class ImageCacheService {
  constructor() {
    this.cache = new Map();
    this.maxSize = 50; // Maximum 50 images 
  }

  /**
   * Fetch image and save to cache     
   * @param {string} url - Image URL  
   * @returns {Promise<string>} - Data URL that can be used directly in <img src="">  
   */
  async fetchAndCache(url) {
    // If already in cache, return immediately  
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const blob = await response.blob();
      // Convert Blob to Data URL  
      const dataUrl = URL.createObjectURL(blob);
      
      // Save to cache  
      this.cache.set(url, dataUrl);
      
      // If exceeds maxSize, delete oldest image  
      if (this.cache.size > this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        const oldUrl = this.cache.get(firstKey);
        URL.revokeObjectURL(oldUrl); // Release memory  
        this.cache.delete(firstKey);
      }
      
      return dataUrl;
    } catch (err) {
      console.error(`Failed to cache image ${url}:`, err);
      return null;
    }
  }

  /**
   * Get image from cache if available  
   * @param {string} url - Image URL  
   * @returns {string|null} - Data URL or null if not cached   
   */
  getFromCache(url) {
    return this.cache.get(url) || null;
  }

  /**
   * Remove image from cache  
   * @param {string} url - Image URL  
   */
  remove(url) {
    const dataUrl = this.cache.get(url);
    if (dataUrl) {
      URL.revokeObjectURL(dataUrl);
      this.cache.delete(url);
    }
  }

  /**
   * Clear the whole cache  
   */
  clear() {
    this.cache.forEach(dataUrl => {
      URL.revokeObjectURL(dataUrl);
    });
    this.cache.clear();
  }

  /**
   * Get current cache size  
   * @returns {number}
   */
  size() {
    return this.cache.size;
  }
}

// Singleton instance
const imageCacheService = new ImageCacheService();

export default imageCacheService;
