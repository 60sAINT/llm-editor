import { CheckOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Equity } from "./Equity";
import { Button, Divider, Modal, QRCode } from "antd";
import { Clause } from "./Clause";
import collectionCode from "@/assets/collectionCode.png";

export const Upgrade = () => {
  const [membershipType, setMembershipType] = useState<string>("month");
  const [modalClauseOpen, setModalClauseOpen] = useState(false);

  const cards = [
    {
      id: "month",
      title: "月会员",
      price: "39.00",
      cardType: "月卡",
      wordNumber: "15万/月",
    },
    {
      id: "quarter",
      title: "季会员",
      price: "99.00",
      cardType: "季卡",
      wordNumber: "50万/月",
    },
    {
      id: "year",
      title: "年会员",
      price: "198.00",
      cardType: "年卡",
      wordNumber: "无限AI",
    },
  ];

  return (
    <>
      <div className="flex h-full">
        <div className="p-7 bg-[#fdf8f9] rounded-l-lg h-full w-[394px]">
          <h3 className="text-neutral-800 font-semibold text-lg">
            开通会员<span className="text-primary">享5项权益</span>，畅写佳作
          </h3>
          <div className="pt-5 flex flex-col gap-3">
            <div className="flex items-center">
              <CheckOutlined className="text-emerald-500" />
              <p className="font-semibold text-sm pl-2">
                {membershipType == "year"
                  ? "无限AI生成字数"
                  : `每月享${
                      membershipType == "month" ? "15" : "50"
                    }万AI生成字数`}
              </p>
              <span className="ml-2.5 text-gray-900 bg-orange-200 rounded text-[10px] px-1 py-0.5 leading-[1]">
                现在购买享限时特权
              </span>
            </div>
            <div>
              <div className="flex">
                <CheckOutlined className="text-emerald-500" />
                <p className="font-semibold text-sm pl-2">{`Weaver--${
                  membershipType == "year" ? "Ultra" : "专业"
                }版`}</p>
              </div>
              <div className="pt-2 pl-6 text-xs text-neutral-800">
                {membershipType == "year"
                  ? "340亿参数，全球领先的专业写作模型，综合写作性能领先GPT-4"
                  : "140亿参数，综合写作质量与GPT4相当"}
              </div>
            </div>
            <Equity />
          </div>
        </div>
        <div className="p-7">
          <h3 className="text-lg font-semibold mb-5">会员套餐</h3>
          <div className="flex gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => setMembershipType(card.id)}
                className={`border-2 ${
                  membershipType === card.id
                    ? "border-primary"
                    : "border-neutral-200"
                } cursor-pointer rounded-[12px] h-56 min-w-44 flex justify-center items-center relative`}
              >
                <div>
                  {card.id === "year" ? (
                    <div className="absolute top-0 left-0 w-full h-7 flex justify-end items-center px-2">
                      <span className="ml-2.5 text-gray-900 bg-orange-200 rounded text-[10px] px-1 py-0.5 leading-[1]">
                        更多人选择
                      </span>
                    </div>
                  ) : null}
                  <p className="text-neutral-800 text-lg font-medium text-center pb-2">
                    {card.title}
                  </p>
                  <p className="text-neutral-800 text-lg font-bold text-center flex justify-center items-end">
                    <span className="text-base">¥</span>
                    <div className="h-8 text-3xl">{card.price}</div>
                  </p>
                  <div className="mt-3 mb-6 h-4"></div>
                  <p
                    className={`text-center text-xs ${
                      membershipType === card.id
                        ? "text-[#e9939f]"
                        : "text-neutral-400"
                    }`}
                  >
                    {card.cardType}享{card.wordNumber}生成字数
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Divider className="mt-8 mb-6" />
          <h3 className="text-lg font-semibold mb-4">支付</h3>
          <div className="flex gap-x-12 items-center">
            <div className="w-28 h-28 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
              <img src={collectionCode} />
            </div>
            <div className="flex flex-col gap-y-3.5">
              <p>1、多次购买会员，有效期叠加</p>
              <p>2、购买会员后，AI写作字数生成包立即发放</p>
              <p className="[&_.ant-btn-link]:text-primary">
                3、开通前阅读并同意{" "}
                <a
                  type="link"
                  className="text-primary hover:underline hover:!text-primary p-0"
                  onClick={() => setModalClauseOpen(true)}
                >
                  《协心编辑器服务条款》
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={modalClauseOpen}
        onOk={() => setModalClauseOpen(false)}
        onCancel={() => setModalClauseOpen(false)}
        className="[&_.ant-modal-footer]:hidden [&_.ant-modal-content]:h-[550px] [&_.ant-modal-content]:p-0 [&_.ant-modal-body]:h-full !w-auto [&_.ant-modal-close]:top-2"
      >
        <Clause />
      </Modal>
    </>
  );
};
