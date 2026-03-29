import { Row, Col } from 'antd';
import { KpiCard } from '../common/KpiCard';
import type { MacroKpi } from '../../types/macro';

interface MacroKpiCardsProps {
  kpi: MacroKpi;
}

export function MacroKpiCards({ kpi }: MacroKpiCardsProps) {
  return (
    <Row gutter={[16, 16]} className="kpi-row">
      <Col xs={12} sm={8} md={6} lg={5} xl={4}>
        <KpiCard title="GDP同比增速" value={kpi.gdpGrowthRate} unit="%" precision={1} />
      </Col>
      <Col xs={12} sm={8} md={6} lg={5} xl={4}>
        <KpiCard
          title="CPI同比"
          value={kpi.cpi}
          unit="%"
          precision={1}
        />
      </Col>
      <Col xs={12} sm={8} md={6} lg={5} xl={4}>
        <KpiCard title="1年期LPR" value={kpi.benchmarkRate} unit="%" precision={2} />
      </Col>
      <Col xs={12} sm={8} md={6} lg={5} xl={4}>
        <KpiCard title="美元/人民币" value={kpi.usdCnyRate} precision={4} />
      </Col>
      <Col xs={12} sm={8} md={6} lg={5} xl={4}>
        <KpiCard title="制造业PMI" value={kpi.pmi} precision={1} />
      </Col>
    </Row>
  );
}
