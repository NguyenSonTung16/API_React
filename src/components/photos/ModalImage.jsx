// Reusable <img> wrapper that handles loading state for the modal.
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Simple wrapper around image to provide loading feedback and reuse styles.
 */
const ModalImage = ({
  src,
  alt,
  className = 'photo-detail-image fit',
  wrapperClassName = 'photo-detail-image-wrapper centered',
  style,
  onLoadComplete
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  // Mark the image as ready no matter if it succeeds or fails.
  const handleReady = useCallback(() => {
    setHasLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  return (
    <div className={wrapperClassName}>
      <img
        src={src}
        alt={alt}
        className={`${className} ${hasLoaded ? 'loaded' : 'loading'}`.trim()}
        onLoad={handleReady}
        onError={handleReady}
        loading="eager"
        aria-busy={!hasLoaded}
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          ...style
        }}
      />
      {!hasLoaded && (
        <div className="photo-detail-image-skeleton" aria-hidden="true" />
      )}
    </div>
  );
};

ModalImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  style: PropTypes.object,
  onLoadComplete: PropTypes.func
};

ModalImage.defaultProps = {
  alt: 'Selected photo',
  className: 'photo-detail-image fit',
  wrapperClassName: 'photo-detail-image-wrapper centered',
  style: undefined,
  onLoadComplete: undefined
};

export default React.memo(ModalImage);

