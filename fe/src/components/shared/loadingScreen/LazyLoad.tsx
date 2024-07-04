import nProgress from "nprogress";
import { useEffect } from "react";

export const LazyLoad = () => {
  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
    };
  }, []);

  return (
    <div>
      <h1>LazyLoad</h1>
    </div>
  );
};
