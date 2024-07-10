import Content from "@/pages/root/components/Content";
import Contact from "@/pages/root/components/content/Contact";
import Home from "@/pages/root/components/content/Home";
import Project from "@/pages/root/components/content/Project";
import { useScrollAnimation } from "@/pages/root/hooks/useScrollAnimation";
// import { useCustomScroll } from "@/pages/root/hooks/useCustomScroll";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import starPng from "@/assets/star.png";
import cryptoProjectImg from "@/assets/crypto.png";
import MyProfile from "@/pages/root/components/content/MyProfile";
import FileDownload from "@/pages/root/components/content/FileDownload";

export default function Contents() {
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
        className="absolute top-0 left-0 w-full h-[100vh]"
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
          <Content height="137.5vh">
            <Home />
          </Content>
          {/* 프로필 */}
          <Content>
            <MyProfile />
          </Content>

          <Content>
            <Project isAlignReverse={false}>
              <Project.ImageContainer image={starPng} />
              <Project.Description
                projectName="Ready To Work"
                projectDescription="엔카의 김상범 대표님과 광운대학교의 IDEA Lab에서 진행한 프로젝트입니다. 인사관리 도메인의 B2B 서비스이며, 문제 해결 방식을 통해 인재 채용을 쉽게 할 수 있도록 도움을 주고자 서비스를 기획하였습니다."
                techSkills={[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Ant Design",
                  "Zustand",
                  "Tanstack Query",
                  "...",
                ]}
                animeDirection="LToR"
              />
            </Project>
          </Content>

          <Content>
            <Project isAlignReverse={true}>
              <Project.ImageContainer image={starPng} />
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
                <FileDownload
                  fileUrl={`${import.meta.env.VITE_API_SERVER}/files/eyeve.pdf`}
                />
              </Project.Description>
            </Project>
          </Content>

          <Content>
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
          </Content>
          <Content>
            <Project isAlignReverse={false}>
              <Project.ImageContainer image={cryptoProjectImg} />
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
          </Content>
          <Content>
            <Project isAlignReverse={false}>
              <Project.ImageContainer image={cryptoProjectImg} />
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
          </Content>
          <Content>
            <h1 className="text-4xl font-bold text-white">My 7</h1>
            <p className="text-lg">Welcome to my website!</p>
          </Content>
          <Content>
            <h1 className="text-4xl font-bold text-white">My 8</h1>
            <p className="text-lg">Welcome to my website!</p>
          </Content>
          <Content>
            <h1 className="text-4xl font-bold text-white">My 9</h1>
            <p className="text-lg">Welcome to my website!</p>
          </Content>
          <Content>
            <h1 className="text-4xl font-bold text-white">My 10</h1>
            <p className="text-lg">Welcome to my website!</p>
          </Content>
          <Content>
            <h1 className="text-4xl font-bold text-white">My 11</h1>
            <p className="text-lg">Welcome to my website!</p>
          </Content>
          {/* 137.5vh */}
          <Content height="137.5vh" scrollSnapAlign="end">
            <div className="flex h-[100vh] flex-col justify-center items-center">
              <Contact />
            </div>
          </Content>
        </section>
      </main>
      <div className="fixed text-white bottom-2 left-2 z-99" ref={scrollRef}>
        0
      </div>
    </>
  );
}
