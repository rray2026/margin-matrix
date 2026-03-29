import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { useChartHeight } from '../../hooks/useChartHeight';
import type { CandlestickPoint } from '../../types/company';

interface StockPriceChartProps {
  data: CandlestickPoint[];
  companyName: string;
}

export function StockPriceChart({ data, companyName }: StockPriceChartProps) {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const height = useChartHeight(480, 380);

  const dates = data.map(d => d.date);
  // ECharts candlestick: [open, close, low, high]
  const ohlc = data.map(d => [d.open, d.close, d.low, d.high]);
  const volumes = data.map(d => ({
    value: d.volume,
    itemStyle: { color: d.close >= d.open ? '#f5222d' : '#52c41a' },
  }));

  const upColor = '#f5222d';
  const downColor = '#52c41a';

  const option = {
    backgroundColor: 'transparent',
    title: { text: `${companyName} 股价走势`, ...s.baseTitle },
    tooltip: {
      ...s.baseTooltip,
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: (params: { name: string; seriesName: string; value: number | number[] }[]) => {
        const candle = params.find(p => p.seriesName === '价格');
        const vol = params.find(p => p.seriesName === '成交量');
        if (!candle || !Array.isArray(candle.value)) return '';
        const [o, c, l, h] = candle.value as number[];
        const chg = ((c - o) / o * 100).toFixed(2);
        const color = c >= o ? upColor : downColor;
        return `
          <div style="font-size:12px">
            <b>${candle.name}</b><br/>
            开盘: ${o.toFixed(2)}&nbsp;&nbsp;收盘: <span style="color:${color}">${c.toFixed(2)}</span><br/>
            最低: ${l.toFixed(2)}&nbsp;&nbsp;最高: ${h.toFixed(2)}<br/>
            涨跌: <span style="color:${color}">${Number(chg) > 0 ? '+' : ''}${chg}%</span><br/>
            ${vol ? `成交量: ${(vol.value as number).toLocaleString()}手` : ''}
          </div>
        `;
      },
    },
    axisPointer: { link: [{ xAxisIndex: 'all' }] },
    dataZoom: [
      { type: 'inside', xAxisIndex: [0, 1], start: 40, end: 100 },
      {
        type: 'slider',
        xAxisIndex: [0, 1],
        start: 40,
        end: 100,
        bottom: 4,
        height: 20,
        textStyle: { color: s.textColor },
        borderColor: s.borderColor,
        fillerColor: isDark ? 'rgba(64,150,255,0.15)' : 'rgba(64,150,255,0.1)',
      },
    ],
    grid: [
      { left: 60, right: 20, top: 50, bottom: 100, height: '62%' },
      { left: 60, right: 20, bottom: 80, height: '22%' },
    ],
    xAxis: [
      {
        type: 'category',
        data: dates,
        gridIndex: 0,
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: s.axisColor } },
      },
      {
        type: 'category',
        data: dates,
        gridIndex: 1,
        axisLabel: { ...s.axisLabelStyle, fontSize: 10, rotate: 20 },
        axisLine: { lineStyle: { color: s.axisColor } },
      },
    ],
    yAxis: [
      {
        scale: true,
        gridIndex: 0,
        splitNumber: 5,
        axisLabel: { color: s.textColor, fontSize: 11 },
        splitLine: { lineStyle: { ...s.splitLineStyle } },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: {
          color: s.textColor, fontSize: 10,
          formatter: (v: number) => v > 10000 ? `${(v / 10000).toFixed(0)}万` : String(v),
        },
        splitLine: { lineStyle: { ...s.splitLineStyle } },
        axisLine: { show: false },
        axisTick: { show: false },
      },
    ],
    series: [
      {
        name: '价格',
        type: 'candlestick',
        data: ohlc,
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upColor,
          borderColor0: downColor,
        },
      },
      {
        name: '成交量',
        type: 'bar',
        data: volumes,
        xAxisIndex: 1,
        yAxisIndex: 1,
        barMaxWidth: 8,
      },
    ],
  };

  return (
    <Card size="small" className="chart-card">
      <ReactECharts option={option} style={{ height }} notMerge />
    </Card>
  );
}
