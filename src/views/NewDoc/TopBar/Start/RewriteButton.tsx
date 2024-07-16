import React, { useMemo } from "react";
import { Divider, Dropdown, Space } from "antd";
import {
  CaretDownOutlined,
  // CaretUpOutlined,
} from "@ant-design/icons";
import { SummaryButton } from "../../Editor/CustomFormattingToolBar/SummaryButton";
import { PolishButton } from "../../Editor/CustomFormattingToolBar/PolishButton";
import { TranslationButton } from "../../Editor/CustomFormattingToolBar/TranslationButton";

const RewriteButton = () => {
  const rewriteItems = useMemo(
    () => [
      {
        key: "translate",
        label: <TranslationButton isFull />,
      },
      {
        key: "polish",
        label: <PolishButton isFull />,
      },
      {
        key: "summary",
        label: <SummaryButton isFull />,
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
