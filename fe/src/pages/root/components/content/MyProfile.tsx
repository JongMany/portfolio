import { useInView } from "framer-motion";
import React, { useRef } from "react";

export default function MyProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "10px" });

  return (
    <article
      ref={ref}
      style={{
        transform: isInView ? "none" : `translateY(${isInView ? 0 : 200}px)`,
        opacity: isInView ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s`,
      }}
    >
      <div></div>
      <div>
        <h1>안녕하세요</h1>
      </div>
    </article>
  );
}
