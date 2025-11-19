// Modal component responsible for displaying enlarged photo details.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ModalImage from './ModalImage';

/**
 * Full screen modal that shows detail info for the selected photo.
 */
const PhotoDetailModal = ({ selectedPhotoWithThumb: photo, onClose }) => {
  const [isImageReady, setIsImageReady] = useState(false);

  // Prepare a safe object so the JSX stays clean.
  const details = useMemo(() => {
    if (!photo) return null;
    return {
      title: photo.filename || `Photo by ${photo.author}`,
      author: photo.author || 'Unknown author',
      description: photo.description?.trim() || 'No description available.',
      downloadUrl: photo.download_url
    };
  }, [photo]);

  // Restart image transition whenever the selected photo changes.
  useEffect(() => {
    setIsImageReady(false);
  }, [photo?.download_url]);

  // Close the modal when the user presses ESC.
  useEffect(() => {
    if (!photo) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose]);

  // Prevent the background from scrolling while the modal is open.
  useEffect(() => {
    if (!photo) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [photo]);

  const downloadUrl = details?.downloadUrl;

  // Close only when the user clicks outside the dialog.
  const handleBackdropClick = useCallback((event) => {
    if (event.target === event.currentTarget) onClose?.();
  }, [onClose]);

  const handleImageReady = useCallback(() => setIsImageReady(true), []);

  const handleOpenOriginal = useCallback(() => {
    if (downloadUrl) window.open(downloadUrl, '_blank', 'noopener');
  }, [downloadUrl]);

  if (!details) return null;

  return (
    <div
      className="photo-detail-modal-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="photo-detail-modal-container"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={details.title}
      >
        <button className="photo-detail-close-btn" onClick={onClose} aria-label="Close">✕</button>
        <div className={`photo-detail-panel ${isImageReady ? 'panel-open' : 'panel-closed'}`}>
          <ModalImage
            src={downloadUrl}
            alt={details.title}
            onLoadComplete={handleImageReady}
          />
          <div className="photo-detail-top">
            <div className="photo-detail-top-left">
              <h2 className="photo-detail-title">{details.title}</h2>
              <p className="photo-detail-author">
                <span className="photo-detail-label">By</span> {details.author}
              </p>
              <p className="photo-detail-description">{details.description}</p>
            </div>
            <div className="photo-detail-top-actions">
              <button
                className="action-btn"
                type="button"
                onClick={handleOpenOriginal}
                disabled={!downloadUrl}
                aria-disabled={!downloadUrl}
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

PhotoDetailModal.propTypes = {
  selectedPhotoWithThumb: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.string,
    filename: PropTypes.string,
    description: PropTypes.string,
    download_url: PropTypes.string
  }),
  onClose: PropTypes.func
};

PhotoDetailModal.defaultProps = {
  selectedPhotoWithThumb: null,
  onClose: undefined
};

export default React.memo(PhotoDetailModal);
