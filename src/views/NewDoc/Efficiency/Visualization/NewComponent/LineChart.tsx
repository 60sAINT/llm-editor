import React, { useState, useRef } from "react";
import { Button, Input } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import * as echarts from "echarts";

const LineChart: React.FC = () => {
  const [title, setTitle] = useState("");
  const [xAxisName, setXAxisName] = useState("");
  const [yAxisName, setYAxisName] = useState("");
  const [xAxisData, setXAxisData] = useState("");
  const [seriesData, setSeriesData] = useState([{ name: "", data: "" }]);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleAddSeries = () => {
    setSeriesData([...seriesData, { name: "", data: "" }]);
  };

  const handleRemoveSeries = (index: number) => {
    const newSeriesData = seriesData.filter((_, i) => i !== index);
    setSeriesData(newSeriesData);
  };

  const handleSeriesChange = (index: number, field: string, value: string) => {
    const newSeriesData = seriesData.map((series, i) => {
      if (i === index) {
        return { ...series, [field]: value };
      }
      return series;
    });
    setSeriesData(newSeriesData);
  };

  const handleGenerateChart = () => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const option = {
        title: {
          text: title,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: seriesData.map((series) => series.name),
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          name: xAxisName,
          type: "category",
          boundaryGap: false,
          data: xAxisData.split(","),
        },
        yAxis: {
          name: yAxisName,
          type: "value",
        },
        series: seriesData.map((series) => {
          return {
            name: series.name,
            type: "line",
            stack: "Total",
            data: series.data.split(",").map(Number),
          };
        }),
      };
      chartInstance.setOption(option);
    }
  };

  return (
    <div>
      <div>
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          图表标题
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入图表标题"
        />
      </div>
      <div>
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          X轴名称
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={xAxisName}
          onChange={(e) => setXAxisName(e.target.value)}
          placeholder="请输入X轴名称"
        />
      </div>
      <div>
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          Y轴名称
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={yAxisName}
          onChange={(e) => setYAxisName(e.target.value)}
          placeholder="请输入Y轴名称"
        />
      </div>
      <div>
        <div className="leading-10 text-slate-700 mt-4 font-semibold">
          X轴数据 (用英文逗号分隔)
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={xAxisData}
          onChange={(e) => setXAxisData(e.target.value)}
          placeholder="请输入X轴数据"
        />
      </div>
      <div className="mb-4">
        <div className="leading-10 text-slate-700 mt-4 font-semibold">数据</div>
        {seriesData.map((series, index) => (
          <div key={index} className="mb-2 flex items-center">
            <Input
              className="w-2/5 p-2 border border-gray-300 rounded mr-2"
              value={series.name}
              onChange={(e) =>
                handleSeriesChange(index, "name", e.target.value)
              }
              placeholder="折线名称"
            />
            <Input
              className="w-3/4 p-2 border border-gray-300 rounded mr-2"
              value={series.data}
              onChange={(e) =>
                handleSeriesChange(index, "data", e.target.value)
              }
              placeholder="Y轴数据(英文逗号分隔)"
            />
            <Button onClick={() => handleRemoveSeries(index)} size="small">
              <MinusCircleOutlined />
              删除
            </Button>
          </div>
        ))}
        <Button onClick={handleAddSeries} size="small">
          <PlusCircleOutlined />
          添加数据
        </Button>
      </div>
      <Button
        className="w-full h-10 rounded mt-1.5"
        type="primary"
        onClick={handleGenerateChart}
      >
        生成图表
      </Button>
      <div className="w-full mt-4">
        <div ref={chartRef} style={{ width: "100%", height: "350px" }}></div>
      </div>
    </div>
  );
};

export default LineChart;
