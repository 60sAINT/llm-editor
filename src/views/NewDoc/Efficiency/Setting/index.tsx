import { Form, InputNumber, Radio, Select, Space } from "antd";
import { targetLanguage } from "common/utils";
import React from "react";

export const Setting = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={{
        limit: 100,
        targetLanguage: "english",
        knwoledgeDB: "无",
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
        <Form.Item name="model" className="mb-0 w-ai-writing-form-item">
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
        <div className="text-topbar-text">研究目标</div>
        <Form.Item
          name="target"
          rules={[{ required: true, message: "请填写研究目标！" }]}
          className="mb-0 w-ai-writing-form-item"
        >
          <Input placeholder="请输入研究目标" className="h-10" />
        </Form.Item>
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
        <div className="text-topbar-text">论文标准</div>
        <Form.Item name="standard" className="mb-0 w-ai-writing-form-item">
          <Select
            defaultValue="本科毕设"
            className="h-10"
            options={[
              { value: "本科毕设", label: "本科毕设" },
              { value: "研究生毕业论文", label: "研究生毕业论文" },
              { value: "期刊会议学术论文", label: "期刊会议学术论文" },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex justify-between h-12 items-center">
        <Button
          type="primary"
          className="w-full mt-3 h-10"
          onClick={generatePaperOutline}
        >
          生成论文大纲
        </Button>
      </div>
    </Form>
  );
};
