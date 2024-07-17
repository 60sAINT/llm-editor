import React, { useEffect, useState } from "react";
import { useDocState, useDocDispatch } from "../utils/docProvider";
import { Tooltip } from "antd";

const TopBarTitle = () => {
  const state = useDocState();
  const docDispatch = useDocDispatch();
  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle(state.title);
  }, [state.title]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    docDispatch({ type: "EDIT_TITLE", payload: e.target.value });
  };
  return (
    <Tooltip title="重命名">
      <input
        type="text"
        placeholder="无标题"
        value={title}
        onChange={handleChange}
        className="text-sm outline-none ml-4 text-[#1f1f1f] leading-7 min-w-12 max-w-44"
        style={{
          width: `${Math.max(50, title.length * 8)}px`,
        }}
      />
    </Tooltip>
  );
};

export default TopBarTitle;
