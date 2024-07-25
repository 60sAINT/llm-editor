import React from "react";
import LineChart from "./LineChart";
import { Button, Tag, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import BarChart from "./Barchart";
import PieChart from "./PieChart";

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
      {/* <Tag
        icon={
          <Tooltip title="柱状图：适用于比较不同类别的数据，如年度销售额、人口统计等。">
            <QuestionCircleFilled className="text-base mr-1.5" />
          </Tooltip>
        }
        color="#55acee"
        className="h-8 px-4 mx-auto w-36 flex justify-start"
      >
        <span className="font-bold text-lg">{componentName}</span>
      </Tag> */}

      {componentName == "LineChart" && (
        <>
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
          <LineChart />
        </>
      )}
      {componentName == "BarChart" && (
        <>
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
          <BarChart />
        </>
      )}
      {componentName == "PieChart" && (
        <>
          <Tag
            icon={
              <Tooltip title="饼状图：适用于显示各部分占整体的比例，常用于市场份额、预算分配等场景。">
                <QuestionCircleFilled className="text-base mr-1.5" />
              </Tooltip>
            }
            color="#55acee"
            className="h-8 px-4 mx-auto w-36 flex justify-start"
          >
            <span className="font-bold text-lg">{componentName}</span>
          </Tag>
          <PieChart />
        </>
      )}
    </div>
  );
};
