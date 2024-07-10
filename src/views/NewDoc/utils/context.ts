import { Block, BlockIdentifier, BlockNoteEditor } from "@blocknote/core";
import { createContext } from "react";

export interface State {
  continButtnDisplay: DisplayStyle; // 续写框是否显示
  continText: string; // 续写的文本
  selection: string; // 光标选择的的文本
  editor?: BlockNoteEditor; // 编辑器对象
  blockToUpdate?: BlockIdentifier; // 要替换的文本所在的块的标识符
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
  | { type: "CONTINUE_TEXT"; payload: string }
  | { type: "EDIT_CONTINUE_TEXT"; payload: string }
  | { type: "REPLACE_SELECTION"; payload: string }
  | { type: "RESET_ALL_TEXT" }
  | { type: "SET_EDITOR"; payload: BlockNoteEditor }
  | { type: "SET_BLOCK_TO_UPDATE"; payload: Block }
  | { type: "SET_RANGE"; payload: RangeType };

export const initialState: State = {
  continButtnDisplay: DisplayStyle.HIDDEN,
  continText: "",
  selection: "",
  range: { startOffset: 0, endOffset: 0 },
};

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);
