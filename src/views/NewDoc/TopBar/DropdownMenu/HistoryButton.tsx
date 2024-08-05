import React from "react";

const HistoryButton = () => {
  const handleClick = () => {
    console.log("Clicked on History");
  };

  return (
    <a
      href="#"
      className="block h-8 leading-8 !text-dropdown-text text-xs cursor-not-allowed"
      onClick={handleClick}
    >
      页面历史
    </a>
  );
};

export default HistoryButton;
