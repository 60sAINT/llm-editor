import React from "react";
import { useDocState, useDocDispatch } from "./utils/docProvider";

const DocTitle = () => {
  const { title } = useDocState();
  const docDispatch = useDocDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    docDispatch({ type: "EDIT_TITLE", payload: e.target.value });
  };
  return (
    <div style={{ padding: "40px 54px 20px 54px" }}>
      <input
        type="text"
        placeholder="无标题"
        value={title}
        onChange={handleChange}
        className="text-3xl font-bold outline-none flex-grow"
      />
    </div>
  );
};

export default DocTitle;
