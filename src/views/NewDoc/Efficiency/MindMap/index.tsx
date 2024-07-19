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
    /*const option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: [
          "python基础",
          "python函数",
          "python面向对象",
          "网络编程",
          "WEB基础",
          "数据分析",
          "其他",
        ],
      },
      series: [
        {
          name: "思维导图",
          type: "pie",
          selectedMode: "single",
          radius: [0, "30%"],

          label: {
            normal: {
              position: "inner",
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: 25, name: "python", selected: true },
            { value: 8, name: "前端" },
            { value: 16, name: "数据分析" },
          ],
        },
        {
          name: "思维导图",
          type: "pie",
          radius: ["40%", "55%"],
          label: {
            normal: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
          },
          data: [
            { value: 4, name: "python基础" },
            { value: 6, name: "python函数" },
            { value: 10, name: "python面向对象" },
            { value: 5, name: "网络编程&数据库" },
            { value: 8, name: "WEB基础" },
            { value: 7, name: "数据分析" },
            { value: 9, name: "其他" },
          ],
        },
      ],
    };*/
    if (generateContent) {
      chartInstance.setOption(option);
    }

    // Cleanup on component unmount
    // return () => {
    //   chartInstance.dispose();
    // };
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
      <div className="mt-4">
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
