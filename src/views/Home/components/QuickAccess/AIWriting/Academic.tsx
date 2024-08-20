import Icon, { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { GradientBulbOutlined } from "@/common/icons/GradientBulbOutlined";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Skeleton,
  Space,
} from "antd";
import { OPERATE } from "@/views/Home/model";
import { AIWritingProps } from "../interface";
import { useRequest } from "@/hooks/useRequest";
import { aiIWritingApi } from "../api";
import { useAuth } from "@/provider/authProvider";

export const Academic: React.FC<AIWritingProps> = ({ className }) => {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const [output, setOutput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [displayFrame, setDisplayFrame] = useState<boolean>(false);
  const outputRef = useRef<HTMLDivElement>(null); // 用于引用输出容器

  const [keywords, setKeywords] = useState([""]);
  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };
  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  const { runAsync: paperOutline } = useRequest(async (processedData) => {
    const res = await aiIWritingApi.paperOutline(processedData);
    return res;
  });
  const processFormData = (value: {
    [x: string]: any;
    title: any;
    subject: any;
    target: any;
    language: any;
    standard: any;
  }) => {
    const { title, subject, target, language, standard, ...rest } = value;

    // Extract keywords
    const keywords = Object.keys(rest)
      .filter((key) => key.startsWith("keyword"))
      .map((key) => rest[key]);

    return {
      title,
      keywords,
      subject,
      target,
      language,
      standard,
      token,
    };
  };
  const generatePaperOutline = async () => {
    const value = await form.validateFields();
    const processedData = processFormData(value);
    setDisplayFrame(true);
    const response = await paperOutline(processedData);
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
      <Form
        form={form}
        name={OPERATE.ACADEMIC}
        initialValues={{ standard: "本科毕设" }}
      >
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
