import React, { lazy, Suspense } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Spinning from "./Spinning";
import ReadPdfViewer from "@/views/Home/AIReadPaper/ReadPdfViewer";

const Routes = () => {
  const Login = lazy(() => import("../views/Login"));
  const UserAgreement = lazy(() => import("../views/UserAgreement"));
  const PrivacyPolicy = lazy(() => import("../views/PrivacyPolicy"));
  const Logout = lazy(() => import("../views/Logout"));
  const Home = lazy(() => import("../views/Home"));
  const NewDoc = lazy(() => import("../views/NewDoc"));
  const Files = lazy(() => import("../views/Home/Knowledge/Files"));
  const Temp = lazy(() => import("../views/Temp"));
  const { token } = useAuth();

  // 公共路由配置
  const routesForPublic = [
    {
      path: "/login",
      element: (
        <Suspense fallback={<Spinning />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/user-agreement",
      element: (
        <Suspense fallback={<Spinning />}>
          <UserAgreement />
        </Suspense>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Suspense fallback={<Spinning />}>
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
          element: <Navigate to="/recent" />,
        },
        {
          path: "/recent",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/share",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/directory",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/conmmunity",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/knowledge",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/laboratory",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/aiReadPaper",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/pdf",
          element: (
            <Suspense fallback={<Spinning />}>
              <ReadPdfViewer />
            </Suspense>
          ),
        },
        {
          path: "/literatureManage",
          element: (
            <Suspense fallback={<Spinning />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/newDoc",
          element: (
            <Suspense fallback={<Spinning />}>
              <NewDoc />
            </Suspense>
          ),
        },
        {
          path: "/db",
          element: (
            <Suspense fallback={<Spinning />}>
              <Files />
            </Suspense>
          ),
        },
        {
          path: "/logout",
          element: (
            <Suspense fallback={<Spinning />}>
              <Logout />
            </Suspense>
          ),
        },
        {
          path: "/temp",
          element: (
            <Suspense fallback={<Spinning />}>
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
