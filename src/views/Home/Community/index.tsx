import React from "react";
import { Divider } from "antd";

const Community = () => {
  return (
    <div className="w-full h-full overflow-auto relative">
      <h3 className="mb-5 font-bold text-base pt-6 px-10">选择方案</h3>
      <Divider className="w-full" />
      <div className="px-10">
        <div className="my-2.5 text-[18px] leading-[26px] cursor-pointer">
          协心提供
        </div>
      </div>
    </div>
  );
};

export default Community;
