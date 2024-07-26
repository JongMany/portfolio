import * as THREE from "three";
import { StarScene } from "@/shared/constants/webGl/StarScene";
import { useScroll } from "framer-motion";
import { renderHook } from "@testing-library/react";
import { MutableRefObject } from "react";

import { Mock } from "vitest";
import { useScrollAnimation } from "@/widgets/projects-showcase/hooks/useScrollAnimation";

// Mocking dependencies
vi.mock("three", async () => {
  const originalModule = await vi.importActual("three");
  return {
    ...originalModule,
    WebGLRenderer: vi.fn(() => ({
      setSize: vi.fn(),
      render: vi.fn(),
    })),
  };
});

vi.mock("@/shared/constants/webGl/StarScene", () => {
  return {
    StarScene: vi.fn(() => ({
      updateScrollRate: vi.fn(),
    })),
  };
});

vi.mock("framer-motion", () => {
  return {
    useScroll: vi.fn(),
  };
});

describe("useScrollAnimation", () => {
  let containerRef: MutableRefObject<HTMLDivElement | null>;
  let scrollRef: MutableRefObject<HTMLDivElement | null>;
  let scrollYProgress: { on: Mock };

  beforeEach(() => {
    // 의존성들 초기화해주기
    containerRef = { current: document.createElement("div") };
    scrollRef = { current: document.createElement("div") };

    scrollYProgress = {
      on: vi.fn(),
    };

    (useScroll as Mock).mockReturnValue({
      scrollYProgress,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create StarScene instance and update scroll rate on scroll change", () => {
    renderHook(() => useScrollAnimation(containerRef, scrollRef));

    expect(useScroll).toHaveBeenCalledWith({ container: scrollRef });
    // 첫번째 호출에서 StarScene 생성자가 호출되었는지 확인
    const firstCallArgs = (StarScene as Mock).mock.calls[0];
    expect(THREE.WebGLRenderer).toHaveBeenCalled();
    expect(firstCallArgs[1]).toBe(containerRef.current);
  });

  it("should update scroll rate on scroll change", () => {
    const { result } = renderHook(() =>
      useScrollAnimation(containerRef, scrollRef)
    );
    expect(scrollYProgress.on).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
    const scrollChangeHandler = scrollYProgress.on.mock.calls[0][1];

    const mockScrollRate = 0.5;
    scrollChangeHandler(mockScrollRate);

    expect(
      result.current.sceneRef.current?.updateScrollRate
    ).toHaveBeenCalledWith(mockScrollRate);
  });

  it("should clean up on unmount", () => {
    // Setting
    const unsubscribe = vi.fn();
    scrollYProgress.on.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() =>
      useScrollAnimation(containerRef, scrollRef)
    );

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
