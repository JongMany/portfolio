import nProgress from "nprogress";
import { useEffect, useState } from "react";

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
    nProgress.start();
    import("@/pages/root/RootPage")
      .then((module) => {
        setContetLoadState("finish");
        setLoadPage(module.default);
        nProgress.done();
      })
      .catch((error) => {
        setContetLoadState("error");
        console.error(error);
      });
  }, []);

  const buttonDisabled =
    contentLoadState === "loading" ||
    minTimeFinish === "loading" ||
    contentLoadState === "error";

  return (
    <div className="absolute z-50">
      <div className="loadingScreen__progress">
        <div
          className="loadingScreen__progress__value"
          // style={{
          //   width: `${progress}%`,
          // }}
        />
      </div>
      <div className="loadingScreen__board">
        <h1 className="loadingScreen__title">Please help me!</h1>
        <button
          // className="loadingScreen__button"
          disabled={buttonDisabled}
          onClick={onStarted}
        >
          Start
        </button>
      </div>
    </div>
  );
};
