import { useScrollAnimation } from "@/widgets/main/projectsShowcase/libs/useScrollAnimation";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import { FileDownloadButton } from "@/entities/projects/index";
import Contact from "@/entities/contact/index";

import MyCareer from "@/entities/career/index";
import ContentContainer from "@/shared/ui/content-container/ContentContainer";
import Introduction from "@/entities/introduction/index";
import { ProjectContainer as Project } from "@/entities/projects/index";

import { withLoading } from "@/widgets/main/projectsShowcase/ui/withLoading/withLoading";
import {
  type AdditionalInfo,
  projectList,
} from "@/widgets/main/projectsShowcase/constants/projectList";

function renderAdditionalInfo(additionalInfo: AdditionalInfo) {
  switch (additionalInfo.type) {
    case "DownloadFile":
      return <FileDownloadButton fileUrl={additionalInfo.content} />;
    default:
      return <></>;
  }
}

function ProjectsShowCase() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (scrollRef.current) {
      scrollRef.current.innerHTML = `${latest}`;
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(containerRef, ref);

  return (
    <>
      <main
        className="absolute top-0 left-0 w-full h-[100dvh] scrollbar-hide"
        style={{
          scrollSnapType: "y mandatory",
          overflowY: "auto",
        }}
        ref={ref}
      >
        <section className="flex flex-col items-center justify-center">
          <div className="fixed top-0 left-0 w-full overflow-y-auto -z-10">
            <div className="h-[100dvh]" ref={containerRef}></div>
          </div>
          {/* 홈 */}
          <ContentContainer height="137.5vh">
            <Introduction />
          </ContentContainer>
          {/* 경력 */}
          <ContentContainer>
            <MyCareer />
          </ContentContainer>
          {/* 프로젝트 들... */}
          {projectList.map((project) => (
            <ContentContainer>
              <Project isAlignReverse={project.isAlignReverse}>
                <Project.ImageContainer
                  image={project.image.default}
                  smallImageUrl={project.image.small}
                />
                <Project.Description
                  projectName={project.name}
                  projectDescription={project.description}
                  techSkills={project.techSkill}
                  animeDirection={project.animeDirection}
                >
                  {project.additionalInfo &&
                    renderAdditionalInfo(project.additionalInfo)}
                </Project.Description>
              </Project>
            </ContentContainer>
          ))}

          <ContentContainer>
            <h1 className="text-4xl font-bold text-white">My 8</h1>
            <p className="text-lg">What's next?</p>
          </ContentContainer>
          <ContentContainer>
            <h1 className="text-4xl font-bold text-white">My 9</h1>
            <p className="text-lg">What's next?</p>
          </ContentContainer>
          <ContentContainer>
            <h1 className="text-4xl font-bold text-white">My 10</h1>
            <p className="text-lg">What's next?</p>
          </ContentContainer>
          <ContentContainer>
            <h1 className="text-4xl font-bold text-white">My 11</h1>
            <p className="text-lg">What's next?</p>
          </ContentContainer>
          {/* 137.5vh */}
          <ContentContainer height="137.5vh" scrollSnapAlign="end">
            <div className="flex h-[100dvh] flex-col justify-center items-center">
              <Contact />
            </div>
          </ContentContainer>
        </section>
      </main>
      <div className="fixed text-white bottom-2 left-2 z-99" ref={scrollRef}>
        0
      </div>
    </>
  );
}

export const ProjectsShowCaseWithLoading = withLoading(ProjectsShowCase);
