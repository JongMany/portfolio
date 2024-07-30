import { useDeviceSize } from "@/shared/libs";
import { useInView } from "framer-motion";
import { PropsWithChildren, useRef } from "react";
import { DetailLink } from "@/entities/projects/ui/project/DetailLink";

type DescriptionProps = {
  projectName: string;
  projectDescription: string;
  techSkills: string[];
  animeDirection: "LToR" | "RToL";
};

export const Description = ({
  projectName,
  projectDescription,
  techSkills,
  animeDirection,
  children,
}: PropsWithChildren<DescriptionProps>) => {
  const device = useDeviceSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {});

  const headTextFontStyle = device === "desktop" ? "text-xl" : "text-lg";
  const detailTextFontStyle = device === "desktop" ? "text-sm" : "text-xs";

  const selectedTechSkills =
    device === "desktop" ? techSkills : [...techSkills.slice(0, 3), "..."];

  return (
    <div
      className="flex flex-col items-start justify-center basis-[50%] backdrop-blur-sm px-4 py-2"
      ref={containerRef}
    >
      <h1 className="flex items-center justify-center w-full mb-4 text-lg">
        <span className="pr-2 mr-4 border-r-2 max-w-[40%] font-bold">
          프로젝트 명{" "}
        </span>
        <span className={`flex-1 text-2xl ${headTextFontStyle}`}>
          {projectName}
        </span>
      </h1>
      <p className="flex flex-col flex-1 mb-4">
        <span className={`${headTextFontStyle} font-semibold mb-2`}>
          프로젝트 소개
        </span>
        <span className={`ml-4 ${detailTextFontStyle}`}>
          {projectDescription}
        </span>
      </p>
      <div className="mb-4">
        <p className="mb-2 font-semibold">사용한 기술 스택</p>
        <ul className={`flex flex-col ml-4 gap-y-1 ${detailTextFontStyle}`}>
          {selectedTechSkills.map((skill, idx) => (
            <li
              key={skill}
              style={{
                transform: isInView
                  ? "none"
                  : `translateX(${
                      animeDirection === "LToR" ? "-300px" : "300px"
                    })`,
                opacity: isInView ? 1 : 0,
                transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) `,
                transitionDelay: `${idx * 0.25 + 1.2}s`,
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div>{children}</div>
      <p>
        <DetailLink projectName={projectName} />
      </p>
    </div>
  );
};
