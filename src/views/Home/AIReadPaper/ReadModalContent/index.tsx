import { UploadOutlined } from "@ant-design/icons";
import { Button, message, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
export const ReadModalContent = () => {
  const props: UploadProps = {
    accept: ".pdf",
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false,
  };
  return (
    <div className="flex h-full gap-2">
      <div className="w-1/2">
        <div className="font-semibold text-neutral-800 mb-3 mt-3.5">
          本地文件上传
        </div>
        <Dragger
          {...props}
          className="!h-56 [&_.ant-upload-drag-container]:!h-48 [&_.ant-upload]:!h-56"
        >
          <p className="ant-upload-drag-icon">
            <Button type="primary" className="items-center">
              <UploadOutlined className="!text-sm !text-white h-[22px]" />
              上传
            </Button>
          </p>
          <p className="ant-upload-text !text-neutral-500 !text-sm">
            支持拖动上传
          </p>
        </Dragger>
      </div>
      <div className="w-1/2">
        <div className="font-semibold text-neutral-800 mb-3 mt-3.5">
          最近阅读
        </div>
        <div className="border border-gray-200 h-56 rounded-lg"></div>
      </div>
    </div>
  );
};
