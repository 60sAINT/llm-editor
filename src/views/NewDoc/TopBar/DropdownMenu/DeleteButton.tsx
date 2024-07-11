import React from "react";

const DeleteButton = () => {
  const handleClick = () => {
    console.log("Clicked on Delete");
  };

  return (
    <a
      href="#"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      onClick={handleClick}
    >
      删除文档
    </a>
  );
};

export default DeleteButton;
