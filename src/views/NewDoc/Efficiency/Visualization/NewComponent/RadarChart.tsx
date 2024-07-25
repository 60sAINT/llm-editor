import React, { useState, useRef } from "react";
import { Button, Input } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import * as echarts from "echarts";

const RadarChart: React.FC = () => {
  const [chartTitle, setChartTitle] = useState("");
  const [indicators, setIndicators] = useState<string[]>([]);
  const [series, setSeries] = useState<{ name: string; data: string[] }[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleAddIndicator = () => {
    setIndicators([...indicators, ""]);
    setSeries(series.map((s) => ({ ...s, data: [...s.data, ""] })));
  };

  const handleRemoveIndicator = (index: number) => {
    const newIndicators = indicators.filter((_, i) => i !== index);
    setIndicators(newIndicators);
    setSeries(
      series.map((s) => ({
        ...s,
        data: s.data.filter((_, i) => i !== index),
      }))
    );
  };

  const handleAddSeries = () => {
    setSeries([
      ...series,
      { name: "", data: new Array(indicators.length).fill("") },
    ]);
  };

  const handleRemoveSeries = (index: number) => {
    setSeries(series.filter((_, i) => i !== index));
  };

  const handleGenerateChart = () => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        title: {
          text: chartTitle,
        },
        tooltip: {},
        legend: {
          data: series.map((s) => s.name),
        },
        radar: {
          indicator: indicators.map((ind) => ({
            name: ind,
          })),
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            type: "radar",
            data: series.map((s) => ({
              value: s.data.map((d) => parseFloat(d)),
              name: s.name,
            })),
          },
        ],
      };

      chartInstance.setOption(option);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="leading-10 text-slate-700 mt-4 font-semibold">
          图表标题
        </h3>
        <Input
          className="w-full p-2 border border-gray-300 rounded"
          value={chartTitle}
          onChange={(e) => setChartTitle(e.target.value)}
          placeholder="请输入图表标题"
        />

        <div className="mb-2">
          <h3 className="leading-10 text-slate-700 mt-4 font-semibold">
            指标（至少3个）
          </h3>
          {indicators.map((indicator, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                className="w-11/12 mr-2"
                value={indicator}
                onChange={(e) => {
                  const newIndicators = [...indicators];
                  newIndicators[index] = e.target.value;
                  setIndicators(newIndicators);
                }}
                placeholder="指标名称"
              />
              <MinusCircleOutlined
                onClick={() => handleRemoveIndicator(index)}
              />
            </div>
          ))}
          <Button
            onClick={handleAddIndicator}
            icon={<PlusCircleOutlined />}
            size="small"
          >
            添加指标
          </Button>
        </div>
        <div className="mb-2">
          <h3 className="leading-10 text-slate-700 mt-4 font-semibold">
            数据系列
          </h3>
          {series.map((s, seriesIndex) => (
            <div key={seriesIndex} className="mb-2">
              <Input
                className="w-2/5 mr-2 mb-2"
                value={s.name}
                onChange={(e) => {
                  const newSeries = [...series];
                  newSeries[seriesIndex].name = e.target.value;
                  setSeries(newSeries);
                }}
                placeholder="系列名称"
              />
              {s.data.map((value, dataIndex) => (
                <Input
                  key={dataIndex}
                  className="w-2/5 mr-2 mb-2"
                  value={value}
                  onChange={(e) => {
                    const newSeries = [...series];
                    newSeries[seriesIndex].data[dataIndex] = e.target.value;
                    setSeries(newSeries);
                  }}
                  placeholder={`数据 ${dataIndex + 1}`}
                />
              ))}
              <MinusCircleOutlined
                onClick={() => handleRemoveSeries(seriesIndex)}
              />
            </div>
          ))}
          <Button
            onClick={handleAddSeries}
            icon={<PlusCircleOutlined />}
            size="small"
          >
            添加数据系列
          </Button>
        </div>
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

export default RadarChart;
