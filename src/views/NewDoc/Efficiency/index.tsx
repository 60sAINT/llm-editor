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
    />,
  ];
  return <CardList dataSource={effectDataSource} />;
};
