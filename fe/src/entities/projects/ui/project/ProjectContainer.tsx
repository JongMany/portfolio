import { useDeviceSize } from "@/shared/libs";
import { PropsWithChildren, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
type Props = {
  isAlignReverse?: boolean;
};
export default function ProjectContainer({
  isAlignReverse,
  children,
}: PropsWithChildren<Props>) {
  const device = useDeviceSize();

  const rowAlign = device === "desktop" ? "row" : "col";
  const alignStyle = getAlignStyle(rowAlign, isAlignReverse);

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {});

  return (
    <motion.article
      className="flex h-[70vh] items-center justify-center"
      ref={containerRef}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
        // transitionDelay: "0.5s",
      }}
    >
      <div className={`flex ${alignStyle} gap-x-4 w-[85vw]`}>{children}</div>
    </motion.article>
  );
}

function getAlignStyle(alignDirection: "row" | "col", alignReverse?: boolean) {
  if (alignDirection === "col") {
    return "flex-col";
  }

  if (alignReverse) {
    return "flex-row-reverse";
  }
  return "flex-row";
}

const ImageContainer = ({
  image,
  alt = "project",
}: {
  image: string;
  alt?: string;
}) => {
  const device = useDeviceSize();
  const imageStyle = device === "desktop" ? "w-full" : "w-[80vw] h-[40vh]";
  return (
    <div className="basis-[50%] flex flex-col items-center justify-center">
      <img className={`${imageStyle}`} src={image} alt={alt} />
    </div>
  );
};

type DescriptionProps = {
  projectName: string;
  projectDescription: string;
  techSkills: string[];
  animeDirection: "LToR" | "RToL";
};
const Description = ({
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

  return (
    <div
      className="flex flex-col items-start justify-center basis-[50%] backdrop-blur-sm px-4 py-2"
      ref={containerRef}
    >
      <h1 className="flex items-center justify-center w-full mb-4 text-2xl">
        <span className="pr-4 mr-4 border-r-2 max-w-[40%]">프로젝트 명 </span>
        <span className={`flex-1 text-2xl ${headTextFontStyle}`}>
          {projectName}
        </span>
      </h1>
      <p className="flex flex-col flex-1 mb-4">
        <span className="text-xl font-semibold">프로젝트 소개</span>
        <span className={`ml-4 ${detailTextFontStyle}`}>
          {projectDescription}
        </span>
      </p>
      <div className="mb-4">
        <p className="mb-2 font-semibold">사용한 기술 스택</p>
        <ul className={`flex flex-col ml-4 gap-y-1 ${detailTextFontStyle}`}>
          {techSkills.map((skill, idx) => (
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
      <p>
        <Link to="/project">더 자세히 보기</Link>
        {children}
      </p>
    </div>
  );
};
ProjectContainer.ImageContainer = ImageContainer;
ProjectContainer.Description = Description;
