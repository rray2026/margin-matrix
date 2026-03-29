import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { CpiPpiPoint } from '../../types/macro';

interface CpiPpiChartProps {
  data: CpiPpiPoint[];
}

export function CpiPpiChart({ data }: CpiPpiChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(300, 240);

  const option = {
    backgroundColor: 'transparent',
    title: { text: 'CPI / PPI 同比', ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['CPI', 'PPI'] },
    tooltip: { ...s.baseTooltip, trigger: 'axis' },
    grid: { ...s.baseGrid, top: 60 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.month),
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      axisLabel: { ...s.axisLabelStyle, rotate: 30, interval: 2 },
      splitLine: { lineStyle: s.splitLineStyle },
    },
    yAxis: {
      type: 'value',
      name: '%',
      nameTextStyle: { color: s.textColor },
      axisLabel: s.axisLabelStyle,
      splitLine: { lineStyle: s.splitLineStyle },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'CPI',
        type: 'line',
        data: data.map(d => d.cpi),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: { color: '#f5222d', width: 2 },
        itemStyle: { color: '#f5222d' },
        markLine: {
          silent: true,
          data: [{ yAxis: 0, lineStyle: { color: '#8c8c8c', type: 'dashed' } }],
          label: { formatter: '0%', color: '#8c8c8c' },
        },
      },
      {
        name: 'PPI',
        type: 'line',
        data: data.map(d => d.ppi),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: { color: '#4096ff', width: 2, type: 'dashed' },
        itemStyle: { color: '#4096ff' },
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height }} notMerge />
    </Card>
  );
}
