import { useEffect, useState } from "react";
import NProgress from "nprogress";

type ContentLoadState = "loading" | "error" | "finish";
type IsFinishMinimumLoadTime = "loading" | "finish";

export function useLoadMainPage() {
  const [contentLoadState, setContetLoadState] =
    useState<ContentLoadState>("loading");
  const [minTimeFinish, setMinTimeFinish] =
    useState<IsFinishMinimumLoadTime>("loading");

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
  }, []);

  const isButtonDisabled =
    contentLoadState === "loading" ||
    minTimeFinish === "loading" ||
    contentLoadState === "error";

  return {
    isButtonDisabled,
  };
}
