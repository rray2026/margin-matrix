import { Row, Col } from 'antd';
import { MacroKpiCards } from './MacroKpiCards';
import { GdpTrendChart } from './GdpTrendChart';
import { CpiPpiChart } from './CpiPpiChart';
import { InterestRateCurveChart } from './InterestRateCurveChart';
import { ExchangeRateChart } from './ExchangeRateChart';
import { PmiComboChart } from './PmiComboChart';
import { SectionTitle } from '../common/SectionTitle';
import { useMacroData } from '../../hooks/useMacroData';

export function MacroTab() {
  const { data } = useMacroData();

  return (
    <div>
      <SectionTitle>核心指标</SectionTitle>
      <MacroKpiCards kpi={data.kpi} />

      <SectionTitle>经济增长</SectionTitle>
      <Row gutter={[16, 16]} className="section-gap">
        <Col xs={24} lg={12}>
          <GdpTrendChart data={data.gdpTrend} />
        </Col>
        <Col xs={24} lg={12}>
          <CpiPpiChart data={data.cpiPpiTrend} />
        </Col>
      </Row>

      <SectionTitle>货币与利率</SectionTitle>
      <Row gutter={[16, 16]} className="section-gap">
        <Col xs={24} lg={12}>
          <InterestRateCurveChart data={data.interestRateCurve} />
        </Col>
        <Col xs={24} lg={12}>
          <PmiComboChart data={data.pmi} />
        </Col>
      </Row>

      <SectionTitle>汇率</SectionTitle>
      <Row gutter={[16, 16]} className="section-gap">
        <Col xs={24}>
          <ExchangeRateChart data={data.exchangeRate} />
        </Col>
      </Row>
    </div>
  );
}
