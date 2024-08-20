import React, { useState, useEffect, useRef } from "react";
import TypingEffect from "./TypingEffect";
import { Button, Input, Skeleton, Spin } from "antd";
import {
  CopyOutlined,
  Loading3QuartersOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { pdfApi } from "../../api";
import { useAuth } from "@/provider/authProvider";
import { CopyButton } from "@/common/components/CopyButton";

interface ChatMessage {
  answer: string;
  query: string;
}

export interface QAProps {
  pdfId: string;
}

const QA: React.FC<QAProps> = ({ pdfId }) => {
  const { token } = useAuth();
  const { data: sumNQuestions, loading: sumNQuestionsLoading } = useRequest(
    async () => {
      const res = await pdfApi.getQaSumNQuestions(
        `Bearer ${token}` || "",
        pdfId!
      );
      return res;
    },
    { manual: false }
  );
  const { data: history, loading: historyLoading } = useRequest(
    async () => {
      const res = await pdfApi.getHistory(`Bearer ${token}` || "", pdfId!);
      return res;
    },
    { manual: false }
  );
  const { data: tokenUsage, loading: tokenUsageLoading } = useRequest(
    async () => {
      const res = await pdfApi.getTokenUsage(`Bearer ${token}` || "", pdfId!);
      return res;
    },
    { manual: false }
  );
  const { runAsync: sendQuestion, loading: answerLoading } = useRequest(
    async (input: string) => {
      const res = await pdfApi.sendQuery({
        token: token!,
        paper_id: pdfId!,
        input_text: input,
      });
      return res;
    }
  );

  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    if (history) {
      setChat(history.chat_history);
    }
  }, [history]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    const newChat = [...chat, { query: input, answer: "" }];
    setChat(newChat);
    setInput("");

    // 发送问题请求
    const response = await sendQuestion(input);
    const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
    let answer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      answer += value;
      setChat((prevChat) =>
        prevChat.map((msg, index) =>
          index === prevChat.length - 1 ? { ...msg, answer } : msg
        )
      );
    }
  };

  return (
    <div className="p-2.5">
      <div
        className="chat-box bg-white p-4 rounded shadow h-96 overflow-y-scroll"
        ref={chatBoxRef}
      >
        <div className="bg-gray-100 p-3 rounded shadow mb-4">
          <p>你好，欢迎使用我(协心)为你提供的AI问答功能。</p>
          <p>
            你可以随时向我提问，我会基于我的理解来回答你的问题。下面是我为你提供的本篇文献的总结:
          </p>
        </div>
        <div className=" mb-4 flex items-end gap-1">
          <Skeleton loading={sumNQuestionsLoading} active title={false}>
            <div className="bg-gray-100 p-3 rounded shadow">
              <p>{sumNQuestions && sumNQuestions.summary}</p>
            </div>
            <CopyButton
              title={<CopyOutlined className="text-blue-500" />}
              copyText={sumNQuestions && sumNQuestions.summary}
            />
          </Skeleton>
        </div>
        <div className="bg-gray-100 p-3 rounded shadow mb-4">
          <p>以下是你可能对本文提出的问题示例:</p>
        </div>
        <Skeleton loading={sumNQuestionsLoading} active title={false}>
          <ul className="text-blue-500">
            {sumNQuestions &&
              sumNQuestions.questions
                .split("\n")
                .map((question: string, index: number) => {
                  // 去掉序号后的文字
                  const questionText = question.replace(/^\d+\.\s*/, "");
                  return (
                    <li
                      key={index}
                      className="cursor-pointer mb-1.5"
                      onClick={() => setInput(questionText)}
                    >
                      {question}
                    </li>
                  );
                })}
          </ul>
        </Skeleton>
        <Skeleton
          loading={historyLoading}
          active
          title={false}
          className="mt-4"
        >
          {chat &&
            chat.map((message, index) => (
              <div key={index}>
                {message.query && (
                  <div className="my-2 text-right bg-blue-500 p-3 rounded shadow mb-4 text-white">
                    {message.query}
                  </div>
                )}
                {message.answer ? (
                  <div className="my-2 text-left bg-gray-100 p-3 rounded shadow mb-4">
                    <TypingEffect text={message.answer} />
                  </div>
                ) : index === chat.length - 1 && answerLoading ? (
                  <div className="my-2 text-left bg-gray-100 p-3 rounded shadow mb-4">
                    <Spin />
                  </div>
                ) : null}
              </div>
            ))}
        </Skeleton>
      </div>
      <div className="input-box mt-4 flex items-stretch">
        <Input
          type="text"
          className="flex-grow px-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={(e) => e.key === "Enter" && handleSend()}
          placeholder="请输入您的问题"
        />
        <Button
          className="ml-2 p-2 h-full text-white rounded"
          onClick={handleSend}
          type="primary"
        >
          <SendOutlined className="text-white" />
        </Button>
      </div>
      <div className="mt-2 text-gray-500">
        此对话，总计消耗 token{" "}
        {tokenUsageLoading ? <Loading3QuartersOutlined spin /> : tokenUsage}
      </div>
    </div>
  );
};

export default QA;
