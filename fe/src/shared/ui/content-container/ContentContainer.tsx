import type { PropsWithChildren } from "react";

type Props = {
  height?: string;
  scrollSnapAlign?: "start" | "center" | "end";
  ExtraContent?: JSX.Element;
};

export default function ContentContainer({
  children,
  ExtraContent,
  height = "100vh",
  scrollSnapAlign = "start",
}: PropsWithChildren<Props>) {
  const style = `w-full p-5 flex flex-col justify-center items-center text-white snap-start`;

  return (
    <section
      style={{
        height: height,
        minHeight: height,
        scrollSnapAlign,
        flex: "0 0 auto",
      }}
      className={`${style}`}
    >
      {children}
      {ExtraContent}
    </section>
  );
}
