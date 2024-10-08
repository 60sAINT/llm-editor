import {
  EditTwoTone,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Divider, Form, Input, InputNumber, Radio, Space } from "antd";
import { OPERATE } from "@/views/Home/model";
import { red } from "@ant-design/colors";
import { AIWritingProps } from "../interface";

export const Comp: React.FC<AIWritingProps> = ({ className }) => {
  const [form] = Form.useForm();
  const [keywords, setKeywords] = useState([""]);
  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };
  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  return (
    <div className={className}>
      <div className="h-20 flex items-center w-full">
        <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center mr-5">
          <EditTwoTone twoToneColor={red.primary} className="text-[22px]" />
        </div>
        <div className="flex flex-col">
          <div className="text-topbar-text h-6 leading-6 font-bold">
            学生作文
          </div>
          <div className="leading-5 text-xs text-stone-500">
            根据给定字数和主题，生成言辞优美、流畅的学生作文
          </div>
        </div>
      </div>
      <Divider className="mb-3 mt-0 border-gray-300" />
      <Form form={form} name={OPERATE.SPEECH}>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">作文题目</div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "请填写作文题目！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input placeholder="请输入作文题目" className="h-10" />
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
        <div className="flex justify-between items-start mt-3">
          <div className="text-topbar-text h-10 leading-10">写作要求</div>
          <Form.Item name="subject" className="mb-0 w-ai-writing-form-item">
            <Input.TextArea placeholder="语言风格、案例分析等" rows={4} />
          </Form.Item>
        </div>
        <div className="flex justify-between h-12 items-center mt-2">
          <div className="text-topbar-text">字数限制</div>
          <div className="w-ai-writing-form-item flex items-center">
            <Form.Item
              name="language"
              rules={[{ required: true, message: "请限制字数" }]}
              className="mb-0 inline-block"
            >
              <InputNumber className="h-10" />
            </Form.Item>
            <span className="ml-2">字</span>
          </div>
        </div>
        <div className="flex justify-between h-12 items-center">
          <Button type="primary" className="w-full mt-3 h-10">
            生成学生作文
          </Button>
        </div>
      </Form>
    </div>
  );
};
