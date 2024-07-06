import React, { useMemo } from "react";
import { Space, Table } from "antd";
import {
  FileAddOutlined,
  ImportOutlined,
  OpenAIOutlined,
} from "@ant-design/icons";

enum OPERATE {
  CREATE = "create",
  WRITE = "write",
  UPLOAD = "upload",
}
const Content = () => {
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
      window.open("/newDoc", "_blank");
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "文件名",
        dataIndex: "name",
        width: "50%",
      },
      {
        title: "创建者",
        dataIndex: "creator",
        width: "20%",
      },
      {
        title: "打开时间",
        dataIndex: "time",
        width: "30%",
      },
    ],
    []
  );

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
      <Table rowKey={"id"} dataSource={[]} columns={columns} />
    </div>
  );
};

export default Content;
