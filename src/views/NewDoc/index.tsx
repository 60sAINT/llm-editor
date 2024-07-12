import React, { useReducer, useState } from "react";
import Editor from "./Editor";
import { DispatchContext, StateContext, initialState } from "./utils/context";
import { reducer } from "./utils/reducer";
import TopBar from "./TopBar";
import DocTitle from "./DocTitle";

const NewDoc = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="h-screen flex flex-col bg-gray-200">
          <TopBar />
          {/* <TopBar /> */}
          <div className="flex-grow flex justify-center items-start p-4 overflow-auto">
            <div
              className="w-full max-w-2xl bg-white shadow-md"
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
          </div>
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default NewDoc;
