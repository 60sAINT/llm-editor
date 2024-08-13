import React, { useState, useEffect, useRef } from "react";
import { Input, Skeleton, Tag } from "antd";
import {
  CheckOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
// import { searchApi } from './api';

export interface SearchResult {
  field: string;
  discipline: string;
}

export const InterestTagSelectModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [middleTags, setMiddleTags] = useState<SearchResult[]>([]);
  const [selectedTags, setSelectedTags] = useState<SearchResult[]>([]);
  const inputRef = useRef(null);

  const { run: fetchSearchResults } = useRequest(async (query) => {
    // const res = await searchApi(query);
    // return res.data;
  });

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    setShowDropdown(true);
    // const data = await fetchSearchResults(searchTerm);
    const data = [
      {
        field: "Deep learning",
        discipline: "Artificial intelligence -> Computer science",
      },
      {
        field: "Machine Learning",
        discipline: "Artificial intelligence -> Computer science",
      },
    ];
    setSearchResults(data);
    setLoading(false);
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handlePressEnter = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTagClick = (tag: SearchResult) => {
    if (selectedTags.some((selectedTag) => selectedTag.field === tag.field)) {
      const updatedSelectedTags = selectedTags.filter(
        (selectedTag) => selectedTag.field !== tag.field
      );
      setSelectedTags(updatedSelectedTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowDropdown(false);
  };

  const handleTagRemove = (tag: SearchResult) => {
    setSelectedTags(
      selectedTags.filter((selectedTag) => selectedTag.field !== tag.field)
    );
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setShowDropdown(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    // 模拟从后端获取中间标签数据
    const fetchMiddleTags = async () => {
      // const res = await fetchMiddleTagsApi();
      // setMiddleTags(res.data);
      const data = [
        { field: "Transformer", discipline: "NLP -> AI" },
        { field: "GPT", discipline: "NLP -> AI" },
        { field: "Computer Vision", discipline: "CV -> AI" },
        { field: "Reinforcement Learning", discipline: "ML -> AI" },
      ];
      setMiddleTags(data);
    };

    fetchMiddleTags();
  }, []);

  return (
    <div className="px-4 pt-5 pb-1 w-[720px]">
      <div className="font-semibold text-2xl mb-6 text-stone-900 leading-[40px]">
        仅有一步，为获取更优质的内容，
        <br />
        请选择感兴趣的领域标签
      </div>
      <div className="mt-1.5 mb-5">
        <Input
          className="w-72"
          ref={inputRef}
          placeholder="请输入关键词"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleSearch} // Optionally, you can fetch results when the input gains focus
          onPressEnter={handlePressEnter}
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="flex justify-between mb-3">
        <div className="text-base text-stone-900">热门关注</div>
        <div className="cursor-pointer text-gray-600">
          <ReloadOutlined
            className="mr-2"
            onClick={() => {
              console.log("重新请求随机标签");
            }}
          />
          换一批
        </div>
      </div>
      <div className={`dropdown-container ${showDropdown ? "" : "hidden"}`}>
        <Skeleton active loading={loading}>
          <div className="flex justify-between">
            <div>学科领域</div>
            <div>所属学科</div>
          </div>
          <div>
            {/* Render search results here */}
            {searchResults.length > 0 ? (
              searchResults.map((searchResult, index) => (
                <div
                  key={index}
                  onClick={() => handleTagClick(searchResult)}
                  style={{
                    backgroundColor: selectedTags.some(
                      (tag) => tag.field === searchResult.field
                    )
                      ? "blue"
                      : "white",
                    color: selectedTags.some(
                      (tag) => tag.field === searchResult.field
                    )
                      ? "white"
                      : "black",
                    padding: "8px",
                    margin: "4px 0",
                    cursor: "pointer",
                  }}
                >
                  <div>{searchResult.field}</div>
                  <div>
                    {selectedTags.some(
                      (tag) => tag.field === searchResult.field
                    ) && " -> 已添加"}
                  </div>
                </div>
              ))
            ) : (
              <div>No results found</div>
            )}
          </div>
        </Skeleton>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-1">
          {middleTags.map((tag, index) => (
            <Tag
              key={index}
              onClick={() => handleTagClick(tag)}
              color={
                selectedTags.some(
                  (selectedTag) => selectedTag.field === tag.field
                )
                  ? "magenta"
                  : "default"
              }
              style={{ cursor: "pointer" }}
              className="cursor-pointer h-8 text-stone-900 rounded-[3px] flex items-center text-[15px] border-transparent px-3 bg-slate-50"
            >
              {selectedTags.some(
                (selectedTag) => selectedTag.field === tag.field
              ) ? (
                <CheckOutlined className="mr-2.5" />
              ) : (
                <PlusOutlined className="mr-2.5" />
              )}
              {tag.field}
            </Tag>
          ))}
        </div>
      </div>
      <div className="mt-8 bg-slate-50 py-2.5 px-4">
        <span className="text-zinc-500 mr-4">{`已选（${selectedTags.length}）`}</span>
        {selectedTags.map((tag, index) => {
          return (
            <Tag
              key={index}
              closable
              onClose={(e) => {
                e.preventDefault();
                handleTagRemove(tag);
              }}
              color="magenta"
              className="mr-4 my-1"
            >
              {tag.field}
              {"加长加长"}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default InterestTagSelectModal;
