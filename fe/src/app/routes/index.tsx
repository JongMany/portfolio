import { Suspense, createElement, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorLayout from "../layout/ErrorLayout";
import { MainLayout } from "@/app/layout/MainLayout";
import MainPage from "@/pages/main/index";
const NotFoundPage = lazy(() => import("@/pages/not-found/page"));

// const MainPage = lazy(() => import("../pages/main/MainPage"));

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: "main",
        element: <Suspense fallback={null}>{/* <MainPage /> */}</Suspense>,
      },
      {
        path: "*",
        element: <Suspense fallback={null}>{<NotFoundPage />}</Suspense>,
      },
    ],
  },
]);

export function Router() {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
