import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieChart: React.FC = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
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
    };
    chartInstance.setOption(option);

    // Cleanup on component unmount
    // return () => {
    //   chartInstance.dispose();
    // };
  }, []);

  return (
    <>
      <div className="mb-8">
        <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
      </div>
    </>
  );
};

export default PieChart;
