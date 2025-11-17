import React, { useEffect, useState } from 'react';

const PhotoDetailModal = ({ selectedPhotoWithThumb, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // reset loading state whenever the selected photo changes
    setImageLoaded(false);
  }, [selectedPhotoWithThumb?.download_url]);

  if (!selectedPhotoWithThumb) return null;

  return (
    <div className="photo-detail-modal-overlay" onClick={onClose}>
      <div className="photo-detail-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="photo-detail-close-btn" onClick={onClose} aria-label="Close">✕</button>
        <div className={`photo-detail-panel ${imageLoaded ? 'panel-open' : 'panel-closed'}`}>
          <div className="photo-detail-image-wrapper centered">
            <img
              src={selectedPhotoWithThumb.download_url}
              alt={selectedPhotoWithThumb.author}
              className={`photo-detail-image fit ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              loading="eager"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="photo-detail-top">
            <div className="photo-detail-top-left">
              <h2 className="photo-detail-title">{selectedPhotoWithThumb.filename || `Photo by ${selectedPhotoWithThumb.author}`}</h2>
              <p className="photo-detail-author"><span className="photo-detail-label">By</span> {selectedPhotoWithThumb.author}</p>
              <p className="photo-detail-description">{selectedPhotoWithThumb.description || 'No description available.'}</p>
            </div>
            <div className="photo-detail-top-actions">
              <button
                className="action-btn"
                onClick={() => window.open(selectedPhotoWithThumb.download_url, '_blank', 'noopener')}
              >
                View Original
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PhotoDetailModal);
