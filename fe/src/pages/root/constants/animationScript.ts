// import { scalePercent } from "@/webGl/utils/lerp";
import * as THREE from "three";
// import { lerp } from "three/src/math/MathUtils.js";

export const animationScript = [
  // {
  //   start: 0,
  //   end: 1.01,
  //   func: (camera: THREE.Camera) => {
  //     // camera.position.z = 5;
  //   },
  // },
  {
    start: 0,
    end: 0.2,
    func: (camera: THREE.Camera) => {
      camera.position.set(0, 1, 2);
    },
  },
  {
    start: 0.2,
    end: 0.4,
    func: (camera: THREE.Camera) => {
      camera.position.set(0, 0, 0);
    },
  },
  {
    start: 0.4,
    end: 0.6,
    func: (camera: THREE.Camera) => {
      // camera.position.x = lerp(0, 5, scalePercent(60, 80));
      // camera.position.y = lerp(1, 5, scalePercent(60, 80));
      camera.lookAt(0, 0, 0);
    },
  },
  {
    start: 0.6,
    end: 0.8,
    func: (camera: THREE.Camera) => {
      // camera.position.z = 25;
      // camera.lookAt(0, 0, 0);
    },
  },
  {
    start: 0.8,
    end: 1.01,
    func: (camera: THREE.Camera) => {
      // camera.position.z = 30;
      // camera.lookAt(0, 0, 0);
    },
  },
];
