import { StarScene } from "@/webGl/Star";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const useScrollAnimation = (
  containerRef: MutableRefObject<HTMLDivElement | null>
) => {
  const sceneRef = useRef<StarScene | null>(null);
  const { scrollYProgress } = useScroll({});

  useMotionValueEvent(scrollYProgress, "change", (scrollRate) => {
    if (!sceneRef.current) return;
    sceneRef.current.updateScrollRate(scrollRate);
  });

  useEffect(() => {
    if (containerRef.current) {
      sceneRef.current = new StarScene(
        new THREE.WebGLRenderer({
          antialias: true,
          // alpha: true,
        }),
        containerRef.current
      );
    }
  }, [containerRef.current]);
};
