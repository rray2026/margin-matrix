import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles, SECTOR_COLORS } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { SentimentRadarItem } from '../../types/industry';

interface SentimentRadarChartProps {
  data: SentimentRadarItem[];
}

export function SentimentRadarChart({ data }: SentimentRadarChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(360, 280);

  const indicators = [
    { name: '动量', max: 100 },
    { name: '估值吸引力', max: 100 },
    { name: '盈利质量', max: 100 },
    { name: '北向资金', max: 100 },
    { name: '市场情绪', max: 100 },
  ];

  const option = {
    backgroundColor: 'transparent',
    title: { text: '行业景气雷达图', ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: data.map(d => d.sector) },
    tooltip: { ...s.baseTooltip, trigger: 'item' },
    radar: {
      indicator: indicators,
      center: ['50%', '55%'],
      radius: '60%',
      axisName: { color: s.textColor, fontSize: 12 },
      splitLine: { lineStyle: { color: isDark ? '#444' : '#ddd' } },
      splitArea: {
        areaStyle: {
          color: isDark
            ? ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)']
            : ['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.03)'],
        },
      },
      axisLine: { lineStyle: { color: isDark ? '#555' : '#ccc' } },
    },
    series: [
      {
        type: 'radar',
        data: data.map((item, idx) => ({
          name: item.sector,
          value: [item.momentum, item.valuation, item.earnings, item.capital, item.sentiment],
          lineStyle: { color: SECTOR_COLORS[idx % SECTOR_COLORS.length], width: 2 },
          itemStyle: { color: SECTOR_COLORS[idx % SECTOR_COLORS.length] },
          areaStyle: { color: `${SECTOR_COLORS[idx % SECTOR_COLORS.length]}22` },
        })),
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height }} notMerge />
    </Card>
  );
}
