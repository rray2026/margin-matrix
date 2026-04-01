import { Row, Col } from 'antd';
import { MacroKpiCards } from './MacroKpiCards';
import { GdpTrendChart } from './GdpTrendChart';
import { CpiPpiChart } from './CpiPpiChart';
import { InterestRateCurveChart } from './InterestRateCurveChart';
import { ExchangeRateChart } from './ExchangeRateChart';
import { PmiComboChart } from './PmiComboChart';
import { SectionTitle } from '../common/SectionTitle';
import { SectionNav } from '../common/SectionNav';
import { useMacroData } from '../../hooks/useMacroData';

const SECTIONS = [
  { id: 'macro-kpi', label: '核心指标' },
  { id: 'macro-growth', label: '经济增长' },
  { id: 'macro-monetary', label: '货币与利率' },
  { id: 'macro-exchange', label: '汇率' },
];

export function MacroTab() {
  const { data } = useMacroData();
  const g = [10, 10] as [number, number];

  return (
    <>
      <SectionNav sections={SECTIONS} />
      <div className="dashboard-content">
        <div id="macro-kpi">
          <SectionTitle>核心指标</SectionTitle>
          <MacroKpiCards kpi={data.kpi} />
        </div>

        <div id="macro-growth">
          <SectionTitle>经济增长</SectionTitle>
          <Row gutter={g} className="section-gap">
            <Col xs={24} lg={12}>
              <GdpTrendChart data={data.gdpTrend} />
            </Col>
            <Col xs={24} lg={12} style={{ marginTop: 10 }}>
              <CpiPpiChart data={data.cpiPpiTrend} />
            </Col>
          </Row>
        </div>

        <div id="macro-monetary">
          <SectionTitle>货币与利率</SectionTitle>
          <Row gutter={g} className="section-gap">
            <Col xs={24} lg={12}>
              <InterestRateCurveChart data={data.interestRateCurve} />
            </Col>
            <Col xs={24} lg={12} style={{ marginTop: 10 }}>
              <PmiComboChart data={data.pmi} />
            </Col>
          </Row>
        </div>

        <div id="macro-exchange">
          <SectionTitle>汇率</SectionTitle>
          <Row gutter={g} className="section-gap">
            <Col xs={24}>
              <ExchangeRateChart data={data.exchangeRate} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
