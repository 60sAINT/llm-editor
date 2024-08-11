import { RenderHighlightsProps } from "@react-pdf-viewer/highlight";
import React, { useEffect, useState } from "react";

const areas = [
  {
    left: 0,
    top: 0,
    height: 0,
    width: 0,
    pageIndex: 0,
  },
];

export const renderchartHighlights = (props: RenderHighlightsProps) => {
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
