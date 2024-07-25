import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { knowledgeApi } from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Space, Table, Upload, UploadProps } from "antd";
import { FileBase } from "../interface";
import downloadZipFile, {
  bytesToSize,
  exportFile,
  formatDate,
} from "@/common/utils";
import { deleteConfirm } from "@/utils/deleteConfirm";
import { showError, showMessage } from "@/common/utils/message";
import { useAuth } from "@/provider/authProvider";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";
import { GATEWAY } from "@/api/AxiosInstance";

const Files = () => {
  const [searchParams] = useSearchParams();
  const db_name = searchParams.get("db_name");
  const navigate = useNavigate();

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

  const { runAsync: downloadKnowledge } = useRequest(
    () => knowledgeApi.downloadKnowledge(db_name!),
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
    const res = await downloadFile(file_name);
    exportFile(res, file_name);
  };

  const exportDb = async () => {
    const res = await downloadKnowledge();
    downloadZipFile(res, db_name!);
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

  const { token } = useAuth();
  const action = `${GATEWAY}/api/v1/knowledge/file/upload?db_name=${db_name}`;
  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      const response = info.file.response;
      if (!response) return;
      showMessage(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === "error") {
      showError(`${info.file.name} 文件上传失败`);
    }
  };

  const accepts = [".pdf", ".txt", ".md", ".html"];
  const uploadProps: UploadProps = {
    accept: accepts.join(","),
    name: "knowledge_files",
    multiple: true,
    onChange: handleChange,
    showUploadList: false,
    action,
    customRequest: async (opt) => {
      const formData = new FormData();
      formData.append("knowledge_files", opt.file);
      axios
        .post(`${action}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
            "X-Authorization": `Bearer ${token}`,
          },
        })
        .then(() => {
          refresh();
        });
      // await uploadFile(formData);
    },
  };

  return (
    <>
      <button
        className="text-gray-600 hover:text-gray-800 ml-7 mt-7 absolute"
        onClick={() => {
          // TODO: 退出前自动保存文档
          navigate("/", { replace: true });
        }}
      >
        <LeftOutlined className="!font-black !text-2xl" />
      </button>
      <div className="p-20">
        <Space>
          <Upload {...uploadProps}>
            <Button type="primary" className="mb-[22px]">
              上传文件
            </Button>
          </Upload>
          <Button className="mb-[22px]" onClick={exportDb}>
            导出知识库
          </Button>
        </Space>
        <Table dataSource={data} columns={columns} loading={loading} />
      </div>
    </>
  );
};

export default Files;
