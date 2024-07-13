import { Action, State } from "./context";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SWITCH_VISIBILITY":
      return { ...state, buttonDisplay: action.payload }; // 改变续写文本框可见性
    case "LOCK":
      return { ...state, syncLock: true };
    case "UNLOCK":
      return { ...state, syncLock: false };
    case "SET_TARGET_LANGUAGE":
      return { ...state, translateTargetLanguage: action.payload };
    case "FRAME_TEXT":
      return { ...state, frameText: state.frameText + action.payload }; // 不断更新显示从后端获取的续写文本
    case "CONTINUE_TEXT":
      return { ...state, continueText: state.continueText + action.payload }; // 不断更新显示从后端获取的续写文本
    case "POLISH_TEXT":
      return { ...state, polishText: state.polishText + action.payload }; // 不断更新显示从后端获取的续写文本
    case "TRANSLATE_TEXT":
      return { ...state, translateText: state.translateText + action.payload }; // 不断更新显示从后端获取的续写文本
    case "REVISE_TEXT":
      return { ...state, reviseText: state.reviseText + action.payload }; // 不断更新显示从后端获取的续写文本
    case "SUMMARY_TEXT":
      return { ...state, summaryText: state.summaryText + action.payload }; // 不断更新显示从后端获取的续写文本
    // case "EDIT_CONTINUE_TEXT":
    //   return { ...state, frameText: action.payload }; // 编辑续写文本
    case "REPLACE_SELECTION":
      return { ...state, selection: action.payload }; // 改变光标选择的文本
    case "REPLACE_CONTINUE_SELECTION":
      return { ...state, continueSelection: action.payload };
    case "REPLACE_TRANSLATE_SELECTION":
      return { ...state, translateSelection: action.payload };
    case "REPLACE_POLISH_SELECTION":
      return { ...state, polishSelection: action.payload };
    case "REPLACE_REVISE_SELECTION":
      return { ...state, reviseSelection: action.payload };
    case "REPLACE_SUMMARY_SELECTION":
      return { ...state, summarySelection: action.payload };
    case "RESET_FRAME_TEXT":
      return { ...state, frameText: "" }; // 把Frame中当前展示的文本清除
    case "RESET_CONTINUE_TEXT":
      return { ...state, continueText: "" }; // 把续写的文本清除
    case "RESET_POLISH_TEXT":
      return { ...state, polishText: "" }; // 把润色的文本清除
    case "RESET_TRANSLATE_TEXT":
      return { ...state, translateText: "" }; // 把润色的文本清除
    case "RESET_REVISE_TEXT":
      return { ...state, reviseText: "" }; // 把润色的文本清除
    case "RESET_SUMMARY_TEXT":
      return { ...state, summaryText: "" }; // 把润色的文本清除
    case "SET_EDITOR":
      return { ...state, editor: action.payload }; // 设置编辑器对象
    case "SET_BLOCK_TO_UPDATE":
      return { ...state, blockToUpdate: action.payload }; // 设置要更新的块对象
    case "SET_RANGE":
      return { ...state, range: action.payload }; // 设置鼠标选择的文字的startIndex和endIndex
    default:
      return state;
  }
};
