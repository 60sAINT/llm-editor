import React, { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDocState } from "../utils/docProvider";
import { scrollToElement } from "./utils";
import "./index.css";

// Define a type for the heading object
interface Heading {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
}

// Define props for the Outline component
interface OutlineProps {
  editor: BlockNoteEditor | undefined;
  isVisible: boolean;
  toggleVisibility: () => void;
  ifStartUnfold: boolean;
}

const Outline: React.FC<OutlineProps> = ({
  editor,
  isVisible,
  toggleVisibility,
  ifStartUnfold,
}) => {
  const { title } = useDocState();
  const [selectedHeadingId, setSelectedHeadingId] = useState<string | null>(
    null
  );

  const extractHeadings = (content: any[]): Heading[] => {
    const headingStack: Heading[] = [];
    const headingTree: Heading[] = [];

    content.forEach((block) => {
      if (block.type === "heading") {
        const newHeading: Heading = {
          id: block.id,
          text: block.content[0]?.text || "",
          level: block.props.level,
          children: [],
        };

        while (
          headingStack.length &&
          headingStack[headingStack.length - 1].level >= newHeading.level
        ) {
          headingStack.pop();
        }

        if (headingStack.length === 0) {
          headingTree.push(newHeading);
        } else {
          headingStack[headingStack.length - 1].children!.push(newHeading);
        }

        headingStack.push(newHeading);
      }
    });

    return headingTree;
  };

  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleHeadingClick = (id: string) => {
    setSelectedHeadingId(id);
    scrollToElement(id);
  };

  const renderHeadings = (headings: Heading[]) => {
    return headings.map((heading) => (
      <div key={heading.id} className={`ml-${(heading.level - 2) * 3}`}>
        <div
          className="heading-row flex items-center justify-start py-1.5"
          onClick={(e) => {
            e.preventDefault();
            handleHeadingClick(heading.id);
          }}
        >
          {heading.children && heading.children.length > 0 && (
            <div className="icon-button">
              {collapsed[heading.id] ? (
                <CaretRightOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse(heading.id);
                  }}
                  className="text-neutral-300 mr-1 text-xs"
                />
              ) : (
                <CaretDownOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse(heading.id);
                  }}
                  className="text-neutral-300 mr-1 text-xs"
                />
              )}
            </div>
          )}
          <a
            href={`#${heading.id}`}
            className={`heading-link text-xs ${
              heading.level === 1 ? "font-bold" : ""
            } ${selectedHeadingId === heading.id ? "text-blue-700" : ""}`}
          >
            {heading.text}
          </a>
        </div>
        {!collapsed[heading.id] && heading.children && (
          <div className="ml-4">{renderHeadings(heading.children)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-full max-w-64 overflow-auto bg-transparent float-right w-full">
      {isVisible && (
        <div className="bg-transparent pr-2.5">
          <div
            className={`flex justify-between mb-3.5 fixed top-[${
              ifStartUnfold ? 129 : 73
            }px] max-w-64 min-w-60`}
          >
            <h2 className="text-sm font-semibold leading-7 text-neutral-800">
              {title || "无标题"}
            </h2>
            <CloseOutlined
              onClick={toggleVisibility}
              className="text-neutral-400 text-xs"
            />
          </div>
          <div
            className={`mt-10 fixed top-[${
              ifStartUnfold ? 129 : 73
            }px] max-w-60 min-w-56`}
          >
            {renderHeadings(extractHeadings(editor!.document))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Outline;
