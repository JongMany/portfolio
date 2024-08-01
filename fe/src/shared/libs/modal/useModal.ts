import { useModalContext } from "@/shared/ui";
import { useCallback, useId, useState } from "react";
export interface UseModalOptions {
  onOpen?: () => void;
  onClose?: () => void;
}
export const useModal = (component: React.FC, options?: UseModalOptions) => {
  const { modalElements, setModalElements } = useModalContext();
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  const openModal = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    setModalElements((prev) => [...prev, { id, element: component }]);
    // modal이 open되면 배경의 스크롤을 막아야함
    document.body.style.overflow = "hidden";
    if (options?.onOpen) {
      options.onOpen();
    }
  }, [component, id, modalElements, setModalElements, options]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalElements((prev) => prev.filter((modal) => modal.id !== id));
    if (modalElements.length === 0) {
      document.body.style.overflow = "unset";
    }
    if (options?.onClose) {
      options.onClose();
    }
  }, [id, modalElements, setModalElements, options]);

  return { openModal, closeModal };
};
