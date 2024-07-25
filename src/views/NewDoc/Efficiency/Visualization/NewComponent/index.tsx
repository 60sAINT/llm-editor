import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MindChart } from "./MindChart";
import LineChart from "./LineChart";
import { Button, Tag, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

export const NewComponent: React.FC<{
  onBack: () => void;
  componentName: string;
}> = ({ onBack, componentName }) => {
  console.log(componentName);

  return (
    <div>
      <Button
        onClick={onBack}
        size="small"
        className="absolute left-3.5 top-[62px]"
      >
        返回
      </Button>
      <Tag
        icon={
          <Tooltip title="折线图：适用于显示数据随时间的变化趋势，如股票价格、气温变化等。">
            <QuestionCircleFilled className="text-base mr-1.5" />
          </Tooltip>
        }
        color="#55acee"
        className="h-8 px-4 mx-auto w-36 flex justify-start"
      >
        <span className="font-bold text-lg">{componentName}</span>
      </Tag>

      {componentName == "LineChart" && <LineChart />}
      {/* <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div> */}
      {componentName == "PieChart" && <MindChart />}
    </div>
  );
};
