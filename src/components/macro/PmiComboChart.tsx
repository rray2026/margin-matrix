import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import type { PmiPoint } from '../../types/macro';

interface PmiComboChartProps {
  data: PmiPoint[];
}

export function PmiComboChart({ data }: PmiComboChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);

  const option = {
    backgroundColor: 'transparent',
    title: { text: 'PMI 综合指数', ...s.baseTitle },
    legend: { ...s.baseLegend, top: 28, data: ['制造业PMI', '非制造业PMI', '综合PMI'] },
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
      name: '指数',
      min: 46,
      max: 62,
      nameTextStyle: { color: s.textColor },
      axisLabel: s.axisLabelStyle,
      splitLine: { lineStyle: s.splitLineStyle },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: '制造业PMI',
        type: 'bar',
        data: data.map(d => d.manufacturing),
        barMaxWidth: 20,
        itemStyle: {
          color: (params: { value: number }) =>
            params.value >= 50 ? 'rgba(245,34,45,0.7)' : 'rgba(82,196,26,0.7)',
        },
      },
      {
        name: '非制造业PMI',
        type: 'bar',
        data: data.map(d => d.nonManufacturing),
        barMaxWidth: 20,
        itemStyle: {
          color: (params: { value: number }) =>
            params.value >= 50 ? 'rgba(64,150,255,0.7)' : 'rgba(114,46,209,0.7)',
        },
      },
      {
        name: '综合PMI',
        type: 'line',
        data: data.map(d => d.composite),
        smooth: true,
        lineStyle: { color: '#fa8c16', width: 2.5 },
        itemStyle: { color: '#fa8c16' },
        symbol: 'circle',
        symbolSize: 5,
        z: 10,
        markLine: {
          silent: true,
          data: [{ yAxis: 50, lineStyle: { color: '#ff7875', type: 'dashed', width: 1.5 } }],
          label: { formatter: '荣枯线 50', color: '#ff7875', fontSize: 11 },
        },
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height: 300 }} notMerge />
    </Card>
  );
}
