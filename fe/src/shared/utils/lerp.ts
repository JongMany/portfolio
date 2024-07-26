// https://sbcode.net/threejs/animate-on-scroll/

/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
export function lerp(min: number, max: number, ratio: number): number {
  // return (1 - ratio) * min + ratio * max;
  // return (1 - ratio) * min + ratio * max;
  return (max - min) * ratio + min;
}

// Used to fit the lerps to start and end at specific scrolling percentages
export function scalePercent(
  scrollPercent: number,
  start: number,
  end: number
) {
  return (scrollPercent - start) / (end - start);
}
