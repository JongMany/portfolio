import { PropsWithChildren, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

type Props = {
  isAlignReverse?: boolean;
};
export default function Project({
  isAlignReverse = false,
  children,
}: PropsWithChildren<Props>) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {});

  console.log(isInView);

  return (
    <motion.article
      className="flex h-[70vh] items-center justify-center"
      ref={containerRef}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      <div
        className={`flex ${
          isAlignReverse ? "flex-row-reverse" : "flex-row"
        } gap-x-4 w-[70vw]`}
      >
        {children}
      </div>
    </motion.article>
  );
}

Project.ImageContainer = ({
  image,
  alt = "project",
}: {
  image: string;
  alt?: string;
}) => {
  return (
    <div className="basis-[40%] flex flex-col items-center justify-center">
      <img className="w-full" src={image} alt={alt} />
    </div>
  );
};

Project.Description = ({
  projectName,
  projectDescription,
  techSkills,
}: {
  projectName: string;
  projectDescription: string;
  techSkills: string[];
}) => {
  return (
    <div className="flex flex-col items-start justify-center flex-1">
      <h1 className="text-4xl font-semibold">{projectName}</h1>
      <p>{projectDescription}</p>
      <p>사용한 기술 스택</p>
      <ul>
        {techSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <p>
        <Link to="/project">더 자세히 보기</Link>
      </p>
    </div>
  );
};
