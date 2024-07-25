import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

export const Developing = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <ExclamationCircleFilled className="text-6xl mb-3 text-primary" />
      <p className="text-xl font-medium">功能开发中，敬请期待!</p>
    </div>
  );
};
