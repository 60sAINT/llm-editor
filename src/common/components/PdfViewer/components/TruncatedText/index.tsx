import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export interface TruncatedTextProps {
  text: string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-[425px]">
      <p className="max-h-36 overflow-auto text-neutral-800 text-[13px]">
        {expanded ? text : text.slice(0, 300) + "..."}
        {!expanded && (
          <DownOutlined onClick={toggleExpanded} className="ml-1" />
        )}
        {expanded && <UpOutlined onClick={toggleExpanded} className="ml-1" />}
      </p>
    </div>
  );
};

export default TruncatedText;
