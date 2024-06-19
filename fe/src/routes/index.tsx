import { Suspense, createElement, lazy } from "react";
import {
  createBrowserRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorLayout from "../components/layout/ErrorLayout";
import { MainLayout } from "../components/layout/MainLayout";
import LoadingPage from "../pages/root/LoadingPage";
// import MainPage from "../pages/main/MainPage";

const MainPage = lazy(() => import("../pages/main/MainPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoadingPage />,
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: "main",
        element: (
          <Suspense fallback={<>로딩중...</>}>
            <MainPage />
            //{" "}
          </Suspense>
        ),
      },
    ],
  },

  // {
  //   path: "",
  //   element: <MainLayout />,
  //   errorElement: <RootError />,
  //   children: [
  //     { index: true, element: <Navigate to="/dashboard" replace /> },
  //     { path: "dashboard", lazy: () => import("./dashboard") },
  //     { path: "tasks", lazy: () => import("./tasks") },
  //     { path: "messages", lazy: () => import("./messages") },
  //   ],
  // },
]);

export function Router() {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
