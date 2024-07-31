import { projectOutlineList } from "@/shared/constants";
import { Modal } from "@/shared/ui";

type Props = {
  closeModal: () => void;
  projectName: string;
};

export const ProjectDetailModal = ({ closeModal, projectName }: Props) => {
  const project = projectOutlineList.find(
    (project) => project.name === projectName
  );

  return (
    <Modal>
      <div className="w-[700px] h-[600px] backdrop-blur-[60px] text-white">
        <div className="flex justify-end px-4 py-1">
          <button onClick={closeModal}>닫기</button>
        </div>
        <section>
          <h1 className="text-2xl text-center">{project?.name}</h1>
          <article className="overflow-x-scroll scrollbar-hide"></article>
        </section>
      </div>
    </Modal>
  );
};
