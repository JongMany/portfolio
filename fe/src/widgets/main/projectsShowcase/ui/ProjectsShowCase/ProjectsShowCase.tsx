import { useScrollAnimation } from "@/widgets/main/projectsShowcase/libs/useScrollAnimation";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import { FileDownloadButton } from "@/entities/projects/index";
import Contact from "@/entities/contact/index";

import MyProfile from "@/entities/profile/index";
import ContentContainer from "@/shared/ui/content-container/ContentContainer";
import Introduction from "@/entities/introduction/index";
import Project from "@/entities/projects/index";

// IMG Resources
import studyLogProjectImg from "@/shared/assets/images/study-log.png";
import readyToWorkProjectImg from "@/shared/assets/images/ready_to_work.png";
import cryptoProjectImg from "@/shared/assets/images/crypto.png";
import eyeveProjectImg from "@/shared/assets/images/eyeve.png";
import vscodeExtensionProjectImg from "@/shared/assets/images/vscode-extension.png";
import { withLoading } from "@/widgets/main/projectsShowcase/ui/withLoading/withLoading";

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
        className="absolute top-0 left-0 w-full h-[100vh] scrollbar-hide"
        style={{
          scrollSnapType: "y mandatory",
          overflowY: "auto",
        }}
        ref={ref}
      >
        <section className="flex flex-col items-center justify-center">
          <div className="fixed top-0 left-0 w-full overflow-y-auto -z-10">
            <div className="h-[100vh]" ref={containerRef}></div>
          </div>
          {/* 홈 */}
          <ContentContainer height="137.5vh">
            <Introduction />
          </ContentContainer>
          {/* 프로필 */}
          <ContentContainer>
            <MyProfile />
          </ContentContainer>
          {/* Ready To Work Project */}
          <ContentContainer>
            <Project isAlignReverse={false}>
              <Project.ImageContainer image={readyToWorkProjectImg} />
              <Project.Description
                projectName="Ready To Work"
                projectDescription="엔카의 김상범 대표님과 광운대학교의 IDEA Lab에서 진행한 프로젝트입니다. HR 도메인의 B2B 서비스이며, 문제 해결 방식을 통해 인재 채용을 쉽게 할 수 있도록 도움을 주고자 서비스를 기획하였습니다."
                techSkills={[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Ant Design",
                  "Zustand",
                  "Tanstack Query",
                  "D3.js",
                  "...",
                ]}
                animeDirection="LToR"
              />
            </Project>
          </ContentContainer>

          <ContentContainer>
            <Project isAlignReverse={true}>
              <Project.ImageContainer image={eyeveProjectImg} />
              <Project.Description
                projectName="Eyeve"
                projectDescription="광운대학교 IDEA Lab에서 카메라를 통한 시선 추적을 통해 학생들의 집중도를 분석하는 연구용 서비스를 개발하였습니다. 2024년 춘계 산업공학회의 포스터 세션에 등록되기도 하였습니다."
                techSkills={[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "WebSocket",
                  "WebRTC",
                  "Zustand",
                  "...",
                ]}
                animeDirection="RToL"
              >
                <FileDownloadButton
                  fileUrl={`${import.meta.env.VITE_API_SERVER}/files/eyeve.pdf`}
                />
              </Project.Description>
            </Project>
          </ContentContainer>
          {/* 암호화폐 차트 */}
          <ContentContainer>
            <Project isAlignReverse={false}>
              <Project.ImageContainer image={cryptoProjectImg} />
              <Project.Description
                projectName="암호화폐 차트 그래프"
                projectDescription="항해 플러스 프론트엔드 1기에서 진행한 프로젝트입니다. 암호화폐 차트 그래프를 보여주는 서비스를 개발하였습니다."
                techSkills={[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "lightweight-charts",
                  "date-fns",
                  "Tanstack Query",
                  "socket.io",
                  "Jira",
                  "...",
                ]}
                animeDirection="RToL"
              ></Project.Description>
            </Project>
          </ContentContainer>
          {/* 웹 기반 스터디 인증 SNS */}
          <ContentContainer>
            <Project isAlignReverse={true}>
              <Project.ImageContainer image={studyLogProjectImg} />
              <Project.Description
                projectName="웹 기반 스터디 인증 SNS"
                projectDescription="웹 서비스 설계 및 실습 수업에서 진행한 SNS 플랫폼 서비스입니다. 스터디 인증을 통해 사용자들이 서로 인증을 공유하고 소통할 수 있는 서비스를 개발하였습니다."
                techSkills={[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "date-fns",
                  "Tanstack Query",
                  "...",
                ]}
                animeDirection="RToL"
              ></Project.Description>
            </Project>
          </ContentContainer>
          {/* VSCode Extension */}
          <ContentContainer>
            <Project isAlignReverse={false}>
              <Project.ImageContainer image={vscodeExtensionProjectImg} />
              <Project.Description
                projectName="StudyLog VSCode Extension"
                projectDescription="개발자의 개발 시간을 측정해주는 VSCode Extension을 개발하였습니다."
                techSkills={[
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "date-fns",
                  "Tanstack Query",
                  "Nest.js",
                  "MongoDB",
                  "Docker",
                  "AWS",
                  "...",
                ]}
                animeDirection="RToL"
              ></Project.Description>
            </Project>
          </ContentContainer>
          <ContentContainer>
            <Project isAlignReverse={false}>
              <Project.ImageContainer image={vscodeExtensionProjectImg} />
              <Project.Description
                projectName="포트폴리오 사이트"
                projectDescription="제가 개발한 프로젝트들을 소개하는 포트폴리오 사이트입니다. SEO 최적화를 위해 많은 노력을 기울였습니다."
                techSkills={[
                  "React",
                  "Node.js",
                  "TailwindCSS",
                  "three.js",
                  "WebGL",
                  "MongoDB",
                ]}
                animeDirection="RToL"
              ></Project.Description>
            </Project>
          </ContentContainer>
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
            <div className="flex h-[100vh] flex-col justify-center items-center">
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
