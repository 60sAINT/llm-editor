import React, { useMemo } from "react";
import { Button, Flex, Space, Table, Tooltip, Modal, Divider } from "antd";
import {
  DeleteOutlined,
  FileAddOutlined,
  FileTextOutlined,
  ImportOutlined,
  OpenAIOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import { ColumnType } from "antd/es/table";
import { formatDate } from "@/common/utils";
import { useNavigate } from "react-router-dom";
import { docApi } from "@/views/NewDoc/api/Doc";
import { OPERATE, TableData } from "../model";

const Community = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const {
    run: getDocList,
    data: docList,
    loading: docListLoading,
  } = useRequest(
    async () => {
      const res = await docApi.getDocList(`Bearer ${token}` || "");
      return res.data.doc_list;
    },
    { manual: false }
  );

  const { confirm } = Modal;
  const { runAsync: deleteDoc } = useRequest(async (docId) => {
    const res = await docApi.deleteDoc(`Bearer ${token}` || "", docId);
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
