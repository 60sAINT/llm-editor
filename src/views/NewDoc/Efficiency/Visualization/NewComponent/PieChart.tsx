import React, { useState, useRef } from "react";
import { Button, Input } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import * as echarts from "echarts";

const PieChart: React.FC = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [seriesData, setSeriesData] = useState([{ name: "", value: "" }]);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleAddSeries = () => {
    setSeriesData([...seriesData, { name: "", value: "" }]);
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
          subtext: subTitle,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: seriesData.map((series) => series.name),
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: seriesData.map((series) => ({
              value: Number(series.value),
              name: series.name,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
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
          图表副标题
        </div>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="请输入图表副标题"
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
              placeholder="扇形名称"
            />
            <Input
              className="w-3/4 p-2 border border-gray-300 rounded mr-2"
              value={series.value}
              onChange={(e) =>
                handleSeriesChange(index, "value", e.target.value)
              }
              placeholder="扇形占面积百分比"
              suffix="%"
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

export default PieChart;
