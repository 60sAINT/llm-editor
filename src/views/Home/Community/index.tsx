import React, { useRef, useState, useEffect } from "react";
import { Affix, Input, InputRef, Card, Avatar, Button } from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  LikeOutlined,
  LikeFilled,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { postApi } from "./api";
import { useAuth } from "@/provider/authProvider";

const { Meta } = Card;

const Community = () => {
  const { token } = useAuth();
  const [introVisible, setIntroVisible] = useState<boolean>(true);
  const searchInputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: postList,
    run: getPostList,
    loading: getPostListLoading,
  } = useRequest(
    async () => {
      const res = await postApi.getPostList({ token: `Bearer ${token}` || "" });
      return res;
    },
    { manual: false }
  );
  console.log(postList);

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
        <div className="px-36 py-6 bg-white">
          <Input
            ref={searchInputRef}
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="在『社区』中搜索文章"
            className="w-full rounded-[20px] mx-auto h-8"
          />
        </div>
      </Affix>
      <div className="px-36 grid grid-cols-3 gap-4">
        {postList &&
          postList.map((post) => (
            <Card
              key={post.post_id}
              cover={<img alt="cover" src={post.cover} />}
              actions={[
                <Button
                  type="text"
                  icon={
                    post.user_like_status ? <LikeFilled /> : <LikeOutlined />
                  }
                >
                  {post.likes}
                </Button>,
              ]}
              className="border-[6px] border-transparent hover:border-[#fbf2f3]"
            >
              <Meta
                avatar={<Avatar>{post.user_nickname.charAt(0)}</Avatar>}
                title={post.title}
                description={
                  <>
                    <p>{post.summary}</p>
                    <p>{new Date(post.created_at).toLocaleDateString()}</p>
                  </>
                }
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Community;
