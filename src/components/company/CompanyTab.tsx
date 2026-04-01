import { useState } from 'react';
import { Row, Col, Card } from 'antd';
import { CompanySelector } from './CompanySelector';
import { CompanyKpiCards } from './CompanyKpiCards';
import { RevenueProfitChart } from './RevenueProfitChart';
import { ValuationComparisonChart } from './ValuationComparisonChart';
import { StockPriceChart } from './StockPriceChart';
import { ResearchReportsTable } from './ResearchReportsTable';
import { SectionTitle } from '../common/SectionTitle';
import { SectionNav } from '../common/SectionNav';
import { useCompanyData } from '../../hooks/useCompanyData';
import { defaultTicker } from '../../mock/companyData';

const SECTIONS = [
  { id: 'company-kpi', label: '核心财务' },
  { id: 'company-stock', label: '股价走势' },
  { id: 'company-financial', label: '财务与估值' },
  { id: 'company-reports', label: '研究报告' },
];

export function CompanyTab() {
  const [ticker, setTicker] = useState(defaultTicker);
  const { data } = useCompanyData(ticker);
  const g = [10, 10] as [number, number];

  return (
    <>
      <SectionNav sections={SECTIONS} />
      <div className="dashboard-content">
        <CompanySelector value={ticker} onChange={setTicker} />

        <div id="company-kpi">
          <SectionTitle>核心财务指标</SectionTitle>
          <CompanyKpiCards kpi={data.kpi} />
        </div>

        <div id="company-stock">
          <SectionTitle>股价走势</SectionTitle>
          <Row gutter={g} className="section-gap">
            <Col xs={24}>
              <StockPriceChart data={data.stockPriceCandles} companyName={data.info.name} />
            </Col>
          </Row>
        </div>

        <div id="company-financial">
          <SectionTitle>财务趋势与估值分析</SectionTitle>
          <Row gutter={g} className="section-gap">
            <Col xs={24} lg={14}>
              <RevenueProfitChart
                data={data.revenueProfitTrend}
                companyName={data.info.name}
              />
            </Col>
            <Col xs={24} lg={10} style={{ marginTop: 10 }}>
              <ValuationComparisonChart
                data={data.valuationComparison}
                companyName={data.info.name}
              />
            </Col>
          </Row>
        </div>

        <div id="company-reports">
          <SectionTitle>研究报告</SectionTitle>
          <Card size="small" className="section-gap">
            <ResearchReportsTable data={data.researchReports} />
          </Card>
        </div>
      </div>
    </>
  );
}
