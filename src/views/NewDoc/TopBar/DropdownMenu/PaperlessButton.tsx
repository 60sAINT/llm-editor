import React from "react";

const PaperlessButton = () => {
  const handleClick = () => {
    console.log("Clicked on Paperless");
  };

  return (
    <a
      href="#"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      onClick={handleClick}
    >
      无纸化
    </a>
  );
};

export default PaperlessButton;
