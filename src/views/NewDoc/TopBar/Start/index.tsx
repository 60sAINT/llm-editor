import React, { useEffect, useRef, useState } from "react";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PictureOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Divider, Dropdown, MenuProps, Popover, Space, Tooltip } from "antd";
import "./index.css";
import { useNewDocState } from "../../utils/provider";
import { Block } from "@blocknote/core";
import { showError } from "@/common/utils/message";
import { TableSizeSelector } from "@/common/components/TableSizeSelector";
import Rewrite from "./RewriteButton";

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

  // "标题"dropdown配置
  const [newParaBlocks, setNewParaBlocks] = useState<Block[]>([]);
  const [level, setLevel] = useState<2 | 1 | 3 | undefined>(1);
  useEffect(() => {
    newParaBlocks.forEach((newParaBlock) => {
      state.editor?.updateBlock(newParaBlock, {
        type: "heading",
        props: { ...newParaBlock.props, level },
      });
    });
  }, [newParaBlocks, level]);
  const [title, setTitle] = useState<string>("正文");
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const titleItems: MenuProps["items"] = [
    {
      label: (
        <div
          className={`font-bold w-36 ${title == "正文" ? "text-primary" : ""}`}
        >
          正文
        </div>
      ),
      key: "paragraph",
    },
    {
      label: (
        <div
          className={`text-[26px] font-bold ${
            title == "标题1" ? "text-primary" : ""
          }`}
        >
          标题1
        </div>
      ),
      key: "heading1",
    },
    {
      label: (
        <div
          className={`text-[22px] font-bold ${
            title == "标题2" ? "text-primary" : ""
          }`}
        >
          标题2
        </div>
      ),
      key: "heading2",
    },
    {
      label: (
        <div
          className={`text-xl font-bold ${
            title == "标题3" ? "text-primary" : ""
          }`}
        >
          标题3
        </div>
      ),
      key: "heading3",
    },
  ];
  const handleTitleClick: MenuProps["onClick"] = ({ key }) => {
    setIsTitleOpen(!isTitleOpen);
    // 如果想转成paragraph
    if (key == "paragraph") {
      setTitle("正文");
      // 根据光标选择了文本
      if (state.editor?.getSelection()) {
        const blocks = state.editor?.getSelection()?.blocks;
        blocks!.map((block: Block) => {
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
        const updatedBlocks = blocks!.map((block: Block) => {
          return block;
        });
        setNewParaBlocks(updatedBlocks);
      } else {
        setNewParaBlocks([state.editor?.getTextCursorPosition().block!]);
      }
    }
  };

  // “增加缩进”配置
  const handleNestClick = () => {
    if (state.editor?.canNestBlock()) {
      state.editor.nestBlock();
    } else {
      if (
        state.editor?.getSelection() ||
        state.editor?.getTextCursorPosition().block
      ) {
        showError("selected block(s) can't be nested");
      }
    }
  };

  // “减少缩进”配置
  const handleUnnestClick = () => {
    if (state.editor?.canUnnestBlock()) {
      state.editor.unnestBlock();
    } else {
      if (
        state.editor?.getSelection() ||
        state.editor?.getTextCursorPosition().block
      ) {
        showError("selected block(s) can't be un-nested");
      }
    }
  };

  // “左对齐” "居中对齐" “右对齐” “两端对齐”配置
  const handleAlignClick = (textAlignment: string) => {
    // 光标选择了文本
    if (state.editor?.getSelection()) {
      const blocks = state.editor?.getSelection()?.blocks;
      blocks!.map((block: Block) => {
        const newProps = { ...block.props, textAlignment };
        state.editor?.updateBlock(block, {
          props: newProps,
        });
      });
    }
    // 光标未选择文本，但放在某处
    else {
      const block = state.editor?.getTextCursorPosition().block!;
      const newProps = {
        ...block.props,
        textAlignment,
      };
      state.editor?.updateBlock(block, {
        props: newProps,
      });
    }
  };

  // 有序列表 or 无序列表
  const handleChangeBlockTypeClick = (
    type:
      | "paragraph"
      | "heading"
      | "bulletListItem"
      | "numberedListItem"
      | "checkListItem"
      | "table"
      | "file"
      | "image"
      | "video"
      | "audio"
      | undefined
  ) => {
    // 光标选择了文本
    if (state.editor?.getSelection()) {
      const blocks = state.editor?.getSelection()?.blocks;
      blocks!.map((block: Block) => {
        state.editor?.updateBlock(block, {
          type,
        });
      });
    }
    // 光标未选择文本，但放在某处
    else {
      state.editor?.updateBlock(state.editor?.getTextCursorPosition().block, {
        type: "numberedListItem",
      });
    }
  };

  // 插入图片
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const handleImageClick = () => {
    const selection = state.editor?.getSelection();
    const lastBlock = selection?.blocks[selection?.blocks.length - 1];
    if (!lastBlock && !state.editor?.getTextCursorPosition().block) {
      showError("请选择图片插入位置");
      return;
    }
    fileInputRef.current?.click();
  };
  useEffect(() => {
    const selection = state.editor?.getSelection();
    const lastBlock = selection?.blocks[selection?.blocks.length - 1];
    if (lastBlock) {
      state.editor?.insertBlocks(
        [
          {
            type: "image",
            props: {
              url: imageSrc,
            },
          },
        ],
        lastBlock!,
        "after"
      );
    } else if (state.editor?.getTextCursorPosition().block) {
      state.editor?.insertBlocks(
        [
          {
            type: "image",
            props: {
              url: imageSrc,
            },
          },
        ],
        state.editor?.getTextCursorPosition().block,
        "after"
      );
    } else {
      return;
    }
  }, [imageSrc]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // 插入表格
  const handleTableClick = (rows: number, cols: number) => {
    const tableContent = generateTableData(rows, cols);
    // 光标选择了文本
    if (state.editor?.getSelection()) {
      const blocks = state.editor?.getSelection()?.blocks;
      const lastBlock = blocks[blocks.length - 1];
      state.editor?.insertBlocks(
        [
          {
            type: "table",
            content: tableContent,
          },
        ],
        lastBlock!,
        "after"
      );
    }
    // 光标未选择文本，但放在某处
    else {
      state.editor?.insertBlocks(
        [
          {
            type: "table",
            content: tableContent,
          },
        ],
        state.editor?.getTextCursorPosition().block,
        "after"
      );
    }
  };
  const generateTableData = (rows: number, cols: number) => {
    const cellTemplate = {
      type: "text",
      text: "",
      styles: {},
    };
    const tableData = {
      type: "tableContent",
      rows: Array.from({ length: rows }, () => ({
        cells: Array.from({ length: cols }, () => [{ ...cellTemplate }]),
      })),
    };
    return tableData;
  };
  // ”插入“的dropdown列表
  const insertItems: MenuProps["items"] = [
    {
      label: (
        <>
          <div
            className="text-xs w-28 h-5 leading-5 text-topbar-insert-dropdown-text"
            onClick={handleImageClick}
          >
            <PictureOutlined className="mr-2.5" />
            图片
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      ),
      key: "image",
    },
    {
      label: (
        <Popover
          placement="leftTop"
          content={<TableSizeSelector onSelect={handleTableClick} />}
        >
          <div className="group text-xs w-28 h-5 leading-5 text-topbar-insert-dropdown-text">
            <TableOutlined className="mr-2.5" />
            表格
            <CaretRightOutlined className="float-right h-5 group-hover:text-gray-400" />
          </div>
        </Popover>
      ),
      key: "table",
    },
  ];

  return (
    <div
      className={`sticky top-14 shadow-md border-b border-gray-300 h-9 w-full ${
        animateReverse ? "animateReverse" : ""
      } ${animate ? "animate" : "hidden"} flex justify-center`}
    >
      <div className="flex pr-10 float-left justify-evenly w-11/12">
        <Tooltip
          title={<div className="text-neutral-500 text-xs">标题</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <Dropdown
            menu={{ items: titleItems, onClick: handleTitleClick }}
            trigger={["click"]}
            onOpenChange={(open) => setIsTitleOpen(open)}
            className="px-2 py-1 [&>.ant-space-item]:flex [&>.ant-space-item]:items-center"
          >
            <Space>
              <div className="text-topbar-text text-xs">{title}</div>
              <CaretDownOutlined
                className={`h-full text-topbar-text text-xs dropdown-icon ${
                  isTitleOpen ? "open" : ""
                }`}
              />
            </Space>
          </Dropdown>
        </Tooltip>
        <Divider type="vertical" className="top-1.5 mx-1 h-6 border-zinc-200" />
        <Tooltip
          title={<div className="text-neutral-500">增加缩进</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div onClick={handleNestClick} className="py-1">
            <MenuUnfoldOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Tooltip
          title={<div className="text-neutral-500">减少缩进</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div onClick={handleUnnestClick} className="py-1">
            <MenuFoldOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Tooltip
          title={<div className="text-neutral-500">左对齐</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div onClick={() => handleAlignClick("left")} className="py-1">
            <AlignLeftOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Tooltip
          title={<div className="text-neutral-500">居中对齐</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div onClick={() => handleAlignClick("center")} className="py-1">
            <AlignCenterOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Tooltip
          title={<div className="text-neutral-500">右对齐</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div onClick={() => handleAlignClick("right")} className="py-1">
            <AlignRightOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Tooltip
          title={<div className="text-neutral-500">两端对齐</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div onClick={() => handleAlignClick("justify")} className="py-1">
            <MenuOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Tooltip
          title={<div className="text-neutral-500">有序列表</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div
            onClick={() => handleChangeBlockTypeClick("numberedListItem")}
            className="py-1"
          >
            <OrderedListOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Tooltip
          title={<div className="text-neutral-500">无序列表</div>}
          color="#fff"
          autoAdjustOverflow={false}
          placement="bottom"
          mouseEnterDelay={0.03}
          mouseLeaveDelay={0.03}
        >
          <div
            onClick={() => handleChangeBlockTypeClick("bulletListItem")}
            className="py-1"
          >
            <UnorderedListOutlined className="px-3 py-1 text-neutral-500 text-sm" />
          </div>
        </Tooltip>
        <Rewrite />
        <Divider type="vertical" className="top-1.5 mx-1 h-6 border-zinc-200" />
        <Dropdown
          menu={{ items: insertItems }}
          trigger={["click"]}
          className="px-2 my-1 [&>.ant-space-item]:flex [&>.ant-space-item]:items-center"
        >
          <Space className="border border-transparent hover:border hover:border-neutral-300">
            <div className="text-topbar-text text-xs">插入</div>
            <CaretDownOutlined className="h-full text-topbar-text text-xs dropdown-icon" />
          </Space>
        </Dropdown>
      </div>
      <UpOutlined
        className="float-right right-0 inline-block leading-7 !font-black text-base mr-5 h-full"
        onClick={handleFold}
      />
    </div>
  );
};
