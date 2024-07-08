import { lerp, scalePercent } from "@/utils/lerp";

describe("lerp", () => {
  it("should interpolate between two numbers", () => {
    expect(lerp(20, 60, 0.5)).toBe(40);
    expect(lerp(-20, 60, 0.5)).toBe(20);
    expect(lerp(20, 60, 0.75)).toBe(50);
    expect(lerp(-20, -10, 0.1)).toBe(-19);
  });
});

describe("scalePercent", () => {
  it("should scale a percentage between two numbers", () => {
    expect(scalePercent(50, 0, 100)).toBe(0.5);
    expect(scalePercent(75, 50, 100)).toBe(0.5);
  });
});
