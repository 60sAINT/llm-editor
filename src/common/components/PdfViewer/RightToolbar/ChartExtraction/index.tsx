import React, { useEffect, useState } from "react";
import {
  HighlightPlugin,
  highlightPlugin,
  RenderHighlightsProps,
  Trigger,
} from "@react-pdf-viewer/highlight";
import { BoundaryType, PaperInformationType } from "../../interface";
import { DownloadOutlined } from "@ant-design/icons";

interface ChartExtractionProps {
  jumpToPage: (targetPage: number) => void;
  setChartHighlightPluginInstance: (
    chartHighlightPluginInstance: HighlightPlugin
  ) => void;
  paperInformation: PaperInformationType;
}

export const ChartExtraction: React.FC<ChartExtractionProps> = ({
  jumpToPage,
  setChartHighlightPluginInstance,
  paperInformation,
}) => {
  const [areas, setAreas] = useState<BoundaryType[]>([]);
  const [highlight, setHighlight] = useState(false);

  const renderchartHighlights = (props: RenderHighlightsProps) => {
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

  useEffect(() => {
    setChartHighlightPluginInstance(chartHighlightPluginInstance);
  }, [areas]);

  const handleItemClick = (figure: any) => {
    jumpToPage(figure.page);
    figure.boundary.pageIndex = figure.page;
    setAreas([figure.boundary]);
    setHighlight(true);
  };

  const handleDownloadClick = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "download";
    link.click();
  };

  return (
    <div>
      <ul>
        {paperInformation.figures.figures.map((figure, index) => (
          <li
            key={index}
            className="mb-3 hover:bg-neutral-200 px-5"
            onClick={() => {
              handleItemClick(figure);
            }}
          >
            <div className="py-1.5">{figure.caption}</div>
            <div className="p-1 bg-neutral-100 rounded relative group/download">
              <img src={figure.url} alt={figure.caption} />
              <div
                className="invisible group-hover/download:visible w-5 h-5 flex justify-center items-center bg-black/25 rounded-full absolute right-2 bottom-2 cursor-pointer"
                onClick={() => handleDownloadClick(figure.url)}
              >
                <DownloadOutlined className="text-white text-sm" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
