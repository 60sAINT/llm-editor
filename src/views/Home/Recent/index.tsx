import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Flex, Table, Tooltip, Modal, Input } from "antd";
import {
  DeleteOutlined,
  FileTextOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import { ColumnType } from "antd/es/table";
import { formatDate } from "@/common/utils";
import { useNavigate } from "react-router-dom";
import { docApi } from "@/views/NewDoc/api/Doc";
import { TableData } from "../model";
import { QuickAccess } from "../components/QuickAccess";
import { ShareModal } from "../Share/ShareModal";
import { MoreOperation } from "../components/MoreOperation";

const Recent = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const newNameRef = useRef(newName);
  const [currentDoc, setCurrentDoc] = useState<TableData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
  const { runAsync: renameDoc } = useRequest(async (doc_id, new_doc_name) => {
    const res = await docApi.renameDoc({
      token: `Bearer ${token}` || "",
      doc_id,
      new_doc_name,
    });
    return res.data;
  });
  useEffect(() => {
    newNameRef.current = newName;
  }, [newName]);
  const showRenameConfirm = (id: React.Key, title: string) => {
    setNewName(title);
    confirm({
      title: "重命名文件",
      icon: null,
      content: (
        <Input
          placeholder="请输入文件夹名称"
          defaultValue={title}
          onChange={(e) => setNewName(e.target.value)}
          className="my-5 h-8"
        />
      ),
      okText: "确定",
      cancelText: "取消",
      onOk() {
        renameDoc(id, newNameRef.current).then(() => getDocList());
      },
      onCancel() {},
    });
  };

  const { confirm } = Modal;
  const { runAsync: deleteDoc } = useRequest(async (doc_list) => {
    const res = await docApi.deleteDoc(`Bearer ${token}` || "", doc_list);
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
        deleteDoc([docId]).then(() => getDocList());
      },
      onCancel() {},
    });
  };

  const columns: ColumnType<TableData>[] = useMemo(
    () => [
      {
        title: "文件名",
        dataIndex: "title",
        width: "35%",
        ellipsis: {
          showTitle: false,
        },
        render: (fileName: string, record: { doc_id: any }) => (
          <div
            className="text-topbar-text font-normal flex justify-start cursor-pointer"
            onClick={() => {
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
        width: "35%",
        render: (timeString: string) => formatDate(timeString),
        sorter: (a: TableData, b: TableData) =>
          new Date(b.last_saved_at).getTime() -
          new Date(a.last_saved_at).getTime(),
        defaultSortOrder: "ascend",
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: "30%",
        render: (_, record) => {
          return (
            <Flex gap={2}>
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
              <Button
                type="link"
                className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
                onClick={() => {
                  showRenameConfirm(record.doc_id, record.title);
                }}
              >
                <EditOutlined />
                重命名
              </Button>
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
              <MoreOperation record={record} />
            </Flex>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full h-full overflow-y-auto py-6 px-10">
        <QuickAccess />
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
      <ShareModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        currentDoc={currentDoc!}
      />
    </>
  );
};

export default Recent;
