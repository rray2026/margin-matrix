export interface MacroKpi {
  gdpGrowthRate: number;
  cpi: number;
  benchmarkRate: number;
  usdCnyRate: number;
  pmi: number;
}

export interface GdpQuarterlyPoint {
  quarter: string;
  yoy: number;
  qoq: number;
}

export interface CpiPpiPoint {
  month: string;
  cpi: number;
  ppi: number;
}

export interface InterestRatePoint {
  date: string;
  rate1y: number;
  rate5y: number;
  mlf1y: number;
}

export interface ExchangeRatePoint {
  date: string;
  usdCny: number;
  eurCny: number;
}

export interface PmiPoint {
  month: string;
  manufacturing: number;
  nonManufacturing: number;
  composite: number;
}

export interface MacroData {
  kpi: MacroKpi;
  gdpTrend: GdpQuarterlyPoint[];
  cpiPpiTrend: CpiPpiPoint[];
  interestRateCurve: InterestRatePoint[];
  exchangeRate: ExchangeRatePoint[];
  pmi: PmiPoint[];
}
