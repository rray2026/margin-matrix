import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { RevenueProfitPoint } from '../../types/company';

interface RevenueProfitChartProps {
  data: RevenueProfitPoint[];
  companyName: string;
}

export function RevenueProfitChart({ data, companyName }: RevenueProfitChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(320, 260);

  const option = {
    backgroundColor: 'transparent',
    title: { text: `${companyName} 营收与利润趋势`, ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['营业收入', '归母净利润', '收入增速', '利润增速'] },
    tooltip: { ...s.baseTooltip, trigger: 'axis' },
    grid: { ...s.baseGrid, top: 60 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.year),
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      axisLabel: s.axisLabelStyle,
      splitLine: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        name: '亿元',
        nameTextStyle: { color: s.textColor },
        axisLabel: s.axisLabelStyle,
        splitLine: { lineStyle: s.splitLineStyle },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      {
        type: 'value',
        name: '增速(%)',
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
        name: '营业收入',
        type: 'bar',
        data: data.map(d => d.revenue),
        barMaxWidth: 28,
        itemStyle: { color: '#4096ff', borderRadius: [4, 4, 0, 0] },
        yAxisIndex: 0,
      },
      {
        name: '归母净利润',
        type: 'bar',
        data: data.map(d => d.netProfit),
        barMaxWidth: 28,
        itemStyle: { color: '#13c2c2', borderRadius: [4, 4, 0, 0] },
        yAxisIndex: 0,
      },
      {
        name: '收入增速',
        type: 'line',
        data: data.map(d => d.revenueGrowth),
        smooth: true,
        lineStyle: { color: '#fa8c16', width: 2 },
        itemStyle: { color: '#fa8c16' },
        symbol: 'circle',
        symbolSize: 6,
        yAxisIndex: 1,
      },
      {
        name: '利润增速',
        type: 'line',
        data: data.map(d => d.profitGrowth),
        smooth: true,
        lineStyle: { color: '#722ed1', width: 2, type: 'dashed' },
        itemStyle: { color: '#722ed1' },
        symbol: 'circle',
        symbolSize: 6,
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
