// src/components/LoadingSpinner.js
import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div
      aria-live="polite"
      aria-busy={isLoading}
      className={`loading-container ${isLoading ? "visible" : "hidden"}`}
    >
      {isLoading && (
        <>
          <TailSpin
            height="80"
            width="80"
            color="#FFFF00"
            ariaLabel="loading"
          />
          <div className="loading-text">now loading...</div>
        </>
      )}
    </div>
  );
};

export default LoadingSpinner;
