import React, { useReducer } from "react";
import Editor from "./Editor";
import { DispatchContext, StateContext, initialState } from "./utils/context";
import { reducer } from "./utils/reducer";

const NewDoc = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Editor />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default NewDoc;
