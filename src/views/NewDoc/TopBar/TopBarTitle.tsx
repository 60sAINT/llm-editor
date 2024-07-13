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
      className="text-l max-w-lg w-auto outline-none hover:underline decoration-2 underline-offset-2"
    />
  );
};

export default TopBarTitle;
