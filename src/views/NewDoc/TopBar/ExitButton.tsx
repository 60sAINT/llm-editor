import React from "react";
import { useNavigate } from "react-router-dom";

const ExitButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="text-gray-600 hover:text-gray-800"
      onClick={() => {
        // TODO: 退出前自动保存文档
        navigate("/", { replace: true });
      }}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>
  );
};

export default ExitButton;
