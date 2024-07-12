import React from "react";
import { useDispatch, useNewDocState } from "./utils/provider";

const DocTitle = () => {
  const { title } = useNewDocState();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EDIT_TITLE", payload: e.target.value });
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
