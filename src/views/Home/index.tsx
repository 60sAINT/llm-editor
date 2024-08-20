import React, { useState } from "react";
import Icon, {
  AppstoreOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  EditOutlined,
  FileTextTwoTone,
  FolderAddTwoTone,
  FolderOutlined,
  RobotFilled,
  ShareAltOutlined,
  UpCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Affix,
  Button,
  Divider,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  Modal,
  Space,
  Upload,
  UploadProps,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Knowledge from "./Knowledge";
import { useLocation, useNavigate } from "react-router-dom";
import Directory from "./Directory";
import Recent from "./Recent";
import Community from "./Community";
import { Upgrade } from "./Upgrade";
import { AIReadPaperIcon } from "@/common/icons/AIReadPaperIcon";
import { AIReadPaper } from "./AIReadPaper";
import LiteratureManage from "./LiteratureManage";
import NoteManage from "./NoteManage";
import { Share } from "./Share";
import { useAuth } from "@/provider/authProvider";
import { useRequest } from "@/hooks/useRequest";
import { docApi } from "../NewDoc/api/Doc";
import { directoryApi } from "./Directory/api";
import axios from "axios";
import { GATEWAY } from "@/api/AxiosInstance";
import { useCreateBlockNote } from "@blocknote/react";
import ProcessBar from "@/common/components/ProcessBar";
import { UserOperation } from "./UserOperation";

const Home: React.FC = () => {
  const [modalUpgradeOpen, setModalUpgradeOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectKey, setSelectKey] = useState<string>(
    location.pathname.substring(1)
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const { runAsync: newDirectory } = useRequest(async (dir_name) => {
    const res = await directoryApi.newDirectory({
      token: `Bearer ${token}` || "",
      dir_name,
    });
    return res.data;
  });
  const { run: getFolderList } = useRequest(
    async () => {
      const res = await directoryApi.getDirectoryTree(`Bearer ${token}` || "");
      return res.data;
    },
    { manual: false }
  );
  const handleAddFolder = () => {
    newDirectory(newFolderName).then(() => getFolderList());
    setNewFolderName("");
    setIsModalVisible(false);
  };

  const { token } = useAuth();
  const { runAsync: newDoc } = useRequest(async (title, content?) => {
    const res = await docApi.newDoc({
      token: `Bearer ${token}` || "",
      title,
      content: content || "[{}]",
    });
    return res.data;
  });

  // 上传Word
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cancelTokenSource, setCancelTokenSource] = useState<any>(null);
  const action = `${GATEWAY}/api/v1/doc/import`;
  const handleCancel = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Upload canceled by user.");
    }
    setModalOpen(false);
  };
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: ["Hello, "],
      },
    ],
  });
  const uploadProps: UploadProps = {
    accept: ".docx,.doc",
    name: "docx_file",
    multiple: true,
    showUploadList: false,
    customRequest: async (opt) => {
      setModalOpen(true); // Show the modal when upload starts
      const formData = new FormData();
      formData.append("docx_file", opt.file);
      const source = axios.CancelToken.source();
      setCancelTokenSource(source);
      try {
        const response = await axios.post(action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Authorization": `Bearer ${token}`,
          },
          cancelToken: source.token,
          onUploadProgress: () => {},
        });
        setModalOpen(false); // Close the modal when upload is complete
        // 上传成功后的逻辑
        const blocks = await editor.tryParseHTMLToBlocks(
          response.data.data.content
        );
        const newDocinfo = await newDoc(
          response.data.data.title,
          JSON.stringify(blocks)
        );
        const { doc_id } = newDocinfo;
        navigate(`/newDoc?doc_id=${doc_id}`);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.error(error);
        }
        setModalOpen(false); // Close the modal if there's an error
      }
    },
  };

  const dropdownContent = (
    <div className="bg-white shadow-lg p-3 mt-3 rounded border border-gray-300 text-zinc-600 text-sm">
      <div className="grid grid-cols-2 gap-4 mt-1.5 mx-2.5">
        <div
          className="text-center hover:bg-gray-100 py-2.5"
          onClick={async () => {
            const newDocinfo = await newDoc("无标题");
            const { doc_id } = newDocinfo;
            navigate(`/newDoc?doc_id=${doc_id}`);
          }}
        >
          <div className="mb-4">
            <FileTextTwoTone className="text-3xl" twoToneColor="#ddc5c9" />
          </div>
          <span>新建文档</span>
        </div>
        <div
          className="text-center hover:bg-gray-100 py-2.5"
          onClick={() => navigate(`../recent`)}
        >
          <div className="mb-4">
            <RobotFilled className="text-3xl text-[#f1d1d5]" />
          </div>
          <span>AI写作</span>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-2 gap-4 mt-1.5 mx-2.5">
        <div
          className="text-center hover:bg-gray-100 py-2.5"
          onClick={() => setIsModalVisible(true)}
        >
          <div className="mb-4">
            <FolderAddTwoTone className="text-3xl" twoToneColor="#f5bdc5" />
          </div>
          <span>新建文件夹</span>
        </div>
        <Upload {...uploadProps}>
          <div className="text-center hover:bg-gray-100 py-2.5">
            <div className="mb-4">
              <UploadOutlined className="text-3xl text-gray-300" />
            </div>
            <span>上传Word</span>
          </div>
        </Upload>
      </div>
    </div>
  );
  const menuItems: MenuProps["items"] = [
    {
      key: "recent",
      icon: <ClockCircleOutlined />,
      label: "快速访问",
    },
    {
      key: "share",
      icon: <ShareAltOutlined />,
      label: "共享文档",
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
    {
      type: "divider",
    },
    {
      key: "knowledge",
      icon: <AppstoreOutlined />,
      label: "知识库",
    },
    {
      key: "conmmunity",
      icon: <CommentOutlined />,
      label: "社区",
    },
  ];

  const contents: Record<string, React.JSX.Element> = {
    recent: <Recent />,
    share: <Share />,
    directory: <Directory />,
    conmmunity: <Community />,
    knowledge: <Knowledge />,
    aiReadPaper: <AIReadPaper />,
    literatureManage: <LiteratureManage />,
    noteManage: <NoteManage />,
  };

  return (
    <>
      <Layout className="h-full">
        <Affix offsetTop={0}>
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
              <UserOperation />
            </Space>
          </Header>
        </Affix>
        <Layout className="bg-white">
          <Affix offsetTop={56}>
            <Sider
              width={232}
              className="!bg-white border-r border-home-border fixed"
            >
              <div className="mx-4 my-6">
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
                  className="mt-6 [&_.ant-menu-item-divider]:my-2 overflow-y-suto h-screen"
                  items={menuItems}
                  onClick={(e) => {
                    setSelectKey(e.key);
                    navigate(`/${e.key}`);
                  }}
                />
              </div>
            </Sider>
          </Affix>
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
      <Modal
        title={
          <span className="text-sm font-bold text-stone-800">新建文件夹</span>
        }
        open={isModalVisible}
        onOk={handleAddFolder}
        onCancel={() => setIsModalVisible(false)}
        centered
        className="[&_.ant-modal-content]:p-7 [&_.ant-modal-content]:rounded [&_.ant-modal-content]:w-[480px] [&_.ant-modal-close]:top-6 [&_.ant-modal-close]:right-6 [&_.ant-modal-footer>button]:w-20"
      >
        <Input
          placeholder="请输入文件夹名称"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="mt-6 mb-5 h-8"
        />
      </Modal>
      <Modal
        open={modalOpen}
        centered
        className="[&_.ant-modal-content]:p-7 [&_.ant-modal-content]:rounded [&_.ant-modal-content]:w-[480px] [&_.ant-modal-close]:top-6 [&_.ant-modal-close]:right-6 [&_.ant-modal-footer>button]:w-20"
        onCancel={handleCancel}
        footer={null}
        closable={false}
      >
        <div className="text-zinc-500 mb-4">文件上传中...</div>
        <ProcessBar />
        <div className="w-full flex justify-end mt-4">
          <div
            className="border border-primary bg-[#fbf2f3] text-primary flex justify-center items-center h-8 w-20 rounded cursor-pointer"
            onClick={handleCancel}
          >
            <span>取消上传</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
