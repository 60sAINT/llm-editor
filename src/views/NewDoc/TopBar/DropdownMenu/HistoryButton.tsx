import React from "react";

const HistoryButton = () => {
  const handleClick = () => {
    console.log("Clicked on History");
  };

  return (
    <a
      href="#"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      onClick={handleClick}
    >
      页面历史
    </a>
  );
};

export default HistoryButton;
