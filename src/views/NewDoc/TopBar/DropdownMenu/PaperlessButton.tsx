import React from "react";

const PaperlessButton = () => {
  const handleClick = () => {
    console.log("Clicked on Paperless");
  };

  return (
    <a
      href="#"
      className="w-40 h-8 leading-8 block !text-dropdown-text text-sm"
      onClick={handleClick}
    >
      无纸化
    </a>
  );
};

export default PaperlessButton;
