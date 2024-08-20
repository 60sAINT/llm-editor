import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { showError } from "@/common/utils/message";
import { useAuth } from "@/provider/authProvider";

// TODO 添加认证逻辑

export const DetectionButton = () => {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;
  const { token } = useAuth();
  const { runAsync: imageDetection } = useRequest(async (url) => {
    const res = await sideMenuApi.imageDetection(url, token!);
    return res;
  });

  const handleImageDetection = async (): Promise<void> => {
    dispatch({ type: "DETECTION_FRAME_DISPLAY", payload: true });
    dispatch({ type: "LOADING_DISPLAY", payload: true });
    if (state.blockToUpdate !== state.editor.getTextCursorPosition().block) {
      dispatch({ type: "DETECTION_TEXT", payload: "" });
    }
    const imageBlock = state.editor?.getTextCursorPosition().block;
    if (imageBlock.type == "image") {
      let urlString = imageBlock.props.url;
      const response = await imageDetection(urlString);
      const reader = response!.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { done, value } = await reader.read();
        dispatch({ type: "LOADING_DISPLAY", payload: false });
        if (done) {
          break;
        }
        const match = value.match(/"data":"(.*?)"/);
        const detectionText = match ? match[1] : "";
        dispatch({ type: "DETECTION_TEXT", payload: detectionText });
      }
    } else {
      showError("请选择一张图片");
    }
  };

  return (
    <Components.FormattingToolbar.Button
      mainTooltip="DETECTION"
      onClick={handleImageDetection}
    >
      DETECTION
    </Components.FormattingToolbar.Button>
  );
};
