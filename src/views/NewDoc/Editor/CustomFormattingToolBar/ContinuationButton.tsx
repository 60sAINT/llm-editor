import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { DisplayStyle } from "../../utils/context";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { useAuth } from "@/provider/authProvider";

// TODO 添加认证逻辑

export const ContinuationButton = () => {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;
  const { token } = useAuth();
  const { runAsync: textContinue } = useRequest(async (text) => {
    const res = await sideMenuApi.textContinue(text, token!);
    return res;
  });

  const handleTextContinuation = async (): Promise<void> => {
    dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.BLOCK });
    const selection = state.editor?.getSelectedText();
    if (selection && !state.syncLock) {
      dispatch({ type: "LOCK" });
      const selectedText = selection.toString();
      if (
        selectedText === state.continueSelection &&
        state.continueText.length !== 0
      ) {
        dispatch({ type: "REPLACE_FRAME_TEXT", payload: state.continueText });
      } else {
        dispatch({ type: "RESET_FRAME_TEXT" });
        dispatch({ type: "RESET_CONTINUE_TEXT" });
        dispatch({ type: "REPLACE_CONTINUE_SELECTION", payload: selectedText });
        const response = await textContinue(selectedText);
        const reader = response!
          .pipeThrough(new TextDecoderStream())
          .getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          dispatch({ type: "FRAME_TEXT", payload: value });
          dispatch({ type: "CONTINUE_TEXT", payload: value });
        }
      }
      dispatch({ type: "UNLOCK" });
    }
  };

  return (
    <Components.FormattingToolbar.Button
      mainTooltip="文本续写"
      onClick={handleTextContinuation}
    >
      续
    </Components.FormattingToolbar.Button>
  );
};
