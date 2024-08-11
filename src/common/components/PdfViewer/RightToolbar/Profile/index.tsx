import { Popover } from "antd";
import React from "react";

export const Profile = () => {
  return (
    <div className="p-5">
      <Popover placement="leftTop" title={<a>论文标题</a>} content="content">
        <div className="leading-[30px] h-[30px] text-neutral-900 hover:bg-neutral-100 cursor-pointer rounded-sm px-2">
          论文标题
        </div>
      </Popover>
    </div>
  );
};
