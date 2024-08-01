import { ProjectDetailModal } from "@/entities/projects/ui/modal/ProjectDetailModal";
import { useDeviceSize, useModal } from "@/shared/libs";
import { Link } from "react-router-dom";

type Props = {
  projectName: string;
};
export const DetailLink = ({ projectName }: Props) => {
  const device = useDeviceSize();
  const { closeModal, openModal } = useModal(
    () => {
      return (
        <ProjectDetailModal closeModal={closeModal} projectName={projectName} />
      );
    },
    {
      onOpen: () => {
        const container = document.querySelector(
          '[data-name="project-showcase"]'
        );
        if (container) {
          (container as HTMLElement).style.overflow = "hidden";
        }
      },
      onClose: () => {
        const container = document.querySelector(
          '[data-name="project-showcase"]'
        );
        if (container) {
          // scroll-snap 을 위해 auto로 변경
          (container as HTMLElement).style.overflow = "auto";
        }
      },
    }
  );
  // PC 환경이 아닌 경우는 URL로 이동
  if (device !== "desktop") {
    const encodedProjectName = encodeURIComponent(projectName);
    return <Link to={`/project/${encodedProjectName}`}>더 자세히 보기</Link>;
  }

  // PC 환경에서는 모달로 띄움
  return <button onClick={openModal}>더 자세히 보기</button>;
};
