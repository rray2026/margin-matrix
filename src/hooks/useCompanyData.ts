import { companiesMap, defaultTicker } from '../mock/companyData';
import type { CompanyData } from '../types/company';

export function useCompanyData(ticker: string): { data: CompanyData; loading: boolean } {
  const data = companiesMap[ticker] ?? companiesMap[defaultTicker];
  return { data, loading: false };
}
