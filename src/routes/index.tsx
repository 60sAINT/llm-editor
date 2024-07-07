import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
  const Login = lazy(() => import("../views/Login"));
  const UserAgreement = lazy(() => import("../views/UserAgreement"));
  const PrivacyPolicy = lazy(() => import("../views/PrivacyPolicy"));
  const Logout = lazy(() => import("../views/Logout"));
  const Home = lazy(() => import("../views/Home"));
  const NewDoc = lazy(() => import("../views/NewDoc"));
  const Temp = lazy(() => import("../views/Temp"));
  const { token } = useAuth();

  // 公共路由配置
  const routesForPublic = [
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
  ];

  // 授权的用户才可以访问的路由配置
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/newDoc",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <NewDoc />
            </Suspense>
          ),
        },
        {
          path: "/logout",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Logout />
            </Suspense>
          ),
        },
        {
          path: "/temp",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Temp />
            </Suspense>
          ),
        },
      ],
    },
  ];

  // 没有授权的用户才可以访问的路由配置
  const routesForNotAuthenticatedOnly = [{}];

  // 合并路由配置
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
