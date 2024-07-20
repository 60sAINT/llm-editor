import React from "react";
import CardList from "@/common/components/CardList";
import { Collapse } from "antd";
import { FormattingDoc } from "./FormattingDoc";
import Reference from "./Reference";
import MindMap from "./MindMap";
import PieChart from "./PieChart";

export const Efficiency = () => {
  // 点击“效率”后的卡片列表
  const effectDataSource = [
    <Collapse
      ghost
      size="small"
      items={[
        {
          key: "1",
          label: "格式化文档",
          children: <FormattingDoc />,
        },
      ]}
      className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-1.5"
    />,
    <Collapse
      ghost
      size="small"
      items={[
        {
          key: "2",
          label: "参考文献",
          children: <Reference />,
        },
      ]}
      className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-0 max-h-[1036px]"
    />,
    <Collapse
      ghost
      size="small"
      items={[
        {
          key: "3",
          label: "思维导图",
          children: <MindMap />,
        },
      ]}
      className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-0 max-h-[1036px]"
    />,
    <Collapse
      ghost
      size="small"
      items={[
        {
          key: "4",
          label: "数据可视化",
          children: <PieChart />,
        },
      ]}
      className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-0 max-h-[1036px]"
    />,
  ];
  return <CardList dataSource={effectDataSource} />;
};
