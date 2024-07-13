import React from "react";
import { useDocState, useDocDispatch } from "../utils/docProvider";
import { Tooltip } from "antd";

const TopBarTitle = () => {
  const { title } = useDocState();
  const docDispatch = useDocDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    docDispatch({ type: "EDIT_TITLE", payload: e.target.value });
  };
  return (
    <Tooltip title="重命名">
      <input
        type="text"
        placeholder="无标题"
        value={title}
        onChange={handleChange}
        className="text-sm outline-none ml-4 text-[#1f1f1f] leading-7"
        style={{
          minWidth: "50px",
          maxWidth: "500px",
          width: `${Math.max(50, title.length * 8)}px`,
        }}
      />
    </Tooltip>
  );
};

export default TopBarTitle;
