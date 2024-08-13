import { useRequest } from "@/hooks/useRequest";
import React from "react";
import { paperApi } from "../api";
import { useAuth } from "@/provider/authProvider";
import { RecentPaperType } from "../interface";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

export const RecentReading = () => {
  const { token } = useAuth();
  const { data: paperList, loading: recentPaperListLoading } = useRequest(
    async () => {
      const res = await paperApi.getRecentPaperList(`Bearer ${token}` || "");
      return res;
    },
    { manual: false }
  );
  return (
    <div className="p-4">
      <Skeleton loading={recentPaperListLoading} paragraph={{ rows: 5 }}>
        <ul className="[&>li:first-child]:!mt-0">
          {paperList ? (
            paperList.map((paper: RecentPaperType) => (
              <li className="mt-4 font-bold">
                <Link
                  to={`/pdf?pdfId=${paper.paper_id}`}
                  target="_blank"
                  className="text-primary hover:text-[#e2a3ac] w-full inline-block"
                >
                  {paper.title}
                </Link>
              </li>
            ))
          ) : (
            <div className="font-bold text-neutral-600">暂无数据</div>
          )}
        </ul>
      </Skeleton>
    </div>
  );
};
