import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const ExitButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="text-gray-600 hover:text-gray-800 ml-3.5"
      onClick={() => {
        // TODO: 退出前自动保存文档
        navigate("/", { replace: true });
      }}
    >
      <LeftOutlined className="!font-black !text-2xl" />
    </button>
  );
};

export default ExitButton;
