import React, { useEffect, useReducer, useRef, useState } from "react";
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
import { Button, Col, Row, Skeleton } from "antd";
import { useLocation } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import { docApi } from "./api/Doc";
import { useDocId } from "./hooks/useDocId";
import { BlockNoteEditor } from "@blocknote/core";

const NewDoc = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [docState, docDispatch] = useReducer(docReducer, initialDocState);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [fullText, setFullText] = useState<string>("");
  const [fullTextLoading, setFullTextLoading] = useState<boolean>(
    state.fullTextLoading
  );
  useEffect(() => {
    setFullTextLoading(state.fullTextLoading);
  }, [state.fullTextLoading]);
  const getShowCards = (showCards: boolean) => {
    setShowCards(showCards);
  };

  // 根据id获取当前doc的内容
  const [docData, setDocData] = useState();
  const [editor, setEditor] = useState<BlockNoteEditor>();
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

  // 全文改写文字框高度逻辑
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftColHeight, setLeftColHeight] = useState(0);
  const isDone = !!(fullText && !fullTextLoading);

  useEffect(() => {
    if (leftColRef.current) {
      setLeftColHeight(leftColRef.current.clientHeight);
    }
  }, [docId, docData]);

  const analysis = (s = "") => {
    const parts = s.split("```");
    if (parts.length < 2) return "";
    const jsonPart = parts[1].split("json");
    return jsonPart.length > 1 ? jsonPart[1].trim() : "";
  };

  const replaceHandle = () => {
    const content = JSON.parse(analysis(fullText));
    editor?.replaceBlocks(editor?.document, content);
  };

  return (
    <DocStateContext.Provider value={docState}>
      <DocDispatchContext.Provider value={docDispatch}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <div className="h-screen flex flex-col bg-gray-200">
              <TopBar getShowCards={getShowCards} getFullText={setFullText} />
              <Row className="flex-grow justify-center items-start py-4 px-2 overflow-auto">
                <Col span={fullText || fullTextLoading ? 4 : 6}>
                  {showCards && <CardList dataSource={[0, 1, 2, 3, 4]} />}
                </Col>
                <Col span={12} ref={leftColRef}>
                  <div
                    className="w-full bg-white shadow-md [&>.bn-container>div:first-child]:px-12"
                    style={{
                      borderRadius: "0",
                      padding: "20px 20px 20px 20px",
                      boxSizing: "border-box",
                      minHeight: "1123px",
                    }}
                  >
                    {!docId ? (
                      <>
                        <DocTitle />
                        <Editor />
                      </>
                    ) : docData ? (
                      <>
                        <DocTitle />
                        <Editor
                          docData={docData}
                          getEditor={(e) => setEditor(e)}
                        />
                      </>
                    ) : (
                      <Skeleton
                        className="px-12 !pt-14 [&_.ant-skeleton-paragraph>li]:!mt-7 [&_.ant-skeleton-paragraph>li:first-child]:!mt-10"
                        active
                        paragraph={{ rows: 21 }}
                      />
                    )}
                  </div>
                </Col>
                {fullText || fullTextLoading ? (
                  <Col
                    span={8}
                    className={`max-h-[${leftColHeight}px] min-h-64`}
                  >
                    <CardList
                      dataSource={[fullText]}
                      // loading={fullText.loading}
                      classname="pl-2 !pr-0 [&>div]:flex [&>div]:items-stretch [&>div]:min-h-64 [&>div]:!mb-0"
                      maxHeight={`${leftColHeight}px`}
                      fullBtn={
                        isDone ? (
                          <Button
                            size="small"
                            type="primary"
                            onClick={replaceHandle}
                          >
                            替换全文
                          </Button>
                        ) : (
                          <></>
                        )
                      }
                    />
                  </Col>
                ) : (
                  <Col span={6} />
                )}
              </Row>
            </div>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </DocDispatchContext.Provider>
    </DocStateContext.Provider>
  );
};

export default NewDoc;
