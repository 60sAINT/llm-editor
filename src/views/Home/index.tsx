import React, { useState } from "react";
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
  ConfigProvider,
  Divider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Modal,
  Tooltip,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Main from "./Content";
import Knowledge from "./Knowledge";
import { useNavigate } from "react-router-dom";
import { Developing } from "./Developing";

const Home: React.FC = () => {
  const [selectKey, setSelectKey] = useState<string>("1");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      label: "知识库",
    },
    {
      key: "6",
      icon: <ExperimentOutlined />,
      label: "实验室",
    },
  ];

  const contents: Record<string, React.JSX.Element> = {
    "1": <Main />,
    "2": <Developing />,
    "3": <Developing />,
    "4": <Developing />,
    "5": <Knowledge />,
    "6": <Developing />,
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
        },
      }}
    >
      <Layout>
        <Header className="h-14 bg-white pr-10 border-b border-gray-200">
          <div className="h-full leading-[56px] float-left text-primary text-2xl font-bold tracking-wide">
            协心 编辑器
          </div>
          <div className="float-right leading-[56px]">
            <Avatar icon={<UserOutlined />} size="small" />
          </div>
        </Header>
        <Layout className="bg-white">
          <Sider width={200} className="mx-4 my-6 !bg-white">
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
              style={{ height: "100%", borderRight: 0 }}
              className="mt-6"
              items={menuItems}
              onClick={(e) => setSelectKey(e.key)}
            />
          </Sider>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {contents[selectKey]}
          </Content>
        </Layout>
        <Modal
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
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default Home;
