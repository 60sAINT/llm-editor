import React from "react";
import { useDispatch, useNewDocState } from "../utils/provider";

const TopBarTitle = () => {
  const { title } = useNewDocState();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EDIT_TITLE", payload: e.target.value });
  };
  return (
    <input
      type="text"
      placeholder="无标题"
      value={title}
      // onChange={(e) => setTitle(e.target.value)}
      onChange={handleChange}
      className="text-l font-bold outline-none flex-grow"
      style={{ minWidth: "50px", maxWidth: "500px", width: "auto" }}
    />
  );
};

export default TopBarTitle;
