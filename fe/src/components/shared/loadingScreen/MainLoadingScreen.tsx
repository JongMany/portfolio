import LoadAnimation from "@/components/shared/loadingScreen/LoadAnimation";
import NProgress from "nprogress";
import { useEffect, useState } from "react";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  trickle: true,
  easing: "ease",
  speed: 100,
});

export const MainLoadingScreen = ({ started, onStarted }) => {
  const [contentLoadState, setContetLoadState] = useState<
    "loading" | "error" | "finish"
  >("loading");
  const [loadPage, setLoadPage] = useState<React.ReactNode>(null);
  const [minTimeFinish, setMinTimeFinish] = useState<"loading" | "finish">(
    "loading"
  );

  // 최소 시간 대기 후 finish
  useEffect(() => {
    setTimeout(() => {
      setMinTimeFinish("finish");
    }, 1000);
  }, []);

  useEffect(() => {
    NProgress.start();
    import("@/pages/root/RootPage")
      .then((module) => {
        setContetLoadState("finish");
        setLoadPage(module.default);
        NProgress.done();
      })
      .catch((error) => {
        setContetLoadState("error");
        console.error(error, loadPage);
      });
  }, []);

  const buttonDisabled =
    contentLoadState === "loading" ||
    minTimeFinish === "loading" ||
    contentLoadState === "error";

  return (
    //absolute z-50 h-[100vh] w-[100vw] flex justify-center items-center
    <div
      className={`z-50 absolute h-[100vh] w-[100vw] ${
        started ? "z-0 hidden" : ""
      }`}
    >
      <LoadAnimation />
      <div className="absolute z-10 bottom-10 left-[50%] -translate-x-[50%]">
        <button
          // className="loadingScreen__button"
          className={`${buttonDisabled ? "text-gray-400" : "text-white"}`}
          disabled={buttonDisabled}
          onClick={onStarted}
        >
          메인페이지로 이동
        </button>
      </div>
    </div>
  );
};