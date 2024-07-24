import React, { useState } from "react";
import LoginBackground from "./LoginBackground";
import LoginPanel from "./LoginPanel";
import { Button, Modal } from "antd";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white/10">
      <LoginBackground />
      <LoginPanel />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="[&_.ant-btn-default]:hidden"
      >
        <p className="text-base pt-5">
          若您在访问过程中遇到问题，请点击以下链接进行访问：
          <br />
          <Button
            type="link"
            className="px-0 text-base"
            onClick={() => {
              window.open("http://43.138.11.21:8080/"), "_blank";
            }}
          >
            http://43.138.11.21:8080/
          </Button>
        </p>
      </Modal>
    </div>
  );
};

export default Login;
