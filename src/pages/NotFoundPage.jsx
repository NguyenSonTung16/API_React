// Simple fallback page for unknown routes.
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{padding:20,textAlign:'center'}}>
      <h2>404 — Not Found</h2>
      <p>
        <Link to="/photos">Go to Home</Link>
      </p>
    </div>
  );
}
