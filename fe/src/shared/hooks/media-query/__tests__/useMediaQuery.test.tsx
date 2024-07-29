import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "@/shared/hooks/media-query/useMediaQuery";

describe("useMediaQuery", () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    // Restore original window.matchMedia after each test
    window.matchMedia = originalMatchMedia;
  });

  const createMockMatchMedia = (matches: boolean) => {
    const addListener = vi.fn();
    const removeListener = vi.fn();
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();

    return vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener,
      removeListener,
      addEventListener,
      removeEventListener,
      dispatchEvent: vi.fn(),
    })) as unknown as (query: string) => MediaQueryList;
  };

  it("should return true for desktop query", () => {
    window.matchMedia = createMockMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
    expect(result.current).toBe(true);
  });

  it("should return false for mobile query", () => {
    window.matchMedia = createMockMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery("(max-width: 767px)"));
    expect(result.current).toBe(false);
  });

  it("should update when media query changes", () => {
    const matchMediaListeners: { [key: string]: () => void } = {};
    window.matchMedia = vi.fn().mockImplementation((query: string) => {
      const listeners: Array<() => void> = [];
      return {
        matches: query === "(min-width: 1024px)",
        media: query,
        onchange: null,
        addListener: (listener: () => void) => {
          matchMediaListeners[query] = listener;
        },
        removeListener: vi.fn(),
        addEventListener: (event: string, listener: () => void) => {
          matchMediaListeners[query] = listener;
        },
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }) as unknown as (query: string) => MediaQueryList;

    const { result, rerender } = renderHook(() =>
      useMediaQuery("(min-width: 1024px)")
    );

    expect(result.current).toBe(true);

    act(() => {
      window.matchMedia = createMockMatchMedia(false);
      if (matchMediaListeners["(min-width: 1024px)"]) {
        matchMediaListeners["(min-width: 1024px)"]();
      }
    });

    rerender();
    expect(result.current).toBe(false);
  });
});
