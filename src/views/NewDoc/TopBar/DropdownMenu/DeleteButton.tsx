import React from "react";

const DeleteButton = () => {
  const handleClick = () => {
    console.log("Clicked on Delete");
  };

  return (
    <a
      href="#"
      className="block h-8 leading-8 !text-dropdown-text text-sm"
      onClick={handleClick}
    >
      删除文档
    </a>
  );
};

export default DeleteButton;
