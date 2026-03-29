import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { ValuationComparison } from '../../types/company';

interface ValuationComparisonChartProps {
  data: ValuationComparison[];
  companyName: string;
}

export function ValuationComparisonChart({ data, companyName }: ValuationComparisonChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(320, 260);

  const option = {
    backgroundColor: 'transparent',
    title: { text: `${companyName} 估值对比`, ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['PE(TTM)', 'PB'] },
    tooltip: { ...s.baseTooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { ...s.baseGrid, top: 60 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.label),
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      axisLabel: s.axisLabelStyle,
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '倍',
      nameTextStyle: { color: s.textColor },
      axisLabel: s.axisLabelStyle,
      splitLine: { lineStyle: s.splitLineStyle },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'PE(TTM)',
        type: 'bar',
        data: data.map((d, i) => ({
          value: d.pe,
          itemStyle: { color: i === 0 ? '#f5222d' : '#4096ff', borderRadius: [4, 4, 0, 0] },
        })),
        barMaxWidth: 40,
        label: {
          show: true, position: 'top',
          formatter: (p: { value: number }) => p.value.toFixed(1) + 'x',
          color: s.textColor, fontSize: 11,
        },
      },
      {
        name: 'PB',
        type: 'bar',
        data: data.map((d, i) => ({
          value: d.pb,
          itemStyle: { color: i === 0 ? '#fa8c16' : '#13c2c2', borderRadius: [4, 4, 0, 0] },
        })),
        barMaxWidth: 40,
        label: {
          show: true, position: 'top',
          formatter: (p: { value: number }) => p.value.toFixed(1) + 'x',
          color: s.textColor, fontSize: 11,
        },
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height }} notMerge />
    </Card>
  );
}
