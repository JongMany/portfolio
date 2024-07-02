import { PropsWithChildren } from "react";

type Props = {
  height?: string;
};

export default function Content({
  children,
  height = "200vh",
}: PropsWithChildren<Props>) {
  const style = `min-h-[${height}] h-[${height}] w-full p-5`;

  return <section className={`${style}`}>{children}</section>;
}
