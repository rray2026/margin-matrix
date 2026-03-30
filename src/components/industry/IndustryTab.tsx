import { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { PartitionOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { IndustryHeatmap } from './IndustryHeatmap';
import { ValuationBarChart } from './ValuationBarChart';
import { NorthboundFlowChart } from './NorthboundFlowChart';
import { SentimentRadarChart } from './SentimentRadarChart';
import { SectorTrendTable } from './SectorTrendTable';
import { SupplyChainAnalysis } from './SupplyChainAnalysis';
import { SectionTitle } from '../common/SectionTitle';
import { useIndustryData } from '../../hooks/useIndustryData';

export function IndustryTab() {
  const { data } = useIndustryData();
  const g = [10, 10] as [number, number];
  const [scExpanded, setScExpanded] = useState(false);

  return (
    <div>
      <SectionTitle>行业涨跌幅</SectionTitle>
      <Row gutter={g} className="section-gap">
        <Col xs={24} xl={12}>
          <IndustryHeatmap data={data.heatmap} />
        </Col>
        <Col xs={24} xl={12} style={{ marginTop: 10 }}>
          <ValuationBarChart data={data.valuations} />
        </Col>
      </Row>

      <SectionTitle>资金流向 & 景气度</SectionTitle>
      <Row gutter={g} className="section-gap">
        <Col xs={24} lg={14}>
          <NorthboundFlowChart data={data.northboundFlows} />
        </Col>
        <Col xs={24} lg={10} style={{ marginTop: 10 }}>
          <SentimentRadarChart data={data.sentimentRadar} />
        </Col>
      </Row>

      <SectionTitle>行业轮动明细</SectionTitle>
      <Card size="small" className="section-gap">
        <SectorTrendTable data={data.sectorTrends} />
      </Card>

      {/* Supply chain section */}
      <div
        className="section-gap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '4px 0',
        }}
        onClick={() => setScExpanded(v => !v)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-block',
            width: 3,
            height: 16,
            borderRadius: 2,
            background: '#1677ff',
            flexShrink: 0,
          }} />
          <span style={{ fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <PartitionOutlined style={{ color: '#1677ff' }} />
            供应链分析
          </span>
          <span style={{ fontSize: 12, color: '#8c8c8c' }}>· 汽车行业</span>
        </div>
        <Button
          type="text"
          size="small"
          icon={scExpanded ? <UpOutlined /> : <DownOutlined />}
          style={{ color: '#8c8c8c' }}
        />
      </div>

      {scExpanded && <SupplyChainAnalysis />}
    </div>
  );
}
