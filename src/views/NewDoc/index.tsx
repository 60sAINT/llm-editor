import React, { useReducer, useState } from "react";
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
import { Col, Row } from "antd";

const NewDoc = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [docState, docDispatch] = useReducer(docReducer, initialDocState);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [fullText, setFullText] = useState<string>("");
  const getShowCards = (showCards: boolean) => {
    setShowCards(showCards);
  };

  return (
    <DocStateContext.Provider value={docState}>
      <DocDispatchContext.Provider value={docDispatch}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <div className="h-screen flex flex-col bg-gray-200">
              <TopBar getShowCards={getShowCards} getFullText={setFullText} />
              <Row className="flex-grow justify-center items-start p-4 overflow-auto">
                <Col span={6}>
                  {showCards && <CardList dataSource={[0, 1, 2, 3, 4]} />}
                </Col>
                <Col span={12}>
                  <div
                    className="w-full bg-white shadow-md"
                    style={{
                      borderRadius: "0",
                      padding: "20px 20px 20px 20px",
                      boxSizing: "border-box",
                      minHeight: "1123px",
                    }}
                  >
                    <DocTitle />
                    <Editor />
                  </div>
                </Col>
                <Col span={6} className="h-full">
                  {fullText && (
                    <CardList
                      dataSource={[fullText]}
                      // loading={fullText.loading}
                      classname="pl-4"
                    />
                  )}
                </Col>
              </Row>
            </div>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </DocDispatchContext.Provider>
    </DocStateContext.Provider>
  );
};

export default NewDoc;
