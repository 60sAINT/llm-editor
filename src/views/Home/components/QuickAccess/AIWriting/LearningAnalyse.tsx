import Icon, { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Divider, Form, Input, InputNumber } from "antd";
import { OPERATE } from "@/views/Home/model";
import { Analyze } from "@/common/icons";

export const LearningAnalyse = () => {
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
    <>
      <div className="h-20 flex items-center w-full">
        <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center mr-5">
          <Icon component={Analyze} />
        </div>
        <div className="flex flex-col">
          <div className="text-topbar-text h-6 leading-6 font-bold">
            学请分析
          </div>
          <div className="leading-5 text-xs text-stone-500">
            综合学生各方面表现，帮助深入分析其学习情况
          </div>
        </div>
      </div>
      <Divider className="mb-3 mt-0 border-gray-300" />
      <Form form={form} name={OPERATE.SPEECH}>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">主题</div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "请填写主题！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input placeholder="请输入主题" className="h-10" />
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
            生成学情分析
          </Button>
        </div>
      </Form>
    </>
  );
};
