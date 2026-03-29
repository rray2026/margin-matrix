import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { ExchangeRatePoint } from '../../types/macro';

interface ExchangeRateChartProps {
  data: ExchangeRatePoint[];
}

export function ExchangeRateChart({ data }: ExchangeRateChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(300, 240);

  const option = {
    backgroundColor: 'transparent',
    title: { text: '人民币汇率走势', ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['美元/人民币', '欧元/人民币'] },
    tooltip: { ...s.baseTooltip, trigger: 'axis' },
    grid: { ...s.baseGrid, top: 60 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.date),
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      axisLabel: { ...s.axisLabelStyle, rotate: 30, interval: 1 },
      splitLine: { lineStyle: s.splitLineStyle },
    },
    yAxis: [
      {
        type: 'value',
        name: 'USD/CNY',
        min: 6.5,
        max: 7.5,
        nameTextStyle: { color: s.textColor },
        axisLabel: s.axisLabelStyle,
        splitLine: { lineStyle: s.splitLineStyle },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      {
        type: 'value',
        name: 'EUR/CNY',
        min: 7.0,
        max: 8.2,
        position: 'right',
        nameTextStyle: { color: s.textColor },
        axisLabel: s.axisLabelStyle,
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
    ],
    series: [
      {
        name: '美元/人民币',
        type: 'line',
        data: data.map(d => d.usdCny),
        smooth: true,
        lineStyle: { color: '#4096ff', width: 2 },
        itemStyle: { color: '#4096ff' },
        symbol: 'none',
        yAxisIndex: 0,
        areaStyle: { color: 'rgba(64,150,255,0.08)' },
      },
      {
        name: '欧元/人民币',
        type: 'line',
        data: data.map(d => d.eurCny),
        smooth: true,
        lineStyle: { color: '#722ed1', width: 2, type: 'dashed' },
        itemStyle: { color: '#722ed1' },
        symbol: 'none',
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
