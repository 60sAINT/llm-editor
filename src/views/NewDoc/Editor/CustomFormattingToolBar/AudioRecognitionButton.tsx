import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { showError } from "@/common/utils/message";
import { useAuth } from "@/provider/authProvider";

// TODO 添加认证逻辑

export const AudioRecognitionButton = () => {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;
  const { token } = useAuth();
  const { runAsync: audioRecognition } = useRequest(async (url) => {
    const res = await sideMenuApi.audioRecognition(url, token!);
    return res;
  });

  const handleRecognition = async (): Promise<void> => {
    dispatch({ type: "AUDIO_RECOGNITION_FRAME_DISPLAY", payload: true });
    dispatch({ type: "LOADING_DISPLAY", payload: true });
    if (state.blockToUpdate !== state.editor.getTextCursorPosition().block) {
      dispatch({ type: "AUDIO_RECOGNITION_TEXT", payload: "" });
    }
    const videoBlock = state.editor?.getTextCursorPosition().block;
    if (videoBlock.type == "audio") {
      let urlString = videoBlock.props.url;
      const response = await audioRecognition(urlString);
      const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { done, value } = await reader.read();
        dispatch({ type: "LOADING_DISPLAY", payload: false });
        if (done) {
          break;
        }
        const match = value.match(/"data":"(.*?)"/);
        const recognitionText = match ? match[1] : "";
        dispatch({ type: "AUDIO_RECOGNITION_TEXT", payload: recognitionText });
      }
    } else {
      showError("请选择音频");
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
