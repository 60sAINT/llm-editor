import React from "react";

const ShareButton = () => {
  const handleClick = () => {
    console.log("Clicked on Share");
  };

  return (
    <a
      href="#"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      onClick={handleClick}
    >
      分享推荐
    </a>
  );
};

export default ShareButton;
