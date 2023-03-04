import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center col-12 main align-items-center">
      <div
        className="spinner-border"
        style={{ width: '5em', height: '5em' }}
        role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default LoadingSpinner;