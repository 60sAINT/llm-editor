import Icon, { QuestionCircleFilled } from "@ant-design/icons";
import React from "react";
import { Button, Divider, Form, Input, InputNumber, Tooltip } from "antd";
import { OPERATE } from "@/views/Home/model";
import { Microscope } from "@/common/icons";
import { AIWritingProps } from "../interface";

export const ExperimentReport: React.FC<AIWritingProps> = ({ className }) => {
  const [form] = Form.useForm();

  return (
    <div className={className}>
      <div className="h-20 flex items-center w-full">
        <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center mr-5">
          <Icon component={Microscope} />
        </div>
        <div className="flex flex-col">
          <div className="text-topbar-text h-6 leading-6 font-bold">
            实验报告
          </div>
          <div className="leading-5 text-xs text-stone-500">
            根据实验过程和结果，准确生成实验报告，支持科学研究和学术发表
          </div>
        </div>
      </div>
      <Divider className="mb-3 mt-0 border-gray-300" />
      <Form form={form} name={OPERATE.SPEECH}>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">实验名称</div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "请填写实验名称！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input placeholder="请输入实验名称" className="h-10" />
          </Form.Item>
        </div>
        <div className="flex justify-between items-top mt-3">
          <div className="text-topbar-text">实验目的</div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "请填写实验目的！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input.TextArea placeholder="请输入实验目的" rows={4} />
          </Form.Item>
        </div>
        <div className="flex justify-between items-top mt-3">
          <div className="text-topbar-text">
            报告目录
            <Tooltip title="选填">
              <QuestionCircleFilled className="ml-2 text text-blue-500" />
            </Tooltip>
          </div>
          <Form.Item name="title" className="w-ai-writing-form-item mb-0">
            <Input.TextArea placeholder="请输入报告目录" rows={4} />
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
            生成实验报告
          </Button>
        </div>
      </Form>
    </div>
  );
};
