import React from "react";
import CardList from "@/common/components/CardList";
import { Tabs } from "antd";
import { FormattingDoc } from "./FormattingDoc";
import Reference from "./Reference";
import MindMap from "./MindMap";
import Visualization from "./Visualization";
import { ReferenceNote } from "./ReferenceNote";
import { Setting } from "./Setting";

export const Efficiency: React.FC = () => {
  const items = [
    {
      label: "格式化文档",
      key: "formattingDoc",
      children: <FormattingDoc />,
    },
    {
      label: "文献推荐",
      key: "reference",
      children: <Reference />,
    },
    {
      label: "思维导图",
      key: "mindMap",
      children: <MindMap />,
    },
    {
      label: "数据可视化",
      key: "visualization",
      children: <Visualization />,
    },
    {
      label: "文献笔记",
      key: "referenceNote",
      children: <ReferenceNote />,
    },
    {
      label: "模型设置",
      key: "setting",
      children: <Setting />,
    },
  ];
  const effectDataSource = [
    <Tabs defaultActiveKey="formattingDoc" items={items} />,
  ];
  return <CardList dataSource={effectDataSource} classname="pl-2 !pr-0" />;
};
