import React from "react";
import ExitButton from "./ExitButton";
import TopBarTitle from "./TopBarTitle";
import Status from "./Status";
import ActionButton from "./ActionButton";
import LoginButton from "./LoginButton";
import DropdownMenu from "./DropdownMenu";

const TopBar = () => {
  return (
    <div className="w-full flex items-center justify-between bg-white p-4 shadow-md border-b border-gray-300 h-14">
      <div className="flex items-center space-x-4">
        <ExitButton />
        <div className="flex items-center justify-center flex-grow space-x-4">
          <TopBarTitle />
          <Status />
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <ActionButton label="开始" />
        <ActionButton label="效率" />
        <ActionButton label="审阅" />
      </div>
      <div className="flex items-center space-x-4">
        <LoginButton />
        <DropdownMenu />
      </div>
    </div>
  );
};

export default TopBar;
