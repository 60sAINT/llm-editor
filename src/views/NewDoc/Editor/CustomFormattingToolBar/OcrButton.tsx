import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { useComponentsContext } from "@blocknote/react";
import { sideMenuApi } from "../../api/FormattingToolBar";
import { DisplayStyle } from "../../utils/context";
import { useDispatch, useNewDocState } from "../../utils/provider";
import { showError } from "@/common/utils/message";

// TODO 添加认证逻辑

export const OcrButton = () => {
  const dispatch = useDispatch();
  const state = useNewDocState();
  const Components = useComponentsContext()!;
  const { runAsync: imageOcr } = useRequest(async (baseUrl) => {
    const res = await sideMenuApi.imageOcr(baseUrl);
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
        resolve({ message: "相片处理失败" });
      };
    });
  }
  function removeBase64Prefix(base64String: string) {
    const regex =
      /^data:image\/(jpeg|png|gif|bmp|webp|tiff|svg\+xml|x-icon|heif|heic);base64,/;
    return base64String.replace(regex, "");
  }
  const handleImageOcr = async (): Promise<void> => {
    dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.BLOCK });
    const imageBlock = state.editor?.getTextCursorPosition().block;
    if (imageBlock.type == "image") {
      let urlString = imageBlock.props.url;
      if (urlString.startsWith("http")) {
        urlString = await base64(urlString);
      }
      const removlePrefixString = removeBase64Prefix(urlString);
      try {
        const response = await imageOcr(removlePrefixString);
        const reader = response!
          .pipeThrough(new TextDecoderStream())
          .getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          console.log(value);
        }
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    } else {
      showError("请选择一张图片");
    }
  };

  return (
    <Components.FormattingToolbar.Button
      mainTooltip="OCR"
      onClick={handleImageOcr}
    >
      OCR
    </Components.FormattingToolbar.Button>
  );
};
