import React, { createContext, useContext, useReducer } from "react";

interface State {
  count: number;
  text: string;
  isActive: boolean;
}

type Action =
  | { type: "INCREMENT_COUNT" }
  | { type: "UPDATE_TEXT"; payload: string }
  | { type: "TOGGLE_ACTIVE" };

const initialState: State = {
  count: 0,
  text: "",
  isActive: false,
};

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return { ...state, count: state.count + 1 };
    case "UPDATE_TEXT":
      return { ...state, text: action.payload };
    case "TOGGLE_ACTIVE":
      return { ...state, isActive: !state.isActive };
    default:
      return state;
  }
};

export const StateProvider: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {/* {children} */}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAppState = (): State => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
};

export const useDispatch = (): React.Dispatch<Action> => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a StateProvider");
  }
  return context;
};

// Usage example in another component:

const AnotherComponent: React.FC = () => {
  const state = useAppState();
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch({ type: "INCREMENT_COUNT" });
  };

  const updateText = (newText: string) => {
    dispatch({ type: "UPDATE_TEXT", payload: newText });
  };

  const toggleActive = () => {
    dispatch({ type: "TOGGLE_ACTIVE" });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={incrementCount}>Increment Count</button>

      <p>Text: {state.text}</p>
      <input
        type="text"
        value={state.text}
        onChange={(e) => updateText(e.target.value)}
      />

      <p>Active: {state.isActive ? "Active" : "Inactive"}</p>
      <button onClick={toggleActive}>Toggle Active</button>
    </div>
  );
};

export default AnotherComponent;
