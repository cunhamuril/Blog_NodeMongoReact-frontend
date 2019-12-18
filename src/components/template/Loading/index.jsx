import React from "react";

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;