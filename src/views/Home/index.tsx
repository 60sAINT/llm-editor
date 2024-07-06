import React from "react";
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  ExperimentOutlined,
  FileTextTwoTone,
  FolderAddTwoTone,
  FolderOutlined,
  RobotFilled,
  ShareAltOutlined,
  UpCircleOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Main from "./Content";

const Home: React.FC = () => {
  const dropdownContent = (
    <div className="bg-white shadow-lg p-3 mt-3 rounded border border-gray-300 text-zinc-600 text-sm">
      <div className="grid grid-cols-2 gap-4 mt-1.5 mx-2.5">
        <div
          className="text-center hover:bg-gray-100 py-2.5"
          onClick={() => window.open("/newDoc", "_blank")}
        >
          <div className="mb-4">
            <FileTextTwoTone className="text-3xl" twoToneColor="#d1d5db" />
          </div>
          <span>新建文档</span>
        </div>
        <div className="text-center hover:bg-gray-100 py-2.5">
          <div className="mb-4">
            <RobotFilled className="text-3xl text-blue-200" />
          </div>
          <span>AI写作</span>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="text-center hover:bg-gray-100 py-2.5">
          <div className="mb-4">
            <FolderAddTwoTone className="text-3xl" twoToneColor="#bfdbfe" />
          </div>
          <span>新建文件夹</span>
        </div>
        <div className="text-center hover:bg-gray-100 py-2.5">
          <div className="mb-4">
            <UploadOutlined className="text-3xl text-gray-300" />
          </div>
          <span>上传文件</span>
        </div>
      </div>
    </div>
  );
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <ClockCircleOutlined />,
      label: "最近文件",
    },
    {
      key: "2",
      icon: <ShareAltOutlined />,
      label: "共享给我",
    },
    {
      key: "3",
      icon: <FolderOutlined />,
      label: "我的文档",
    },
    {
      type: "divider",
    },
    {
      key: "4",
      icon: <UpCircleOutlined />,
      label: "应用升级",
    },
    {
      key: "5",
      icon: <AppstoreOutlined />,
      label: "应用中心",
    },
    {
      key: "6",
      icon: <ExperimentOutlined />,
      label: "实验室",
    },
  ];

  return (
    <Layout>
      <Header className="h-14 bg-white pr-10 border-b border-gray-200">
        <div className="h-full leading-[56px] float-left text-blue-500 text-2xl font-semibold tracking-wide">
          XXX 编辑器
        </div>
        <div className="float-right leading-[56px]">
          <Avatar icon={<UserOutlined />} size="small" />
        </div>
      </Header>
      <Layout className="bg-white">
        <Sider width={200} className="mx-4 my-6 !bg-white">
          <Dropdown trigger={["click"]} dropdownRender={() => dropdownContent}>
            <Button
              onClick={(e) => e.preventDefault()}
              type="primary"
              className="w-full border-none h-9 text-sm rounded-sm font-bold bg-primary text-white tracking-tighter"
            >
              创建
            </Button>
          </Dropdown>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            className="mt-6"
            items={menuItems}
          />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Main />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
