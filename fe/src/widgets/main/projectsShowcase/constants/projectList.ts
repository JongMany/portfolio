import studyLogProjectImg from "@/shared/assets/images/study-log.png";
import studyLogProjectSmallImg from "@/shared/assets/images/study-log-small.png";
import readyToWorkProjectImg from "@/shared/assets/images/ready_to_work.png";
import readyToWorkProjectSmallImg from "@/shared/assets/images/ready_to_work-small.png";
import cryptoProjectImg from "@/shared/assets/images/crypto.png";
import cryptoProjectSmallImg from "@/shared/assets/images/crypto-small.png";
import eyeveProjectImg from "@/shared/assets/images/eyeve.png";
import eyeveProjectSmallImg from "@/shared/assets/images/eyeve-small.png";
import vscodeExtensionProjectImg from "@/shared/assets/images/vscode-extension.png";
import vscodeExtensionProjectSmallImg from "@/shared/assets/images/vscode-extension-small.png";
import portfolioProjectImg from "@/shared/assets/images/portfolio.png";
import portfolioProjectSmallImg from "@/shared/assets/images/portfolio-small.png";

export type AdditionalInfo = {
  type: "DownloadFile";
  content: string;
} & { type: string; content: any };

interface Project {
  image: {
    default: string;
    small: string;
  };
  name: string;
  description: string;
  techSkill: string[];
  additionalInfo?: AdditionalInfo;
}
interface ProjectStyle {
  isAlignReverse: boolean;
  animeDirection: "LToR" | "RToL";
}

const readyToWork: Project & ProjectStyle = {
  image: {
    default: readyToWorkProjectImg,
    small: readyToWorkProjectSmallImg,
  },
  name: "Ready To Work",
  description:
    "엔카의 김상범 대표님과 광운대학교의 IDEA Lab에서 진행한 프로젝트입니다. HR 도메인의 B2B 서비스이며, 문제 해결 방식을 통해 인재 채용을 쉽게 할 수 있도록 도움을 주고자 서비스를 기획하였습니다.",
  techSkill: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Ant Design",
    "Zustand",
    "Tanstack Query",
    "D3.js",
    "...",
  ],
  isAlignReverse: false,
  animeDirection: "LToR",
};

const eyeve: Project & ProjectStyle = {
  image: {
    default: eyeveProjectImg,
    small: eyeveProjectSmallImg,
  },
  name: "Eyeve",
  description:
    "광운대학교 IDEA Lab에서 카메라를 통한 시선 추적을 통해 학생들의 집중도를 분석하는 연구용 서비스를 개발하였습니다. 2024년 춘계 산업공학회의 포스터 세션에 등록되기도 하였습니다.",
  techSkill: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "WebSocket",
    "WebRTC",
    "Zustand",
    "...",
  ],
  isAlignReverse: true,
  animeDirection: "RToL",
  additionalInfo: {
    type: "DownloadFile",
    content: `${import.meta.env.VITE_API_SERVER}/files/eyeve.pdf`,
  },
};

const cryptoChart: Project & ProjectStyle = {
  image: {
    default: cryptoProjectImg,
    small: cryptoProjectSmallImg,
  },
  name: "암호화폐 차트 그래프",
  description:
    "항해 플러스 프론트엔드 1기에서 진행한 프로젝트입니다. 암호화폐 차트 그래프를 보여주는 서비스를 개발하였습니다.",
  techSkill: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "lightweight-charts",
    "date-fns",
    "Tanstack Query",
    "socket.io",
    "Jira",
    "...",
  ],
  isAlignReverse: false,
  animeDirection: "RToL",
};

const studyLog: Project & ProjectStyle = {
  image: {
    default: studyLogProjectImg,
    small: studyLogProjectSmallImg,
  },
  name: "웹 기반 스터디 인증 SNS",
  description:
    "웹 서비스 설계 및 실습 수업에서 진행한 SNS 플랫폼 서비스입니다. 스터디 인증을 통해 사용자들이 서로 인증을 공유하고 소통할 수 있는 서비스를 개발하였습니다.",
  techSkill: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "date-fns",
    "Tanstack Query",
    "...",
  ],
  isAlignReverse: true,
  animeDirection: "LToR",
};

const vscodeExtension: Project & ProjectStyle = {
  image: {
    default: vscodeExtensionProjectImg,
    small: vscodeExtensionProjectSmallImg,
  },
  name: "StudyLog VSCode Extension",
  description:
    "개발자의 개발 시간을 측정해주는 VSCode Extension을 개발하였습니다.",
  techSkill: [
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
  ],
  isAlignReverse: false,
  animeDirection: "RToL",
};

const portfolio: Project & ProjectStyle = {
  image: {
    default: portfolioProjectImg,
    small: portfolioProjectSmallImg,
  },
  name: "포트폴리오 사이트",
  description:
    "제가 개발한 프로젝트들을 소개하는 포트폴리오 사이트입니다. SEO 최적화를 위해 많은 노력을 기울였습니다.",
  techSkill: [
    "React",
    "Node.js",
    "TailwindCSS",
    "three.js",
    "WebGL",
    "MongoDB",
    "...",
  ],
  isAlignReverse: true,
  animeDirection: "LToR",
};

export const projectList: (Project & ProjectStyle)[] = [
  readyToWork,
  eyeve,
  cryptoChart,
  studyLog,
  vscodeExtension,
  portfolio,
];
