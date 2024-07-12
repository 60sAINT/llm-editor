import { BlockNoteEditor } from "@blocknote/core";
import { createContext } from "react";

export interface DocState {
  title: string;
  editor?: BlockNoteEditor;
  isSaved: boolean;
}

export type DocAction =
  | { type: "EDIT_TITLE"; payload: string }
  | { type: "SAVE_DOC"; payload: boolean };

export const initialDocState: DocState = {
  title: "",
  isSaved: false,
};

export const DocStateContext = createContext<DocState | undefined>(undefined);
export const DocDispatchContext = createContext<
  React.Dispatch<DocAction> | undefined
>(undefined);
