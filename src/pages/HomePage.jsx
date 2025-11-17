import React, { useState } from 'react';
import PhotoGrid from '../components/photos/PhotoGrid.jsx';
import Loader from '../components/common/Loader.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import PhotoDetailModal from '../components/photos/PhotoDetailModal.jsx';
import { usePhotosContext } from '../context/PhotosContext';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import usePrefetchImages from '../hooks/usePrefetchImages';
import usePrefetchOnScroll from '../hooks/usePrefetchOnScroll';

export default function HomePage() {
  const { photos, isLoading, hasMore, error, loadNext } = usePhotosContext();
  const { prefetchUpcoming } = usePrefetchOnScroll(photos, 20, 5);
  // Prefetch visible images
  usePrefetchImages(photos, 8);

  const triggerRef = useInfiniteScroll(() => {
    if (!isLoading && hasMore) {
      loadNext();
      prefetchUpcoming(); // Prefetch upcoming images when scrolling
    }
  }, { rootMargin: '200px' });

  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [selectedPhotoWithThumb, setSelectedPhotoWithThumb] = useState(null);

  const handlePhotoClick = (photoId, photoWithThumb) => {
    setSelectedPhotoId(photoId);
    setSelectedPhotoWithThumb(photoWithThumb);
  };

  React.useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white px-6 py-12 border-b border-gray-200 text-left">
        <h1 className="m-0 text-4xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-3xl">📷</span>
          Picsum Photo Gallery
        </h1>
        <p className="mt-2 text-sm text-gray-600 max-w-md">
          Khám phá những bức ảnh tuyệt đẹp từ Lorem Picsum
        </p>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Danh sách ảnh</h2>
        <p className="mb-5 text-sm text-gray-600">Cuộn xuống để tải thêm ảnh. Nhấp vào ảnh để xem chi tiết.</p>
        <ErrorMessage message={error} />
        <PhotoGrid photos={photos} onPhotoClick={handlePhotoClick} />
        {isLoading && <Loader />}
        <div ref={triggerRef} style={{ height: 1 }} />
        {!hasMore && <div style={{textAlign:'center',padding:20,color:'#6b7280'}}>Không còn ảnh nào</div>}
      </main>

      {selectedPhotoId && (
        <PhotoDetailModal
          selectedPhotoWithThumb={selectedPhotoWithThumb}
          onClose={() => {
            setSelectedPhotoId(null);
            setSelectedPhotoWithThumb(null);
          }}
        />
      )}
    </div>
  );
}
