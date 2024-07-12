import { Action, State } from "./context";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SWITCH_VISIBILITY":
      return { ...state, continButtnDisplay: action.payload }; // 改变续写文本框可见性
    case "CONTINUE_TEXT":
      return { ...state, continText: state.continText + action.payload }; // 不断更新显示从后端获取的续写文本
    case "EDIT_CONTINUE_TEXT":
      return { ...state, continText: action.payload }; // 编辑续写文本
    case "REPLACE_SELECTION":
      return { ...state, selection: action.payload }; // 改变光标选择的文本
    case "RESET_ALL_TEXT":
      return { ...state, continText: "" }; // 把从后端获取的所有文本清除
    case "SET_EDITOR":
      return { ...state, editor: action.payload }; // 设置编辑器对象
    case "SET_BLOCK_TO_UPDATE":
      return { ...state, blockToUpdate: action.payload }; // 设置要更新的块对象
    case "SET_RANGE":
      return { ...state, range: action.payload }; // 设置鼠标选择的文字的startIndex和endIndex
    case "EDIT_TITLE":
      return { ...state, title: action.payload }; // 编辑文章标题
    default:
      return state;
  }
};
