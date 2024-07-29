import LoadAnimation from "@/shared/ui/loadingScreen/LoadAnimation";
import NProgress from "nprogress";
import { useEffect, useState } from "react";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  trickle: true,
  easing: "ease",
  speed: 100,
});

export const MainLoadingScreen = ({ isLoading, onStarted }) => {
  const [contentLoadState, setContetLoadState] = useState<
    "loading" | "error" | "finish"
  >("loading");
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
    import("@/widgets/main/projects-showcase/ui/ProjectsShowCase.tsx")
      .then((module) => {
        setContetLoadState("finish");
        console.log(module.default);
        NProgress.done();
      })
      .catch((error) => {
        setContetLoadState("error");
        console.error("error", error);
      });
    // import("./ProjectsShowCase")
  }, []);

  const buttonDisabled =
    contentLoadState === "loading" ||
    minTimeFinish === "loading" ||
    contentLoadState === "error";

  return (
    //absolute z-50 h-[100vh] w-[100vw] flex justify-center items-center
    <div
      className={`z-50 absolute h-[100vh] w-[100vw] transition-all durtaion-300  ${
        // started ? "z-0 hidden" : ""
        !isLoading ? "opacity-0 -z-10 invisible" : ""
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
