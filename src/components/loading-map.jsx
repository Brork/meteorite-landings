import React from "react";
import "./loading-map.css";

const MapLoading = () => {
  return (
    <div className="loading-screen">
      <span>
        <p className="loading-text">Loading</p>
        <p className="loading-text" id="first-dot">
          {" ."}
        </p>
        <p className="loading-text" id="second-dot">
          {" ."}
        </p>
        <p className="loading-text" id="third-dot">
          {" ."}
        </p>
      </span>
    </div>
  );
};

export default MapLoading;
