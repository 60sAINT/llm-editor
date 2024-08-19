import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/common/utils";
import { useNavigate } from "react-router-dom";

export interface SummaryType {
  title: string;
  last_saved_at: string;
  doc_id: string;
  type: string;
  key: string;
  is_note: boolean;
}
export interface SummaryTableProps {
  summaryList: SummaryType[];
  summaryListLoading: boolean;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({
  summaryList,
  summaryListLoading,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<SummaryType[]>([]);

  const filterNotes = (list: any[]): SummaryType[] => {
    let result: SummaryType[] = [];
    list.forEach((item) => {
      if (item.is_note) {
        result.push({
          title: item.title,
          last_saved_at: item.last_saved_at,
          doc_id: item.doc_id,
          type: "file",
          key: item.doc_id,
          is_note: item.is_note,
        });
      }
      if (item.children) {
        result = result.concat(filterNotes(item.children));
      }
    });
    return result;
  };

  useEffect(() => {
    if (summaryList) {
      const filteredData = filterNotes(summaryList);
      setData(filteredData);
    }
  }, [summaryList]);

  const columns: ColumnsType<SummaryType> = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div
          className="text-topbar-text text-sm flex items-center gap-2"
          onClick={() => {
            record.type === "file" && navigate(`/newDoc?doc_id=${record.key}`);
          }}
        >
          <Tooltip title={text}>
            <span>{text}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "最近编辑",
      dataIndex: "last_saved_at",
      key: "last_saved_at",
      render: (timeString: string) => {
        return timeString ? formatDate(timeString) : "--";
      },
      sorter: (a: SummaryType, b: SummaryType) =>
        new Date(b.last_saved_at!).getTime() -
        new Date(a.last_saved_at!).getTime(),
      defaultSortOrder: "ascend",
    },
  ];

  return (
    <>
      <div className="bg-neutral-50 py-2 px-4 mb-3">
        <div className="text-primary">全部笔记</div>
      </div>
      <div className="m-6">
        <Table
          columns={columns}
          dataSource={data}
          loading={summaryListLoading}
        />
      </div>
    </>
  );
};
