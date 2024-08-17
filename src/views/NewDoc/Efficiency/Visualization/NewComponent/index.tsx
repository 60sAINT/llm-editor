import React from "react";
import LineChart from "./LineChart";
import { Button, Tag, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import BarChart from "./Barchart";
import PieChart from "./PieChart";
import DotChart from "./DotChart";
import RadarChart from "./RadarChart";

export const NewComponent: React.FC<{
  onBack: () => void;
  componentName: string;
}> = ({ onBack, componentName }) => {
  return (
    <div>
      {componentName == "LineChart" && (
        <>
          <div className="flex items-center">
            <Button
              onClick={onBack}
              size="small"
              // className="absolute left-3.5 top-[62px]"
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
          </div>
          <LineChart />
        </>
      )}
      {componentName == "BarChart" && (
        <>
          <div className="flex items-center">
            <Button
              onClick={onBack}
              size="small"
              // className="absolute left-3.5 top-[62px]"
            >
              返回
            </Button>
            <Tag
              icon={
                <Tooltip title="柱状图：适用于比较不同类别的数据，如年度销售额、人口统计等。">
                  <QuestionCircleFilled className="text-base mr-1.5" />
                </Tooltip>
              }
              color="#55acee"
              className="h-8 px-4 mx-auto w-36 flex justify-start"
            >
              <span className="font-bold text-lg">{componentName}</span>
            </Tag>
          </div>
          <BarChart />
        </>
      )}
      {componentName == "PieChart" && (
        <>
          <div className="flex items-center">
            <Button
              onClick={onBack}
              size="small"
              // className="absolute left-3.5 top-[62px]"
            >
              返回
            </Button>
            <Tag
              icon={
                <Tooltip title="饼图：适用于显示各部分占整体的比例，常用于市场份额、预算分配等场景。">
                  <QuestionCircleFilled className="text-base mr-1.5" />
                </Tooltip>
              }
              color="#55acee"
              className="h-8 px-4 mx-auto w-36 flex justify-start"
            >
              <span className="font-bold text-lg">{componentName}</span>
            </Tag>
          </div>
          <PieChart />
        </>
      )}
      {componentName == "DotChart" && (
        <>
          <div className="flex items-center">
            <Button
              onClick={onBack}
              size="small"
              // className="absolute left-3.5 top-[62px]"
            >
              返回
            </Button>
            <Tag
              icon={
                <Tooltip title="散点图：适用于显示两个变量之间的关系，如身高与体重、广告费用与销售额等。">
                  <QuestionCircleFilled className="text-base mr-1.5" />
                </Tooltip>
              }
              color="#55acee"
              className="h-8 px-4 mx-auto w-36 flex justify-start"
            >
              <span className="font-bold text-lg">{componentName}</span>
            </Tag>
          </div>
          <DotChart />
        </>
      )}
      {componentName == "RadarChart" && (
        <>
          <div className="flex items-center">
            <Button
              onClick={onBack}
              size="small"
              // className="absolute left-3.5 top-[62px]"
            >
              返回
            </Button>
            <Tag
              icon={
                <Tooltip title="雷达图：适用于比较多个变量在不同维度上的表现，以及展示各个变量之间的相对关系，常用于企业经营状况——收益性、生产性、流动性、安全性和成长性的评价。">
                  <QuestionCircleFilled className="text-base mr-1.5" />
                </Tooltip>
              }
              color="#55acee"
              className="h-8 px-2 mx-auto w-36 flex justify-start"
            >
              <span className="font-bold text-lg">{componentName}</span>
            </Tag>
          </div>
          <RadarChart />
        </>
      )}
    </div>
  );
};
