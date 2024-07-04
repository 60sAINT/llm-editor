import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const App: React.FC = () => {
  const Login = lazy(() => import("./views/Login"));
  const UserAgreement = lazy(() => import("./views/UserAgreement"));
  const PrivacyPolicy = lazy(() => import("./views/PrivacyPolicy"));
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/user-agreement",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <UserAgreement />
        </Suspense>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PrivacyPolicy />
        </Suspense>
      ),
    },
  ]);

  return <>{routes}</>;
};

export default App;
