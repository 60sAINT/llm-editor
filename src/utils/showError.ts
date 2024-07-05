import { ReactNode } from "react";
import { message } from "antd";

export function showError(
  s: string | ReactNode,
  duration: number = 4,
  toBottom: number = 100
) {
  message.destroy();
  message.config({
    top: window.innerHeight - toBottom,
    duration,
  });
  message.error({
    content: s,
  });
  console.error(s);
}
