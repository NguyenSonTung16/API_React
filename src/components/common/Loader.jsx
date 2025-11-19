// Simple text-based loading indicator shared across screens.
import React from 'react';

export default function Loader() {
  return (
    <div style={{ padding: 16, textAlign: 'center' }}>
      <div className="loader" aria-hidden>
        Loading...
      </div>
    </div>
  );
}
