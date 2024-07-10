import Content from "@/pages/root/components/Content";
import Contact from "@/pages/root/components/content/Contact";
import Home from "@/pages/root/components/content/Home";
import Project from "@/pages/root/components/content/Project";
import { useScrollAnimation } from "@/pages/root/hooks/useScrollAnimation";
// import { useCustomScroll } from "@/pages/root/hooks/useCustomScroll";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import starPng from "@/assets/star.png";
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
                projectName="Project 1"
                projectDescription="This is project 1"
                techSkills={["React", "TypeScript", "Tailwind CSS"]}
                animeDirection="LToR"
              />
            </Project>
          </Content>

          <Content>
            <Project isAlignReverse={true}>
              <Project.ImageContainer image={starPng} />
              <Project.Description
                projectName="Project 1"
                projectDescription="This is project 1"
                techSkills={["React", "TypeScript", "Tailwind CSS"]}
                animeDirection="RToL"
              >
                <FileDownload
                  fileUrl={`${import.meta.env.VITE_API_SERVER}/files/eyeve.pdf`}
                />
              </Project.Description>
            </Project>
          </Content>

          <Content>
            <h1 className="text-4xl font-bold text-white">My 4</h1>
            <p className="text-lg">Welcome to my website!</p>
          </Content>
          <Content>
            <h1 className="text-4xl font-bold text-white">My 5</h1>
            <p className="text-lg">Welcome to my website!</p>
          </Content>
          <Content>
            <h1 className="text-4xl font-bold text-white">My 6</h1>
            <p className="text-lg">Welcome to my website!</p>
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
