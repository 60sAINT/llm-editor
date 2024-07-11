import React from "react";
import ExitButton from "./ExitButton";
import TopBarTitle from "./TopBarTitle";
import Status from "./Status";
import ActionButton from "./ActionButton";
import LoginButton from "./LoginButton";
import DropdownMenu from "./DropdownMenu";

interface TopBarProps {
  title: string;
  setTitle: (title: string) => void;
}
const TopBar: React.FC<TopBarProps> = ({ title, setTitle }) => {
  return (
    <div className="w-full flex items-center justify-between bg-white p-4 shadow-md border-b border-gray-300 h-14">
      <div className="flex items-center space-x-4">
        <ExitButton />
        <TopBarTitle title={title} setTitle={setTitle} />
        {/* <ActionButton label="开始" />
        <ActionButton label="效率" />
        <ActionButton label="审阅" /> */}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <ActionButton label="开始" />
        <ActionButton label="效率" />
        <ActionButton label="审阅" />
      </div>
      <div className="flex items-center space-x-4">
        <Status />
        <LoginButton />
        <DropdownMenu />
      </div>
    </div>
  );
};

export default TopBar;
