import {
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Badge, Button, Modal, Table, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/provider/authProvider";
import { axios, GATEWAY } from "@/api/AxiosInstance";
import { RecentReading } from "./RecentReading";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";

type File = {
  name: string;
  status: string;
  paper_id?: string;
};

export interface getRecentPaperListProps {
  getRecentPaperList: () => any;
}

export const ReadModalContent: React.FC<getRecentPaperListProps> = ({
  getRecentPaperList,
}) => {
  const [recentPaperList, setRecentPaperList] = useState([{ title: "" }]);
  const [fileList, setFileList] = useState<Array<File>>([]);
  const [lastFileUploading, setLastFileUploading] = useState<boolean>(false);
  const [lastFileError, setlastFileError] = useState<boolean>(false);
  const { token } = useAuth();

  const action = `${GATEWAY}/api/v1/paper/upload`;
  const props: UploadProps = {
    accept: ".pdf",
    name: "file",
    action,
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status == "uploading") {
        fileList.shift();
        setFileList([
          {
            name: info.file.name,
            status,
          },
          ...fileList,
        ]);
      }
    },
    customRequest: async (opt) => {
      const formData = new FormData();
      formData.append("file", opt.file);
      axios
        .post(`${action}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Authorization": `Bearer ${token}`,
          },
        })
        .then((data) => {
          if (data.data.code == "1001") {
            fileList[0].status = "repeat";
          } else {
            fileList[0].status = "done";
          }
          fileList[0].paper_id = data.data.data.paper_id;
          setFileList(fileList);
          setLastFileUploading(false);
        })
        .then(() => {
          getRecentPaperList();
          setRecentPaperList(getRecentPaperList());
        })
        .catch(() => {
          fileList[0].status = "error";
          setFileList(fileList);
          setLastFileUploading(false);
          setlastFileError(true);
          opt.onError!(new Error("上传失败"));
        });
    },
    beforeUpload: (file) => {
      setFileList([
        {
          name: file.name,
          status: "waiting",
        },
        ...fileList,
      ]);
      setIsModalVisible(true);
      // 在这里做上传前的预处理
      setLastFileUploading(true);
      setlastFileError(false);
    },
    onDrop() {},
    showUploadList: false,
  };
  // 重新渲染Modal使表格的上传进度一栏更新
  useEffect(() => {
    if (fileList.length > 0) {
      setIsModalVisible(true);
    }
  }, [fileList]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const columns = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "上传进度",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (status === "waiting") {
          return <Badge color="orange" text="等待上传" />;
        } else if (status === "uploading") {
          return <Badge color="blue" text="正在解析" />;
        } else if (status === "error") {
          return <Badge color="red" text="上传失败" />;
        } else if (status === "done") {
          return <Badge color="#1fe02f" text="上传成功" />;
        } else {
          return <Badge color="#ad1fe0" text="已存在重复论文" />;
        }
      },
      width: "30%",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_: any, record: File) => {
        if (record.paper_id) {
          return (
            <Link
              to={`/pdf?pdfId=${record.paper_id}`}
              target="_blank"
              className="text-primary hover:text-[#e2a3ac]"
            >
              开始辅读
            </Link>
          );
        } else {
          return null;
        }
      },
      width: "20%",
    },
  ];

  return (
    <>
      <div className="flex h-full gap-2">
        <div className="w-1/2">
          <div className="font-semibold text-neutral-800 mb-3 mt-3.5">
            本地文件上传
          </div>
          <Dragger
            disabled={lastFileUploading}
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
          <div className="border border-gray-200 h-56 rounded-lg overflow-y-auto">
            <RecentReading recentPaperList={recentPaperList} />
          </div>
        </div>
      </div>
      <Modal
        title={
          <div
            style={{ width: "100%", cursor: "move" }}
            className="mb-4 h-8 text-base font-semibold text-neutral-800 leading-[32px]"
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            {lastFileUploading ? (
              <>
                <LoadingOutlined className="mr-1.5" />
                <span>正在上传中</span>
              </>
            ) : lastFileError ? (
              <>
                <CloseOutlined className="text-red-500 mr-1.5" />
                <span>上传失败</span>
              </>
            ) : (
              <>
                <CheckCircleOutlined className="text-[#1fe02f] mr-1.5" />
                <span>上传完成</span>
              </>
            )}
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose
        maskClosable={false}
        style={{
          position: "absolute",
          top: 100,
          right: 20,
        }}
        onOk={handleOk}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className="text-stone-400 text-xs mb-2 mt-2.5">
          重复上传的文件会智能去重，同论文不同版本PDF会自动合并
        </div>
        <Table
          columns={columns}
          dataSource={fileList}
          pagination={false}
          className="[&_.ant-table-cell]:!p-2 mb-5"
        />
      </Modal>
    </>
  );
};
