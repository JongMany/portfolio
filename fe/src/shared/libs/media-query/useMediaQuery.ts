import { useCallback, useEffect, useState } from "react";

// 외부에서 주입 가능한 matchMedia 함수
const defaultMatchMedia = (query: string) => window.matchMedia(query);

// getMatches 함수 분리
const getMatches = (
  query: string,
  matchMedia: (query: string) => MediaQueryList
): boolean => {
  if (typeof window !== "undefined") {
    return matchMedia(query).matches;
  }
  return false;
};

export function useMediaQuery(
  query: string,
  matchMedia: (query: string) => MediaQueryList = defaultMatchMedia
): boolean {
  const [matches, setMatches] = useState(() => getMatches(query, matchMedia));

  const changeMediaQueryHandler = useCallback(() => {
    setMatches(getMatches(query, matchMedia));
  }, [query, matchMedia]);

  useEffect(() => {
    const matchMediaInstance = matchMedia(query);

    if (matchMediaInstance.addListener) {
      matchMediaInstance.addListener(changeMediaQueryHandler);
    } else {
      matchMediaInstance.addEventListener("change", changeMediaQueryHandler);
    }

    return () => {
      if (matchMediaInstance.removeListener) {
        matchMediaInstance.removeListener(changeMediaQueryHandler);
      } else {
        matchMediaInstance.removeEventListener(
          "change",
          changeMediaQueryHandler
        );
      }
    };
  }, [query, changeMediaQueryHandler, matchMedia]);

  return matches;
}
