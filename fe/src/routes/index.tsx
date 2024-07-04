import { Suspense, createElement, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorLayout from "../components/shared/layout/ErrorLayout";
import { MainLayout } from "../components/shared/layout/MainLayout";
import RootPage from "../pages/root/RootPage";
import { LazyLoad } from "../components/shared/loadingScreen/LazyLoad";
// import MainPage from "../pages/main/MainPage";

const MainPage = lazy(() => import("../pages/main/MainPage"));

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <RootPage /> },
      {
        path: "main",
        element: (
          <Suspense fallback={<LazyLoad />}>
            <MainPage />
          </Suspense>
        ),
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
