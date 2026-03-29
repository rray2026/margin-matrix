import type { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f0f2f5',
    borderRadius: 8,
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4096ff',
    colorBgContainer: '#1f1f1f',
    colorBgLayout: '#141414',
    colorText: '#e8e8e8',
    colorTextSecondary: '#a6a6a6',
    colorBorder: '#434343',
    borderRadius: 8,
  },
  algorithm: undefined,
};

export interface BaseChartStyles {
  textColor: string;
  borderColor: string;
  bgColor: string;
  axisColor: string;
  tooltipBg: string;
  axisLabelStyle: { color: string; fontSize: number };
  splitLineStyle: { color: string; type: 'dashed' | 'solid' };
  axisLineStyle: { lineStyle: { color: string } };
  axisTickStyle: { lineStyle: { color: string } };
  baseTooltip: {
    backgroundColor: string;
    borderColor: string;
    textStyle: { color: string };
    extraCssText: string;
  };
  baseLegend: {
    textStyle: { color: string };
    inactiveColor: string;
  };
  baseGrid: { containLabel: boolean; left: number; right: number; top: number; bottom: number };
  baseTitle: { textStyle: { color: string; fontSize: number } };
}

export function getChartStyles(isDark: boolean): BaseChartStyles {
  const textColor = isDark ? '#c9d1d9' : '#333333';
  const borderColor = isDark ? '#434343' : '#dddddd';
  const bgColor = isDark ? '#1f1f1f' : '#ffffff';
  const axisColor = isDark ? '#5a5a5a' : '#e0e0e0';

  return {
    textColor,
    borderColor,
    bgColor,
    axisColor,
    tooltipBg: bgColor,
    axisLabelStyle: { color: textColor, fontSize: 11 },
    splitLineStyle: { color: axisColor, type: 'dashed' },
    axisLineStyle: { lineStyle: { color: axisColor } },
    axisTickStyle: { lineStyle: { color: axisColor } },
    baseTooltip: {
      backgroundColor: bgColor,
      borderColor,
      textStyle: { color: textColor },
      extraCssText: `box-shadow: 0 2px 12px rgba(0,0,0,${isDark ? 0.5 : 0.15})`,
    },
    baseLegend: {
      textStyle: { color: textColor },
      inactiveColor: isDark ? '#555' : '#aaa',
    },
    baseGrid: { containLabel: true, left: 16, right: 16, top: 48, bottom: 16 },
    baseTitle: { textStyle: { color: textColor, fontSize: 13 } },
  };
}

export const CHART_COLORS = {
  blue:   '#4096ff',
  red:    '#f5222d',
  green:  '#52c41a',
  orange: '#fa8c16',
  purple: '#722ed1',
  cyan:   '#13c2c2',
  gold:   '#faad14',
  lime:   '#a0d911',
};

export const SECTOR_COLORS = [
  '#4096ff', '#f5222d', '#52c41a', '#fa8c16',
  '#722ed1', '#13c2c2', '#faad14', '#eb2f96',
  '#1890ff', '#ff4d4f', '#73d13d', '#ffa940',
];
