import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { DisplayStyle } from "../../utils/context";

export function SummaryButton() {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;

  const { runAsync: textSummary } = useRequest(async (text) => {
    const res = await sideMenuApi.textSummary(text);
    return res;
  });
  const handleTextSummary = async (): Promise<void> => {
    dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.BLOCK });
    const selection = state.editor?.getSelectedText();
    if (selection && !state.syncLock) {
      dispatch({ type: "LOCK" });
      const selectedText = selection.toString();
      if (
        selectedText === state.summarySelection &&
        state.summaryText.length !== 0
      ) {
        dispatch({ type: "FRAME_TEXT", payload: state.summaryText });
      } else {
        dispatch({ type: "RESET_FRAME_TEXT" });
        dispatch({ type: "RESET_SUMMARY_TEXT" });
        dispatch({
          type: "REPLACE_SUMMARY_SELECTION",
          payload: selectedText,
        });
        const response = await textSummary(selectedText);
        const reader = response!
          .pipeThrough(new TextDecoderStream())
          .getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          dispatch({ type: "FRAME_TEXT", payload: value });
          dispatch({ type: "SUMMARY_TEXT", payload: value });
        }
      }
      dispatch({ type: "UNLOCK" });
    }
  };
  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本摘要"
      onClick={handleTextSummary}
    >
      摘
    </Components.FormattingToolbar.Button>
  );
}
