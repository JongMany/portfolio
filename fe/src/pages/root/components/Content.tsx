import { PropsWithChildren } from "react";

type Props = {
  height?: string;
};

export default function Content({
  children,
  height = "100vh",
}: PropsWithChildren<Props>) {
  const style = `w-full p-5 flex flex-col justify-center items-center text-white`;

  return (
    <section
      style={{
        height: height,
        minHeight: height,
      }}
      className={`${style}`}
    >
      {children}
    </section>
  );
}
