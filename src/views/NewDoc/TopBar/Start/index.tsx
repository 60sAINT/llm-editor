import React, { useEffect, useState } from "react";
import { CaretDownOutlined, UpOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space, Tooltip } from "antd";
import "./index.css";
import { useNewDocState } from "../../utils/provider";
import { Block } from "@blocknote/core";

interface StartProps {
  animateReverse: boolean;
  animate: boolean;
  setAnimate: (animate: boolean) => void;
  setAnimateReverse: (animateReverse: boolean) => void;
}

export const Start: React.FC<StartProps> = ({
  animateReverse,
  animate,
  setAnimate,
  setAnimateReverse,
}) => {
  const state = useNewDocState();

  // 折叠"开始"
  const handleFold = () => {
    setAnimate(false);
    setAnimateReverse(true);
  };

  const [newParaBlocks, setNewParaBlocks] = useState<Block[]>([]);
  const [level, setLevel] = useState<2 | 1 | 3 | undefined>(1);
  useEffect(() => {
    console.log(newParaBlocks);
    newParaBlocks.forEach((newParaBlock) => {
      state.editor?.updateBlock(newParaBlock, {
        type: "heading",
        props: { ...newParaBlock.props, level },
      });
    });
  }, [newParaBlocks, level]);
  const [title, setTitle] = useState<string>("正文");
  const [isOpen, setIsOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: <div>正文</div>,
      key: "paragraph",
    },
    {
      label: <div>标题1</div>,
      key: "heading1",
    },
    {
      label: <div>标题2</div>,
      key: "heading2",
    },
    {
      label: <div>标题3</div>,
      key: "heading3",
    },
  ];
  const handleTitleClick: MenuProps["onClick"] = ({ key }) => {
    setIsOpen(!isOpen);
    // 如果想转成paragraph
    if (key == "paragraph") {
      setTitle("正文");
      // 根据光标选择了文本
      if (state.editor?.getSelection()) {
        const blocks = state.editor?.getSelection()?.blocks;
        blocks!.map((block) => {
          state.editor?.updateBlock(block, {
            type: "paragraph",
          });
        });
      }
      // 光标未选择文本，但放在某处
      else {
        state.editor?.updateBlock(state.editor?.getTextCursorPosition().block, {
          type: "paragraph",
        });
      }
    }
    // 如果想转成heading
    else if (key.substring(0, 7) == "heading") {
      setTitle(`标题${key.substring(7)}`);
      setLevel(parseInt(key.substring(7)) as 2 | 1 | 3 | undefined);
      if (state.editor?.getSelection()) {
        const blocks = state.editor?.getSelection()?.blocks;
        const updatedBlocks = blocks!.map((block) => {
          console.log(block);
          return block;
        });
        setNewParaBlocks(updatedBlocks);
      } else {
        setNewParaBlocks([state.editor?.getTextCursorPosition().block!]);
      }
    }
  };

  return (
    <div
      className={`shadow-md border-b border-gray-300 h-9 w-full ${
        animateReverse ? "animateReverse" : ""
      }  ${animate ? "animate" : "hidden"}`}
    >
      <Tooltip
        title={<div className="text-black">标题</div>}
        color="#fff"
        autoAdjustOverflow={false}
        placement="bottom"
      >
        <Dropdown
          menu={{ items, onClick: handleTitleClick }}
          trigger={["click"]}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {title}
              <CaretDownOutlined
                className={`dropdown-icon ${isOpen ? "open" : ""}`}
              />
            </Space>
          </a>
        </Dropdown>
      </Tooltip>
      <UpOutlined
        className="float-right inline-block leading-8 !font-black text-base mr-5"
        onClick={handleFold}
      />
    </div>
  );
};
