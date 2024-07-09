import { useEffect, useRef } from "react";
import * as THREE from "three";

import { BigBangScene } from "@/webGl/bigbang/BigBangScene";

export default function LoadAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigbangRef = useRef<BigBangScene | null>(null);

  useEffect(() => {
    if (containerRef.current && !bigbangRef.current) {
      bigbangRef.current = new BigBangScene(
        new THREE.WebGLRenderer({
          antialias: true,
        }),
        containerRef.current,
        false
      );
    }
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      ref={containerRef}
    ></div>
  );
}
