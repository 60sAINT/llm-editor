import React, { useEffect } from "react";
import AuthProvider, { useAuth } from "./provider/authProvider";
import Routes from "./routes";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useRequest } from "./hooks/useRequest";
import { docApi } from "./views/NewDoc/api/Doc";
import { defaultApi } from "./views/NewDoc/api";
import Spinning from "./routes/Spinning";

const App: React.FC = () => {
  const search = window.location.search;
  const urlParams = new URLSearchParams(search.split("?")[1]);
  const docId = urlParams.get("doc_id");
  const { token } = useAuth();

  const { runAsync: getDocInfo, data: docInfo } = useRequest(async () => {
    const res = await docApi.getDocByDocId(`Bearer ${token}` || "", docId!);
    return res.data.doc;
  });
  useEffect(() => {
    if (docId) getDocInfo();
  }, [docId]);

  return (
    <AuthProvider>
      {docInfo && docInfo.is_shared && docId ? (
        <LiveblocksProvider
          authEndpoint={async () => {
            const res = await defaultApi.getColAuthToken();
            return res;
          }}
        >
          <RoomProvider id={docId}>
            <ClientSideSuspense fallback={<Spinning />}>
              <Routes />
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
      ) : (
        <Routes />
      )}
    </AuthProvider>
  );
};

export default App;
