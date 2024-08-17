import React from "react";
import CardList from "@/common/components/CardList";
import { Collapse, Tabs } from "antd";
import { FormattingDoc } from "./FormattingDoc";
import Reference from "./Reference";
import MindMap from "./MindMap";
import Visualization from "./Visualization";

export const Efficiency: React.FC = () => {
  // 点击“效率”后的卡片列表
  // const effectDataSource = [
  //   <Collapse
  //     key="formattingDoc"
  //     ghost
  //     size="small"
  //     items={[
  //       {
  //         key: "1",
  //         label: "格式化文档",
  //         children: <FormattingDoc />,
  //       },
  //     ]}
  //     className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-1.5"
  //   />,
  //   <Collapse
  //     key="reference"
  //     ghost
  //     size="small"
  //     items={[
  //       {
  //         key: "2",
  //         label: "参考文献",
  //         children: <Reference />,
  //       },
  //     ]}
  //     className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-0 max-h-[1036px]"
  //   />,
  //   <Collapse
  //     key="mindMap"
  //     ghost
  //     size="small"
  //     items={[
  //       {
  //         key: "3",
  //         label: "思维导图",
  //         children: <MindMap />,
  //       },
  //     ]}
  //     className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-0 max-h-[1036px]"
  //   />,
  //   <Collapse
  //     key="visualization"
  //     ghost
  //     size="small"
  //     items={[
  //       {
  //         key: "4",
  //         label: "数据可视化",
  //         children: <Visualization />,
  //       },
  //     ]}
  //     className="[&_.ant-collapse-content-box]:!px-1.5 [&_.ant-collapse-content-box]:!py-0"
  //   />,
  // ];
  const items = [
    {
      label: "格式化文档",
      key: "formattingDoc",
      children: <FormattingDoc />,
    },
    {
      label: "参考文献",
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
  ];
  const effectDataSource = [
    <Tabs defaultActiveKey="formattingDoc" items={items} />,
  ];
  return <CardList dataSource={effectDataSource} classname="pl-2 !pr-0" />;
};
