import React, { useState, useRef } from "react";
import { Button, Input } from "antd";
import * as echarts from "echarts";

const DotChart: React.FC = () => {
  const [chartTitle, setChartTitle] = useState("");
  const [xAxisName, setXAxisName] = useState("");
  const [yAxisName, setYAxisName] = useState("");
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);

  const handleGenerateChart = () => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const xData = xValues.split(",").map((val) => parseFloat(val.trim()));
      const yData = yValues.split(",").map((val) => parseFloat(val.trim()));
      const data = xData.map((x, index) => [x, yData[index]]);

      const option = {
        title: {
          text: chartTitle,
        },
        xAxis: {
          name: xAxisName,
        },
        yAxis: {
          name: yAxisName,
        },
        series: [
          {
            symbolSize: 20,
            data: data,
            type: "scatter",
          },
        ],
      };

      chartInstance.setOption(option);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          图表名称
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={chartTitle}
          onChange={(e) => setChartTitle(e.target.value)}
          placeholder="请输入图表名称"
        />
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          X 轴名称
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={xAxisName}
          onChange={(e) => setXAxisName(e.target.value)}
          placeholder="请输入 X 轴名称"
        />
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          Y 轴名称
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={yAxisName}
          onChange={(e) => setYAxisName(e.target.value)}
          placeholder="请输入 Y 轴名称"
        />
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          X 轴值 (以英文逗号隔开)
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={xValues}
          onChange={(e) => setXValues(e.target.value)}
          placeholder="请输入 X 轴值 (以英文逗号隔开)"
        />
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          Y 轴值 (以英文逗号隔开)
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={yValues}
          onChange={(e) => setYValues(e.target.value)}
          placeholder="请输入 Y 轴值 (以英文逗号隔开)"
        />
      </div>
      <Button
        className="w-full h-10 rounded mt-1.5"
        type="primary"
        onClick={handleGenerateChart}
      >
        生成图表
      </Button>
      <div className="w-full mt-4">
        <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>
      </div>
    </div>
  );
};

export default DotChart;
