import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { DisplayStyle } from "../../utils/context";

export function RevisionButton() {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;

  const { runAsync: textRevise } = useRequest(async (text) => {
    const res = await sideMenuApi.textRevise(text);
    return res;
  });
  // 翻译逻辑
  const handleTextRevision = async (): Promise<void> => {
    dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.BLOCK });
    const selection = state.editor?.getSelectedText();
    if (selection && !state.syncLock) {
      dispatch({ type: "LOCK" });
      const selectedText = selection.toString();
      if (
        selectedText === state.reviseSelection &&
        state.reviseText.length !== 0
      ) {
        dispatch({ type: "FRAME_TEXT", payload: state.reviseText });
      } else {
        dispatch({ type: "RESET_FRAME_TEXT" });
        dispatch({ type: "RESET_REVISE_TEXT" });
        dispatch({
          type: "REPLACE_REVISE_SELECTION",
          payload: selectedText,
        });
        const response = await textRevise(selectedText);
        const reader = response!
          .pipeThrough(new TextDecoderStream())
          .getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          dispatch({ type: "FRAME_TEXT", payload: value });
          dispatch({ type: "REVISE_TEXT", payload: value });
        }
      }
      dispatch({ type: "UNLOCK" });
    }
  };
  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本改正"
      onClick={handleTextRevision}
    >
      改
    </Components.FormattingToolbar.Button>
  );
}
