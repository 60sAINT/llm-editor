import { Tabs } from "antd";
import React from "react";
import type { TabsProps } from "antd";
import Basics from "./Basics";
import API from "./API";
import Markdown from "./Markdown";
import HTML from "./HTML";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "编辑器基础知识",
    children: <Basics />,
  },
  {
    key: "2",
    label: "编辑器API",
    children: <API />,
  },
  {
    key: "3",
    label: "Markdown",
    children: <Markdown />,
  },
  {
    key: "4",
    label: "HTML",
    children: <HTML />,
  },
];

const Temp: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default Temp;
