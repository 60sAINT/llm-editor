import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { formatDate } from "@/common/utils";

export interface SummaryType {
  title: string;
  last_edit_at: string;
  doc_id: string;
}
export interface SummaryTableProps {
  summaryList: SummaryType[];
  summaryListLoading: boolean;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({
  summaryList,
  summaryListLoading,
}) => {
  const columns: ColumnsType<SummaryType> = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "最近编辑",
      dataIndex: "last_edit_at",
      key: "last_edit_at",
      render: (timeString: string) => {
        return formatDate(timeString);
      },
      sorter: (a: SummaryType, b: SummaryType) =>
        new Date(b.last_edit_at!).getTime() -
        new Date(a.last_edit_at!).getTime(),
      defaultSortOrder: "ascend",
    },
  ];

  return (
    <>
      <div className="bg-neutral-50 py-2 px-4 mb-3">
        <div className="text-primary">全部总结</div>
      </div>
      <div className="m-6">
        <Table
          columns={columns}
          dataSource={summaryList}
          loading={summaryListLoading}
        />
      </div>
    </>
  );
};
