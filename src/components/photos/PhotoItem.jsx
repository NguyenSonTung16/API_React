import React from 'react';

/**
 * Component hiển thị một ảnh trong danh sách
 * @param {Object} photo - Thông tin ảnh
 * @param {number} photo.id - ID ảnh
 * @param {string} photo.author - Tên tác giả
 * @param {Function} onClick - Callback khi click ảnh
 */
export default function PhotoItem({ photo, onClick }) {
  const thumb = `https://picsum.photos/id/${photo.id}/300/200`;
  
  return (
    <div
      className="photo-item-link group block no-underline text-current transition-transform duration-300 h-full cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      aria-pressed={false}
    >
      <article className="photo-item bg-white rounded-xl overflow-hidden shadow-sm transition-shadow duration-300 h-full flex flex-col transform group-hover:-translate-y-1">
        <div className="photo-item-image-container relative w-full aspect-square overflow-hidden bg-gray-200">
          <img 
            src={thumb} 
            alt={photo.author}
            className="photo-item-image w-full h-full object-cover transition-transform duration-300 block transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="photo-item-overlay absolute inset-0 bg-black/0 transition-colors duration-300 pointer-events-none group-hover:bg-black/30"></div>
        </div>
        <div className="photo-meta p-4 bg-white flex-1 flex flex-col justify-center">
          <p className="photo-author text-sm font-medium text-gray-700 truncate">By {photo.author}</p>
          <p className="photo-id mt-1 text-xs text-gray-400">ID: {photo.id}</p>
        </div>
      </article>
    </div>
  );
}
