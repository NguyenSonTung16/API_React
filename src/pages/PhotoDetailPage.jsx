import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchPhotoDetails } from '../api/picsumApi';
import Loader from '../components/common/Loader.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';

export default function PhotoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // If caller navigated here from the grid, they can pass the basic photo
  // in route state (to allow instant render). Use it as initial value.
  const initialBasic = location.state?.basicPhoto ?? null;

  const [photo, setPhoto] = useState(initialBasic);
  const [loading, setLoading] = useState(initialBasic ? false : true);
  const [error, setError] = useState(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [panelAnimating, setPanelAnimating] = useState(true);

  // Load current photo details
  useEffect(() => {
    let mounted = true;
    // Only show global loader if we don't already have basic data
    if (!initialBasic) setLoading(true);
    setError(null);
    setImageLoaded(false);

    // Fetch detailed info in background; update when ready.
    fetchPhotoDetails(id)
      .then((data) => { if (mounted) setPhoto(data); })
      .catch((err) => { if (mounted) setError(err.message || 'Error loading photo'); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => (mounted = false);
  }, [id, initialBasic]);

  // Trigger panel animation when image loads
  useEffect(() => {
    if (imageLoaded) {
      setPanelAnimating(false);
    }
  }, [imageLoaded]);

  // (Removed loading all photos here — not used in this page)

  const handleClose = () => {
    navigate('/photos');
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!photo) return <div style={{ padding: 20 }}>Photo not found</div>;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-5 photo-detail-modal-overlay" onClick={handleClose}>
      <div className="relative flex items-stretch gap-10 max-w-7xl w-full max-h-screen bg-transparent photo-detail-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="
    absolute top-12 sm:top-5 right-5 
    w-10 h-10 
    bg-red-700 sm:bg-white/10
    hover:bg-red-500/80 sm:hover:bg-white/20
    border-0 text-white text-2xl cursor-pointer rounded 
    transition-colors duration-200 flex items-center justify-center z-10
  "
          onClick={handleClose}
          aria-label="Close"
        >✕</button>

        <div className={`w-4/5 mx-auto bg-white rounded-lg p-7 flex flex-col gap-5 items-center photo-detail-panel ${panelAnimating ? 'panel-opening' : 'panel-open'}`}>
          {/* Top info area (title, author, description) */}
          <div className="w-full flex justify-between items-start gap-4">
            <div className="flex-1">
              <h2 className="m-0 mb-4 text-xl font-bold text-gray-900 leading-relaxed">{photo.filename || `Photo by ${photo.author}`}</h2>
              <p className="m-0 mb-4 text-base text-gray-700"><span className="font-semibold text-gray-600">By</span> {photo.author}</p>
              <p className="my-4 text-sm text-gray-600 leading-relaxed">{photo.description || 'No description available.'}</p>
            </div>
            <div className="flex-shrink-0">
              <button
                className="inline-block px-3 py-2 ml-3 bg-gray-900 text-white border-0 rounded transition-all duration-150 cursor-pointer text-xs hover:bg-slate-900"
                onClick={() => window.open(photo.download_url, '_blank', 'noopener')}
                title="Open original in new tab"
              >
                View original
              </button>

              {/* full-size toggle removed; image will always fit the modal */}
            </div>
          </div>

          {/* Image centered with container wrapper for synchronized animation */}
          <div className="flex-1 min-w-0 w-full flex items-center justify-center max-h-screen overflow-hidden relative image-container">
            {!imageLoaded && (
              <div className="image-loader">
                <div className="image-loader-spinner"></div>
                <div className="image-loader-text">Loading...</div>
              </div>
            )}
            <img
              src={photo.download_url}
              alt={photo.author}
              className={`w-auto h-auto max-w-full max-h-screen object-contain rounded-lg transition-all ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
