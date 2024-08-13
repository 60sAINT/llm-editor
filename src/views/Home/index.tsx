import React, { useState } from "react";
import Icon, {
  AppstoreOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  EditOutlined,
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
  ConfigProvider,
  Divider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Modal,
  Space,
  Tooltip,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Knowledge from "./Knowledge";
import { useLocation, useNavigate } from "react-router-dom";
import { Developing } from "./Developing";
import Directory from "./Directory";
import Recent from "./Recent";
import Community from "./Community";
import { Upgrade } from "./Upgrade";
import { AIReadPaperIcon } from "@/common/icons/AIReadPaperIcon";
import { AIReadPaper } from "./AIReadPaper";
import LiteratureManage from "./LiteratureManage";
import NoteManage from "./NoteManage";

const Home: React.FC = () => {
  const [modalUpgradeOpen, setModalUpgradeOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectKey, setSelectKey] = useState<string>(
    location.pathname.substring(1)
  );

  const dropdownContent = (
    <div className="bg-white shadow-lg p-3 mt-3 rounded border border-gray-300 text-zinc-600 text-sm">
      <div className="grid grid-cols-2 gap-4 mt-1.5 mx-2.5">
        <div
          className="text-center hover:bg-gray-100 py-2.5"
          onClick={() => navigate("/newDoc")}
        >
          <div className="mb-4">
            <FileTextTwoTone className="text-3xl" twoToneColor="#ddc5c9" />
          </div>
          <span>新建文档</span>
        </div>
        <Tooltip title="功能开发中">
          <div className="text-center hover:bg-gray-100 py-2.5 hover:cursor-not-allowed">
            <div className="mb-4">
              <RobotFilled className="text-3xl text-[#f1d1d5]" />
            </div>
            <span>AI写作</span>
          </div>
        </Tooltip>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Tooltip title="功能开发中">
          <div className="text-center hover:bg-gray-100 py-2.5 hover:cursor-not-allowed">
            <div className="mb-4">
              <FolderAddTwoTone className="text-3xl" twoToneColor="#f5bdc5" />
            </div>
            <span>新建文件夹</span>
          </div>
        </Tooltip>
        <Tooltip title="功能开发中">
          <div className="text-center hover:bg-gray-100 py-2.5 hover:cursor-not-allowed">
            <div className="mb-4">
              <UploadOutlined className="text-3xl text-gray-300" />
            </div>
            <span>上传文件</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
  const menuItems: MenuProps["items"] = [
    {
      key: "recent",
      icon: <ClockCircleOutlined />,
      label: "最近文件",
    },
    {
      key: "share",
      icon: <ShareAltOutlined />,
      label: "共享给我",
    },
    {
      key: "directory",
      icon: <FolderOutlined />,
      label: "我的文档",
    },
    {
      type: "divider",
    },
    {
      key: "knowledge",
      icon: <AppstoreOutlined />,
      label: "知识库",
    },
    {
      key: "laboratory",
      icon: <ExperimentOutlined />,
      label: "实验室",
    },
    {
      key: "conmmunity",
      icon: <CommentOutlined />,
      label: "社区",
    },
    {
      type: "divider",
    },
    {
      key: "aiReadPaper",
      icon: <Icon component={AIReadPaperIcon} className="text-sm" />,
      label: "AI读论文",
    },
    {
      key: "literatureManage",
      icon: <BookOutlined />,
      label: "文献管理",
    },
    {
      key: "noteManage",
      icon: <EditOutlined />,
      label: "笔记管理",
    },
  ];

  const contents: Record<string, React.JSX.Element> = {
    recent: <Recent />,
    share: <Developing />,
    directory: <Directory />,
    conmmunity: <Community />,
    knowledge: <Knowledge />,
    laboratory: <Developing />,
    aiReadPaper: <AIReadPaper />,
    literatureManage: <LiteratureManage />,
    noteManage: <NoteManage />,
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "#fbf2f3",
            itemActiveBg: "#fbf2f3",
            itemSelectedColor: "#d67b88",
          },
          Button: {
            colorPrimary: "#d67b88",
            colorPrimaryHover: "#dc8f9a",
            colorPrimaryActive: "#e65c70",
          },
          Input: {
            colorPrimary: "#d67b88",
            colorPrimaryHover: "#dc8f9a",
          },
        },
      }}
    >
      <Layout>
        <Header className="h-14 bg-white pr-10 border-b border-gray-200">
          <div className="h-full leading-[56px] float-left text-primary text-2xl font-bold tracking-wide">
            协心 编辑器
          </div>
          <Space
            className="float-right leading-[56px] [&>div]:flex [&>div]:align-middle h-[56px]"
            size={25}
          >
            <div
              onClick={() => setModalUpgradeOpen(true)}
              className="px-2.5 py-1 text-sm hover:bg-neutral-200 rounded-sm font-bold cursor-pointer"
            >
              <UpCircleOutlined className="mr-1.5 font-bold" />
              应用升级
            </div>
            <Avatar icon={<UserOutlined />} size="small" />
          </Space>
        </Header>
        <Layout className="bg-white">
          <Sider
            width={232}
            className="px-4 py-6 !bg-white border-r border-home-border"
          >
            <Dropdown
              trigger={["click"]}
              dropdownRender={() => dropdownContent}
            >
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
              defaultSelectedKeys={[selectKey]}
              defaultOpenKeys={["sub1"]}
              style={{ borderRight: 0 }}
              className="mt-6 [&_.ant-menu-item-divider]:my-2"
              items={menuItems}
              onClick={(e) => {
                setSelectKey(e.key);
                navigate(`/${e.key}`);
              }}
            />
          </Sider>
          <Content
            style={{
              margin: 0,
              minHeight: 280,
            }}
          >
            {contents[location.pathname.substring(1)]}
          </Content>
        </Layout>
        {/* <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="[&_.ant-btn-default]:hidden"
        >
          <p className="text-base pt-5">
            若您在访问过程中遇到问题，请点击以下链接进行访问：
            <br />
            <Button
              type="link"
              className="px-0 text-base"
              onClick={() => {
                navigate("http://43.138.11.21:8080/");
              }}
            >
              http://43.138.11.21:8080/
            </Button>
          </p>
        </Modal> */}
        <Modal
          centered
          open={modalUpgradeOpen}
          onOk={() => setModalUpgradeOpen(false)}
          onCancel={() => setModalUpgradeOpen(false)}
          className="[&_.ant-modal-footer]:hidden [&_.ant-modal-content]:h-[550px] [&_.ant-modal-content]:p-0 [&_.ant-modal-body]:h-full !w-auto"
        >
          <Upgrade />
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default Home;
