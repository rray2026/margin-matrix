export type SectorName =
  | '农林牧渔' | '采掘' | '化工' | '钢铁' | '有色金属'
  | '电子' | '家用电器' | '食品饮料' | '纺织服装' | '轻工制造'
  | '医药生物' | '公用事业' | '交通运输' | '房地产' | '商业贸易'
  | '休闲服务' | '综合' | '建筑材料' | '建筑装饰' | '电气设备'
  | '国防军工' | '计算机' | '传媒' | '通信' | '银行'
  | '非银金融' | '汽车' | '机械设备';

export interface HeatmapCell {
  sector: SectorName;
  period: string;
  return: number;
}

export interface SectorValuation {
  sector: SectorName;
  pe: number;
  pb: number;
}

export interface NorthboundFlow {
  sector: SectorName;
  netInflow: number;
  cumulative30d: number;
}

export interface SentimentRadarItem {
  sector: SectorName;
  momentum: number;
  valuation: number;
  earnings: number;
  capital: number;
  sentiment: number;
}

export interface SectorTrendRow {
  key: string;
  sector: SectorName;
  change1d: number;
  change1w: number;
  change1m: number;
  change3m: number;
  pe: number;
  pb: number;
  northboundFlow: number;
}

export interface IndustryData {
  heatmap: HeatmapCell[];
  valuations: SectorValuation[];
  northboundFlows: NorthboundFlow[];
  sentimentRadar: SentimentRadarItem[];
  sectorTrends: SectorTrendRow[];
}
