import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../api/FormattingToolBar";

export function RevisionButton() {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;
  const selectedText = editor.getSelectedText();

  const { runAsync: textRevise } = useRequest(async (text) => {
    const res = await sideMenuApi.textRevise(text);
    return res;
  });
  // 翻译逻辑
  const handleTextRevision = async (): Promise<void> => {
    const response = await textRevise(selectedText);
    const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log(value);
    }
  };
  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本改正"
      onClick={handleTextRevision}
    >
      {/* {<IoMdTrendingUp />} */}改
    </Components.FormattingToolbar.Button>
  );
}
