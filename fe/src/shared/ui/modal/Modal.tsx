import { PropsWithChildren } from "react";
type Props = {
  defaultButton?: boolean;
};
export function Modal({ children }: PropsWithChildren<Props>) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid #000",
      }}
    >
      {children}
    </div>
  );
}
