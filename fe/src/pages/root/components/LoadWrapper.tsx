import { MainLoadingScreen } from "@/components/shared/loadingScreen/MainLoadingScreen";
import Main from "@/pages/root/components/Main";
import { useState } from "react";

export default function LoadWrapper() {
  const [start, setStart] = useState(false);

  const showStartPage = () => {
    setStart(true);
  };

  return (
    <>
      {start && <Main />}
      <MainLoadingScreen started={start} onStarted={showStartPage} />
    </>
  );
}
