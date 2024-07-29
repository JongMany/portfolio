// import MainPageWithLoading from "@/pages/main/ui/MainPageWithLoading";
import { DetailHelmet } from "@/shared/ui/meta/DetailHelmet";
import { withLoading } from "./withLoading/withLoading";
import ProjectsShowCase from "@/widgets/main/projects-showcase/ui/ProjectsShowCase";
const ProjectsShowCaseWithLoading = withLoading(ProjectsShowCase);

export default function MainPage() {
  return (
    <>
      <DetailHelmet
        title="메인"
        pageTitle="방구석 코딩쟁이의 코딩 일대기"
        url={import.meta.env.VITE_BASE_URL + "/"}
        shortDesc="방구석 코딩쟁이의 포트폴리오를 소개합니다."
      />
      <ProjectsShowCaseWithLoading />
      {/* <MainPageWithLoading /> */}
    </>
  );
}
