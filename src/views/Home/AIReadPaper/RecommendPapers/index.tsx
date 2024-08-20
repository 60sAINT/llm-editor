import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import React, { useState } from "react";
import { paperApi } from "../api";
import { Button, Form, Input, Modal, Skeleton, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { InterestTagSelectModal } from "./InterestTagSelectModal";
import { SearchProps } from "antd/es/input";
import { RecommendPaperType, TagType } from "../interface";

export const RecommendPapers = () => {
  const { token } = useAuth();
  const [form] = Form.useForm();
  const [modalInterestOpen, setModalInterestOpen] = useState<boolean>(false);
  const [interestTags, setInterestTags] = useState<TagType[]>([]);
  const getInterestTags = (tags: TagType[]) => setInterestTags(tags);

  const onSearch: SearchProps["onSearch"] = async (value, _e) => {
    if (value == "") {
      return;
    }
    getRecommendPaperList(value);
  };

  const {
    run: getRecommendPaperList,
    data: recommendpaperList,
    loading: recommendpaperListLoading,
  } = useRequest(
    async (searchInput = "") => {
      const res = await paperApi.searchPapers({
        token: `Bearer ${token}` || "",
        search_input: searchInput,
      });
      return res.data.paper_list;
    },
    { manual: false }
  );
  const { runAsync: updateInterestTags } = useRequest(async () => {
    const res = await paperApi.submitInterestTags({
      token: `Bearer ${token}` || "",
      interestTags,
    });
    return res;
  });
  const {
    run: getUserInterestTags,
    data: userInterestTags,
    loading: getInterestTagsListLoading,
  } = useRequest(
    async () => {
      const res = await paperApi.getUserInterestTags({
        token: `Bearer ${token}` || "",
      });
      return res.tags;
    },
    { manual: false }
  );
  return (
    <>
      <Button
        type="dashed"
        size="large"
        className="h-8 border-primary text-sm font text-primary rounded-sm mb-5"
        onClick={() => setModalInterestOpen(true)}
        disabled={getInterestTagsListLoading}
      >
        <PlusOutlined />
        添加兴趣标签
      </Button>
      <Skeleton
        active
        loading={getInterestTagsListLoading}
        paragraph={{ rows: 4 }}
        className="py-3 pr-3"
      >
        {userInterestTags && userInterestTags.length > 0 && (
          <div
            className="w-full border border-gray-200 h-9 py-1.5 pl-5 pr-3 bg-gray-50 rounded-sm mb-5 overflow-hidden text-ellipsis line-clamp-1"
            style={{ display: "-webkit-box" }}
          >
            <span className="text-stone-500 mr-4">兴趣标签</span>
            {userInterestTags &&
              userInterestTags.map((userInterestTag: TagType) => (
                <span className="mr-5 text-zinc-600">
                  {userInterestTag.field}
                </span>
              ))}
          </div>
        )}
        <Form form={form}>
          <Form.Item
            name="searchInput"
            rules={[
              {
                pattern: /^[a-zA-Z0-9 ]+$/,
                message: "请输入英文或数字",
              },
            ]}
            className="mb-0"
          >
            <Input.Search
              placeholder="搜索你想了解的论文，仅支持英文"
              allowClear
              enterButton="搜索"
              size="large"
              onSearch={onSearch}
              className="w-full block"
            />
          </Form.Item>
        </Form>
        <Skeleton
          active
          loading={recommendpaperListLoading}
          paragraph={{ rows: 4 }}
          className="py-3 pr-3"
        >
          <ul>
            {recommendpaperList &&
              recommendpaperList.map((reacommendPaper: RecommendPaperType) => (
                <li
                  className="py-5 border-b border-gray-200 cursor-pointer"
                  onClick={() =>
                    window.open(reacommendPaper.arxiv_id, "_blank")
                  }
                >
                  <h3 className="text-lg font-bold text-neurtal-800 mb-2.5">
                    {reacommendPaper.title}
                  </h3>
                  <div className="mb-4">
                    <div className="[&>span:first-child:before]:!content-[''] [&>span:first-child:before]:!px-0">
                      {reacommendPaper.authors.map((author: string) => (
                        <span className="text-[13px] text-slate-500 before:content-['/'] before:px-2 before:opacity-50">
                          {author}
                        </span>
                      ))}
                      <p
                        style={{ display: "-webkit-box" }}
                        className="overflow-hidden line-clamp-2 text-[15px] text-neutral-800 leading-[22px] mt-1"
                      >
                        {reacommendPaper.summary}
                      </p>
                    </div>
                  </div>
                  {reacommendPaper.categories.map((category: string) => (
                    <Tag
                      bordered={false}
                      className="rounded-[11px] bg-zinc-200"
                    >
                      {category}
                    </Tag>
                  ))}
                </li>
              ))}
          </ul>
        </Skeleton>
      </Skeleton>
      <Modal
        centered
        open={modalInterestOpen}
        onOk={() => {
          updateInterestTags()
            .then(() => {
              getRecommendPaperList();
            })
            .then(() => {
              getUserInterestTags();
            });
          setModalInterestOpen(false);
        }}
        onCancel={() => setModalInterestOpen(false)}
        className="[&_.ant-modal-body]:h-full !w-auto [&_.ant-modal-footer]:mt-9 [&_.ant-modal-footer]:mr-4 [&_.ant-modal-footer>button]:h-10 [&_.ant-modal-footer>button:last-child]:!ms-4"
        cancelText="跳过"
        okText="完成，开启推荐"
      >
        <InterestTagSelectModal
          getInterestTags={getInterestTags}
          userInterestTags={userInterestTags}
        />
      </Modal>
    </>
  );
};
