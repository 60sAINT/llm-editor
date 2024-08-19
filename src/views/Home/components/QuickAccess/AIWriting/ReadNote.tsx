import Icon from "@ant-design/icons";
import React from "react";
import { Button, Divider, Form, Input, InputNumber, Select } from "antd";
import { OPERATE } from "@/views/Home/model";
import { ReadingNote } from "@/common/icons";
import { AIWritingProps } from "../interface";

export const ReadNote: React.FC<AIWritingProps> = ({ className }) => {
  const [form] = Form.useForm();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className={className}>
      <div className="h-20 flex items-center w-full">
        <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center mr-5">
          <Icon component={ReadingNote} />
        </div>
        <div className="flex flex-col">
          <div className="text-topbar-text h-6 leading-6 font-bold">
            读书笔记
          </div>
          <div className="leading-5 text-xs text-stone-500">
            汇总整理阅读的书籍、文章或材料，生成言之有物的读书笔记
          </div>
        </div>
      </div>
      <Divider className="mb-3 mt-0 border-gray-300" />
      <Form form={form} name={OPERATE.SOCIALREPORT}>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">阅读材料</div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "请填写阅读材料！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input placeholder="请输入阅读材料" className="h-10" />
          </Form.Item>
        </div>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">笔记形式</div>
          <Form.Item name="subject" className="mb-0 w-ai-writing-form-item">
            <Select
              defaultValue="abstract"
              className="h-10"
              onChange={handleChange}
              options={[
                { value: "abstract", label: "摘要" },
                { value: "comment", label: "评论" },
                { value: "feeling", label: "心得" },
              ]}
            />
          </Form.Item>
        </div>
        <div className="flex justify-between items-start mt-3">
          <div className="text-topbar-text h-10 leading-10">仿写样本</div>
          <Form.Item name="subject" className="mb-0 w-ai-writing-form-item">
            <Input.TextArea placeholder="请输入仿写样本" rows={4} />
          </Form.Item>
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
            生成读书笔记
          </Button>
        </div>
      </Form>
    </div>
  );
};
