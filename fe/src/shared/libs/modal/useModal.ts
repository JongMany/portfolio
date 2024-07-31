import { useModalContext } from "@/shared/ui";
import { useCallback, useId, useState } from "react";

export const useModal = (component: React.FC) => {
  const { modalElements, setModalElements } = useModalContext();
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  const openModal = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    setModalElements((prev) => [...prev, { id, element: component }]);
    // modal이 open되면 배경의 스크롤을 막아야함
    document.body.style.overflow = "hidden";
  }, [component, id, modalElements, setModalElements]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalElements((prev) => prev.filter((modal) => modal.id !== id));
    if (modalElements.length === 0) {
      document.body.style.overflow = "unset";
    }
  }, [id, modalElements, setModalElements]);

  return { openModal, closeModal };
};
