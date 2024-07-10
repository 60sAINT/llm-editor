import { Tabs } from "antd";
import React from "react";
import type { TabsProps } from "antd";
import Basics from "./Basics";
import API from "./API";
import Markdown from "./Markdown";
import HTML from "./HTML";
import Themes from "./Themes";
import Components from "./Components";
import StateManage from "./StateManage";

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
  {
    key: "5",
    label: "造型和主题",
    children: <Themes />,
  },
  {
    key: "6",
    label: "UI组件",
    children: <Components />,
  },
  {
    key: "7",
    label: "useContext & useReducer管理状态",
    children: <StateManage />,
  },
];

const Temp: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;

export default Temp;
