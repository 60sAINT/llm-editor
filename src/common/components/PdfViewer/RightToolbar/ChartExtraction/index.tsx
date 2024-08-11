import React, { useContext, useEffect, useState } from "react";
import wenxin from "@/assets/wenxin.png";
import {
  HighlightPlugin,
  highlightPlugin,
  RenderHighlightsProps,
  Trigger,
} from "@react-pdf-viewer/highlight";

interface ChartExtractionProps {
  jumpToPage: (targetPage: number) => void;
  setChartHighlightPluginInstance: (
    chartHighlightPluginInstance: HighlightPlugin
  ) => void;
}

export const ChartExtraction: React.FC<ChartExtractionProps> = ({
  jumpToPage,
  setChartHighlightPluginInstance,
}) => {
  const areas = [
    {
      left: 17.647058823529413,
      top: 8.90909090909091,
      height: 18.545454545454547,
      width: 64.70588235294117,
      pageIndex: 5,
    },
  ];
  const renderchartHighlights = (props: RenderHighlightsProps) => {
    const [highlight, setHighlight] = useState(true);

    useEffect(() => {
      let timer: string | number | NodeJS.Timeout | undefined;
      if (highlight) {
        timer = setTimeout(() => {
          setHighlight(false);
        }, 3000); // 3秒后取消高亮
      }
      return () => clearTimeout(timer);
    }, [highlight]);

    return (
      <div>
        {areas
          .filter((area) => area.pageIndex === props.pageIndex)
          .map((area, idx) => (
            <div
              key={idx}
              className={`highlight-area ${
                highlight ? "highlight-animation" : ""
              }`}
              style={Object.assign(
                {},
                {
                  background: highlight ? "yellow" : "transparent",
                  opacity: 0.4,
                },
                props.getCssProperties(area, props.rotation)
              )}
            />
          ))}
      </div>
    );
  };
  const chartHighlightPluginInstance = highlightPlugin({
    renderHighlights: renderchartHighlights,
    trigger: Trigger.None,
  });
  // 设置上下文值

  return (
    <ul>
      <li
        className="mb-3 hover:bg-neutral-200 px-5"
        onClick={() => {
          jumpToPage(5);
          setChartHighlightPluginInstance(chartHighlightPluginInstance);
        }}
      >
        <div className="py-1.5">
          Figure 3: The illustration of the proposed method MiniCache. (a)
          depicts the cross-layer compression process. We fetch the KV caches,
          from layers l and l − 1, and merge them into shared states via Eq.
          (3). Additionally, we compute the ℓ2 norm for the caches to obtain
          their magnitudes. Furthermore, we select unmergable tokens for
          retention, then store merged cache, retention tokens, and magnitudes
          at layer l in C. (b) demonstrates the restoration process for layers l
          and l − 1, which includes magnitude rescaling in Eq. (2) and retention
          token recovery.
        </div>
        <div className="p-1 bg-neutral-100 rounded">
          <img src={wenxin} />
        </div>
      </li>
    </ul>
  );
};
