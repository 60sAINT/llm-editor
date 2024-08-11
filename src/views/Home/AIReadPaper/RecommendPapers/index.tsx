import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import React from "react";
import { paperApi } from "../api";
import { Skeleton } from "antd";

export const RecommendPapers = () => {
  const { token } = useAuth();
  const {
    run: getRecommendPaperList,
    data: recommendpaperList,
    loading: recommendpaperListLoading,
  } = useRequest(
    async () => {
      const res = await paperApi.getRecommendPaperList(`Bearer ${token}` || "");
      return res;
    },
    { manual: false }
  );
  console.log(recommendpaperList);
  // return true ? <Skeleton active /> : null;
  return (
    <Skeleton
      active
      loading={recommendpaperListLoading}
      paragraph={{ rows: 4 }}
      className="py-3 pr-3"
    >
      <ul>
        {/* {recommendpaperList.map((reacommendPaper) => (
          <li
            className="py-5 border-b border-gray-200 cursor-pointer"
            onClick={() => window.open(reacommendPaper., "_blank")}
          ></li>
        ))} */}
      </ul>
    </Skeleton>
  );
};
