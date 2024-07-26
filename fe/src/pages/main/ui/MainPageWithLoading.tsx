import { MainLoadingScreen } from "@/widgets/projects-showcase/index";
import ProjectsShowCase from "@/widgets/projects-showcase/ui/ProjectsShowCase";
import { useState } from "react";

export default function MainPageWithLoading() {
  const [start, setStart] = useState(false);

  const showStartPage = () => {
    setStart(true);
  };

  return (
    <>
      {start && <ProjectsShowCase />}
      <MainLoadingScreen started={start} onStarted={showStartPage} />
    </>
  );
}
