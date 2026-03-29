import { Row, Col, Card } from 'antd';
import { IndustryHeatmap } from './IndustryHeatmap';
import { ValuationBarChart } from './ValuationBarChart';
import { NorthboundFlowChart } from './NorthboundFlowChart';
import { SentimentRadarChart } from './SentimentRadarChart';
import { SectorTrendTable } from './SectorTrendTable';
import { SectionTitle } from '../common/SectionTitle';
import { useIndustryData } from '../../hooks/useIndustryData';

export function IndustryTab() {
  const { data } = useIndustryData();
  const g = [10, 10] as [number, number];

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
    </div>
  );
}
