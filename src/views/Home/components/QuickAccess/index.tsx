import { Modal, Space, Tabs, TabsProps, Upload, UploadProps } from "antd";
import React, { ReactElement, useMemo, useState } from "react";
import {
  BookTwoTone,
  EditTwoTone,
  FileAddTwoTone,
  FlagTwoTone,
  FileWordTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { OPERATE } from "../../model";
import Icon from "@ant-design/icons/lib/components/Icon";
import { GradientBulbOutlined } from "@/common/icons/GradientBulbOutlined";
import "./index.css";
import { useRequest } from "@/hooks/useRequest";
import { docApi } from "@/views/NewDoc/api/Doc";
import { useAuth } from "@/provider/authProvider";
import { blue, green, magenta, red } from "@ant-design/colors";
import {
  Microscope,
  ReadingNote,
  Speech,
  Teacher,
  Train,
  Calendar,
  Analyze,
} from "@/common/icons";
import { GATEWAY } from "@/api/AxiosInstance";
import ProcessBar from "@/common/components/ProcessBar";
import axios from "axios";

export const QuickAccess = () => {
  const { token } = useAuth();
  const { runAsync: newDoc } = useRequest(async (title, content) => {
    const res = await docApi.newDoc({
      token: `Bearer ${token}` || "",
      title,
      content,
    });
    return res.data;
  });
  const navigate = useNavigate();

  const operates = useMemo(
    () => [
      {
        key: OPERATE.CREATE,
        icon: (
          <FileAddTwoTone
            twoToneColor={magenta.primary}
            className="text-[22px]"
          />
        ),
        title: "新建文档",
        desc: "从空文本起草",
      },
      {
        key: OPERATE.UPLOAD,
        icon: (
          <FileWordTwoTone
            twoToneColor={blue.primary}
            className="text-[22px]"
          />
        ),
        title: "上传Word",
        desc: "一键上传本地文档开始写作",
      },
      {
        key: OPERATE.ACADEMIC,
        icon: <Icon component={GradientBulbOutlined} />,
        title: "学术论文",
        desc: "专业化、条理化、结构化的论文大纲轻松写作，全学科适用",
      },
      {
        key: OPERATE.COURSEREPORT,
        icon: <BookTwoTone twoToneColor="hotpink" className="text-[22px]" />,
        title: "课程报告",
        desc: "提供结构化框架、专业化指导，协助撰写课程报告材料",
      },
      {
        key: OPERATE.SOCIALREPORT,
        icon: (
          <FlagTwoTone twoToneColor={green.primary} className="text-[22px]" />
        ),
        title: "社会实践报告",
        desc: "一键生成真实、自然的社会实践报告，总结实践中的收获和体会",
      },
      {
        key: OPERATE.ReadingNote,
        icon: <Icon component={ReadingNote} />,
        title: "读书笔记",
        desc: "汇总整理阅读的书籍、文章或材料，生成言之有物的读书笔记",
      },
      {
        key: OPERATE.SPEECH,
        icon: <Icon component={Speech} />,
        title: "演讲稿",
        desc: "根据给定主题和字数，生成优美流畅、情真意切的学生发言稿",
      },
      {
        key: OPERATE.COMPOSITION,
        icon: (
          <EditTwoTone twoToneColor={red.primary} className="text-[22px]" />
        ),
        title: "学生作文",
        desc: "根据给定字数和主题，生成言辞优美、流畅的学生作文",
      },
      {
        key: OPERATE.EXPERIMENT,
        icon: <Icon component={Microscope} />,
        title: "实验报告",
        desc: "根据实验过程和结果，准确生成实验报告，支持科学研究和学术发表",
      },
      {
        key: OPERATE.TRAIN,
        icon: <Icon component={Train} />,
        title: "教师培训心得",
        desc: "根据培训内容及体验，生成言之有物的心得体会",
      },
      {
        key: OPERATE.TEACHPLAN,
        icon: <Icon component={Teacher} />,
        title: "教学计划",
        desc: "结合教学目标及进度，一键生成详尽、高效的教学计划",
      },
      {
        key: OPERATE.TEACHCONCLUSION,
        icon: <Icon component={Calendar} />,
        title: "教师学期工作总结",
        desc: "汇总课堂教学、学生管理等内容，生成全面的学期工作总结",
      },
      {
        key: OPERATE.ANALYZE,
        icon: <Icon component={Analyze} />,
        title: "学情分析",
        desc: "综合学生各方面表现，帮助深入分析其学习情况",
      },
    ],
    [OPERATE]
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cancelTokenSource, setCancelTokenSource] = useState<any>(null);

  const handleCancel = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Upload canceled by user.");
    }
    setModalOpen(false);
  };

  const action = `${GATEWAY}/api/v1/doc/import`;
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
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        });
        setModalOpen(false); // Close the modal when upload is complete
        // 上传成功后的逻辑
        console.log(response);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Upload canceled:", error.message);
        } else {
          console.error(error);
        }
        setModalOpen(false); // Close the modal if there's an error
      }
    },
  };

  interface CardListProps {
    operateArr: {
      key: OPERATE;
      icon: ReactElement;
      title: string;
      desc: string;
    }[];
  }
  const CardList: React.FC<CardListProps> = ({ operateArr }) => (
    <Space className="w-full flex-wrap [&>.ant-space-item]:max-w-72 [&>.ant-space-item]:min-w-[211.33px] [&>.ant-space-item]:w-[14%] gap-3 items-stretch h-[205px] overflow-y-auto p-6">
      {operateArr.map((item) => {
        if (item.key === OPERATE.UPLOAD) {
          return (
            <Upload
              className="[&_div.ant-upload]:h-full"
              {...uploadProps}
              key={item.key}
            >
              <Space className="quickAccessCard w-full h-full p-4 items-start [&>.ant-space-item]:h-full cursor-pointer bg-home-card-bg rounded-[5px] shadow-home-card max-h-[108px]">
                <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h5 className="font-semibold text-topbar-text">
                    {item.title}
                  </h5>
                  <p className="text-xs text-description mt-1.5">{item.desc}</p>
                </div>
              </Space>
            </Upload>
          );
        } else {
          return (
            <Space
              key={item.key}
              className="quickAccessCard w-full h-full p-4 items-start [&>.ant-space-item]:h-full cursor-pointer bg-home-card-bg rounded-[5px] shadow-home-card"
              onClick={() => handle(item.key)}
            >
              <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h5 className="font-semibold text-topbar-text">{item.title}</h5>
                <p className="text-xs text-description mt-1.5">{item.desc}</p>
              </div>
            </Space>
          );
        }
      })}
    </Space>
  );

  const handle = async (type: OPERATE) => {
    if (type === OPERATE.CREATE) {
      const newDocinfo = await newDoc("无标题", "[{}]");
      const { doc_id } = newDocinfo;
      navigate(`/newDoc?doc_id=${doc_id}`);
    } else if (type === OPERATE.UPLOAD) {
      console.log(document.getElementById("hiddenUploadInput"));
      // document.getElementById("hiddenUploadInput")?.click();
    } else {
      navigate(`/aiWriting?type=${type}`);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "全部工具",
      children: <CardList operateArr={operates} />,
    },
    {
      key: "2",
      label: "学术论文",
      children: <CardList operateArr={operates.slice(2, 3)} />,
    },
    {
      key: "3",
      label: "学生作业",
      children: <CardList operateArr={operates.slice(3, 9)} />,
    },
    {
      key: "4",
      label: "教师教学",
      children: <CardList operateArr={operates.slice(9)} />,
    },
  ];

  return (
    <>
      <h3 className="mb-5 font-bold text-neutral-700 text-base">AI写作</h3>
      <div className="bg-gray-100 rounded-2xl">
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="[&_.ant-tabs-nav]:pt-3 [&_.ant-tabs-nav]:px-6 [&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-tab-active]:font-semibold overflow-hidden"
        />
      </div>
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
