import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import { MdPostAdd } from "react-icons/md";
import { sideMenuApi } from "../api/FormattingToolBar";

// TODO 添加认证逻辑

export function ContinuationButton() {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;
  const selectedText = editor.getSelectedText();

  const { runAsync: textContinue } = useRequest(async (text) => {
    const res = await sideMenuApi.textContinue(text);
    return res;
  });
  // 续写逻辑
  const handleTextContinuation = async (): Promise<void> => {
    const response = await textContinue(selectedText);
    const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log(value);
    }
  };
  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本续写"
      onClick={handleTextContinuation}
    >
      {/* {<MdPostAdd />} */}续
    </Components.FormattingToolbar.Button>
  );
}
