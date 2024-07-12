import React from "react";
import { useDocState, useDocDispatch } from "../utils/docProvider";

const TopBarTitle = () => {
  const { title } = useDocState();
  const docDispatch = useDocDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    docDispatch({ type: "EDIT_TITLE", payload: e.target.value });
  };
  return (
    <input
      type="text"
      placeholder="无标题"
      value={title}
      onChange={handleChange}
      className="text-l font-bold outline-none flex-grow"
      style={{ minWidth: "50px", maxWidth: "500px", width: "auto" }}
    />
  );
};

export default TopBarTitle;
