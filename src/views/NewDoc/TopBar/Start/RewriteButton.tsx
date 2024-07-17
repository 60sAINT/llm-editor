import React, { useMemo } from "react";
import { Divider, Dropdown, Space } from "antd";
import {
  CaretDownOutlined,
  EditOutlined,
  // CaretUpOutlined,
} from "@ant-design/icons";
import { SummaryButton } from "../../Editor/CustomFormattingToolBar/SummaryButton";
import { PolishButton } from "../../Editor/CustomFormattingToolBar/PolishButton";
import { TranslationButton } from "../../Editor/CustomFormattingToolBar/TranslationButton";
import { useNewDocState } from "../../utils/provider";

const RewriteButton = () => {
  const { syncLock } = useNewDocState();

  const rewriteItems = useMemo(
    () => [
      {
        key: "translate",
        label: <TranslationButton isFull />,
        disabled: syncLock,
      },
      {
        key: "polish",
        label: <PolishButton isFull />,
        disabled: syncLock,
      },
      {
        key: "summary",
        label: <SummaryButton isFull />,
        disabled: syncLock,
      },
    ],
    [syncLock]
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
          <EditOutlined className="h-full text-topbar-text text-xs" />
          <div className="text-topbar-text text-xs">全文改写</div>
          <CaretDownOutlined className="h-full text-topbar-text text-xs dropdown-icon" />
        </Space>
      </Dropdown>
    </>
  );
};

export default RewriteButton;
