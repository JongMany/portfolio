import { StarScene } from "@/webGl/Star";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Main() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<any>(null);
  useEffect(() => {
    if (containerRef.current) {
      ref.current = new StarScene(
        new THREE.WebGLRenderer({
          antialias: true,
          // alpha: true,
        }),
        containerRef.current
      );
    }
  }, [containerRef.current]);

  return <div ref={containerRef} className="w-full h-[100vh]"></div>;
}
