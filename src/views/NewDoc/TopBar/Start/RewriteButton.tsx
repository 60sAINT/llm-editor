import React, { useMemo } from "react";
import { Divider, Dropdown, Space } from "antd";
import {
  CaretDownOutlined,
  // CaretUpOutlined,
} from "@ant-design/icons";
import { SummaryButton } from "../../Editor/CustomFormattingToolBar/SummaryButton";

const RewriteButton = () => {
  const rewriteItems = useMemo(
    () => [
      {
        key: "translate",
        label: <div onClick={() => {}}>翻译</div>,
      },
      {
        key: "polish",
        label: <div onClick={() => {}}>润色</div>,
      },
      {
        key: "summary",
        label: <SummaryButton a />,
      },
    ],
    []
  );
  return (
    <>
      <Divider type="vertical" className="top-1.5 mx-1 h-6 border-zinc-200" />
      <Dropdown
        menu={{ items: rewriteItems }}
        trigger={["click"]}
        className="px-2 my-1 [&>.ant-space-item]:flex [&>.ant-space-item]:items-center"
      >
        <Space className="border border-transparent hover:border hover:border-neutral-300">
          <div className="text-topbar-text text-xs">翻译</div>
          <CaretDownOutlined className="h-full text-topbar-text text-xs dropdown-icon" />
        </Space>
      </Dropdown>
    </>
  );
};

export default RewriteButton;
