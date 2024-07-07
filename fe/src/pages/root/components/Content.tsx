import { PropsWithChildren } from "react";

type Props = {
  height?: string;
};

export default function Content({
  children,
  height = "100vh",
}: PropsWithChildren<Props>) {
  const style = `w-full p-5 flex flex-col justify-center items-center text-white snap-start`;

  return (
    <section
      style={{
        height: height,
        minHeight: height,
        scrollSnapAlign: "start",
        flex: "0 0 auto",
      }}
      className={`${style}`}
    >
      {children}
    </section>
  );
}
