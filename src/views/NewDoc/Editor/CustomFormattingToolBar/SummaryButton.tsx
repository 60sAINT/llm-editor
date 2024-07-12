import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";

export function SummaryButton() {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;
  const selectedText = editor.getSelectedText();

  const { runAsync: textSummary } = useRequest(async (text) => {
    const res = await sideMenuApi.textSummary(text);
    return res;
  });
  // 翻译逻辑
  const handleTextSummary = async (): Promise<void> => {
    const response = await textSummary(selectedText);
    const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log(value);
    }
  };
  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本摘要"
      onClick={handleTextSummary}
    >
      {/* {<IoMdTrendingUp />} */}摘
    </Components.FormattingToolbar.Button>
  );
}
