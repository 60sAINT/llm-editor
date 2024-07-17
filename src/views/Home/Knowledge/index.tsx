import React, { useMemo, useState } from "react";
import { Input, Button, Modal, Form, List, Card, Tooltip } from "antd";
import {
  DeleteOutlined,
  FolderOpenOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { knowledgeApi } from "./api";
import { deleteConfirm } from "@/utils/deleteConfirm";
import "./index.css";

const KnowledgeBaseApp: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<string>("");

  const { data, loading, refresh } = useRequest(knowledgeApi.getKnowledgeList, {
    manual: false,
  });

  const { runAsync: createDb, loading: createLoading } = useRequest((v) =>
    knowledgeApi.createKnowledge(v)
  );

  const { runAsync: deleteDb } = useRequest(async (v) => {
    const res = await knowledgeApi.delKnowledge(v);
    if (res) refresh();
  });

  const dataSource = useMemo(
    () => data?.filter((item) => item.name.includes(filteredData)),
    [data, filteredData]
  );

  const onOk = async () => {
    const value = await form.validateFields();
    await createDb(value);
    refresh();
    setIsModalVisible(false);
  };

  const toDb = (db_name: string) =>
    window.open(`./db?db_name=${db_name}`, "_blank");

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="w-1/3 text-base">全部知识库</div>
        <div className="w-2/3 flex justify-end items-center mb-4">
          <Input.Search
            placeholder="搜索知识库"
            onSearch={setFilteredData}
            className="mr-6 w-2/5 [&_input:focus]:!border-primary [&_input:focus-within]:shadow-sm [&_input:focus-within]:!shadow-[#f3d7db] [&_input:hover]:!border-primary [&_button:hover]:!text-primary"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            新建知识库
          </Button>
        </div>
      </div>
      <List
        rowKey={"name"}
        grid={{ gutter: 16, column: 6 }}
        dataSource={dataSource}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <span
                  onClick={() => toDb(item.name)}
                  className="font-bold text-2xl inline-block h-full"
                >
                  {item.name}
                </span>
              }
              className="shadow-md card-hover pt-4 [&>.ant-card-head]:px-4 [&>.ant-card-body]:p-0 [&>.ant-card-head]:border-none h-48 [&>.ant-card-body]:mt-[83px] [&>.ant-card-body]:w-full"
            >
              <div
                className="absolute right-1.5 top-1 delete px-1.5 py-0.5 rounded-md"
                onClick={() =>
                  deleteConfirm(async () => await deleteDb(item.name))
                }
              >
                <Tooltip title="删除知识库">
                  <DeleteOutlined className="text-zinc-500" />
                </Tooltip>
              </div>
              <div
                className="card-footer w-full bg-primary/20 text-xs text-zinc-500 font-bold"
                onClick={() => toDb(item.name)}
              >
                <FolderOpenOutlined className="mr-1" />
                打开知识库
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="新建知识库"
        open={isModalVisible}
        onOk={onOk}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{ loading: createLoading }}
        cancelButtonProps={{ hidden: true }}
      >
        <Form form={form}>
          <Form.Item
            name="db_name"
            label="知识库名称"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item name="description" label="描述">
                        <Input.TextArea />
                    </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default KnowledgeBaseApp;
