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
import { useDispatch, useNewDocState } from "../utils/provider";
import { throttle } from "lodash";

export interface StatusProps {
  is_note?: boolean;
  paper_id?: string;
  docId?: string;
}

const Status: React.FC<StatusProps> = ({ is_note, paper_id, docId }) => {
  const { token } = useAuth() as { token: string };
  const { isSaved, title, docContent } = useDocState();
  const { saveKeyDown } = useNewDocState();
  const dispatch = useDispatch();
  const docDispatch = useDocDispatch();
  const [saveState, setSaveState] = useState<IsSavedType>(isSaved);
  useEffect(() => {
    setSaveState(isSaved);
  }, [isSaved]);
  useEffect(() => {
    if (saveKeyDown) {
      handleSaveDoc().then(() => showMessage("保存成功！", 0.65, 200));
      dispatch({ type: "SAVE_KEY_DOWN" });
    }
  }, [saveKeyDown]);

  // 保存现有文档
  const { runAsync: saveDoc } = useRequest(
    async ({ docId, title, content }) => {
      const res = await docApi.updateDoc({
        doc_id: docId,
        title,
        content,
        token: `Bearer ${token}` || "",
      });
      return res;
    }
  );
  // 保存新文档
  const { runAsync: saveNewDoc } = useRequest(async (title) => {
    const res = await docApi.newDoc({
      token: `Bearer ${token}` || "",
      title,
      content: "[{}]",
      is_note,
      paper_id,
    });
    setSaveState(IsSavedType.True);
    return res;
  });
  useEffect(() => {
    const throttledSave = throttle(() => {
      if (!is_note) handleSaveDoc();
    }, 10000);
    // 调用节流函数
    throttledSave();
    // 清理函数，取消节流
    return () => {
      throttledSave.cancel();
    };
  }, [docContent]);

  useEffect(() => {
    if (is_note && !docId) {
      // 如果是笔记类型
      try {
        saveNewDoc(title).then((data) => {
          showMessage("保存成功！", 0.65, 200);
          setSaveState(IsSavedType.True);
          docDispatch({ type: "SAVE_DOC_ID", payload: data.data.doc_id });
          docDispatch({ type: "SAVE_DOC_STATUS", payload: IsSavedType.True });
        });
      } catch (err) {}
    }
  }, [is_note, docId]);
  const handleSaveDoc = async () => {
    setSaveState(IsSavedType.Saving);
    // 已有id，不是新文档
    if (docId) {
      try {
        await saveDoc({ docId, title, content: docContent });
        setSaveState(IsSavedType.True);
        docDispatch({ type: "SAVE_DOC_STATUS", payload: IsSavedType.True });
      } catch (err) {}
    }
  };
  return (
    <div className="ml-3 flex items-center">
      <Tooltip title="点击保存">
        <SaveOutlined
          onClick={() => {
            handleSaveDoc().then(() => showMessage("保存成功！", 0.65, 200));
          }}
        />
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
