import { showError } from "@/common/utils/message";
import { useRequest as useCustomRequest } from "ahooks";
import { Service, Options } from "ahooks/lib/useRequest/src/types";

export function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>
) {
  const customOptions = {
    onError: (e: any) => {
      return e && showError(e.detail);
    },
    throwOnError: true, //如果 service 报错，我们会帮你捕获并打印日志，如果你需要自己处理异常，可以设置 throwOnError 为 true
    manual: true, //默认需要手动调用 run 触发执行，如自动执行设置为false
  };
  return useCustomRequest(service, { ...customOptions, ...options });
}
