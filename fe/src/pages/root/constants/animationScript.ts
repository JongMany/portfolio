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

export const animationTimeline = makeAnimationTimeline(
  0.05,
  0.85,
  points.length
);

const makeAnimationScript = () => {
  // const animationTimeline = makeAnimationTimeline(0.1, 0.9, points.length);
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
      // console.log(zPos);

      camera.lookAt(xPos, yPos, zPos);
    },
  }));

  animationScript.push({
    start: 0,
    end: 0.05,
    func: (camera: THREE.Camera) => {
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
    },
  });
  return animationScript;
};

export const animationScript = makeAnimationScript();
