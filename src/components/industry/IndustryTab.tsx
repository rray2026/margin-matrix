import { useState } from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import { ArrowLeftOutlined, PartitionOutlined } from '@ant-design/icons';
import { IndustryHeatmap } from './IndustryHeatmap';
import { ValuationBarChart } from './ValuationBarChart';
import { NorthboundFlowChart } from './NorthboundFlowChart';
import { SentimentRadarChart } from './SentimentRadarChart';
import { SectorTrendTable } from './SectorTrendTable';
import { SupplyChainList } from './SupplyChainList';
import { SupplyChainAnalysis } from './SupplyChainAnalysis';
import { SectionTitle } from '../common/SectionTitle';
import { useIndustryData } from '../../hooks/useIndustryData';
import type { SupplyChainIndustry } from '../../types/industry';

type Page = 'main' | 'sc_list' | 'sc_detail';

export function IndustryTab() {
  const { data } = useIndustryData();
  const g = [10, 10] as [number, number];

  const [page, setPage] = useState<Page>('main');
  const [selectedIndustry, setSelectedIndustry] = useState<SupplyChainIndustry | null>(null);

  const handleSelectIndustry = (industry: SupplyChainIndustry) => {
    setSelectedIndustry(industry);
    setPage('sc_detail');
  };

  /* ── Supply chain detail page ─────────── */
  if (page === 'sc_detail' && selectedIndustry) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0 12px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            size="small"
            onClick={() => setPage('sc_list')}
          />
          <Typography.Title level={5} style={{ margin: 0 }}>
            {selectedIndustry.name}供应链分析
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {selectedIndustry.layers.length} 个环节
          </Typography.Text>
        </div>
        <SupplyChainAnalysis layers={selectedIndustry.layers} />
      </div>
    );
  }

  /* ── Supply chain list page ───────────── */
  if (page === 'sc_list') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0 12px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            size="small"
            onClick={() => setPage('main')}
          />
          <Typography.Title level={5} style={{ margin: 0 }}>供应链分析</Typography.Title>
        </div>
        <SupplyChainList onSelect={handleSelectIndustry} />
      </div>
    );
  }

  /* ── Main page ────────────────────────── */
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

      {/* Supply chain entry */}
      <div
        onClick={() => setPage('sc_list')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          marginTop: 4,
          background: 'rgba(22,119,255,0.04)',
          border: '1px solid rgba(22,119,255,0.15)',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(22,119,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PartitionOutlined style={{ fontSize: 16, color: '#1677ff' }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>供应链分析</div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              汽车、半导体、新能源等 6 个行业
            </Typography.Text>
          </div>
        </div>
        <ArrowLeftOutlined rotate={180} style={{ color: '#bfbfbf', fontSize: 12 }} />
      </div>
    </div>
  );
}
