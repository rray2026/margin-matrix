import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import type { SectorValuation } from '../../types/industry';

interface ValuationBarChartProps {
  data: SectorValuation[];
}

export function ValuationBarChart({ data }: ValuationBarChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);

  const sorted = [...data].sort((a, b) => a.pe - b.pe);

  const option = {
    backgroundColor: 'transparent',
    title: { text: '行业估值 PE / PB', ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['PE(TTM)', 'PB'] },
    tooltip: { ...s.baseTooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { ...s.baseGrid, top: 60, left: 90, right: 20 },
    xAxis: {
      type: 'value',
      name: '倍',
      nameTextStyle: { color: s.textColor },
      axisLabel: s.axisLabelStyle,
      splitLine: { lineStyle: s.splitLineStyle },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: sorted.map(d => d.sector),
      axisLabel: { ...s.axisLabelStyle, fontSize: 11 },
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
      splitLine: { show: false },
    },
    series: [
      {
        name: 'PE(TTM)',
        type: 'bar',
        data: sorted.map(d => d.pe),
        barMaxWidth: 14,
        itemStyle: { color: '#4096ff', borderRadius: [0, 4, 4, 0] },
        label: {
          show: true, position: 'right', fontSize: 10, color: s.textColor,
          formatter: (p: { value: number }) => p.value.toFixed(1),
        },
      },
      {
        name: 'PB',
        type: 'bar',
        data: sorted.map(d => d.pb),
        barMaxWidth: 14,
        itemStyle: { color: '#fa8c16', borderRadius: [0, 4, 4, 0] },
        label: {
          show: true, position: 'right', fontSize: 10, color: s.textColor,
          formatter: (p: { value: number }) => p.value.toFixed(1),
        },
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height: 520 }} notMerge />
    </Card>
  );
}
