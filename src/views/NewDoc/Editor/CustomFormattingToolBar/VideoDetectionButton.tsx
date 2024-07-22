import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { showError } from "@/common/utils/message";

// TODO 添加认证逻辑

export const VideoDetectionButton = () => {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;
  const { runAsync: videoDetection } = useRequest(async (baseUrl) => {
    const res = await sideMenuApi.videoDetection(baseUrl);
    return res;
  });

  function base64(url: string) {
    return new Promise((resolve) => {
      const image = new Image();
      // 先设置图片跨域属性
      image.crossOrigin = "Anonymous";
      // 再给image赋值src属性，先后顺序不能颠倒
      image.src = url;
      image.onload = function () {
        const canvas = document.createElement("canvas");
        // 设置canvas宽高等于图片实际宽高
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d")!.drawImage(image, 0, 0);
        // toDataUrl可以接收2个参数，参数一：图片类型，参数二： 图片质量0-1（不传默认为0.92）
        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };
      image.onerror = () => {
        resolve({ message: "录影处理失败" });
      };
    });
  }
  function removeBase64Prefix(base64String: string) {
    const regex =
      /^data:image\/(jpeg|png|gif|bmp|webp|tiff|svg\+xml|x-icon|heif|heic);base64,/;
    return base64String.replace(regex, "");
  }
  const handleVideoDetection = async (): Promise<void> => {
    dispatch({ type: "VIDEO_DETECTION_FRAME_DISPLAY", payload: true });
    dispatch({ type: "LOADING_DISPLAY", payload: true });
    if (state.blockToUpdate !== state.editor.getTextCursorPosition().block) {
      dispatch({ type: "VIDEO_DETECTION_TEXT", payload: "" });
    }
    const videoBlock = state.editor?.getTextCursorPosition().block;
    if (videoBlock.type == "video") {
      let urlString = videoBlock.props.url;
      if (urlString.startsWith("http")) {
        urlString = await base64(urlString);
      }
      const removlePrefixString = removeBase64Prefix(urlString);
      const response = await videoDetection(removlePrefixString);
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
