import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import {
  Button,
  Divider,
  Flex,
  Table,
  Tooltip,
  Dropdown,
  MenuProps,
} from "antd";
import React, { useMemo, useState } from "react";
import { shareApi } from "./api";
import { ColumnType } from "antd/es/table";
import { ShareDocType } from "./model";
import { Link, useNavigate } from "react-router-dom";
import {
  ExportOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { formatDate } from "@/common/utils";
import Icon from "@ant-design/icons/lib/components/Icon";
import { CurrentTab } from "@/common/icons/CurrentTab";
import { ShareModal } from "./ShareModal";

export const Share = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    run: getShareDocList,
    data: shareDocList,
    loading: shareDocListLoading,
  } = useRequest(
    async () => {
      const res = await shareApi.getShareDocList({
        token: `Bearer ${token}` || "",
      });
      return res.data.doc_list;
    },
    { manual: false }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [currentDoc, setCurrentDoc] = useState<ShareDocType>();

  const columns: ColumnType<ShareDocType>[] = useMemo(
    () => [
      {
        title: "文件名",
        dataIndex: "title",
        ellipsis: {
          showTitle: false,
        },
        render: (fileName: string, record: { doc_id: any }) => (
          <Link
            className="text-topbar-text font-normal flex justify-start cursor-pointer hover:text-[#de95a0]"
            target="_blank"
            to={`/newDoc?doc_id=${record.doc_id}`}
          >
            <Tooltip title={fileName}>
              <FileTextOutlined className="mr-2 text-topbar-text" />
              {fileName}
            </Tooltip>
          </Link>
        ),
      },
      {
        title: "创建者",
        dataIndex: "owner_email",
        render: (email) => (
          <span className="text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap">
            用户{email}
          </span>
        ),
      },
      {
        title: "共享信息",
        dataIndex: "shared_at",
        render: (timeString: string, record: ShareDocType) => (
          <Tooltip
            title={`${formatDate(timeString)} 用户${record.owner_email}分享`}
          >
            <span className="text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap inline-block w-full">
              {formatDate(timeString)} 用户{record.owner_email}分享
            </span>
          </Tooltip>
        ),
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: "19%",
        render: (_, record) => {
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
            <Flex gap={2}>
              <Button
                type="link"
                className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
                onClick={() => {
                  setCurrentDoc(record);
                  setIsModalOpen(true);
                }}
              >
                <UsergroupAddOutlined />
                协作
              </Button>
              <Dropdown menu={{ items: menu }} trigger={["click"]}>
                <Button
                  type="link"
                  className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
                >
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </Flex>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="h-full overflow-auto">
      <div className="pt-6 px-10 font-bold text-topbar-text text-base">
        共享文档
      </div>
      <Divider className="w-full" />
      <Table
        rowKey={"doc_id"}
        dataSource={shareDocList}
        columns={columns}
        loading={shareDocListLoading}
        className="[&_.ant-table-cell]:overflow-hidden mx-10 [&_.ant-spin-dot-spin]:text-primary [&_.ant-table-column-sorter-down.active]:text-primary [&_.ant-table-column-sorter-up.active]:text-primary [&_.ant-pagination-item-active]:border-primary [&_.ant-pagination-item-active:hover]:border-primary [&_.ant-pagination-item-active>a]:text-primary [&_.ant-pagination-item-active>a:hover]:text-primary"
      />
      {/* <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
      <ShareModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        currentDoc={currentDoc!}
      />
    </div>
  );
};
