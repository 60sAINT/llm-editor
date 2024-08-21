import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import { knowledgeApi } from "@/views/Home/Knowledge/api";
import { Form, InputNumber, Radio, Select, Space } from "antd";
import React from "react";

export const Setting: React.FC = () => {
  const { token } = useAuth() as { token: string };
  const { data } = useRequest(
    async () => {
      const res = await knowledgeApi.getKnowledgeList({ token });
      return res;
    },
    {
      manual: false,
    }
  );
  console.log(data);
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={{
        limit: 100,
        language: "english",
        knwoledgeDB: "",
        modelName: "ernie-3.5-turbo",
      }}
    >
      <div className="flex justify-between h-12 items-center mt-2">
        <div className="text-topbar-text">字数限制</div>
        <div className="w-ai-writing-form-item flex items-center">
          <Form.Item name="limit" className="mb-0 inline-block">
            <InputNumber className="h-10" />
          </Form.Item>
          <span className="ml-2">字</span>
        </div>
      </div>
      <div className="flex justify-between h-12 items-center mt-2">
        <div className="text-topbar-text">语种</div>
        <Form.Item
          name="language"
          rules={[{ required: true, message: "请选择语种！" }]}
          className="mb-0 w-ai-writing-form-item"
        >
          <Radio.Group>
            <Space direction="horizontal">
              <Radio value="chinese">中文</Radio>
              <Radio value="english">英文</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>
      <div className="flex justify-between h-12 items-center mt-2">
        <div className="text-topbar-text">模型</div>
        <Form.Item name="model_name" className="mb-0 w-ai-writing-form-item">
          <Select
            defaultValue="ernie-3.5-turbo"
            className="h-10"
            options={[
              { value: "ernie-3.5-turbo", label: "ernie-3.5-turbo" },
              { value: "ernie-3.5", label: "ernie-3.5" },
              { value: "ernie-4.0", label: "ernie-4.0" },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex justify-between h-12 items-center mt-3">
        <div className="text-topbar-text">知识库</div>
        <Form.Item
          name="knowledge_base_name"
          rules={[{ required: true, message: "请填写研究目标！" }]}
          className="mb-0 w-ai-writing-form-item"
        >
          <Select
            placeholder="请选择知识库"
            className="h-10"
            options={data?.map((dbName) => {
              return { value: dbName.name, label: dbName.name };
            })}
            onChange={(dbName) => {
              localStorage.setItem("knowledge_base_name", dbName); // 存储到localStorage
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
};
