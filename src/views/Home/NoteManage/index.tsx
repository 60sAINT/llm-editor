import { useRequest } from "@/hooks/useRequest";
import { Skeleton, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
// import { literatureApi } from "./api";
import { useAuth } from "@/provider/authProvider";
import { literatureApi } from "./api";
import { Summary } from "./Summary";
import { SummaryTable } from "./SummaryTable";

const NoteManage = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("1");

  const {
    run: getSummaryList,
    data: summaryList,
    loading: summaryListLoading,
  } = useRequest(
    async () => {
      const res = await literatureApi.getLiteratureList(
        `Bearer ${token}` || ""
      );
      return res;
    },
    { manual: false }
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "总结",
      children: <Summary summaryList={summaryList} />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
    setActiveTab(key);
  };

  return (
    <div className="flex h-full">
      <div className="bg-stone-100 w-[22.8%] border-r border-slate-200">
        <Skeleton
          loading={summaryListLoading}
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
            summaryList={summaryList}
            summaryListLoading={summaryListLoading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default NoteManage;
