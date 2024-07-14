import { Block } from "@blocknote/core";
import { createContext } from "react";

export interface State {
  syncLock: boolean; // 同步锁，同时只能有一个功能更新 Frame
  buttonDisplay: DisplayStyle; // 续写框是否显示
  // TEXT
  frameText: string; // frame中当前展示的文本
  continueText: string; // 续写框中展示的文本
  translateText: string; // 翻译框中展示的文本
  polishText: string; // 润色框中展示的文本
  reviseText: string; // 订正框中展示的文本
  summaryText: string; // 摘要框中展示的文本
  // SELECTION
  selection: string; // 光标选择的的文本
  continueSelection: string; // 续写所选文本
  translateSelection: string; // 翻译所选文本
  polishSelection: string; // 润色所选文本
  reviseSelection: string; // 修订所选文本
  summarySelection: string; // 总结所选文本
  editor?: any; // 编辑器对象
  blockToUpdate?: Block; // 要替换的文本所在的块的标识符
  range: RangeType; // 选中的文本的startIndex和endIndex
}

export enum DisplayStyle {
  BLOCK = "block",
  HIDDEN = "hidden",
}
export type RangeType = {
  startOffset: number;
  endOffset: number;
};

export type Action =
  | { type: "SWITCH_VISIBILITY"; payload: DisplayStyle }
  | { type: "LOCK" }
  | { type: "UNLOCK" }
  // TEXT
  | { type: "REPLACE_FRAME_TEXT"; payload: string }
  | { type: "FRAME_TEXT"; payload: string }
  | { type: "CONTINUE_TEXT"; payload: string }
  | { type: "POLISH_TEXT"; payload: string }
  | { type: "TRANSLATE_TEXT"; payload: string }
  | { type: "REVISE_TEXT"; payload: string }
  | { type: "SUMMARY_TEXT"; payload: string }
  // RESET
  | { type: "RESET_FRAME_TEXT" }
  | { type: "RESET_CONTINUE_TEXT" }
  | { type: "RESET_POLISH_TEXT" }
  | { type: "RESET_TRANSLATE_TEXT" }
  | { type: "RESET_REVISE_TEXT" }
  | { type: "RESET_SUMMARY_TEXT" }
  // SELECTION
  // | { type: "EDIT_CONTINUE_TEXT"; payload: string }
  | { type: "REPLACE_SELECTION"; payload: string }
  | { type: "REPLACE_CONTINUE_SELECTION"; payload: string }
  | { type: "REPLACE_TRANSLATE_SELECTION"; payload: string }
  | { type: "REPLACE_POLISH_SELECTION"; payload: string }
  | { type: "REPLACE_REVISE_SELECTION"; payload: string }
  | { type: "REPLACE_SUMMARY_SELECTION"; payload: string }
  | { type: "SET_EDITOR"; payload: any }
  | { type: "SET_BLOCK_TO_UPDATE"; payload: Block }
  | { type: "SET_RANGE"; payload: RangeType };

export const initialState: State = {
  syncLock: false,
  buttonDisplay: DisplayStyle.HIDDEN,
  frameText: "",
  continueText: "",
  translateText: "",
  polishText: "",
  reviseText: "",
  summaryText: "",
  selection: "",
  continueSelection: "",
  translateSelection: "",
  polishSelection: "",
  reviseSelection: "",
  summarySelection: "",
  range: { startOffset: 0, endOffset: 0 },
};

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);
