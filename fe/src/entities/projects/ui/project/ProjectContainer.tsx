import { useDeviceSize } from "@/shared/libs";
import { PropsWithChildren, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Description } from "@/entities/projects/ui/project/Description";

import { getAlignStyle } from "@/entities/projects/utils/getAlignStyle";
import { ImageContainer } from "@/entities/projects/ui/project/ImageContainer";

type Props = {
  isAlignReverse?: boolean;
};

export default function ProjectContainer({
  isAlignReverse,
  children,
}: PropsWithChildren<Props>) {
  const device = useDeviceSize();

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {});

  const rowAlign = device === "desktop" ? "row" : "col";
  const alignStyle = getAlignStyle(rowAlign, isAlignReverse);

  return (
    <motion.article
      className="flex h-[70vh] items-center justify-center"
      ref={containerRef}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
      }}
    >
      <div className={`flex ${alignStyle} gap-x-4 w-[85vw]`}>{children}</div>
    </motion.article>
  );
}

ProjectContainer.ImageContainer = ImageContainer;
ProjectContainer.Description = Description;
