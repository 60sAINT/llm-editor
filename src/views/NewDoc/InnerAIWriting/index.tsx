import { OPERATE } from "@/views/Home/model";
import Icon, {
  BookTwoTone,
  EditTwoTone,
  FlagTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { GradientBulbOutlined } from "@/common/icons/GradientBulbOutlined";
import React, { useMemo, useState } from "react";
import { green, red } from "@ant-design/colors";
import {
  Analyze,
  Calendar,
  Microscope,
  ReadingNote,
  Speech,
  Teacher,
  Train,
} from "@/common/icons";
import CardList from "@/common/components/CardList";
import "./index.css";
import { Academic } from "@/views/Home/components/QuickAccess/AIWriting/Academic";
import { Comp } from "@/views/Home/components/QuickAccess/AIWriting/Comp";
import { LearningAnalyse } from "@/views/Home/components/QuickAccess/AIWriting/LearningAnalyse";
import { CourseReport } from "@/views/Home/components/QuickAccess/AIWriting/CourseReport";
import { ExperimentReport } from "@/views/Home/components/QuickAccess/AIWriting/ExperimentReport";
import { ReadNote } from "@/views/Home/components/QuickAccess/AIWriting/ReadNote";
import { SocialReport } from "@/views/Home/components/QuickAccess/AIWriting/SocialReport";
import { SpeechDraft } from "@/views/Home/components/QuickAccess/AIWriting/SpeechDraft";
import { TeachConclusion } from "@/views/Home/components/QuickAccess/AIWriting/TeachConclusion";
import { TeachPlan } from "@/views/Home/components/QuickAccess/AIWriting/TeachPlan";
import { TeacherTrain } from "@/views/Home/components/QuickAccess/AIWriting/TeacherTrain";

export const InnerAIWriting = () => {
  const [key, setKey] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handle = (key: string) => {
    console.log(key);
    setKey(key);
  };
  const onBack = () => {
    setKey("");
  };

  const operates = useMemo(
    () => [
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

  const filteredOperates = useMemo(
    () =>
      operates.filter(
        (item) =>
          item.title.includes(searchTerm) || item.desc.includes(searchTerm)
      ),
    [searchTerm, operates]
  );

  const CurCard = () => (
    <>
      <Button onClick={onBack} size="small" className="absolute left-0 -top-6">
        返回
      </Button>
      {key === OPERATE.ACADEMIC ? (
        <Academic className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.ANALYZE ? (
        <LearningAnalyse className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.COMPOSITION ? (
        <Comp className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.COURSEREPORT ? (
        <CourseReport className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.EXPERIMENT ? (
        <ExperimentReport className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.ReadingNote ? (
        <ReadNote className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.SOCIALREPORT ? (
        <SocialReport className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.SPEECH ? (
        <SpeechDraft className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.TEACHCONCLUSION ? (
        <TeachConclusion className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key == OPERATE.TEACHPLAN ? (
        <TeachPlan className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : key === OPERATE.TRAIN ? (
        <TeacherTrain className="mt-6 px-2 [&_.shadow-menu-switcher]:mr-2.5" />
      ) : null}
    </>
  );

  const cardOuter = useMemo(
    () => (
      <div className="relative">
        {key === "" ? (
          <div>
            <Input
              placeholder="搜索模板名称、描述"
              allowClear
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined className="text-zinc-400 text-xs" />}
              className="mb-3"
            />
            <Space className="w-full flex-wrap [&>.ant-space-item]:max-w-72 [&>.ant-space-item]:min-w-[155px] [&>.ant-space-item]:w-[14%] gap-3 items-stretch">
              {filteredOperates.map((item) => {
                return (
                  <Space
                    key={item.key}
                    className="quickAccessCard h-full p-4 items-start [&>.ant-space-item]:h-full cursor-pointer bg-home-card-bg rounded-[5px] shadow-home-card"
                    onClick={() => handle(item.key)}
                    direction="vertical"
                  >
                    <div className="flex items-center gap-1.5 justify-start">
                      <div className="shadow-menu-switcher bg-white w-10 h-10 rounded-circle flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h5 className="font-semibold text-topbar-text">
                        {item.title}
                      </h5>
                    </div>
                    <div>
                      <p className="text-xs text-description mt-1.5">
                        {item.desc}
                      </p>
                    </div>
                  </Space>
                );
              })}
            </Space>
          </div>
        ) : (
          <CurCard />
        )}
      </div>
    ),
    [key]
  );
  const aiWritingDataSource = [cardOuter];
  return <CardList dataSource={aiWritingDataSource} classname="pl-2 !pr-0" />;
};
