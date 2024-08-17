import React, { useEffect, useReducer, useRef, useState } from "react";
import ColEditor from "./Editor/ColEditor";
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
import { Affix, Button, Col, Row, Skeleton, Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import { docApi } from "./api/Doc";
import { useDocId } from "./hooks/useDocId";
import { Efficiency } from "./Efficiency";
import { BlockNoteEditor } from "@blocknote/core";
import { useAuth } from "@/provider/authProvider";
import Outline from "./Outline";
import { MenuOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Editor from "./Editor";

interface NewDocProps {
  className?: string;
  editorOnly?: boolean;
  is_note?: boolean;
  note_id?: string;
  paper_id?: string;
}
const NewDoc: React.FC<NewDocProps> = ({
  className,
  editorOnly,
  is_note,
  note_id,
  paper_id,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [docState, docDispatch] = useReducer(docReducer, initialDocState);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [fullText, setFullText] = useState<string>("");
  const [fullTextLoading, setFullTextLoading] = useState<boolean>(
    state.fullTextLoading
  );
  const [isOutlineVisible, setIsOutlineVisible] = useState(false);
  const toggleOutlineVisibility = () => {
    setIsOutlineVisible(!isOutlineVisible);
  };
  const [ifStartUnfold, setIfStartUnfold] = useState<boolean>(false);

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
  const { token } = useAuth();
  let docId = useDocId(search) as string;
  // 如果是pdfViewer右侧边栏的笔记，则把根据pdfId获取到的对应笔记docId传给docId
  if (note_id) {
    docId = note_id;
  }
  const { data: doc } = useRequest(
    async () => {
      const res = await docApi.getDocByDocId(`Bearer ${token}` || "", docId);
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

  // 全文格式化
  const initialFormat = {
    "heading1-fontFamily": "-apple-system",
    "heading1-fontSize": 36,
    "heading2-fontFamily": "-apple-system",
    "heading2-fontSize": 24,
    "heading3-fontFamily": "-apple-system",
    "heading3-fontSize": 16,
    "paragraph-fontFamily": "-apple-system",
    "paragraph-fontSize": 12,
    segSpacing: 1.0,
    padding: "moderate",
    paddingTop: "",
    paddingLeft: "",
    paddingRight: "",
    paddingBottom: "",
  };
  const { fullFormatting } = state;
  const [fullFormat, setFullFormat] = useState(initialFormat);
  const [paddingProperty, setPaddingProperty] = useState("20px");
  useEffect(() => {
    if (JSON.stringify(fullFormatting) !== JSON.stringify(initialFormat)) {
      setFullFormat(state.fullFormatting);
      if (state.fullFormatting.padding == "moderate") {
        setPaddingProperty("20px");
      } else if (state.fullFormatting.padding == "narrow") {
        setPaddingProperty("12.7px");
      } else if (state.fullFormatting.padding == "wide") {
        setPaddingProperty("25.4px 50.8px 25.4px 50.8px");
      } else {
        setPaddingProperty(
          `${parseFloat(state.fullFormatting.paddingTop) * 10}px ${
            parseFloat(state.fullFormatting.paddingRight) * 10
          }px ${parseFloat(state.fullFormatting.paddingBottom) * 10}px ${
            parseFloat(state.fullFormatting.paddingLeft) * 10
          }px`
        );
      }
    }
  }, [state.fullFormatting]);

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
  const getIfStartUnfold = (ifStartUnfold: boolean) => {
    setIfStartUnfold(ifStartUnfold);
  };

  return (
    <DocStateContext.Provider value={docState}>
      <DocDispatchContext.Provider value={docDispatch}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <div
              className={classNames(
                className,
                "h-full flex flex-col bg-zinc-50"
              )}
            >
              <TopBar
                getShowCards={getShowCards}
                getFullText={setFullText}
                getIfStartUnfold={getIfStartUnfold}
                is_note={is_note}
                paper_id={paper_id}
                is_shared={doc?.is_shared}
              />
              <Row className="flex-grow justify-center items-start py-4 px-2">
                {(fullText || fullTextLoading) && !isOutlineVisible ? (
                  <Col
                    span={editorOnly ? 0 : showCards ? 5 : 6}
                    className={`max-h-[${leftColHeight}px] min-h-64`}
                  >
                    <CardList
                      dataSource={[fullText]}
                      loading={!fullText}
                      classname="!pr-2 [&>div]:min-h-64 [&>div]:!mb-0 [&>div]:!px-5 [&>div]:!pt-5 [&>div]:!pb-14"
                      maxHeight={`${leftColHeight}px`}
                      fullBtn={
                        isDone ? (
                          <Button
                            size="small"
                            type="primary"
                            className="h-7 w-20 rounded-sm"
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
                  <Col span={editorOnly ? 0 : showCards ? 5 : 6}>
                    <Outline
                      editor={editor}
                      isVisible={isOutlineVisible}
                      toggleVisibility={toggleOutlineVisibility}
                      ifStartUnfold={ifStartUnfold}
                    />
                  </Col>
                )}
                <Col
                  span={editorOnly ? 24 : 12}
                  ref={leftColRef}
                  className="z-0"
                >
                  <div
                    className="w-full bg-white shadow-md [&>.bn-container>div:first-child]:px-12 [&_audio]:my-3 [&_.highlight]:bg-yellow-100"
                    style={{
                      borderRadius: "0",
                      padding: paddingProperty,
                      boxSizing: "border-box",
                      minHeight: "1123px",
                    }}
                  >
                    {!docId ? (
                      <>
                        <DocTitle />
                        {doc?.is_shared ? (
                          <ColEditor
                            docData={docData}
                            fullFormat={fullFormat}
                            getEditor={(e) => {
                              setEditor(e);
                            }}
                          />
                        ) : (
                          <Editor
                            fullFormat={fullFormat}
                            getEditor={(e) => {
                              setEditor(e);
                            }}
                          />
                        )}
                      </>
                    ) : docData ? (
                      <>
                        <DocTitle />
                        {doc?.is_shared ? (
                          <ColEditor
                            docData={docData}
                            fullFormat={fullFormat}
                            getEditor={(e) => {
                              setEditor(e);
                            }}
                          />
                        ) : (
                          <Editor
                            docData={docData}
                            fullFormat={fullFormat}
                            getEditor={(e) => {
                              setEditor(e);
                            }}
                          />
                        )}
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
                <Col span={editorOnly ? 0 : showCards ? 7 : 6} className="">
                  {showCards && (
                    <Affix
                      offsetTop={ifStartUnfold ? 108 : 72}
                      className="h-efficiency-affix overflow-y-auto"
                    >
                      <Efficiency />
                    </Affix>
                  )}
                </Col>
              </Row>
            </div>
            {!isOutlineVisible && (
              <Tooltip title="打开目录" placement="right">
                <div
                  className="h-8 w-8 bg-white shadow-menu-switcher rounded-r-2xl fixed left-0 top-52 flex justify-center items-center"
                  onClick={toggleOutlineVisibility}
                >
                  <MenuOutlined className="text-xs" />
                </div>
              </Tooltip>
            )}
          </DispatchContext.Provider>
        </StateContext.Provider>
      </DocDispatchContext.Provider>
    </DocStateContext.Provider>
  );
};

export default NewDoc;
