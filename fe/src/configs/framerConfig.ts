type FramerMotionConfig = {
  type: "spring" | "keyframes" | "decay" | "tween" | "inertia" | undefined;
  mass: number;
  stiffness: number;
  damping: number;
  restDelta: number;
};

export const framerMotionConfig: FramerMotionConfig = {
  type: "spring",
  mass: 5,
  stiffness: 500,
  damping: 50,
  restDelta: 0.0001,
};
