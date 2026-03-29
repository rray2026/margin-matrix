export interface CompanyInfo {
  ticker: string;
  name: string;
  sector: string;
  exchange: 'SSE' | 'SZSE';
}

export interface CompanyKpi {
  revenue: number;
  revenueGrowth: number;
  netProfit: number;
  netProfitGrowth: number;
  roe: number;
  debtRatio: number;
  eps: number;
}

export interface RevenueProfitPoint {
  year: string;
  revenue: number;
  netProfit: number;
  revenueGrowth: number;
  profitGrowth: number;
}

export interface ValuationComparison {
  label: string;
  pe: number;
  pb: number;
}

export interface CandlestickPoint {
  date: string;
  open: number;
  close: number;
  low: number;
  high: number;
  volume: number;
}

export interface ResearchReport {
  id: number;
  date: string;
  title: string;
  institution: string;
  analyst: string;
  rating: '买入' | '增持' | '中性' | '减持' | '卖出';
  targetPrice: number;
}

export interface CompanyData {
  info: CompanyInfo;
  kpi: CompanyKpi;
  revenueProfitTrend: RevenueProfitPoint[];
  valuationComparison: ValuationComparison[];
  stockPriceCandles: CandlestickPoint[];
  researchReports: ResearchReport[];
}
