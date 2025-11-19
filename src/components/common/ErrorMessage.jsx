// Displays a reusable red error message block when text is provided.
import React from 'react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div style={{ color: '#b91c1c', padding: 12, textAlign: 'center' }}>
      {message}
    </div>
  );
}
