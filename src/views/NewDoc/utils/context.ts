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
  cardText: string; // 右侧卡片的文本
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
  ocrText: string;
  videoDetectionText: string;
  detectionText: string;
  recognitionText: string;
  audioRecognitionText: string;
  ocrFrameDisplay: boolean;
  detectionFrameDisplay: boolean;
  videoDetectionFrameDisplay: boolean;
  recognitionFrameDisplay: boolean;
  audioRecognitionFrameDisplay: boolean;
  loadingDisplay: boolean;
  fullTextLoading: boolean;
  saveKeyDown: boolean;
  formatKeyDown: boolean;
  fullFormatting?: any;
}

export enum DisplayStyle {
  BLOCK = "block",
  HIDDEN = "hidden",
}
export type RangeType = {
  startOffset: number;
  endOffset: number;
};
export type FullFormattingType = {
  "heading1-fontFamily": string;
  "heading1-fontSize": number;
  "heading2-fontFamily": string;
  "heading2-fontSize": number;
  "heading3-fontFamily": string;
  "heading3-fontSize": number;
  padding: string;
  "paragraph-fontFamily": string;
  "paragraph-fontSize": number;
  segSpacing: number;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
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
  | { type: "CARD_TEXT"; payload: string }
  | { type: "OCR_TEXT"; payload: string }
  | { type: "DETECTION_TEXT"; payload: string }
  | { type: "VIDEO_DETECTION_TEXT"; payload: string }
  | { type: "RECOGNITION_TEXT"; payload: string }
  | { type: "AUDIO_RECOGNITION_TEXT"; payload: string }
  // RESET
  | { type: "RESET_FRAME_TEXT" }
  | { type: "RESET_CONTINUE_TEXT" }
  | { type: "RESET_POLISH_TEXT" }
  | { type: "RESET_TRANSLATE_TEXT" }
  | { type: "RESET_REVISE_TEXT" }
  | { type: "RESET_SUMMARY_TEXT" }
  | { type: "RESET_CARD_TEXT" }
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
  | { type: "SET_RANGE"; payload: RangeType }
  // FRAME
  | { type: "OCR_FRAME_DISPLAY"; payload: boolean }
  | { type: "DETECTION_FRAME_DISPLAY"; payload: boolean }
  | { type: "VIDEO_DETECTION_FRAME_DISPLAY"; payload: boolean }
  | { type: "RECOGNITION_FRAME_DISPLAY"; payload: boolean }
  | { type: "AUDIO_RECOGNITION_FRAME_DISPLAY"; payload: boolean }
  // LOADING
  | { type: "LOADING_DISPLAY"; payload: boolean }
  | { type: "FULL_TEXT_LOADING"; payload: boolean }
  // KEYEVENT
  | { type: "SAVE_KEY_DOWN" }
  // FULLFORMATTING
  | { type: "SET_FULLTEXT_FORMATTING"; payload: FullFormattingType }
  | { type: "FORMAT_KEY_DOWN" };

export const initialState: State = {
  syncLock: false,
  buttonDisplay: DisplayStyle.HIDDEN,
  frameText: "",
  cardText: "",
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
  ocrText: "",
  detectionText: "",
  videoDetectionText: "",
  recognitionText: "",
  audioRecognitionText: "",
  ocrFrameDisplay: false,
  detectionFrameDisplay: false,
  videoDetectionFrameDisplay: false,
  recognitionFrameDisplay: false,
  audioRecognitionFrameDisplay: false,
  loadingDisplay: true,
  fullTextLoading: false,
  saveKeyDown: false,
  formatKeyDown: false,
  fullFormatting: {
    "heading1-fontFamily": "-apple-system",
    "heading1-fontSize": 36,
    "heading2-fontFamily": "-apple-system",
    "heading2-fontSize": 24,
    "heading3-fontFamily": "-apple-system",
    "heading3-fontSize": 16,
    "paragraph-fontFamily": "-apple-system",
    "paragraph-fontSize": 12,
    segSpacing: 1.0,
    padding: "moderate",
    paddingTop: "",
    paddingBottom: "",
    paddingRight: "",
    paddingLeft: "",
  },
};

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);
