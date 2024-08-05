import React from "react";

const ShareButton = () => {
  const handleClick = () => {
    console.log("Clicked on Share");
  };

  return (
    <a
      href="#"
      className="block h-8 leading-8 !text-dropdown-text text-xs cursor-not-allowed"
      onClick={handleClick}
    >
      分享推荐
    </a>
  );
};

export default ShareButton;
