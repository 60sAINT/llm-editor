import React, { useEffect, useState } from "react";
import { useDocState, useDocDispatch } from "./utils/docProvider";

const DocTitle = () => {
  // const { title } = useDocState();
  const state = useDocState();
  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle(state.title);
  }, [state.title]);
  const docDispatch = useDocDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    docDispatch({ type: "EDIT_TITLE", payload: e.target.value });
    setTitle(e.target.value);
  };
  return (
    <div className="px-12 pt-10 pb-5">
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
