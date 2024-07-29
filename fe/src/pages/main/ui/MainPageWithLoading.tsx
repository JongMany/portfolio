import { MainLoadingScreen } from "@/widgets/projects-showcase/index";
import ProjectsShowCase from "@/widgets/projects-showcase/ui/ProjectsShowCase";
import { useState } from "react";

export default function MainPageWithLoading() {
  const [isLoading, setIsLoading] = useState(true);

  const showStartPage = () => {
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && <ProjectsShowCase />}
      <MainLoadingScreen isLoading={isLoading} onStarted={showStartPage} />
    </>
  );
}
