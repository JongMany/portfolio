import nProgress from "nprogress";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function LoadWrapper() {
  const [contentLoadState, setContetLoadState] = useState<
    "loading" | "error" | "finish"
  >("loading");
  const [loadPage, setLoadPage] = useState<React.ReactNode>(null);
  const [minTimeFinish, setMinTimeFinish] = useState<"loading" | "finish">(
    "loading"
  );

  useEffect(() => {
    setTimeout(() => {
      setMinTimeFinish("finish");
    }, 5000);
  }, []);

  useEffect(() => {
    nProgress.start();
    import("./Main")
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

  if (minTimeFinish === "finish" && contentLoadState === "finish") {
    return loadPage;
  } else {
    return <Loading />;
  }
}
