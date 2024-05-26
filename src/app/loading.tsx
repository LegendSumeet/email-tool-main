import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FaSpinner className="text-blue-500" size={50}  />
      <p className="ml-3">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
