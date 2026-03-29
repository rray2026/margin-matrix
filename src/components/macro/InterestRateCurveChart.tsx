import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import type { InterestRatePoint } from '../../types/macro';

interface InterestRateCurveChartProps {
  data: InterestRatePoint[];
}

export function InterestRateCurveChart({ data }: InterestRateCurveChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);

  const option = {
    backgroundColor: 'transparent',
    title: { text: '利率走势', ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['1年期LPR', '5年期LPR', '1年期MLF'] },
    tooltip: { ...s.baseTooltip, trigger: 'axis' },
    grid: { ...s.baseGrid, top: 60 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.date),
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      axisLabel: { ...s.axisLabelStyle, rotate: 30 },
      splitLine: { lineStyle: s.splitLineStyle },
    },
    yAxis: {
      type: 'value',
      name: '%',
      min: 1.5,
      max: 5.0,
      nameTextStyle: { color: s.textColor },
      axisLabel: s.axisLabelStyle,
      splitLine: { lineStyle: s.splitLineStyle },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: '1年期LPR',
        type: 'line',
        data: data.map(d => d.rate1y),
        step: 'end',
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#4096ff', width: 2 },
        itemStyle: { color: '#4096ff' },
      },
      {
        name: '5年期LPR',
        type: 'line',
        data: data.map(d => d.rate5y),
        step: 'end',
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#f5222d', width: 2 },
        itemStyle: { color: '#f5222d' },
      },
      {
        name: '1年期MLF',
        type: 'line',
        data: data.map(d => d.mlf1y),
        step: 'end',
        symbol: 'diamond',
        symbolSize: 6,
        lineStyle: { color: '#52c41a', width: 2, type: 'dashed' },
        itemStyle: { color: '#52c41a' },
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height: 300 }} notMerge />
    </Card>
  );
}
