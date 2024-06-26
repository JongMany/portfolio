import { useEffect, useState } from "react";

export const useLoadPercentage = () => {
  const [loadPercent, setLoadPercent] = useState(0);
  const [minTimeFinish, setMinTimeFinish] = useState<"loading" | "finish">(
    "loading"
  );

  useEffect(() => {
    const sid = setInterval(() => {
      setLoadPercent((prev) => {
        const percentage = prev + Math.random() * 5 + 1;
        if (percentage > 100) {
          clearInterval(sid);
          return 100;
        }
        return percentage;
      });
    }, 100);

    if (loadPercent > 100) {
      clearInterval(sid);
    }

    return () => {
      clearInterval(sid);
    };
  }, []);

  useEffect(() => {
    console.log(loadPercent);
    if (loadPercent >= 100) {
      setTimeout(() => {
        setMinTimeFinish("finish");
      }, 1000);
    }
  }, [loadPercent]);

  return {
    percentage: Number(loadPercent.toFixed(2)),
    finished: minTimeFinish === "finish",
  };
};
