import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

// https://github.com/the-NDD/Gomterview-FE/blob/main/packages/useModal/src/modalProvider.tsx
// https://yoonhaemin.com/tag/experience/react-modal/
interface ModalElement {
  id: string;
  element: React.FC;
}

interface ModalContext {
  modalElements: ModalElement[];
  setModalElements: React.Dispatch<React.SetStateAction<ModalElement[]>>;
}

const ModalContext = createContext<ModalContext>({
  modalElements: [],
  setModalElements: () => {},
});

const ModalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [modalElements, setModalElements] = useState<ModalElement[]>([]);
  return (
    <ModalContext.Provider value={{ modalElements, setModalElements }}>
      {children}
      {modalElements.map(({ id, element }) => {
        return <ModalComponent key={id} component={element} />;
      })}
    </ModalContext.Provider>
  );
};

const ModalComponent = ({ component, ...rest }: { component: React.FC }) => {
  return component({ ...rest });
};

export const useModalContext = () => {
  if (!ModalContext) {
    throw new Error("Cannot find Modal Context");
  }
  return useContext(ModalContext);
};

export default ModalProvider;
