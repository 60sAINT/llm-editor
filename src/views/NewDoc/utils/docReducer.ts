import { DocAction, DocState } from "./docContext";

export const docReducer = (state: DocState, action: DocAction): DocState => {
  switch (action.type) {
    case "EDIT_TITLE":
      return { ...state, title: action.payload };
    case "SAVE_DOC_STATUS":
      return { ...state, isSaved: action.payload };
    case "SAVE_DOC_ID":
      return { ...state, docId: action.payload };
    case "SAVE_DOC_CONTENT":
      return { ...state, docContent: action.payload };
    case "SET_EDITOR":
      return { ...state, editor: action.payload }; // 设置编辑器对象
    default:
      throw new Error("Unknown action type: " + state);
  }
};
