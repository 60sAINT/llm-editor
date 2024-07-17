import {
  CheckCircleOutlined,
  SaveOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDocDispatch, useDocState } from "../utils/docProvider";
import { IsSavedType } from "../utils/docContext";
import { docApi } from "../api/Doc";
import { useRequest } from "@/hooks/useRequest";
import { showMessage } from "@/common/utils/message";
import { useAuth } from "@/provider/authProvider";

const Status = () => {
  const { token } = useAuth() as { token: string };
  const { isSaved, docId, title, docContent } = useDocState();
  const docDispatch = useDocDispatch();
  const [saveState, setSaveState] = useState<IsSavedType>(isSaved);
  useEffect(() => {
    setSaveState(isSaved);
  }, [isSaved]);
  // 保存新文档
  const { runAsync: saveNewDoc } = useRequest(async (title, content) => {
    const res = await docApi.newDoc(title, content);
    return res;
  });
  // 保存现有文档
  const { runAsync: saveDoc } = useRequest(
    async ({ docId, title, content }) => {
      const res = await docApi.updateDoc({
        doc_id: docId,
        title,
        content,
        token,
      });
      return res;
    }
  );

  const handleSaveDoc = async () => {
    setSaveState(IsSavedType.Saving);
    // 已有id，不是新文档
    if (docId) {
      try {
        console.log(docContent);
        await saveDoc({ docId, title, content: docContent });
        showMessage("保存成功！", 0.65);
        setSaveState(IsSavedType.True);
        docDispatch({ type: "SAVE_DOC_STATUS", payload: IsSavedType.True });
      } catch (err) {
        console.log(err);
      }
    }
    // 保存新文档，暂无id
    else {
      try {
        await saveNewDoc(title, docContent);
        showMessage("保存成功！", 0.65);
        setSaveState(IsSavedType.True);
        docDispatch({ type: "SAVE_DOC_STATUS", payload: IsSavedType.True });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="ml-3 flex items-center">
      <Tooltip title="点击保存">
        <SaveOutlined onClick={handleSaveDoc} />
      </Tooltip>
      <span className="text-gray-400 ml-2 text-xs">
        {saveState == IsSavedType.False ? (
          "未保存"
        ) : saveState == IsSavedType.Saving ? (
          <>
            正在保存
            <SyncOutlined spin className="ml-1" />
          </>
        ) : (
          <>
            保存成功
            <CheckCircleOutlined className="ml-1" />
          </>
        )}
      </span>
    </div>
  );
};

export default Status;
