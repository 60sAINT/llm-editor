import {
  AreaChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

const icons = [
  {
    id: 1,
    name: "折线图",
    component: "LineChart",
    icon: (
      <LineChartOutlined className="!text-7xl text-blue-500 justify-center" />
    ),
  },
  {
    id: 2,
    name: "柱状图",
    component: "BarChart",
    icon: (
      <BarChartOutlined className="!text-7xl text-blue-500 justify-center" />
    ),
  },
  {
    id: 3,
    name: "饼图",
    component: "PieChart",
    icon: (
      <PieChartOutlined className="!text-7xl text-blue-500 justify-center" />
    ),
  },
  {
    id: 4,
    name: "散点图",
    component: "DotChart",
    icon: (
      <DotChartOutlined className="!text-7xl text-blue-500 justify-center" />
    ),
  },
  {
    id: 5,
    name: "雷达图",
    component: "RadarChart",
    icon: (
      <RadarChartOutlined className="!text-7xl text-blue-500 justify-center !font-medium" />
    ),
  },
  // { id: 6, name: "散点图", component: "ScatterChart" },
  // { id: 7, name: "堆栈图", component: "StackChart" },
  // { id: 8, name: "步骤图", component: "StepChart" },
];

const ChartType: React.FC<{ onClick: (component: string) => void }> = ({
  onClick,
}) => {
  return (
    <div className="flex flex-wrap">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="w-1/2 flex flex-col text-center rounded hover:bg-blue-50 py-3"
          onClick={() => onClick(icon.component)}
        >
          {icon.icon}
          <p className="text-center text-xl font-semibold">{icon.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ChartType;
