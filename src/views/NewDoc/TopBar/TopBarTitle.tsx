import React from "react";

interface TopBarTitleProps {
  title: string;
  setTitle: (title: string) => void;
}

const TopBarTitle: React.FC<TopBarTitleProps> = ({ title, setTitle }) => {
  return (
    <input
      type="text"
      placeholder="无标题"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="text-l font-bold outline-none flex-grow"
      style={{ minWidth: "50px", maxWidth: "500px", width: "auto" }}
    />
  );
};

export default TopBarTitle;
