import React from "react";
import CardList from "@/common/components/CardList";
import { Collapse } from "antd";
import { FormattingDoc } from "./FormattingDoc";

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
  ];
  return <CardList dataSource={effectDataSource} />;
};
