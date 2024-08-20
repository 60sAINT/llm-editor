import React, { useEffect, useRef, useState } from "react";
import {
  Affix,
  Input,
  InputRef,
  Card,
  Avatar,
  Button,
  Skeleton,
  FloatButton,
  Tooltip,
  Modal,
} from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  LikeOutlined,
  LikeFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { postApi } from "./api";
import { useAuth } from "@/provider/authProvider";
import { EditNewPostModal } from "./EditNewPostModal";

const { Meta } = Card;

const Community = () => {
  const { token } = useAuth();
  const [introVisible, setIntroVisible] = useState<boolean>(true);
  const searchInputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalPublicOpen, setModalPublicOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const getNewPost = (newContent: string) => setNewPostContent(newContent);
  useEffect(() => {
    getPostList();
  }, [newPostContent]);

  const {
    runAsync: getPostList,
    data: postList,
    loading: getPostListLoading,
  } = useRequest(
    async () => {
      const res = await postApi.getPostList({ token: `Bearer ${token}` || "" });
      return res.PostList;
    },
    { manual: false }
  );

  return (
    <>
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
        <Skeleton
          active
          loading={getPostListLoading}
          title={false}
          paragraph={{ rows: 8 }}
          className="px-36 "
        >
          <div className="px-36 grid grid-cols-3 gap-4">
            {postList &&
              postList.map((post: any) => (
                <Card
                  key={post.post_id}
                  cover={<img alt="cover" src={post.cover} />}
                  actions={[
                    <Button
                      type="text"
                      icon={
                        post.user_like_status ? (
                          <LikeFilled />
                        ) : (
                          <LikeOutlined />
                        )
                      }
                    >
                      {post.likes}
                    </Button>,
                  ]}
                  className="border-[6px] border-transparent p-1.5 hover:border-[#f9ebed] bg-[#fdf8f9]"
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
        </Skeleton>
      </div>
      <Tooltip title="发布帖子">
        <FloatButton
          icon={<PlusOutlined className="text-white" />}
          className="[&>div]:!bg-neutral-800"
          onClick={() => setModalPublicOpen(true)}
        />
      </Tooltip>
      <Modal
        title={<div className="border-b border-gray-200 pb-3.5">发布帖子</div>}
        centered
        open={modalPublicOpen}
        onOk={() => setModalPublicOpen(false)}
        onCancel={() => setModalPublicOpen(false)}
        className="[&_.ant-modal-footer]:hidden [&_.ant-modal-content]:w-[696px] [&_.ant-modal-content]:h-[420px] [&_.ant-modal-body]:h-[270px]"
      >
        <EditNewPostModal
          setModalPublicOpen={setModalPublicOpen}
          setNewPost={getNewPost}
        />
      </Modal>
    </>
  );
};

export default Community;
