import React, { useEffect, useState } from "react";
import { Skeleton, Space } from "antd";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { CopyButton } from "@/common/components/CopyButton";
import { useRef } from "react";
import { useNewDocState } from "@/views/NewDoc/utils/provider";

export const DetectionFrame = () => {
  const textAreaRef = useRef<TextAreaRef>(null);
  const {
    detectionText,
    blockToUpdate,
    detectionFrameDisplay,
    editor,
    loadingDisplay,
  } = useNewDocState();
  const currentBlock = editor.getTextCursorPosition().block;
  const [display, setDisplay] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (currentBlock !== blockToUpdate) {
      setText(""); // Reset text when the selected block changes
    }
  }, [blockToUpdate, currentBlock]);
  useEffect(() => {
    setText(detectionText);
  }, [detectionText]);

  useEffect(() => {
    if (currentBlock !== blockToUpdate) {
      setDisplay(false);
    }
    setDisplay(detectionFrameDisplay);
  }, [blockToUpdate, detectionFrameDisplay]);
  return (
    <div
      className={`${
        display ? "" : "hidden"
      } bg-white border-x border-b border-gray-100 rounded-e-md shadow-lg pt-5 pb-2.5 px-2.5`}
    >
      {loadingDisplay ? (
        <Skeleton title={false} paragraph={{ rows: 3 }} active />
      ) : (
        <TextArea
          autoSize={{ minRows: 1, maxRows: 5 }}
          className="py-2 border-none mr-3"
          value={text}
          contentEditable={false}
          ref={textAreaRef}
        />
      )}

      <div className="pt-2.5 w-full flex justify-end">
        <Space size={16}>
          <CopyButton
            title="复制"
            copyText={detectionText}
            useButton
            buttonType="primary"
          />
        </Space>
      </div>
    </div>
  );
};
