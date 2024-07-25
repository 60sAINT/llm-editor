import React from "react";
import { Spin } from "antd";

const Spinning: React.FC = () => {
  return (
    <Spin
      percent="auto"
      fullscreen
      size="large"
      className="[&_.ant-spin-dot-holder]:text-4xl [&_.ant-spin-dot-holder]:!text-[#facdd3]"
    />
  );
};

export default Spinning;
