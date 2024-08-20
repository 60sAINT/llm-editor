import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { showError } from "@/common/utils/message";
import { useAuth } from "@/provider/authProvider";

// TODO 添加认证逻辑

export const RecognitionButton = () => {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;
  const { token } = useAuth();
  const { runAsync: recognition } = useRequest(async (url) => {
    const res = await sideMenuApi.recognition(url, token!);
    return res;
  });

  const handleRecognition = async (): Promise<void> => {
    dispatch({ type: "RECOGNITION_FRAME_DISPLAY", payload: true });
    dispatch({ type: "LOADING_DISPLAY", payload: true });
    if (state.blockToUpdate !== state.editor.getTextCursorPosition().block) {
      dispatch({ type: "RECOGNITION_TEXT", payload: "" });
    }
    const videoBlock = state.editor?.getTextCursorPosition().block;
    if (videoBlock.type == "video") {
      let urlString = videoBlock.props.url;
      const response = await recognition(urlString);
      const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { done, value } = await reader.read();
        dispatch({ type: "LOADING_DISPLAY", payload: false });
        if (done) {
          break;
        }
        const match = value.match(/"data":"(.*?)"/);
        const recognitionText = match ? match[1] : "";
        dispatch({ type: "RECOGNITION_TEXT", payload: recognitionText });
      }
    } else {
      showError("请选择一张图片");
    }
  };

  return (
    <Components.FormattingToolbar.Button
      mainTooltip="RECOGNITION"
      onClick={handleRecognition}
    >
      RECOGNITION
    </Components.FormattingToolbar.Button>
  );
};
