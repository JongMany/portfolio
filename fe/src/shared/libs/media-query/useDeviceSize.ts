import { useMediaQuery } from "@/shared/libs/media-query/useMediaQuery";

export function useDeviceSize() {
  const isDesktopQuery = "(min-width: 840px)";
  const isTabletQuery = "(min-width: 768px) and (max-width: 840px)";
  const isMobileQuery = "(max-width: 767px)";

  const isDesktop = useMediaQuery(isDesktopQuery);
  const isTablet = useMediaQuery(isTabletQuery);
  const isMobile = useMediaQuery(isMobileQuery);

  if (isDesktop) {
    return "desktop";
  }

  if (isTablet) {
    return "tablet";
  }

  if (isMobile) {
    return "mobile";
  }

  return "mobile";
}
