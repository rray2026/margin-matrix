import { industryData } from '../mock/industryData';
import type { IndustryData } from '../types/industry';

export function useIndustryData(): { data: IndustryData; loading: boolean } {
  return { data: industryData, loading: false };
}
