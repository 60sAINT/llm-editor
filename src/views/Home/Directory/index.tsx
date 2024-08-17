import React from "react";
import FolderTable from "./FolderTable";

const Directory = () => {
  return (
    <div className="w-full h-full overflow-auto py-6 px-10">
      <h3 className="mb-5 font-bold text-neutral-700 text-base">我的文档</h3>
      <FolderTable />
    </div>
  );
};

export default Directory;
