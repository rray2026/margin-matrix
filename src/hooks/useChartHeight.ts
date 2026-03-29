import { useIsMobile } from './useIsMobile';

export function useChartHeight(desktop: number, mobile?: number): number {
  const isMobile = useIsMobile();
  return isMobile ? (mobile ?? Math.round(desktop * 0.72)) : desktop;
}
