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
import { ConfigProvider } from "antd";

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
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "#fbf2f3",
              itemActiveBg: "#fbf2f3",
              itemSelectedColor: "#d67b88",
            },
            Button: {
              colorPrimary: "#d67b88",
              colorPrimaryHover: "#dc8f9a",
              colorPrimaryActive: "#e65c70",
            },
            Input: {
              colorPrimary: "#d67b88",
              colorPrimaryHover: "#dc8f9a",
            },
            Radio: {
              buttonSolidCheckedActiveBg: "#ab626d",
              buttonSolidCheckedBg: "#d67b88",
              buttonSolidCheckedHoverBg: "#e09ca6",
            },
            Tabs: {
              inkBarColor: "#242424",
              itemActiveColor: "#d67b88",
              itemHoverColor: "#e2a3ac",
              itemSelectedColor: "#d67b88",
            },
          },
        }}
      >
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
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
