import Icon, { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { GradientBulbOutlined } from "@/common/icons/GradientBulbOutlined";
import React, { useState } from "react";
import { Button, Divider, Form, Input, Radio, Select, Space } from "antd";
import { OPERATE } from "@/views/Home/model";
import { AIWritingProps } from "../interface";

export const Academic: React.FC<AIWritingProps> = ({ className }) => {
  const [form] = Form.useForm();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [keywords, setKeywords] = useState([""]);
  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };
  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  const generatePaperOutline = () => {
    const value = form.validateFields();
    console.log(value);
  };

  return (
    <div className={className}>
      <div className="h-20 flex items-center w-full">
        <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center mr-5">
          <Icon component={GradientBulbOutlined} />
        </div>
        <div className="flex flex-col">
          <div className="text-topbar-text h-6 leading-6 font-bold">
            学术论文
          </div>
          <div className="leading-5 text-xs text-stone-500">
            专业化、条理化、结构化的论文框架轻松写作，全学科适用
          </div>
        </div>
      </div>
      <Divider className="mb-3 mt-0 border-gray-300" />
      <Form form={form} name={OPERATE.ACADEMIC}>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">论文题目</div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "请填写论文题目！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input placeholder="请输入论文题目" className="h-10" />
          </Form.Item>
        </div>
        <div className="flex justify-between items-top mt-3">
          <div className="text-topbar-text leading-10 h-10">关键词</div>
          <div className="w-ai-writing-form-item">
            <div className="w-full">
              {keywords.map((_, index) => (
                <div key={index} className="flex items-center mb-2 w-full">
                  <Form.Item
                    name={`keyword${index}`}
                    rules={[{ required: true, message: "请填写关键词！" }]}
                    className="mb-0 flex-grow"
                  >
                    <Input placeholder="请输入关键词" className="h-10" />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="ml-2"
                    onClick={() => removeKeyword(index)}
                  />
                </div>
              ))}
            </div>
            <Button
              type="dashed"
              onClick={addKeyword}
              className="h-10"
              icon={<PlusOutlined />}
            >
              添加关键词
            </Button>
          </div>
        </div>
        <div className="flex justify-between h-12 items-center mt-3">
          <div className="text-topbar-text">学科</div>
          <Form.Item
            name="subject"
            rules={[{ required: true, message: "请填写学科！" }]}
            className="mb-0 w-ai-writing-form-item"
          >
            <Input placeholder="请输入学科" className="h-10" />
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
          <Form.Item
            name="standard"
            rules={[{ required: true, message: "请选择论文标准！" }]}
            className="mb-0 w-ai-writing-form-item"
          >
            <Select
              defaultValue="undergraduate"
              className="h-10"
              onChange={handleChange}
              options={[
                { value: "undergraduate", label: "本科毕设" },
                { value: "graduate", label: "研究生毕业论文" },
                { value: "journal", label: "期刊会议学术论文" },
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
    </div>
  );
};
