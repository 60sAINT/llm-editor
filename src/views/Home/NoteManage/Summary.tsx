import { FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import React from "react";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { SummaryType } from "./SummaryTable";

export type SummaryProps = {
  summaryList: SummaryType[];
};

export const Summary: React.FC<SummaryProps> = ({ summaryList }) => {
  return (
    <>
      <div className="mb-1 h-8 flex items-center text-white font-semibold bg-primary rounded-sm pl-1 justify-between">
        <div className="flex items-center">
          <FileTextOutlined className="[&>svg]:h-[22px]" />
          <span className="mx-1">全部总结</span>
        </div>
        <div>{summaryList && summaryList.length}</div>
      </div>
      <ul>
        {summaryList &&
          summaryList.map((summary: SummaryType) => (
            <Tooltip title={summary.title} placement="right">
              <Link
                className="h-10 leading-10 hover:bg-[#fbf2f3] pl-1.5 rounded overflow-hidden text-ellipsis line-clamp-1 hover:text-[#000000e0]"
                style={{ display: "-webkit-box" }}
                to={`/NewDoc?doc_id=${summary.doc_id}`}
                target="_blank"
              >
                <FilePdfOutlined className="mr-2.5 text-slate-400" />
                {summary.title}
              </Link>
            </Tooltip>
          ))}
      </ul>
    </>
  );
};
