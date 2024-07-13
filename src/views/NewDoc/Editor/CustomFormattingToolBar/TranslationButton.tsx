import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { DisplayStyle } from "../../utils/context";

// TODO 添加认证逻辑
// TODO 添加目标翻译语言选择按钮

export function TranslationButton() {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;

  const { runAsync: textTranslate } = useRequest(async (tar_lang, text) => {
    const res = await sideMenuApi.textTranslate(tar_lang, text);
    return res;
  });
  // 翻译逻辑
  const handleTextTranslation = async (): Promise<void> => {
    dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.BLOCK });
    const selection = state.editor?.getSelectedText();
    if (selection && !state.syncLock) {
      dispatch({ type: "LOCK" });
      const selectedText = selection.toString();
      if (
        selectedText === state.translateSelection &&
        state.translateText.length !== 0
      ) {
        dispatch({ type: "REPLACE_FRAME_TEXT", payload: state.translateText });
      } else {
        dispatch({ type: "RESET_FRAME_TEXT" });
        dispatch({ type: "RESET_TRANSLATE_TEXT" });
        dispatch({
          type: "REPLACE_TRANSLATE_SELECTION",
          payload: selectedText,
        });
        const response = await textTranslate(
          state.translateTargetLanguage,
          selectedText
        );
        const reader = response!
          .pipeThrough(new TextDecoderStream())
          .getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          dispatch({ type: "FRAME_TEXT", payload: value });
          dispatch({ type: "TRANSLATE_TEXT", payload: value });
        }
      }
      dispatch({ type: "UNLOCK" });
    }
  };
  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本翻译"
      onClick={handleTextTranslation}
    >
      译
    </Components.FormattingToolbar.Button>
  );
}
