import { Space, Tooltip } from "antd";
import React, { useMemo } from "react";
import {
  BookTwoTone,
  BulbOutlined,
  FileAddOutlined,
  ImportOutlined,
  OpenAIOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { OPERATE } from "../../model";
import Icon from "@ant-design/icons/lib/components/Icon";
import { GradientBulbOutlined } from "@/common/icons/GradientBulbOutlined";
import "./index.css";

export const QuickAccess = () => {
  const navigate = useNavigate();
  const operates = useMemo(
    () => [
      {
        key: OPERATE.CREATE,
        icon: <FileAddOutlined className="text-[22px] text-[#cb7581] h-full" />,
        title: "新建文档",
        desc: "从空文本起草",
      },
      {
        key: OPERATE.ACADEMIC,
        icon: (
          // <div className="icon-gradient">
          // <BulbOutlined className="gradient-text" />
          <Icon component={GradientBulbOutlined} />
          // </div>
        ),
        title: "学术论文",
        desc: "专业化、条理化、结构化的论文内容轻松写作，全学科适用",
      },
      {
        key: OPERATE.COURSEREPORT,
        icon: <BookTwoTone twoToneColor="hotpink" className="text-[22px]" />,
        title: "课程报告",
        desc: "提供结构化框架、专业化指导，协助撰写课程报告材料",
      },
    ],
    [OPERATE]
  );

  const handle = (type: OPERATE) => {
    if (type == "create") {
      navigate("/newDoc");
    }
  };

  return (
    <>
      <h3 className="mb-5 font-bold text-neutral-700 text-base">AI写作</h3>
      <Space className="w-full [&>.ant-space-item]:max-w-72 [&>.ant-space-item]:w-1/4 gap-7 items-stretch">
        {operates.map((item) => {
          return (
            <Space
              key={item.key}
              className="quickAccessCard w-full h-full p-4 items-start [&>.ant-space-item]:h-full cursor-pointer bg-home-card-bg rounded-[5px] shadow-home-card"
              onClick={() => handle(item.key)}
            >
              <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h5 className="font-semibold text-topbar-text">{item.title}</h5>
                <p className="text-xs text-description mt-1.5">{item.desc}</p>
              </div>
            </Space>
          );
        })}
      </Space>
    </>
  );
};
