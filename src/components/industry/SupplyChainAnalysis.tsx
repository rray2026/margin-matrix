import { useState } from 'react';
import { Card, Tag, Typography, Row, Col } from 'antd';
import { ArrowRightOutlined, ArrowDownOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartStyles } from '../../styles/theme';
import { autoSupplyChain } from '../../mock/supplychainData';
import type { SupplyChainLayer } from '../../types/industry';

const { Text, Title } = Typography;

/* ── Flow Node ───────────────────────────── */

function FlowNode({
  layer,
  active,
  onClick,
  isLast,
  vertical,
}: {
  layer: SupplyChainLayer;
  active: boolean;
  onClick: () => void;
  isLast: boolean;
  vertical: boolean;
}) {
  const growth = layer.growth;
  return (
    <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: 'center' }}>
      <div
        onClick={onClick}
        style={{
          flex: 1,
          minWidth: vertical ? undefined : 0,
          border: `2px solid ${active ? layer.color : 'transparent'}`,
          borderRadius: 10,
          padding: '10px 12px',
          background: active
            ? `${layer.color}18`
            : 'rgba(128,128,128,0.06)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <div style={{
          fontSize: 11,
          color: layer.color,
          fontWeight: 700,
          letterSpacing: 1,
          marginBottom: 2,
        }}>
          {layer.name}
        </div>
        <div style={{ fontSize: 10, color: '#8c8c8c', marginBottom: 4 }}>
          {layer.subtitle}
        </div>
        <Tag
          color={growth >= 0 ? 'red' : 'green'}
          style={{ fontSize: 10, padding: '0 4px', lineHeight: '16px' }}
        >
          {growth >= 0 ? '+' : ''}{growth}%
        </Tag>
      </div>
      {!isLast && (
        <div style={{
          flex: 'none',
          color: '#bfbfbf',
          padding: vertical ? '4px 0' : '0 6px',
          fontSize: 14,
        }}>
          {vertical ? <ArrowDownOutlined /> : <ArrowRightOutlined />}
        </div>
      )}
    </div>
  );
}

/* ── Layer Detail Card ───────────────────── */

function LayerDetailCard({ layer }: { layer: SupplyChainLayer }) {
  return (
    <Card
      size="small"
      style={{ borderTop: `3px solid ${layer.color}`, height: '100%' }}
      title={
        <span>
          <span style={{ color: layer.color, fontWeight: 700 }}>{layer.name}</span>
          <Text type="secondary" style={{ fontSize: 11, marginLeft: 6 }}>
            {layer.subtitle}
          </Text>
        </span>
      }
    >
      {/* Metrics */}
      <Row gutter={[8, 4]} style={{ marginBottom: 10 }}>
        {layer.metrics.map(m => (
          <Col span={12} key={m.label}>
            <div style={{ fontSize: 10, color: '#8c8c8c' }}>{m.label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
              {m.up === true  && <RiseOutlined style={{ color: '#f5222d', fontSize: 10 }} />}
              {m.up === false && <FallOutlined  style={{ color: '#52c41a', fontSize: 10 }} />}
              {m.value}
            </div>
          </Col>
        ))}
      </Row>

      {/* Companies */}
      <div style={{ fontSize: 10, color: '#8c8c8c', marginBottom: 4 }}>代表企业</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {layer.companies.map(c => (
          <Tag
            key={c.name}
            style={{ fontSize: 10, margin: 0, padding: '0 5px', lineHeight: '18px' }}
          >
            {c.name}{c.code ? ` · ${c.code}` : ''}
          </Tag>
        ))}
      </div>
    </Card>
  );
}

/* ── Market Size Bar Chart ───────────────── */

function MarketSizeChart() {
  const { isDark } = useTheme();
  const s = getChartStyles(isDark);
  const isMobile = useIsMobile();

  const option = {
    backgroundColor: 'transparent',
    title: { text: '各环节市场规模 (亿元)', ...s.baseTitle },
    tooltip: {
      ...s.baseTooltip,
      trigger: 'axis',
      formatter: (params: { name: string; value: number }[]) => {
        const p = params[0];
        return `${p.name}<br/>市场规模：${p.value >= 10000
          ? (p.value / 10000).toFixed(1) + ' 万亿'
          : p.value + ' 亿'}`;
      },
    },
    grid: { top: 40, bottom: 24, left: isMobile ? 60 : 80, right: isMobile ? 50 : 60 },
    xAxis: {
      type: 'value',
      axisLabel: {
        ...s.axisLabelStyle,
        formatter: (v: number) => v >= 10000 ? `${v / 10000}万亿` : `${v}亿`,
      },
      splitLine: { lineStyle: s.splitLineStyle },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: autoSupplyChain.map(l => l.name),
      axisLabel: { ...s.axisLabelStyle, fontSize: 11 },
      axisLine: s.axisLineStyle,
      axisTick: s.axisTickStyle,
    },
    series: [{
      type: 'bar',
      data: autoSupplyChain.map(l => ({
        value: l.marketSize,
        itemStyle: { color: l.color, borderRadius: [0, 4, 4, 0] },
      })),
      barMaxWidth: 28,
      label: {
        show: true,
        position: 'right',
        fontSize: isMobile ? 9 : 10,
        color: s.textColor,
        formatter: (p: { value: number }) =>
          p.value >= 10000 ? `${(p.value / 10000).toFixed(1)}万亿` : `${p.value}亿`,
      },
    }],
  };

  return (
    <Card size="small" className="chart-card" style={{ marginBottom: 10 }}>
      <ReactECharts option={option} style={{ height: isMobile ? 200 : 220 }} notMerge />
    </Card>
  );
}

/* ── Main Component ─────────────────────── */

export function SupplyChainAnalysis() {
  const isMobile = useIsMobile();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const activeLayer = activeKey
    ? autoSupplyChain.find(l => l.key === activeKey) ?? null
    : null;

  const handleClick = (key: string) => {
    setActiveKey(prev => (prev === key ? null : key));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 10 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          以汽车行业为例 · 点击环节查看详情
        </Text>
      </div>

      {/* Chain flow */}
      <Card size="small" style={{ marginBottom: 10 }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? 0 : 4,
        }}>
          {autoSupplyChain.map((layer, i) => (
            <FlowNode
              key={layer.key}
              layer={layer}
              active={activeKey === layer.key}
              onClick={() => handleClick(layer.key)}
              isLast={i === autoSupplyChain.length - 1}
              vertical={isMobile}
            />
          ))}
        </div>
      </Card>

      {/* Active detail card */}
      {activeLayer && (
        <div style={{ marginBottom: 10 }}>
          <LayerDetailCard layer={activeLayer} />
        </div>
      )}

      {/* Market size chart */}
      <MarketSizeChart />

      {/* All layer cards grid (collapsed on mobile to save space) */}
      {!isMobile && (
        <>
          <Title level={5} style={{ fontSize: 13, margin: '4px 0 8px' }}>
            各环节详情
          </Title>
          <Row gutter={[10, 10]}>
            {autoSupplyChain.map(layer => (
              <Col key={layer.key} xs={24} sm={12} lg={8} xl={6}>
                <LayerDetailCard layer={layer} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
