import React from "react";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LiveblocksProvider
        publicApiKey={
          "pk_prod_34eb952k8kHk9bii9o0cdCeEBDpKWkTgGXHT-kbIOTFQ8857U3IaYsbn4-K-bTgT"
        }
      >
        <RoomProvider id="my-room">
          <Routes />
        </RoomProvider>
      </LiveblocksProvider>
    </AuthProvider>
  );
};

export default App;
