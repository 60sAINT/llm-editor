import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";

// TODO 添加认证逻辑
// TODO 添加目标翻译语言选择按钮

export function TranslationButton() {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;
  const selectedText = editor.getSelectedText();

  const { runAsync: textTranslate } = useRequest(async (tar_lang, text) => {
    const res = await sideMenuApi.textTranslate(tar_lang, text);
    return res;
  });
  // 翻译逻辑
  const handleTextTranslation = async (): Promise<void> => {
    const response = await textTranslate("英语", selectedText);
    const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log(value);
    }
  };
  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本翻译"
      onClick={handleTextTranslation}
    >
      {/* {<RiTranslate />} */}译
    </Components.FormattingToolbar.Button>
  );
}
