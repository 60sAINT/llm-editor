import { useRequest } from "@/hooks/useRequest";
import { Skeleton, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { useAuth } from "@/provider/authProvider";
import { SummaryTable } from "./SummaryTable";
import Summary from "./Summary";
import { directoryApi } from "../Directory/api";

const NoteManage = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("1");

  const { data: folderListData, loading: folderListLoading } = useRequest(
    async () => {
      const res = await directoryApi.getDirectoryTree(`Bearer ${token}` || "");
      return res.data;
    },
    { manual: false }
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "笔记",
      children: <Summary folderListData={folderListData} />,
    },
  ];
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="flex h-full">
      <div className="bg-stone-100 w-[22.8%] border-r border-slate-200">
        <Skeleton
          loading={folderListLoading}
          active
          paragraph={{ rows: 8 }}
          className="p-3"
        >
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            type="card"
            className="[&_.ant-tabs-content-holder]:px-1 [&>.ant-tabs-nav]:mb-3 [&_.ant-tabs-nav]:!bg-stone-200 [&_.ant-tabs-nav-list>.ant-tabs-tab-active]:!bg-stone-100 [&_.ant-tabs-tab]:!bg-stone-200 [&_.ant-tabs-tab]:!border-none [&_.ant-tabs-tab.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-primary [&_.ant-tabs-tab:hover]:text-[#dc8f9a]"
          />
        </Skeleton>
      </div>
      <div className="w-[77.2%]">
        {activeTab === "1" ? (
          <SummaryTable
            summaryList={folderListData}
            summaryListLoading={folderListLoading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default NoteManage;
