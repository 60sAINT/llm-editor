import React, { useState } from "react";
import ExitButton from "./ExitButton";
import TopBarTitle from "./TopBarTitle";
import Status from "./Status";
import ActionButton from "./ActionButton";
import DropdownMenu from "./DropdownMenu";
import "./index.css";
import { UpOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const TopBar = () => {
  const [animate, setAnimate] = useState(false);
  const [animateReverse, setAnimateReverse] = useState(false);

  const handleStartClick = () => {
    setAnimateReverse(false);
    setAnimate(true);
  };
  const handleFold = () => {
    setAnimate(false);
    setAnimateReverse(true);
  };
  return (
    <div className={`${!animate && "shadow-md border-b border-gray-300"}`}>
      <Space className="w-full flex items-center justify-between bg-white py-4 h-14 z-10">
        <div className="flex items-center">
          <ExitButton />
          <TopBarTitle />
        </div>
        <div className="flex items-center justify-between w-[300px]">
          <ActionButton label="开始" onClick={handleStartClick} />
          <ActionButton label="效率" onClick={() => {}} />
          <ActionButton label="审阅" onClick={() => {}} />
        </div>
        <div className="flex items-center mr-1">
          <Status />
          <Avatar
            icon={<UserOutlined />}
            size="small"
            className="h-5 w-5 mr-5"
          />
          <DropdownMenu />
        </div>
      </Space>
      <div
        className={`shadow-md border-b border-gray-300 h-9 w-full ${
          animateReverse ? "animateReverse" : ""
        }  ${animate ? "animate" : "hidden"}`}
      >
        <UpOutlined
          className="float-right inline-block leading-8 !font-black text-base mr-5"
          onClick={handleFold}
        />
      </div>
    </div>
  );
};

export default TopBar;
