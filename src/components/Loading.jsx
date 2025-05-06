import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
