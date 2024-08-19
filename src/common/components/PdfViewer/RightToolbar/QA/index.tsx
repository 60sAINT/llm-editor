import React, { useState } from "react";
import axios from "axios";
import TypingEffect from "./TypingEffect";
import { Button, Input, Skeleton } from "antd";
import { CopyOutlined, SendOutlined } from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { pdfApi } from "../../api";
import { useAuth } from "@/provider/authProvider";
import { CopyButton } from "@/common/components/CopyButton";

interface ChatMessage {
  type: string;
  text: string;
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
  const { data: historyNToken, loading: historyNTokenLoading } = useRequest(
    async () => {
      const res = await pdfApi.getHistoryNToken(
        `Bearer ${token}` || "",
        pdfId!
      );
      return res;
    },
    { manual: false }
  );
  console.log(historyNToken);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenCount, setTokenCount] = useState<number>(0);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newChat = [...chat, { type: "user", text: input }];
    setChat(newChat);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/ask", { question: input });
      setChat([...newChat, { type: "bot", text: response.data.answer }]);
      setTokenCount(tokenCount + response.data.tokenCount);
    } catch (error) {
      console.error("Error sending question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2.5">
      <div className="chat-box bg-white p-4 rounded shadow h-96 overflow-y-scroll">
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
        {chat.map((message, index) => (
          <div
            key={index}
            className={`my-2 ${
              message.type === "user" ? "text-right" : "text-left"
            }`}
          >
            <TypingEffect text={message.text} />
          </div>
        ))}
        {loading && <div className="typing-indicator">_</div>}
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
        此对话，总计消耗 token {tokenCount}
      </div>
    </div>
  );
};

export default QA;
