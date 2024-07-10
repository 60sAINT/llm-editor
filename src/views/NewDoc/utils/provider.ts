import { useContext } from "react";
import { Action, DispatchContext, State, StateContext } from "./context";

export const useNewDocState = (): State => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useNewDocState must be used within a StateProvider");
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
