import React, { useEffect, useReducer, useState } from "react";
import Editor from "./Editor";
import { DispatchContext, StateContext, initialState } from "./utils/context";
import { reducer } from "./utils/reducer";
import TopBar from "./TopBar";
import DocTitle from "./DocTitle";
import {
  DocDispatchContext,
  DocStateContext,
  initialDocState,
} from "./utils/docContext";
import { docReducer } from "./utils/docReducer";
import CardList from "@/common/components/CardList";
import { Col, Row, Skeleton } from "antd";
import { useLocation } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import { docApi } from "./api/Doc";
import { useDocId } from "./hooks/useDocId";

const NewDoc = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [docState, docDispatch] = useReducer(docReducer, initialDocState);
  const [showCards, setShowCards] = useState<boolean>(false);
  const getShowCards = (showCards: boolean) => {
    setShowCards(showCards);
  };

  // 根据id获取当前doc的内容
  const [docData, setDocData] = useState();
  const [title, setTitle] = useState("");
  const { search } = useLocation();
  const docId = useDocId(search) as string;
  const { data: doc } = useRequest(
    async () => {
      const res = await docApi.getDocByDocId(docId);
      setTitle(res.data.doc.title);
      return res.data.doc;
    },
    { manual: false }
  );
  useEffect(() => {
    docDispatch({ type: "EDIT_TITLE", payload: title });
    setDocData(doc);
    if (doc) {
      docDispatch({ type: "SAVE_DOC_ID", payload: doc.doc_id });
    }
  }, [title, doc]);

  return (
    <DocStateContext.Provider value={docState}>
      <DocDispatchContext.Provider value={docDispatch}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <div className="h-screen flex flex-col bg-gray-200">
              <TopBar getShowCards={getShowCards} />
              <Row className="flex-grow justify-center items-start p-4 overflow-auto">
                <Col span={4}>{showCards && <CardList />}</Col>
                <Col span={16}>
                  <div
                    className="w-full bg-white shadow-md [&>.bn-container>div:first-child]:px-12"
                    style={{
                      borderRadius: "0",
                      padding: "20px 20px 20px 20px",
                      boxSizing: "border-box",
                      minHeight: "1123px",
                    }}
                  >
                    <DocTitle />
                    {!docId ? (
                      <Editor />
                    ) : docData ? (
                      <Editor docData={docData} />
                    ) : (
                      <Skeleton className="px-12" />
                    )}
                  </div>
                </Col>
                <Col span={4} />
              </Row>
            </div>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </DocDispatchContext.Provider>
    </DocStateContext.Provider>
  );
};

export default NewDoc;
