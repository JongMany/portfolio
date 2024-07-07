import { StarScene } from "@/webGl/StarScene";
import { useScroll } from "framer-motion";
import { MutableRefObject, useEffect, useRef } from "react";
import * as THREE from "three";

export const useScrollAnimation = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  scrollRef: MutableRefObject<HTMLDivElement | null>
) => {
  const sceneRef = useRef<StarScene | null>(null);
  // const { scrollYProgress } = useScroll({
  //   container: containerRef,
  // });
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // useMotionValueEvent(scrollYProgress, "change", (scrollRate) => {
  //   if (!sceneRef.current) return;
  //   sceneRef.current.updateScrollRate(scrollRate);
  // });

  useEffect(() => {
    console.log(document.documentElement.scrollHeight);
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
      console.log(scrollRate);
      sceneRef.current.updateScrollRate(scrollRate);
    });

    return () => {
      console.log("unmount");
      unsubscribe();
    };
  }, [containerRef.current, scrollYProgress]);
};
