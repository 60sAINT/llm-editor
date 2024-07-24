import React, { useMemo } from "react";
import { Button, Flex, Space, Table, Tooltip, Modal } from "antd";
import {
  DeleteOutlined,
  FileAddOutlined,
  FileTextOutlined,
  ImportOutlined,
  OpenAIOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { docApi } from "../NewDoc/api/Doc";
import { useAuth } from "@/provider/authProvider";
import { ColumnType } from "antd/es/table";
import { OPERATE, TableData } from "./model";
import { formatDate } from "@/common/utils";
import { useNavigate } from "react-router-dom";

// const menuItems: MenuProps["items"] = [
//   { key: "1", label: "当前标签页打开" },
//   { key: "2", label: "新建标签页打开" },
//   { key: "3", label: "协作" },
//   { key: "4", label: "分享链接" },
//   { key: "5", label: "重命名" },
//   { key: "6", label: "移动到" },
//   { key: "7", label: "创建副本" },
//   { key: "8", label: "下载Word文档" },
//   { key: "9", label: "删除", danger: true },
// ];

const Content = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const {
    run: getDocList,
    data: docList,
    loading: docListLoading,
  } = useRequest(
    async () => {
      const res = await docApi.getDocList("Bearer " + token || "");
      return res.data.doc_list;
    },
    { manual: false }
  );

  const { confirm } = Modal;
  const { runAsync: deleteDoc } = useRequest(async (docId) => {
    const res = await docApi.deleteDoc(docId);
    return res.data;
  });
  const showDeleteConfirm = (docId: string) => {
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: "确认删除文件？",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        deleteDoc(docId);
        getDocList();
      },
      onCancel() {},
    });
  };
  const operates = useMemo(
    () => [
      {
        key: OPERATE.CREATE,
        icon: <FileAddOutlined className="text-3xl text-primary mr-2 h-full" />,
        title: "新建文档",
        desc: "从空文本起草",
      },
      {
        key: OPERATE.WRITE,
        icon: <OpenAIOutlined className="text-3xl text-primary mr-2 h-full" />,
        title: "AI写作",
        desc: "让AI辅助您高效写作",
      },
      {
        key: OPERATE.UPLOAD,
        icon: <ImportOutlined className="text-3xl text-primary mr-2 h-full" />,
        title: "上传Word",
        desc: "从本地上传文档",
      },
    ],
    [OPERATE]
  );

  const handle = (type: OPERATE) => {
    if (type == "create") {
      // window.open("/newDoc", "_blank");
      navigate("/newDoc");
    }
  };

  const columns: ColumnType<TableData>[] = useMemo(
    () => [
      {
        title: "文件名",
        dataIndex: "title",
        width: "40%",
        ellipsis: {
          showTitle: false,
        },
        render: (fileName: string, record: { doc_id: any }) => (
          <div
            className="text-topbar-text font-normal flex justify-start"
            onClick={() => {
              // window.open(`./newDoc?doc_id=${record.doc_id}`, "_blank");
              navigate(`/newDoc?doc_id=${record.doc_id}`);
            }}
          >
            <Tooltip title={fileName}>
              <FileTextOutlined className="mr-2 text-topbar-text" />
              {fileName}
            </Tooltip>
          </div>
        ),
      },
      {
        title: "最后打开时间",
        dataIndex: "last_saved_at",
        width: "40%",
        render: (timeString: string) => formatDate(timeString),
        sorter: (a: TableData, b: TableData) =>
          new Date(b.last_saved_at).getTime() -
          new Date(a.last_saved_at).getTime(),
        defaultSortOrder: "ascend",
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: "20%",
        render: (_, record) => (
          <Flex>
            <Button
              type="link"
              className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
              onClick={() => {
                showDeleteConfirm(record.doc_id);
              }}
            >
              <DeleteOutlined />
              删除
            </Button>
          </Flex>
        ),
      },
    ],
    []
  );
  console.log(docList);

  return (
    <div className="w-full h-full overflow-auto">
      <h3 className="mb-5 font-bold text-neutral-700 text-base">快速访问</h3>
      <Space className="w-full [&>.ant-space-item]:max-w-72 [&>.ant-space-item]:w-1/3">
        {operates.map((item) => (
          <Space
            key={item.key}
            className="border w-full h-[76px] p-4 items-start hover:bg-gray-100 [&>.ant-space-item]:h-full"
            onClick={() => handle(item.key)}
          >
            {item.icon}
            <div>
              <h5 className="font-semibold">{item.title}</h5>
              <p className="text-xs text-description mt-[3px]">{item.desc}</p>
            </div>
          </Space>
        ))}
      </Space>
      <h3 className="mt-6 mb-5 font-bold text-neutral-700 text-base">
        最近文件
      </h3>
      <Table
        rowKey={"doc_id"}
        dataSource={docList}
        columns={columns}
        loading={docListLoading}
        className="[&_.ant-spin-dot-spin]:text-primary [&_.ant-table-column-sorter-down.active]:text-primary [&_.ant-table-column-sorter-up.active]:text-primary [&_.ant-pagination-item-active]:border-primary [&_.ant-pagination-item-active:hover]:border-primary [&_.ant-pagination-item-active>a]:text-primary [&_.ant-pagination-item-active>a:hover]:text-primary"
      />
    </div>
  );
};

export default Content;
