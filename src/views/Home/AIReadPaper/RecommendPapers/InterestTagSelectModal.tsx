import React, { useState, useEffect, useRef } from "react";
import { Input, Skeleton, Tag } from "antd";
import {
  CheckOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { paperApi } from "../api";
import { useAuth } from "@/provider/authProvider";
import { InterestTagSelectModalProps, TagType } from "../interface";

export const InterestTagSelectModal: React.FC<InterestTagSelectModalProps> = ({
  getInterestTags,
  userInterestTags,
}) => {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>(userInterestTags);
  const [displayTags, setDisplayTags] = useState<TagType[]>([]);
  const inputRef = useRef(null);

  const { data: allInterestTags, loading: getAllInterestTagsLoading } =
    useRequest(
      async () => {
        const res = await paperApi.getAllInterestTags({
          token: `Bearer ${token}` || "",
        });
        return res;
      },
      { manual: false }
    );

  const handleSearch = async (value: string) => {
    if (value.trim() === "") {
      setShowDropdown(false);
      return;
    }
    setShowDropdown(true);
    const filteredResults = allInterestTags.filter((tag: TagType) =>
      tag.field.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {
      handleSearch(value);
    } else {
      setShowDropdown(false);
    }
  };

  const handlePressEnter = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleTagClick = (tag: TagType) => {
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

  const handleTagRemove = (tag: TagType) => {
    setSelectedTags(
      selectedTags.filter((selectedTag) => selectedTag.field !== tag.field)
    );
  };

  const getRandomTags = (tags: TagType[], count: number) => {
    const shuffled = tags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleReloadTags = () => {
    if (allInterestTags.length <= 10) {
      setDisplayTags(allInterestTags);
    } else {
      setDisplayTags(getRandomTags(allInterestTags, 10));
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setShowDropdown(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (allInterestTags) {
      handleReloadTags();
    }
  }, [allInterestTags]);

  useEffect(() => {
    getInterestTags(selectedTags);
  }, [selectedTags]);

  return (
    <div className="px-4 pt-5 pb-1 w-[720px]">
      <div className="font-semibold text-2xl mb-6 text-stone-900 leading-[40px]">
        仅有一步，为获取更优质的内容，
        <br />
        请选择感兴趣的领域标签
      </div>
      <div className="mt-1.5 mb-5 relative">
        <Input
          className="w-72"
          ref={inputRef}
          placeholder="请输入关键词"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => handleSearch(searchTerm)} // Optionally, you can fetch results when the input gains focus
          onPressEnter={handlePressEnter}
          prefix={<SearchOutlined />}
        />

        <div
          className={`dropdown-container ${
            showDropdown ? "" : "hidden"
          } absolute z-[100] min-w-72 max-w-[640px] max-h-40 overflow-y-auto py-1 bg-white border-gray-200 shadow-interest-search-results top-9`}
        >
          <Skeleton active loading={getAllInterestTagsLoading} className="p-3">
            {searchResults.length > 0 && (
              <div className="py-1 px-4">
                <span className="inline-block w-60 mr-4 text-gray-600 text-xs leading-6 h-6">
                  学科领域
                </span>
                <span className="text-gray-600 text-xs leading-6 h-6">
                  所属学科
                </span>
              </div>
            )}
            {searchResults.length > 0 ? (
              searchResults.map((searchResult, index) => (
                <div
                  key={index}
                  onClick={() => handleTagClick(searchResult)}
                  className="py-1 px-4 flex items-center leading-6 text-slate-800 cursor-pointer w-full hover:!bg-gray-100"
                  style={{
                    backgroundColor: selectedTags.some(
                      (tag) => tag.field === searchResult.field
                    )
                      ? "#fbf2f3"
                      : "white",
                    color: selectedTags.some(
                      (tag) => tag.field === searchResult.field
                    )
                      ? "#d67b88"
                      : "black",
                  }}
                >
                  <span className="inline-block w-60 whitespace-nowrap overflow-hidden mr-4">
                    {searchResult.field}
                  </span>
                  <div>
                    {selectedTags.some(
                      (tag) => tag.field === searchResult.field
                    ) ? (
                      " √ 已添加"
                    ) : (
                      <div className="max-w-[352px] whitespace-nowrap overflow-hidden text-ellipsis text-stone-500">
                        {searchResult.discipline}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-1 h-24 justify-center flex items-center leading-6 text-stone-400 w-full">
                <div>未找到相关结果</div>
              </div>
            )}
          </Skeleton>
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <div className="text-base text-stone-900">热门关注</div>
        <div
          className="cursor-pointer text-gray-600"
          onClick={handleReloadTags}
        >
          <ReloadOutlined className="mr-2" />
          换一批
        </div>
      </div>
      <Skeleton active loading={getAllInterestTagsLoading}>
        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {displayTags &&
              displayTags.map((tag, index) => (
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
      </Skeleton>
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
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default InterestTagSelectModal;
