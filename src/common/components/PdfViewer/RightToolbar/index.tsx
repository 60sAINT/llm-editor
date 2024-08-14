import NewDoc from "@/views/NewDoc";
import { Tabs } from "antd";
import React from "react";
import { ChartExtraction } from "./ChartExtraction";
import { HighlightPlugin } from "@react-pdf-viewer/highlight";
import { Profile } from "./Profile";
import { PaperInformationType } from "../interface";

interface RightToolBarProps {
  jumpToPage: (targetPage: number) => void;
  setChartHighlightPluginInstance: (
    chartHighlightPluginInstance: HighlightPlugin
  ) => void;
  paperInformation: PaperInformationType;
}

export const RightToolBar: React.FC<RightToolBarProps> = ({
  jumpToPage,
  setChartHighlightPluginInstance,
  paperInformation,
}) => {
  const rightToolbar = [
    {
      label: "图表提取",
      key: "chartExtraction",
      children: (
        <ChartExtraction
          jumpToPage={jumpToPage}
          setChartHighlightPluginInstance={setChartHighlightPluginInstance}
          paperInformation={paperInformation}
        />
      ),
    },
    {
      label: "资料",
      key: "profile",
      children: <Profile paperInformation={paperInformation} />,
    },
    {
      label: "笔记",
      key: "note",
      children: (
        <NewDoc
          editorOnly={true}
          className="px-5 *:[&>div>div:first-child>div:nth-child(2)]:hidden [&>div>div:first-child>div:first-child_button]:hidden [&>div:first-child>div]:py-0 [&>div:first-child>div_input]:ml-0.5 [&>div]:shadow-none [&>div:first-child]:-top-2 !bg-white [&>div:last-child>div:first-child]:hidden [&>div:last-child>div:last-child]:hidden [&_.ant-col-24>div]:!p-0 [&_.ant-col-24>div>div]:pl-6 [&_.ant-col-24>div>div]:pr-0 [&_.ant-col-24>div>div:first-child]:pt-5 [&_.ant-col-24>div>div:first-child]:pb-4 [&_.ant-col-24>div>div>div]:!px-0 [&_.ant-col-24>div]:shadow-none [&>div:last-child]:p-0"
          is_note={true}
          note_id={paperInformation.doc_id}
          paper_id={paperInformation.paper_id}
        />
      ),
    },
  ];
  return (
    <Tabs
      className="[&>.ant-tabs-nav]:!mb-0 [&>.ant-tabs-nav]:px-5 [&>.ant-tabs-nav]:pt-2"
      defaultActiveKey="chartExtraction"
      items={rightToolbar.map((item) => {
        return {
          label: item.label,
          key: item.key,
          children: item.children,
        };
      })}
    />
  );
};
