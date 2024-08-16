import React, { useRef, useState } from "react";
import { Affix, Input, InputRef } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

const Community = () => {
  const [introVisible, setIntroVisible] = useState<boolean>(true);
  const searchInputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="w-full h-full overflow-auto relative">
      <Affix offsetTop={56}>
        <div
          className={`${
            introVisible ? "" : "hidden"
          } font-catalyst-pingfang bg-[#f9ebed] w-full text-gray-800 font-medium px-11 py-5 tracking-wider leading-relaxed text-sm`}
        >
          <span className="font-bold text-[15px]">【社区】</span>
          ：一个专注于学术知识体系建构的创作与分享平台，以“汇聚学术智慧、创造共享知识”为平台愿景，号召科研者共同建设“探究-创作-分享-沉淀”的学术生态闭环。
          <div
            className="absolute top-2 right-2 w-[18px] h-[18px] flex items-center justify-center hover:bg-[#f5dee1] cursor-pointer"
            onClick={() => {
              setIntroVisible(false);
            }}
          >
            <CloseOutlined className="text-xs" />
          </div>
        </div>
        <div className="px-36 py-6">
          <Input
            ref={searchInputRef}
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="在『推荐』中搜索文章"
            className="w-full rounded-[20px] mx-auto h-8"
          />
        </div>
      </Affix>
      <div className="px-36"></div>
    </div>
  );
};

export default Community;
