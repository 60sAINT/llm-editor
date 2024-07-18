import React, { useState, useEffect } from "react";
import "./index.css";
import TextArea from "antd/es/input/TextArea";
import { Button, Divider } from "antd";
import {
  ExportOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { defaultApi } from "../../api";

interface Paper {
  title: string;
  link: string;
}

const Reference: React.FC = () => {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState<string>("");

  useEffect(() => {
    setPlaceholder(
      "如：\n·  互联网环境下中小学教育信息化\n·  本文从教育信息化的概念出发，分析了互联网环境下中小学教育信息化的现状"
    );
  }, []);

  const { runAsync: getReference } = useRequest(async (searchText) => {
    const res = await defaultApi.getReference(searchText);
    return res;
  });
  const handleSearch = async () => {
    setLoading(true);
    const response = await getReference(query);
    const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setLoading(false);
        break;
      }
      setPapers(JSON.parse(JSON.parse(value).data));
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="h-12 leading-10 text-slate-700">
          请输入您想要搜索的文献内容
        </div>
        <TextArea
          className="w-full p-2 border border-gray-300 rounded [&>textarea]:px-4 [&>textarea]:py-1.5"
          autoSize={{ maxRows: 5, minRows: 5 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          showCount
          maxLength={500}
        />
      </div>
      <Button
        className="w-full h-10 rounded mt-1.5"
        type="primary"
        onClick={handleSearch}
        icon={<SearchOutlined />}
      >
        检索
      </Button>
      <div className="mt-4">
        {papers && (
          <>
            {papers.map((paper: Paper, index: React.Key | null | undefined) => (
              <>
                <div key={index} className="pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-topbar-text font-bold">
                      {paper.title}
                    </span>
                    <div
                      className="bg-blue-50 rounded-[3px] pt-0.5 px-1 pb-1"
                      onClick={() => window.open(paper.link, "_blank")}
                    >
                      <ExportOutlined className="mr-0.5 text-[10px] text-blue-500" />
                      <a className="text-blue-500 text-[10px]">查看</a>
                    </div>
                  </div>
                </div>
                <Divider />
              </>
            ))}
          </>
        )}
        {loading && (
          <div className="flex justify-center mt-4 mb-4">
            <LoadingOutlined
              spin={loading}
              className="text-blue-300 text-4xl"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Reference;
