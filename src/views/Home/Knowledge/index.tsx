import React, { useMemo, useState } from "react";
import { Input, Button, Modal, Form, List, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { knowledgeApi } from "./api";

const KnowledgeBaseApp: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<string>("");

  const { data, loading, refresh } = useRequest(knowledgeApi.getKnowledgeList, {
    manual: false,
  });

  const { runAsync, loading: createLoading } = useRequest((v) =>
    knowledgeApi.CreateKnowledge(v)
  );

  const dataSource = useMemo(
    () => data?.filter((item) => item.title.includes(filteredData)),
    [data, filteredData]
  );

  const onOk = async () => {
    const value = await form.validateFields();
    await runAsync(value);
    refresh();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="搜索知识库"
          onSearch={setFilteredData}
          className="w-1/3 [&_input:focus]:!border-primary [&_input:focus-within]:shadow-sm [&_input:focus-within]:!shadow-[#f3d7db] [&_input:hover]:!border-primary [&_button:hover]:!text-primary"
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          新建知识库
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={dataSource}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} className="shadow-md">
              {item.description}
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
            name="title"
            label="标题"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeBaseApp;
