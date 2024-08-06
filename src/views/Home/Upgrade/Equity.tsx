import { CheckOutlined } from "@ant-design/icons";
import React from "react";

export const Equity = () => {
  return (
    <>
      <div>
        <div className="flex">
          <CheckOutlined className="text-emerald-500" />
          <p className="font-semibold text-sm pl-2">小说写作</p>
        </div>
        <div className="pt-2 pl-6 flex flex-col gap-3 text-xs text-neutral-800">
          <div>故事设定</div>
          <div>
            创作模板
            <span className="text-slate-400">
              （世情、悬疑、言情类热门模版）
            </span>
          </div>
          <div>
            续写剧情
            <span className="text-slate-400">
              （续写故事情节，控制故事走向发展）
            </span>
          </div>
          <div>
            细化描写
            <span className="text-slate-400">
              （对话、心理、外貌、动作描写扩展）
            </span>
          </div>
          <div>
            风格润色
            <span className="text-slate-400">
              （甜文、爽文、虐文、沙雕等风格）
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
          <CheckOutlined className="text-emerald-500" />
          <p className="font-semibold text-sm pl-2">机器人写作</p>
        </div>
        <div className="pt-2 pl-6 flex flex-col gap-3 text-xs text-neutral-800">
          <div>内容一键生成</div>
          <div>
            润色
            <span className="text-slate-400">（根据目标受众，调整语气）</span>
          </div>
          <div>
            扩写
            <span className="text-slate-400">
              （基础扩写、创意发散扩写，自由控制长度）
            </span>
          </div>
          <div>创建自定义机器人</div>
        </div>
      </div>
      <div>
        <div className="flex">
          <CheckOutlined className="text-emerald-500" />
          <p className="font-semibold text-sm pl-2">个人知识库</p>
        </div>
        <div className="pt-2 pl-6 flex flex-col gap-3 text-xs text-neutral-800">
          <div>上传pdf/pptx/jpg/png文件</div>
        </div>
      </div>
    </>
  );
};
