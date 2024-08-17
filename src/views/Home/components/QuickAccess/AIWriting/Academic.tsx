import Icon from "@ant-design/icons";
import { GradientBulbOutlined } from "@/common/icons/GradientBulbOutlined";
import React from "react";
import { Divider, Form, Input } from "antd";
import { OPERATE } from "@/views/Home/model";

export const Academic = () => {
  const [form] = Form.useForm();
  return (
    <>
      <div className="h-20 flex items-center w-full">
        <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center mr-5">
          <Icon component={GradientBulbOutlined} />
        </div>
        <div className="flex flex-col">
          <div className="text-topbar-text h-6 leading-6 font-bold">
            学术论文
          </div>
          <div className="leading-5 text-xs text-stone-500">
            专业化、条理化、结构化的论文内容轻松写作，全学科适用
          </div>
        </div>
      </div>
      <Divider className="mb-1 mt-0 border-gray-300" />
      <Form form={form} name={OPERATE.ACADEMIC}>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">论文题目</div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "请填写论文题目！" }]}
            className="mb-0"
          >
            <Input placeholder="请输入论文题目" className="w-[413px] h-10" />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
