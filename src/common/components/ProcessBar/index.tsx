import React, { useEffect, useState } from "react";
import "./index.css";

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          return prevProgress + 0.1; // Slow down the progress after 90%
        }
        return prevProgress + 1; // Normal speed before 90%
      });
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
