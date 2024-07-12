import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { useNewDocState } from "../../../utils/provider";
import React, { useEffect, useRef, useCallback } from "react";
import { PartialBlock, StyleSchema, StyledText } from "@blocknote/core";
import { Button, Space } from "antd";

const ContinueFrame = () => {
  const {
    continButtnDisplay,
    continText,
    editor,
    blockToUpdate,
    selection,
    range,
  } = useNewDocState();
  const textAreaRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current.resizableTextArea?.textArea;
      if (textArea) {
        textArea.scrollTop = textArea.scrollHeight;
      }
    }
  }, [continText]);
  // 点击插入后
  const handleInsert = useCallback(() => {
    const selection = editor?.getSelection();
    const lastBlock = selection?.blocks[selection?.blocks.length - 1];
    const blocksToInsert: Array<PartialBlock> = new Array<PartialBlock>();
    continText.split("\n\n").map((substr, index) => {
      console.log(index, substr);
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
          content: "",
        });
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
    // const originBlock = editor!.getBlock(blockToUpdate!);
    // const originContentArr = originBlock!.content as Array<
    //   StyledText<StyleSchema>
    // >;
    // if (originBlock?.type == "paragraph") {
    //   const newContentArr = originContentArr.map((item) => {
    //     const newText =
    //       item.text.substring(0, range.startOffset) +
    //       continText +
    //       item.text.substring(range.endOffset);
    //     return { ...item, text: newText };
    //   });
    //   editor?.updateBlock(blockToUpdate!, {
    //     content: newContentArr,
    //   });
    // } else {
    //   return;
    // }
  }, [
    editor,
    blockToUpdate,
    selection,
    continText,
    range.startOffset,
    range.endOffset,
  ]);
  return (
    <div
      className={`${continButtnDisplay} bg-white border-x border-b border-gray-100 rounded-e-md shadow-lg pt-5 pb-2.5 pl-2.5 pr-7`}
    >
      <TextArea
        autoSize={{ minRows: 1, maxRows: 5 }}
        className="py-2 border-none mr-3"
        value={continText}
        contentEditable={false}
        ref={textAreaRef}
      />
      <div className="pt-2.5 w-full flex justify-end">
        <Space size={16}>
          <Button className="h-7 w-16 rounded-sm" onClick={handleInsert}>
            插入
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ContinueFrame;
