import { DocAction, DocState } from "./docContext";

export const docReducer = (state: DocState, action: DocAction): DocState => {
  switch (action.type) {
    case "EDIT_TITLE":
      return { ...state, title: action.payload };
    case "SAVE_DOC":
      return { ...state, isSaved: action.payload };
    default:
      throw new Error("Unknown action type: " + state);
  }
};
