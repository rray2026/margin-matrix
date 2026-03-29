import type { CompanyData } from '../types/company';

function generateCandles(basePrice: number, days: number): CompanyData['stockPriceCandles'] {
  const candles = [];
  let price = basePrice;
  const startDate = new Date('2024-09-01');
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + Math.floor(i * 1.4));
    const change = (Math.random() - 0.48) * price * 0.025;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) * (1 + Math.random() * 0.012);
    const low = Math.min(open, close) * (1 - Math.random() * 0.012);
    candles.push({
      date: d.toISOString().split('T')[0],
      open: +open.toFixed(2),
      close: +close.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      volume: Math.floor(Math.random() * 50000 + 5000),
    });
    price = close;
  }
  return candles;
}

export const companiesMap: Record<string, CompanyData> = {
  '600519': {
    info: { ticker: '600519', name: '贵州茅台', sector: '食品饮料', exchange: 'SSE' },
    kpi: {
      revenue: 1506.0, revenueGrowth: 18.0,
      netProfit: 747.3, netProfitGrowth: 19.5,
      roe: 37.2, debtRatio: 18.4, eps: 59.49,
    },
    revenueProfitTrend: [
      { year: '2020', revenue: 979.9,  netProfit: 466.8, revenueGrowth: 11.1, profitGrowth: 13.3 },
      { year: '2021', revenue: 1061.9, netProfit: 524.6, revenueGrowth: 8.4,  profitGrowth: 12.3 },
      { year: '2022', revenue: 1276.1, netProfit: 627.2, revenueGrowth: 20.2, profitGrowth: 19.5 },
      { year: '2023', revenue: 1476.9, netProfit: 747.3, revenueGrowth: 15.7, profitGrowth: 19.2 },
      { year: '2024E', revenue: 1741.7, netProfit: 889.2, revenueGrowth: 18.0, profitGrowth: 19.0 },
    ],
    valuationComparison: [
      { label: '当前', pe: 22.4, pb: 7.8 },
      { label: '行业均值', pe: 32.4, pb: 6.2 },
      { label: '历史均值', pe: 42.5, pb: 11.3 },
    ],
    stockPriceCandles: generateCandles(1650, 120),
    researchReports: [
      { id: 1, date: '2025-03-20', title: '茅台2024年报点评：稳健增长，直销占比持续提升', institution: '中信证券', analyst: '陈彦', rating: '买入', targetPrice: 2000 },
      { id: 2, date: '2025-03-15', title: '贵州茅台：量价齐升逻辑不变，估值具备吸引力', institution: '华泰证券', analyst: '刘华峰', rating: '增持', targetPrice: 1900 },
      { id: 3, date: '2025-03-10', title: '茅台深度研究：核心竞争力分析', institution: '国泰君安', analyst: '訾猛', rating: '买入', targetPrice: 2100 },
      { id: 4, date: '2025-02-28', title: '春节旺季动销良好，1935系列表现超预期', institution: '招商证券', analyst: '朱卫华', rating: '买入', targetPrice: 1950 },
      { id: 5, date: '2025-02-20', title: '茅台非标产品价格上涨，渠道库存健康', institution: '广发证券', analyst: '沈涛', rating: '增持', targetPrice: 1850 },
      { id: 6, date: '2025-02-10', title: '2025年业绩有望实现15%-20%增长', institution: '海通证券', analyst: '姚佩', rating: '买入', targetPrice: 2050 },
    ],
  },

  '000858': {
    info: { ticker: '000858', name: '五粮液', sector: '食品饮料', exchange: 'SZSE' },
    kpi: {
      revenue: 832.7, revenueGrowth: 12.1,
      netProfit: 302.1, netProfitGrowth: 14.5,
      roe: 29.8, debtRatio: 22.1, eps: 7.78,
    },
    revenueProfitTrend: [
      { year: '2020', revenue: 573.6,  netProfit: 195.9, revenueGrowth: 14.4, profitGrowth: 14.9 },
      { year: '2021', revenue: 662.1,  netProfit: 233.1, revenueGrowth: 15.4, profitGrowth: 19.0 },
      { year: '2022', revenue: 739.7,  netProfit: 263.6, revenueGrowth: 11.7, profitGrowth: 13.1 },
      { year: '2023', revenue: 832.7,  netProfit: 302.1, revenueGrowth: 12.6, profitGrowth: 14.6 },
      { year: '2024E', revenue: 933.6, netProfit: 344.4, revenueGrowth: 12.1, profitGrowth: 14.0 },
    ],
    valuationComparison: [
      { label: '当前', pe: 18.3, pb: 5.4 },
      { label: '行业均值', pe: 32.4, pb: 6.2 },
      { label: '历史均值', pe: 28.5, pb: 7.8 },
    ],
    stockPriceCandles: generateCandles(142, 120),
    researchReports: [
      { id: 1, date: '2025-03-18', title: '五粮液2024年业绩符合预期，高端化进程稳步推进', institution: '中信建投', analyst: '赵令伊', rating: '买入', targetPrice: 175 },
      { id: 2, date: '2025-03-12', title: '春节旺季销售回暖，Q1开门红可期', institution: '中信证券', analyst: '陈彦', rating: '增持', targetPrice: 168 },
      { id: 3, date: '2025-02-25', title: '五粮液渠道扁平化改革成效显现', institution: '国泰君安', analyst: '訾猛', rating: '买入', targetPrice: 180 },
      { id: 4, date: '2025-02-15', title: '五粮液品牌力持续强化，估值具备安全边际', institution: '海通证券', analyst: '姚佩', rating: '买入', targetPrice: 172 },
    ],
  },

  '601318': {
    info: { ticker: '601318', name: '中国平安', sector: '非银金融', exchange: 'SSE' },
    kpi: {
      revenue: 9136.5, revenueGrowth: 5.3,
      netProfit: 1264.7, netProfitGrowth: 22.8,
      roe: 14.2, debtRatio: 89.2, eps: 6.91,
    },
    revenueProfitTrend: [
      { year: '2020', revenue: 7924.0, netProfit: 1430.8, revenueGrowth: -2.7, profitGrowth: -4.2 },
      { year: '2021', revenue: 8358.2, netProfit: 1017.4, revenueGrowth: 5.5, profitGrowth: -28.9 },
      { year: '2022', revenue: 8065.7, netProfit: 837.7, revenueGrowth: -3.5, profitGrowth: -17.6 },
      { year: '2023', revenue: 9136.5, netProfit: 1264.7, revenueGrowth: 13.3, profitGrowth: 51.0 },
      { year: '2024E', revenue: 9618.7, netProfit: 1376.4, revenueGrowth: 5.3, profitGrowth: 8.8 },
    ],
    valuationComparison: [
      { label: '当前', pe: 9.8, pb: 1.2 },
      { label: '行业均值', pe: 14.3, pb: 1.4 },
      { label: '历史均值', pe: 16.8, pb: 2.1 },
    ],
    stockPriceCandles: generateCandles(44, 120),
    researchReports: [
      { id: 1, date: '2025-03-22', title: '中国平安2024年报超预期，寿险NBV高增长', institution: '华泰证券', analyst: '李健', rating: '买入', targetPrice: 58 },
      { id: 2, date: '2025-03-16', title: '平安寿险转型成效显现，代理人产能大幅提升', institution: '广发证券', analyst: '曹恒乾', rating: '买入', targetPrice: 55 },
      { id: 3, date: '2025-03-08', title: '估值低位，高股息率具备配置价值', institution: '中信证券', analyst: '邵子钦', rating: '增持', targetPrice: 52 },
    ],
  },

  '600036': {
    info: { ticker: '600036', name: '招商银行', sector: '银行', exchange: 'SSE' },
    kpi: {
      revenue: 3391.1, revenueGrowth: 1.2,
      netProfit: 1483.9, netProfitGrowth: 6.2,
      roe: 16.2, debtRatio: 93.4, eps: 5.89,
    },
    revenueProfitTrend: [
      { year: '2020', revenue: 2904.8, netProfit: 973.4, revenueGrowth: 7.7, profitGrowth: 4.8 },
      { year: '2021', revenue: 3312.5, netProfit: 1199.2, revenueGrowth: 14.0, profitGrowth: 23.2 },
      { year: '2022', revenue: 3447.8, netProfit: 1380.1, revenueGrowth: 4.1, profitGrowth: 15.1 },
      { year: '2023', revenue: 3391.1, netProfit: 1466.0, revenueGrowth: -1.6, profitGrowth: 6.2 },
      { year: '2024E', revenue: 3431.9, netProfit: 1483.9, revenueGrowth: 1.2, profitGrowth: 1.2 },
    ],
    valuationComparison: [
      { label: '当前', pe: 7.1, pb: 1.1 },
      { label: '行业均值', pe: 6.2, pb: 0.7 },
      { label: '历史均值', pe: 12.3, pb: 1.8 },
    ],
    stockPriceCandles: generateCandles(36, 120),
    researchReports: [
      { id: 1, date: '2025-03-21', title: '招商银行2024年业绩稳健，零售之王优势凸显', institution: '中金公司', analyst: '林英奇', rating: '增持', targetPrice: 42 },
      { id: 2, date: '2025-03-14', title: '招行不良率保持低位，资产质量领先同业', institution: '中信证券', analyst: '肖斐斐', rating: '买入', targetPrice: 45 },
      { id: 3, date: '2025-03-05', title: '高股息+零售优势，估值修复空间大', institution: '华泰证券', analyst: '沈娟', rating: '买入', targetPrice: 44 },
    ],
  },

  '300750': {
    info: { ticker: '300750', name: '宁德时代', sector: '电气设备', exchange: 'SZSE' },
    kpi: {
      revenue: 4009.0, revenueGrowth: 22.0,
      netProfit: 441.2, netProfitGrowth: 15.8,
      roe: 18.4, debtRatio: 56.7, eps: 10.48,
    },
    revenueProfitTrend: [
      { year: '2020', revenue: 503.2,  netProfit: 55.8,  revenueGrowth: 9.9,  profitGrowth: 22.4 },
      { year: '2021', revenue: 1303.6, netProfit: 159.3, revenueGrowth: 159.1, profitGrowth: 185.3 },
      { year: '2022', revenue: 3285.9, netProfit: 307.3, revenueGrowth: 152.1, profitGrowth: 92.9 },
      { year: '2023', revenue: 4009.0, netProfit: 441.2, revenueGrowth: 22.0, profitGrowth: 43.6 },
      { year: '2024E', revenue: 4890.8, netProfit: 509.2, revenueGrowth: 22.0, profitGrowth: 15.4 },
    ],
    valuationComparison: [
      { label: '当前', pe: 22.5, pb: 3.8 },
      { label: '行业均值', pe: 28.7, pb: 3.4 },
      { label: '历史均值', pe: 65.4, pb: 9.2 },
    ],
    stockPriceCandles: generateCandles(220, 120),
    researchReports: [
      { id: 1, date: '2025-03-23', title: '宁德时代：技术壁垒稳固，海外扩张提速', institution: '中信证券', analyst: '敖翀', rating: '买入', targetPrice: 280 },
      { id: 2, date: '2025-03-17', title: '麒麟电池出货放量，固态电池2025年实现量产', institution: '招商证券', analyst: '游家训', rating: '买入', targetPrice: 265 },
      { id: 3, date: '2025-03-09', title: '龙头地位稳固，成本优化驱动盈利提升', institution: '国泰君安', analyst: '姜明', rating: '增持', targetPrice: 250 },
      { id: 4, date: '2025-02-26', title: '欧洲工厂产能释放，海外份额有望持续扩大', institution: '广发证券', analyst: '陈子坤', rating: '买入', targetPrice: 270 },
    ],
  },
};

export const companyList = Object.values(companiesMap).map(c => ({
  value: c.info.ticker,
  label: `${c.info.name} (${c.info.ticker})`,
}));

export const defaultTicker = '600519';
