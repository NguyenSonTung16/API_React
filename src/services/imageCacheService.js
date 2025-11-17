/**
 * Image Cache Service
 * Lưu trữ ảnh đã fetch vào memory để tái sử dụng
 * Sử dụng Map để lưu URL → Blob dữ liệu
 */

class ImageCacheService {
  constructor() {
    this.cache = new Map();
    this.maxSize = 50; // Tối đa 50 ảnh
  }

  /**
   * Fetch ảnh và lưu vào cache
   * @param {string} url - URL ảnh
   * @returns {Promise<string>} - Data URL có thể dùng trực tiếp trong <img src="">
   */
  async fetchAndCache(url) {
    // Nếu đã có trong cache, trả về ngay
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const blob = await response.blob();
      // Chuyển Blob thành Data URL
      const dataUrl = URL.createObjectURL(blob);
      
      // Lưu vào cache
      this.cache.set(url, dataUrl);
      
      // Nếu vượt quá maxSize, xóa ảnh cũ nhất
      if (this.cache.size > this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        const oldUrl = this.cache.get(firstKey);
        URL.revokeObjectURL(oldUrl); // Giải phóng memory
        this.cache.delete(firstKey);
      }
      
      return dataUrl;
    } catch (err) {
      console.error(`Failed to cache image ${url}:`, err);
      return null;
    }
  }

  /**
   * Lấy ảnh từ cache nếu có
   * @param {string} url - URL ảnh
   * @returns {string|null} - Data URL hoặc null nếu chưa cache
   */
  getFromCache(url) {
    return this.cache.get(url) || null;
  }

  /**
   * Xóa một ảnh khỏi cache
   * @param {string} url - URL ảnh
   */
  remove(url) {
    const dataUrl = this.cache.get(url);
    if (dataUrl) {
      URL.revokeObjectURL(dataUrl);
      this.cache.delete(url);
    }
  }

  /**
   * Xóa toàn bộ cache
   */
  clear() {
    this.cache.forEach(dataUrl => {
      URL.revokeObjectURL(dataUrl);
    });
    this.cache.clear();
  }

  /**
   * Lấy kích thước cache hiện tại
   * @returns {number}
   */
  size() {
    return this.cache.size;
  }
}

// Singleton instance
const imageCacheService = new ImageCacheService();

export default imageCacheService;
