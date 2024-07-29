import { useMediaQuery } from "@/shared/hooks/media-query/useMediaQuery";

export function useDeviceSize() {
  const isDesktopQuery = "(min-width: 1024px)";
  const isTabletQuery = "(min-width: 768px) and (max-width: 1023px)";
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
