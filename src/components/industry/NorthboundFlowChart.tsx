import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { NorthboundFlow } from '../../types/industry';

interface NorthboundFlowChartProps {
  data: NorthboundFlow[];
}

export function NorthboundFlowChart({ data }: NorthboundFlowChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(360, 280);

  const sorted = [...data].sort((a, b) => b.netInflow - a.netInflow);

  const option = {
    backgroundColor: 'transparent',
    title: { text: '北向资金行业净流入 (亿元)', ...s.baseTitle },
    tooltip: {
      ...s.baseTooltip,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: { name: string; value: number }[]) => {
        const p = params[0];
        return `${p.name}<br/>净流入: ${p.value > 0 ? '+' : ''}${p.value.toFixed(1)} 亿元`;
      },
    },
    grid: { ...s.baseGrid, top: 50, bottom: 60 },
    xAxis: {
      type: 'category',
      data: sorted.map(d => d.sector),
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      axisLabel: { ...s.axisLabelStyle, rotate: 45, fontSize: 10 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '亿元',
      nameTextStyle: { color: s.textColor },
      axisLabel: s.axisLabelStyle,
      splitLine: { lineStyle: s.splitLineStyle },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: sorted.map(d => ({
          value: d.netInflow,
          itemStyle: {
            color: d.netInflow >= 0 ? '#f5222d' : '#52c41a',
            borderRadius: d.netInflow >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
          },
        })),
        barMaxWidth: 24,
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height }} notMerge />
    </Card>
  );
}
