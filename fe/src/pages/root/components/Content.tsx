import { PropsWithChildren } from "react";

export default function Content({ children }: PropsWithChildren) {
  return <section className="min-h-[100vh] w-full p-5">{children}</section>;
}
