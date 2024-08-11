import React, { useEffect, useRef, useState } from "react";
import wenxin from "@/assets/wenxin.png";
import wenxinLogo from "@/assets/wenxinLogo.png";
import { AIReadPaperIcon } from "@/common/icons/AIReadPaperIcon";
import Icon, { StarFilled } from "@ant-design/icons";
import { Modal, Table, Tabs } from "antd";
import { ReadModalContent } from "./ReadModalContent";
import { formatDate } from "@/common/utils";
import { ReadingHistory } from "./interface";
import { useRequest } from "@/hooks/useRequest";
import { paperApi } from "./api";
import { useAuth } from "@/provider/authProvider";
import { RecommendPapers } from "./RecommendPapers";

export const AIReadPaper = () => {
  const [modalReadOpen, setModalReadOpen] = useState(false);
  const { token } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setHeight(width / 3); // 设置高度为宽度的3倍
      }
    };
    // 初始设置高度
    updateHeight();
    // 窗口大小变化时更新高度
    window.addEventListener("resize", updateHeight);
    // 清理事件监听器
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // const data: readonly ReadingHistory[] | undefined = [];
  const {
    run: getRecentPaperList,
    data: paperList,
    loading: paperListLoading,
  } = useRequest(
    async () => {
      const res = await paperApi.getRecentPaperList(`Bearer ${token}` || "");
      return res.data;
    },
    { manual: false }
  );
  const columns = [
    {
      title: "文章标题",
      dataIndex: "title",
    },
    {
      title: "上次阅读时间",
      dataIndex: "last_read_at",
      render: (timeString: string) => formatDate(timeString),
      sorter: (a: ReadingHistory, b: ReadingHistory) =>
        new Date(b.time).getTime() - new Date(a.time).getTime(),
      defaultSortOrder: "ascend" as any,
    },
  ];

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full px-16"
        style={{
          backgroundImage: `url(${wenxin})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          // paddingBottom: "31.25%", // 根据图片的实际纵横比调整
          height: `${height}px`,
        }}
      >
        <div className="w-full h-full flex justify-between">
          <div
            className="flex w-80 items-center"
            style={{
              height: `${height}px`,
            }}
          >
            <div
              className="flex cursor-pointer text-white"
              onClick={() => {
                setModalReadOpen(true);
              }}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-white bg-opacity-20 rounded-full mr-4">
                <Icon
                  component={AIReadPaperIcon}
                  className="[&_svg]:w-8 [&_svg]:h-8 [&_path:first-child]:fill-white [&_path:nth-child(2)]:fill-white [&_path:nth-child(3)]:fill-[#ffa2af] [&_path:last-child]:fill-[#ffa2af]"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-xl leading-[30px]">AI阅读</div>
                <div className="text-rp-white-a-10 font-light text-gray-100">
                  知识增强的大语言模型，专业问答
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer justify-center"
            style={{
              height: `${height}px`,
            }}
            onClick={() => {
              const externalUrl = "https://yiyan.baidu.com/welcome";
              window.open(externalUrl, "_blank");
            }}
          >
            <img src={wenxinLogo} className="h-10" />
            <span className="text-white font-semibold text-base tracking-widest">
              大语言模型
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="px-10 py-4 rounded-sm w-7/12">
          <div className="mb-3.5 font-medium text-stone-900 text-base">
            最近阅读
          </div>
          <Table
            dataSource={paperList}
            columns={columns}
            loading={paperListLoading}
            className="mb-1"
          />
        </div>
        <div className="p-4 bg-[#fdfafa] w-5/12 border-gray-200 border">
          <Tabs
            defaultActiveKey="2"
            items={[StarFilled].map((Icon, i) => {
              const id = String(i + 1);
              return {
                key: id,
                label: <span className="text-base">为你推荐</span>,
                children: <RecommendPapers />,
                icon: <Icon className="text-base" />,
              };
            })}
            className="[&_.ant-tabs-tab-btn]:!text-black [&_.ant-tabs-ink-bar]:bg-black [&_.ant-tabs-ink-bar]:!w-[100px] [&_.ant-tabs-tab-icon]:!me-1.5"
          />
        </div>
      </div>
      <Modal
        title={
          <div className="border-b border-gray-200 pb-3.5">
            选择一篇论文开始AI辅读
          </div>
        }
        centered
        open={modalReadOpen}
        onOk={() => setModalReadOpen(false)}
        onCancel={() => setModalReadOpen(false)}
        className="[&_.ant-modal-footer]:hidden [&_.ant-modal-content]:w-[696px] [&_.ant-modal-content]:h-[360px] [&_.ant-modal-body]:h-[270px]"
      >
        <ReadModalContent />
      </Modal>
    </>
  );
};
