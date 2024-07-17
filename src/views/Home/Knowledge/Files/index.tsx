import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { knowledgeApi } from "../api";
import { useSearchParams } from "react-router-dom";
import { Button, Space, Table } from "antd";
import { FileBase } from "../interface";
import { bytesToSize, formatDate } from "@/common/utils";
import { deleteConfirm } from "@/utils/deleteConfirm";

const Files = () => {
  const [searchParams] = useSearchParams();
  const db_name = searchParams.get("db_name");

  const { data, loading, refresh } = useRequest(
    () => knowledgeApi.getFiles(db_name!),
    {
      manual: false,
      ready: !!db_name,
    }
  );

  const { runAsync: downloadFile } = useRequest(
    (file_name) => knowledgeApi.downloadFile(db_name!, file_name),
    {
      ready: !!db_name,
    }
  );

  const { runAsync: delFile } = useRequest(
    async (file_name) => {
      await knowledgeApi.delFile(db_name!, file_name);
      refresh();
    },
    {
      ready: !!db_name,
    }
  );

  const downloadHandle = async (file_name: string) => {
    await downloadFile(file_name); // todo
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "文件大小",
      dataIndex: "size",
      render: (size: number) => bytesToSize(size),
    },
    {
      title: "更新时间",
      dataIndex: "time",
      render: (timeString: string) => formatDate(timeString),
      sorter: (a: FileBase, b: FileBase) =>
        new Date(b.time).getTime() - new Date(a.time).getTime(),
      defaultSortOrder: "ascend" as any,
    },
    {
      title: "操作",
      dataIndex: "name",
      render: (name: string) => (
        <Space>
          <Button type="link" onClick={() => downloadHandle(name)}>
            下载
          </Button>
          <Button
            type="link"
            onClick={() => deleteConfirm(async () => await delFile(name))}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-20">
      <Button type="primary" className="mb-[22px]">
        上传文件
      </Button>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default Files;
