import React from "react";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <img
        src="/loader.gif" // Replace with the actual path to your GIF
        alt="Loading..."
        className="loading-gif"
        style={{ width: "200px", height: "200px" }} // Adjust size as needed
      />
    </div>
  ) : null;
};

export default Loader;
