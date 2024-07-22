import React, { useState, useEffect, useRef } from "react";
import TextArea from "antd/es/input/TextArea";
import { Button, Select, Tooltip } from "antd";
import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import * as echarts from "echarts";

const MindMap: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState<string>("");
  const chartRef = useRef(null);
  const [generateContent, setGenerateContent] = useState(false);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: "#dfdfdf",
        textStyle: {
          color: "black",
        },
      },
      series: [
        {
          type: "tree",
          symbolSize: 75,
          symbol: "roundRect",
          edgeShape: "polyline",
          edgeForkPosition: "50%",
          initialTreeDepth: 2,
          orient: "vertical",
          itemStyle: {
            color: "black",
            borderColor: "black",
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
          lineStyle: {
            color: "#7b7b7b",
            width: 3,
          },
          label: {
            show: true,
            position: "inside",
            textStyle: {
              fontSize: 15,
              color: "#fff",
            },
          },
          leaves: {
            label: {
              position: "inside",
              color: "#fff",
            },
            itemStyle: {
              color: "#dfdfdf",
              borderColor: "#dfdfdf",
            },
          },
          data: [
            {
              name: "根节点",
              url: "",
              itemStyle: {
                color: "#a53626",
                borderColor: "#a53626",
              },
              children: [
                {
                  name: "子节点1",
                  children: [
                    {
                      name: "叶子节点1",
                    },
                    {
                      name: "叶子节点2",
                    },
                    {
                      name: "叶子节点3",
                    },
                  ],
                },
                {
                  name: "子节点2",
                  children: [
                    {
                      name: "叶子节点4",
                    },
                    {
                      name: "叶子节点5",
                    },
                    {
                      name: "叶子节点6",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    if (generateContent) {
      chartInstance.setOption(option);
    }
  }, [generateContent]);

  useEffect(() => {
    setPlaceholder("如：暗物质和暗能量对宇宙学理论的挑战");
  }, []);

  const handleGenerateContent = async () => {
    setLoading(true);
    await setTimeout(() => {
      setLoading(false);
      setGenerateContent(true);
    }, 3000);
  };

  return (
    <>
      <div className="mb-8">
        <div className="h-12 leading-10 text-slate-700">请输主题/话题/问题</div>
        <TextArea
          className="w-full p-2 border border-gray-300 rounded [&>textarea]:px-4 [&>textarea]:py-1.5"
          autoSize={{ maxRows: 5, minRows: 5 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          showCount
          maxLength={1000}
        />
      </div>
      <div className="flex justify-between items-center mb-2.5">
        <div>
          知识范围
          <Tooltip title="思维导图基于网络访问获取到的实时准确信息生成">
            <InfoCircleOutlined className="ml-1.5" />
          </Tooltip>
        </div>
        <Select
          defaultValue="synthesis"
          options={[
            { value: "synthesis", label: "综合" },
            { value: "academic", label: "学术" },
          ]}
        />
      </div>
      <Button
        className="w-full h-10 rounded mt-1.5"
        type="primary"
        onClick={handleGenerateContent}
      >
        生成内容
      </Button>
      <div>
        {loading ? (
          <div className="flex justify-center mt-4 mb-4">
            <LoadingOutlined
              spin={loading}
              className="text-blue-300 text-4xl"
            />
          </div>
        ) : (
          <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
        )}
      </div>
    </>
  );
};

export default MindMap;
