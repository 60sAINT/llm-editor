import Icon, { EllipsisOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { CurrentTab } from "@/common/icons/CurrentTab";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export interface MoreOperationProps {
  record: any;
}

export const MoreOperation: React.FC<MoreOperationProps> = ({ record }) => {
  const navigate = useNavigate();
  const menu: MenuProps["items"] = [
    {
      key: "currentTab",
      label: (
        <div
          key="currentTab"
          onClick={() => {
            navigate(`/newDoc?doc_id=${record.doc_id}`);
          }}
          className="flex p-0.5 text-[13px] text-neutral-700 items-center w-44"
        >
          <Icon component={CurrentTab} className="mr-2" />
          当前标签页打开
        </div>
      ),
    },
    {
      key: "newTab",
      label: (
        <Link
          key="newTab"
          onClick={() => {}}
          className="flex p-0.5 text-[13px] text-neutral-700 items-center w-44"
          to={`/newDoc?doc_id=${record.doc_id}`}
          target="_blank"
        >
          <ExportOutlined className="mr-2" />
          新建标签页打开
        </Link>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items: menu }} trigger={["click"]}>
      <Button
        type="link"
        className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
      >
        <EllipsisOutlined />
      </Button>
    </Dropdown>
  );
};
