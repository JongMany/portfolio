import * as THREE from "three";
import { lerp, scalePercent } from "@/utils/lerp";
import { points } from "@/constants/points";

type AnimationTimeline = {
  start: number;
  end: number;
};

const makeAnimationTimeline = (
  start: number,
  end: number,
  stepCount: number
) => {
  const step = (end - start) / stepCount;

  const steps: AnimationTimeline[] = [];
  for (let i = 0; i < stepCount; i++) {
    steps.push({
      start: start + step * i,
      end: start + step * (i + 1),
    });
  }
  return steps;
};

const makeAnimationScript = () => {
  const animationTimeline = makeAnimationTimeline(0.1, 0.9, points.length);
  console.log(animationTimeline);
  const animationScript = animationTimeline.map((timeline, index) => ({
    start: timeline.start,
    end: timeline.end,
    func: (camera: THREE.Camera, scrollProgress: number) => {
      const target = points[index];
      const prevTarget = points[index - 1] || [0, 0, 7];
      const scale = scalePercent(scrollProgress, timeline.start, timeline.end);

      const xPos = lerp(prevTarget[0], target[0], scale);
      const yPos = lerp(prevTarget[1], target[1], scale);
      const zPos = lerp(prevTarget[2] + 1, target[2] + 1, scale);

      camera.position.x = xPos;
      camera.position.y = yPos;
      camera.position.z = zPos;

      camera.lookAt(xPos, yPos, zPos);
    },
  }));

  animationScript.push({
    start: 0,
    end: 0.1,
    func: (camera: THREE.Camera) => {
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
    },
  });
  return animationScript;
};

export const animationScript = makeAnimationScript();

// export const animationScript = [
//   {
//     start: 0,
//     end: 0.1,
//     func: (camera: THREE.Camera) => {
//       camera.position.set(0, 0, 7);
//       camera.lookAt(0, 0, 0);
//     },
//   },
//   {
//     start: animationTimeline[0].start,
//     end: animationTimeline[0].end,
//     func: (camera: THREE.Camera, scrollProgress: number) => {
//       const scale = scalePercent(
//         scrollProgress,
//         animationTimeline[0].start,
//         animationTimeline[0].end
//       );
//       const xPos = lerp(0, 2, scale);
//       const yPos = lerp(0, 6, scale);
//       const zPos = lerp(7, -6, scale);
//       console.log(yPos);
//       camera.position.x = xPos;
//       camera.position.y = yPos;
//       camera.position.z = zPos;

//       camera.lookAt(xPos, yPos, -7);
//       // camera.lookAt(2, 6, -7);
//     },
//   },
//   {
//     start: animationTimeline[1].start,
//     end: animationTimeline[1].end,
//     func: (camera: THREE.Camera, scrollProgress: number) => {
//       const scale = scalePercent(
//         scrollProgress,
//         animationTimeline[1].start,
//         animationTimeline[1].end
//       );
//       const xPos = lerp(2, 4, scale);
//       const yPos = lerp(6, 5, scale);
//       const zPos = lerp(-6, -4, scale);

//       camera.position.x = xPos;
//       camera.position.y = yPos;
//       camera.position.z = zPos;
//       // camera.lookAt(xPos, yPos, zPos);
//       // camera.lookAt(4, 5, -5);
//       // camera.lookAt(0, 0, 0);
//     },
//   },
//   {
//     start: animationTimeline[2].start,
//     end: animationTimeline[2].end,
//     func: (camera: THREE.Camera, scrollProgress: number) => {
//       const scale = scalePercent(
//         scrollProgress,
//         animationTimeline[2].start,
//         animationTimeline[2].end
//       );
//       const xPos = lerp(2, 4, scale);
//       const yPos = lerp(6, 5, scale);
//       const zPos = lerp(-6, -4, scale);

//       camera.position.x = xPos;
//       camera.position.y = yPos;
//       camera.position.z = zPos;
//       // camera.lookAt(xPos, yPos, zPos);
//       // camera.lookAt(4, 5, -5);
//       // camera.lookAt(0, 0, 0);
//     },
//   },
//   {
//     start: animationTimeline[3].start,
//     end: animationTimeline[3].end,
//     func: (camera: THREE.Camera, scrollProgress: number) => {
//       const scale = scalePercent(
//         scrollProgress,
//         animationTimeline[3].start,
//         animationTimeline[3].end
//       );
//       const xPos = lerp(2, 4, scale);
//       const yPos = lerp(6, 5, scale);
//       const zPos = lerp(-6, -4, scale);

//       camera.position.x = xPos;
//       camera.position.y = yPos;
//       camera.position.z = zPos;
//       // camera.lookAt(xPos, yPos, zPos);
//       // camera.lookAt(4, 5, -5);
//       // camera.lookAt(0, 0, 0);
//     },
//   },
//   {
//     start: 0.6,
//     end: 0.8,
//     func: (camera: THREE.Camera, scrollProgress: number) => {
//       // camera.position.z = 25;
//       // camera.position.z = 10;
//       // camera.position.y = lerp(5, 0, scalePercent(scrollProgress, 60, 80));
//       // camera.lookAt(0, 0, 0);
//     },
//   },
//   {
//     start: 0.9,
//     end: 1.01,
//     func: (camera: THREE.Camera, scrollProgress: number) => {
//       // camera.position.z = 30;
//       // camera.position.y = lerp(5, 0, scalePercent(scrollProgress, 80, 100));
//       // camera.lookAt(0, 0, 0);
//     },
//   },
// ];
