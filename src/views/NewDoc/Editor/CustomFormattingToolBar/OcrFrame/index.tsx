import React, { useEffect, useState } from "react";
import { Space } from "antd";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { CopyButton } from "@/common/components/CopyButton";
import { useRef } from "react";
import { useNewDocState } from "@/views/NewDoc/utils/provider";

export const OcrFrame = () => {
  const textAreaRef = useRef<TextAreaRef>(null);
  const { ocrText, blockToUpdate, ocrFrameDisplay, editor } = useNewDocState();
  const currentBlock = editor.getTextCursorPosition().block;
  const [display, setDisplay] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (currentBlock !== blockToUpdate) {
      setText(""); // Reset text when the selected block changes
    }
  }, [blockToUpdate, currentBlock]);
  useEffect(() => {
    setText(ocrText);
  }, [ocrText]);

  useEffect(() => {
    if (currentBlock !== blockToUpdate) {
      setDisplay(false);
    }
    setDisplay(ocrFrameDisplay);
  }, [blockToUpdate, ocrFrameDisplay]);
  return (
    <div
      className={`${
        display ? "" : "hidden"
      } bg-white border-x border-b border-gray-100 rounded-e-md shadow-lg pt-5 pb-2.5 pl-2.5 pr-7`}
    >
      <TextArea
        autoSize={{ minRows: 1, maxRows: 5 }}
        className="py-2 border-none mr-3"
        value={text}
        contentEditable={false}
        ref={textAreaRef}
      />
      <div className="pt-2.5 w-full flex justify-end">
        <Space size={16}>
          <CopyButton title="复制" copyText={ocrText} useButton />
        </Space>
      </div>
    </div>
  );
};
