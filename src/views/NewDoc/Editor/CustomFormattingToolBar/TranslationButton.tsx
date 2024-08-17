import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { DisplayStyle } from "../../utils/context";
import { targetLanguage } from "@/common/utils";
import { getFullText } from "./SummaryButton";
import { useAuth } from "@/provider/authProvider";

// TODO 添加认证逻辑
// TODO 添加目标翻译语言选择按钮

export function TranslationButton({ isFull }: { isFull?: boolean }) {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;

  const { token } = useAuth();
  const { runAsync: textTranslate } = useRequest(async (tar_lang, text) => {
    const res = await sideMenuApi.textTranslate(tar_lang, text, token!);
    return res;
  });
  // 翻译逻辑
  const handleTextTranslation = async (): Promise<void> => {
    dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.BLOCK });
    isFull && dispatch({ type: "FULL_TEXT_LOADING", payload: true });
    const selection = isFull
      ? getFullText(state)
      : state.editor?.getSelectedText();
    const targetLang = targetLanguage(selection);
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
        dispatch({ type: "RESET_CARD_TEXT" });
        dispatch({
          type: "REPLACE_TRANSLATE_SELECTION",
          payload: selectedText,
        });
        const response = await textTranslate(targetLang, selectedText);
        const reader = response!
          .pipeThrough(new TextDecoderStream())
          .getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            isFull && dispatch({ type: "FULL_TEXT_LOADING", payload: false });
            break;
          }
          dispatch({ type: "FRAME_TEXT", payload: value });
          dispatch({ type: "TRANSLATE_TEXT", payload: value });
          isFull && dispatch({ type: "CARD_TEXT", payload: value });
        }
      }
      dispatch({ type: "UNLOCK" });
    }
  };
  return isFull ? (
    <div onClick={handleTextTranslation}>全文翻译</div>
  ) : (
    <Components.FormattingToolbar.Button
      mainTooltip="文本翻译"
      onClick={handleTextTranslation}
    >
      译
    </Components.FormattingToolbar.Button>
  );
}
