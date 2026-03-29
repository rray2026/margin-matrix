import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { HeatmapCell, SectorName } from '../../types/industry';

const SECTORS: SectorName[] = [
  '农林牧渔', '采掘', '化工', '钢铁', '有色金属',
  '电子', '家用电器', '食品饮料', '纺织服装', '轻工制造',
  '医药生物', '公用事业', '交通运输', '房地产', '商业贸易',
  '休闲服务', '综合', '建筑材料', '建筑装饰', '电气设备',
  '国防军工', '计算机', '传媒', '通信', '银行',
  '非银金融', '汽车', '机械设备',
];

const PERIODS = ['近1周', '近1月', '近3月', '近6月', '近1年'];

interface IndustryHeatmapProps {
  data: HeatmapCell[];
}

export function IndustryHeatmap({ data }: IndustryHeatmapProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(520, 400);

  const heatmapData = data.map(cell => [
    PERIODS.indexOf(cell.period),
    SECTORS.indexOf(cell.sector),
    +cell.return.toFixed(2),
  ]);

  const option = {
    backgroundColor: 'transparent',
    title: { text: '行业涨跌幅热力图 (%)', ...s.baseTitle },
    tooltip: {
      ...s.baseTooltip,
      formatter: (params: { value: number[] }) => {
        const [periodIdx, sectorIdx, val] = params.value;
        return `${SECTORS[sectorIdx]} · ${PERIODS[periodIdx]}<br/>涨跌幅: ${val > 0 ? '+' : ''}${val}%`;
      },
    },
    grid: { ...s.baseGrid, top: 50, bottom: 30, left: 90, right: 120 },
    xAxis: {
      type: 'category',
      data: PERIODS,
      axisLabel: s.axisLabelStyle,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: SECTORS,
      axisLabel: { ...s.axisLabelStyle, fontSize: 11 },
      splitArea: { show: true },
    },
    visualMap: {
      min: -25,
      max: 25,
      calculable: true,
      orient: 'vertical',
      right: 10,
      top: 'center',
      inRange: {
        color: ['#52c41a', '#f0f0f0', '#f5222d'],
      },
      textStyle: { color: s.textColor },
    },
    series: [
      {
        type: 'heatmap',
        data: heatmapData,
        label: { show: true, fontSize: 9, formatter: (p: { value: number[] }) => `${p.value[2]}%` },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height }} notMerge />
    </Card>
  );
}
