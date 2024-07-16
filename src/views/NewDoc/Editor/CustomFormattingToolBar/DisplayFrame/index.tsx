import React, { useEffect, useRef, useCallback } from "react";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { useNewDocState } from "../../../utils/provider";
import {
  BlockIdentifier,
  PartialBlock,
  StyleSchema,
  StyledText,
} from "@blocknote/core";
import { Button, Space } from "antd";

const DisplayFrame = () => {
  const { buttonDisplay, frameText, editor, blockToUpdate, selection, range } =
    useNewDocState();
  const textAreaRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current.resizableTextArea?.textArea;
      if (textArea) {
        textArea.scrollTop = textArea.scrollHeight;
      }
    }
  }, [frameText]);
  // 点击插入后
  const handleInsert = useCallback(() => {
    const selection = editor?.getSelection();
    const lastBlock = selection?.blocks[selection?.blocks.length - 1];
    const blocksToInsert: Array<PartialBlock> = new Array<PartialBlock>();
    frameText.split("\n\n").map((substr, index) => {
      if (index == 0) {
        const newLastBlockText =
          (lastBlock?.content as StyledText<StyleSchema>[])[0].text.substring(
            0,
            range.endOffset
          ) + substr;
        editor?.updateBlock(lastBlock!, {
          content: [
            {
              ...(lastBlock?.content as StyledText<StyleSchema>[])[0],
              text: newLastBlockText,
            },
          ],
        });
      } else {
        blocksToInsert.push({
          type: "paragraph",
          content: substr,
        });
      }
    });
    blocksToInsert.push({
      type: "paragraph",
      content: (
        lastBlock?.content as StyledText<StyleSchema>[]
      )[0].text.substring(range.endOffset),
    });
    editor?.insertBlocks(blocksToInsert, lastBlock!, "after");
  }, [
    editor,
    blockToUpdate,
    selection,
    frameText,
    range.startOffset,
    range.endOffset,
  ]);
  // 点击替换后
  const handleReplace = useCallback(() => {
    const selection = editor?.getSelection();
    const firstBlock = selection?.blocks[0];
    const lastBlock = selection?.blocks[selection?.blocks.length - 1];
    const blocksToReplace: Array<PartialBlock> = new Array<PartialBlock>();
    const blocksToInsert: Array<PartialBlock> = new Array<PartialBlock>();
    const blocksToRemove: Array<BlockIdentifier> = new Array<BlockIdentifier>();
    // 如果选中的原文本只有一段：
    if (selection?.blocks.length == 1) {
      frameText.split("\n\n").map((substr, index) => {
        if (index == 0) {
          const newFirstBlockText =
            (
              firstBlock?.content as StyledText<StyleSchema>[]
            )[0].text.substring(0, range.startOffset) + substr;
          editor?.updateBlock(firstBlock!, {
            content: [
              {
                ...(firstBlock?.content as StyledText<StyleSchema>[])[0],
                text: newFirstBlockText,
              },
            ],
          });
        } else {
          blocksToInsert.push({
            type: "paragraph",
            content: substr,
          });
        }
      });
      blocksToInsert.push({
        type: "paragraph",
        content: (
          firstBlock?.content as StyledText<StyleSchema>[]
        )[0].text.substring(range.endOffset),
      });
      editor?.insertBlocks(blocksToInsert, firstBlock!, "after");
    }
    selection?.blocks.map((block: BlockIdentifier, index: number) => {
      if (index !== 0 && index !== selection?.blocks.length - 1) {
        blocksToRemove.push(block);
      }
    });
    frameText.split("\n\n").map((substr, index) => {
      if (index == 0) {
        const newFirstBlockText =
          (firstBlock?.content as StyledText<StyleSchema>[])[0].text.substring(
            0,
            range.startOffset
          ) + substr;
        editor?.updateBlock(firstBlock!, {
          content: [
            {
              ...(firstBlock?.content as StyledText<StyleSchema>[])[0],
              text: newFirstBlockText,
            },
          ],
        });
      } else if (index == frameText.split("\n\n").length - 1) {
        const newLastBlockText =
          substr +
          (lastBlock?.content as StyledText<StyleSchema>[])[0].text.substring(
            range.endOffset
          );
        editor?.updateBlock(lastBlock!, {
          content: [
            {
              ...(lastBlock?.content as StyledText<StyleSchema>[])[0],
              text: newLastBlockText,
            },
          ],
        });
      } else {
        blocksToReplace.push({
          type: "paragraph",
          content: substr,
        });
      }
    });
    editor?.replaceBlocks(blocksToRemove, blocksToReplace);
  }, [
    editor,
    blockToUpdate,
    selection,
    frameText,
    range.startOffset,
    range.endOffset,
  ]);
  return (
    <div
      className={`${buttonDisplay} bg-white border-x border-b border-gray-100 rounded-e-md shadow-lg pt-5 pb-2.5 pl-2.5 pr-7`}
    >
      <TextArea
        autoSize={{ minRows: 1, maxRows: 5 }}
        className="py-2 border-none mr-3"
        value={frameText}
        contentEditable={false}
        ref={textAreaRef}
      />
      <div className="pt-2.5 w-full flex justify-end">
        <Space size={16}>
          <Button
            className="h-7 w-16 rounded-sm"
            onClick={handleReplace}
            type="primary"
          >
            替换
          </Button>
          <Button className="h-7 w-16 rounded-sm" onClick={handleInsert}>
            插入
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default DisplayFrame;
