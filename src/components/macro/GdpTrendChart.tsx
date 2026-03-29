import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { GdpQuarterlyPoint } from '../../types/macro';

interface GdpTrendChartProps {
  data: GdpQuarterlyPoint[];
}

export function GdpTrendChart({ data }: GdpTrendChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(300, 240);

  const option = {
    backgroundColor: 'transparent',
    title: { text: 'GDP增速', ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['同比增速', '环比增速'] },
    tooltip: { ...s.baseTooltip, trigger: 'axis' },
    grid: { ...s.baseGrid, top: 60 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      axisLabel: { ...s.axisLabelStyle, rotate: 30 },
      splitLine: { lineStyle: s.splitLineStyle },
    },
    yAxis: [
      {
        type: 'value',
        name: '同比(%)',
        nameTextStyle: { color: s.textColor },
        axisLabel: s.axisLabelStyle,
        splitLine: { lineStyle: s.splitLineStyle },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      {
        type: 'value',
        name: '环比(%)',
        nameTextStyle: { color: s.textColor },
        axisLabel: s.axisLabelStyle,
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        position: 'right',
      },
    ],
    series: [
      {
        name: '同比增速',
        type: 'line',
        data: data.map(d => d.yoy),
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#4096ff', width: 2 },
        itemStyle: { color: '#4096ff' },
        areaStyle: { color: 'rgba(64,150,255,0.12)' },
        yAxisIndex: 0,
      },
      {
        name: '环比增速',
        type: 'line',
        data: data.map(d => d.qoq),
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#fa8c16', width: 2, type: 'dashed' },
        itemStyle: { color: '#fa8c16' },
        yAxisIndex: 1,
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height }} notMerge />
    </Card>
  );
}
