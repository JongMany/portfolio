import { PropsWithChildren } from "react";

type Props = {
  isAlignReverse?: boolean;
};
export default function Project({
  isAlignReverse = false,
  children,
}: PropsWithChildren<Props>) {
  return (
    <article className="flex">
      <div
        className={`flex ${
          isAlignReverse ? "flex-row-reverse" : "flex-row"
        } gap-x-4 w-[70vw] h-[70vh]`}
      >
        {children}
      </div>
    </article>
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
    </div>
  );
};
