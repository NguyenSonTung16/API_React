import React from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoItem from './PhotoItem.jsx';

export default function PhotoGrid({ photos, onPhotoClick }) {
  const navigate = useNavigate();
  
  if (!photos || photos.length === 0) return <div style={{padding:20,textAlign:'center'}}>No photos</div>;
  
  const handlePhotoClick = (photo) => {
    const photoWithThumb = {
      ...photo,
      thumb: `https://picsum.photos/id/${photo.id}/300/200`
    };
    // Lưu vị trí cuộn hiện tại trước khi chuyển trang
    sessionStorage.setItem('scrollPosition', window.scrollY);
    onPhotoClick?.(photo.id, photoWithThumb);
    // Navigate to photo detail page with basic photo data in route state
    navigate(`/photos/${photo.id}`, { state: { basicPhoto: photoWithThumb } });
  };

  return (
    <section className="photo-grid grid gap-6 m-0 p-0" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
      {photos.map((p) => (
        <PhotoItem key={p.id} photo={p} onClick={() => handlePhotoClick(p)} />
      ))}
    </section>
  );
}
