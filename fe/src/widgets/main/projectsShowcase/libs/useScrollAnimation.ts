import { StarScene } from "@/shared/constants/webGl/StarScene";
import { useScroll } from "framer-motion";
import { MutableRefObject, useEffect, useRef } from "react";
import * as THREE from "three";

export const useScrollAnimation = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  scrollRef: MutableRefObject<HTMLDivElement | null>
) => {
  const sceneRef = useRef<StarScene | null>(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  useEffect(() => {
    // // && !sceneRef.current
    // if (containerRef.current) {
    //   sceneRef.current = new StarScene(
    //     new THREE.WebGLRenderer({
    //       antialias: true,
    //     }),
    //     containerRef.current
    //   );
    // }
    if (containerRef.current && !sceneRef.current) {
      sceneRef.current = new StarScene(
        new THREE.WebGLRenderer({
          antialias: true,
        }),
        containerRef.current
      );
    }
    const unsubscribe = scrollYProgress.on("change", (scrollRate) => {
      if (!sceneRef.current) return;
      sceneRef.current.updateScrollRate(scrollRate);
    });

    return () => {
      unsubscribe();
    };
  }, [containerRef, scrollYProgress]);

  return {
    sceneRef,
  };
};
