import Contents from "@/pages/root/components/Contents";
import { useScrollAnimation } from "@/pages/root/hooks/useScrollAnimation";
import { useRef } from "react";

export default function Main() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(containerRef);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-[100vh] fixed top-0 left-0"
      ></div>
      <Contents />
    </>
  );
}
