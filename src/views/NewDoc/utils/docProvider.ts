import { useContext } from "react";
import {
  DocAction,
  DocDispatchContext,
  DocState,
  DocStateContext,
} from "./docContext";

export const useDocState = (): DocState => {
  const context = useContext(DocStateContext);
  if (context === undefined) {
    throw new Error("useDocState must be used within a DocStateProvider");
  }
  return context;
};

export const useDocDispatch = (): React.Dispatch<DocAction> => {
  const context = useContext(DocDispatchContext);
  if (context === undefined) {
    throw new Error("useDocDispatch must be used within a DocStateProvider");
  }
  return context;
};
