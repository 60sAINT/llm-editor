import { BookTwoTone, QuestionCircleFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Skeleton,
  Tooltip,
} from "antd";
import { OPERATE } from "@/views/Home/model";
import { AIWritingProps } from "../interface";
import { useAuth } from "@/provider/authProvider";
import { useRequest } from "@/hooks/useRequest";
import { aiIWritingApi } from "../api";

export const CourseReport: React.FC<AIWritingProps> = ({ className }) => {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const [output, setOutput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [displayFrame, setDisplayFrame] = useState<boolean>(false);
  const outputRef = useRef<HTMLDivElement>(null); // 用于引用输出容器

  const { runAsync: courseReport } = useRequest(async (processedData) => {
    const res = await aiIWritingApi.courseReport(processedData);
    return res;
  });
  const generateCourseReport = async () => {
    const value = await form.validateFields();
    setDisplayFrame(true);
    const response = await courseReport({ ...value, token });
    const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
    let fullText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (value) {
        fullText += value;
        setOutput(fullText);
      }
      if (done) {
        break;
      }
    }
  };
  useEffect(() => {
    if (output) {
      setIsTyping(true); // 开始打字时设置为 true
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + output[index]);
        index++;
        if (index >= output.length) {
          clearInterval(interval);
          setIsTyping(false); // 打字结束时设置为 false
        }
      }, 25); // 每25ms显示一个字符
      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [output]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [displayedText]); // 每次 displayedText 更新时滚动到最下方

  return (
    <div className={className}>
      <div className="h-20 flex items-center w-full">
        <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center mr-5">
          <BookTwoTone twoToneColor="hotpink" className="text-[22px]" />
        </div>
        <div className="flex flex-col">
          <div className="text-topbar-text h-6 leading-6 font-bold">
            课程报告
          </div>
          <div className="leading-5 text-xs text-stone-500">
            提供结构化框架、专业化指导，协助撰写课程报告材料
          </div>
        </div>
      </div>
      <Divider className="mb-3 mt-0 border-gray-300" />
      <Form form={form} name={OPERATE.COURSEREPORT}>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">课程名称</div>
          <Form.Item
            name="course"
            rules={[{ required: true, message: "请填写论文题目！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input placeholder="请输入课程名称" className="h-10" />
          </Form.Item>
        </div>
        <div className="flex justify-between h-12 items-center">
          <div className="text-topbar-text">报告主题</div>
          <Form.Item
            name="topic"
            rules={[{ required: true, message: "请填写报告主题！" }]}
            className="w-ai-writing-form-item mb-0"
          >
            <Input placeholder="请输入报告主题" className="h-10" />
          </Form.Item>
        </div>
        <div className="flex justify-between items-start mt-3">
          <div className="text-topbar-text h-10 leading-10">
            报告目录
            <Tooltip title="选填">
              <QuestionCircleFilled className="ml-2 text text-blue-500" />
            </Tooltip>
          </div>
          <Form.Item name="outline" className="mb-0 w-ai-writing-form-item">
            <Input.TextArea placeholder="请输入报告目录" rows={4} />
          </Form.Item>
        </div>
        <div className="flex justify-between items-start mt-3">
          <div className="text-topbar-text h-10 leading-10">写作要求</div>
          <Form.Item
            name="requirements"
            className="mb-0 w-ai-writing-form-item"
          >
            <Input.TextArea placeholder="语言风格、案例分析等" rows={4} />
          </Form.Item>
        </div>
        <div className="flex justify-between h-12 items-center mt-2">
          <div className="text-topbar-text">字数限制</div>
          <div className="w-ai-writing-form-item flex items-center">
            <Form.Item
              name="limit"
              rules={[{ required: true, message: "请限制字数" }]}
              className="mb-0 inline-block"
            >
              <InputNumber className="h-10" />
            </Form.Item>
            <span className="ml-2">字</span>
          </div>
        </div>
        <div className="flex justify-between h-12 items-center">
          <Button
            type="primary"
            className="w-full mt-3 h-10"
            onClick={generateCourseReport}
          >
            生成课程报告
          </Button>
        </div>
      </Form>
      {displayFrame && (
        <div
          className="py-2 border-blue-100 border rounded mt-4 px-2.5 text-[13px] overflow-y-auto max-h-60"
          ref={outputRef} // 引用输出容器
        >
          <Skeleton loading={!displayedText} active title={false}>
            {displayedText}
            {isTyping && <span className="blinking-cursor">|</span>}
          </Skeleton>
        </div>
      )}
    </div>
  );
};
