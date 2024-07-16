import { BlockNoteEditor } from "@blocknote/core";
import { createContext } from "react";

export enum IsSavedType {
  True = "true",
  False = "false",
  Saving = "saving",
}
export interface DocState {
  title: string;
  editor?: BlockNoteEditor;
  isSaved: IsSavedType;
  docId?: string;
  docContent?: string;
}

export type DocAction =
  | { type: "EDIT_TITLE"; payload: string }
  | { type: "SAVE_DOC_STATUS"; payload: IsSavedType }
  | { type: "SAVE_DOC_ID"; payload: string }
  | { type: "SAVE_DOC_CONTENT"; payload: string };

export const initialDocState: DocState = {
  title: "",
  isSaved: IsSavedType.False,
};

export const DocStateContext = createContext<DocState | undefined>(undefined);
export const DocDispatchContext = createContext<
  React.Dispatch<DocAction> | undefined
>(undefined);
