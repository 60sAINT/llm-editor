import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { DisplayStyle } from "../../utils/context";

export function PolishButton({ isFull }: { isFull?: boolean }) {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;

  const { runAsync: textPolish } = useRequest(async (text) => {
    const res = isFull
      ? await sideMenuApi.textPolishDoc(text)
      : await sideMenuApi.textPolish(text);
    return res;
  });

  const fullParams = (doc: any) => {
    const p = doc?.map((item: { id: any; content: any }) => ({
      id: item.id,
      content: item.content,
    }));
    return JSON.stringify(p);
  };

  const handleTextPolish = async (): Promise<void> => {
    dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.BLOCK });
    isFull && dispatch({ type: "FULL_TEXT_LOADING", payload: true });
    const selection = isFull
      ? fullParams(state.editor.document)
      : state.editor?.getSelectedText();
    if (selection && !state.syncLock) {
      dispatch({ type: "LOCK" });
      const selectedText = selection.toString();
      if (
        selectedText === state.polishSelection &&
        state.polishText.length !== 0
      ) {
        dispatch({ type: "REPLACE_FRAME_TEXT", payload: state.polishText });
      } else {
        dispatch({ type: "RESET_FRAME_TEXT" });
        dispatch({ type: "RESET_POLISH_TEXT" });
        dispatch({ type: "RESET_CARD_TEXT" });
        dispatch({ type: "REPLACE_POLISH_SELECTION", payload: selectedText });
        const response = await textPolish(selectedText);
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
          dispatch({ type: "POLISH_TEXT", payload: value });
          isFull && dispatch({ type: "CARD_TEXT", payload: value });
        }
      }
      dispatch({ type: "UNLOCK" });
    }
  };
  return isFull ? (
    <div onClick={handleTextPolish}>全文润色</div>
  ) : (
    <Components.FormattingToolbar.Button
      mainTooltip="文本润色"
      onClick={handleTextPolish}
    >
      润
    </Components.FormattingToolbar.Button>
  );
}
