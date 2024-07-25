import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";

export interface MindChartProps {
  data: any;
}
export const MindChart: React.FC<MindChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.showLoading();
      myChart.hideLoading();
      data.children.forEach((datum: any, index: number) => {
        if (index % 2 === 0) datum.collapsed = true;
      });

      const option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            type: "tree",
            data: [data],
            top: "1%",
            left: "7%",
            bottom: "1%",
            right: "20%",
            symbolSize: 7,
            label: {
              position: "left",
              verticalAlign: "middle",
              align: "right",
              fontSize: 9,
            },
            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left",
              },
            },
            emphasis: {
              focus: "descendant",
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      };

      myChart.setOption(option);
      // });

      return () => {
        myChart.dispose();
      };
    } else {
      return;
    }
  }, []);
  return <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>;
};
