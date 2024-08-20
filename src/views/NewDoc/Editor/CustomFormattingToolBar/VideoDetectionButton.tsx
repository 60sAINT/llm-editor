import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { showError } from "@/common/utils/message";
import { useAuth } from "@/provider/authProvider";

// TODO 添加认证逻辑

export const VideoDetectionButton = () => {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;
  const { token } = useAuth();
  const { runAsync: videoDetection } = useRequest(async (url) => {
    const res = await sideMenuApi.videoDetection(url, token!);
    return res;
  });

  const handleVideoDetection = async (): Promise<void> => {
    dispatch({ type: "VIDEO_DETECTION_FRAME_DISPLAY", payload: true });
    dispatch({ type: "LOADING_DISPLAY", payload: true });
    if (state.blockToUpdate !== state.editor.getTextCursorPosition().block) {
      dispatch({ type: "VIDEO_DETECTION_TEXT", payload: "" });
    }
    const videoBlock = state.editor?.getTextCursorPosition().block;
    if (videoBlock.type == "video") {
      let urlString = videoBlock.props.url;
      const response = await videoDetection(urlString);
      const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { done, value } = await reader.read();
        dispatch({ type: "LOADING_DISPLAY", payload: false });
        if (done) {
          break;
        }
        const match = value.match(/"data":"(.*?)"/);
        const detectionText = match ? match[1] : "";
        dispatch({ type: "VIDEO_DETECTION_TEXT", payload: detectionText });
      }
    } else {
      showError("请选择一张图片");
    }
  };

  return (
    <Components.FormattingToolbar.Button
      mainTooltip="DETECTION"
      onClick={handleVideoDetection}
    >
      DETECTION
    </Components.FormattingToolbar.Button>
  );
};
