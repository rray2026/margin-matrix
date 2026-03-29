import { Row, Col } from 'antd';
import { KpiCard } from '../common/KpiCard';
import type { CompanyKpi } from '../../types/company';

interface CompanyKpiCardsProps {
  kpi: CompanyKpi;
}

export function CompanyKpiCards({ kpi }: CompanyKpiCardsProps) {
  return (
    <Row gutter={[16, 16]} className="kpi-row">
      <Col xs={12} sm={8} md={6} lg={6}>
        <KpiCard
          title="营业收入(亿元)"
          value={kpi.revenue}
          unit="亿"
          change={kpi.revenueGrowth}
          precision={1}
        />
      </Col>
      <Col xs={12} sm={8} md={6} lg={6}>
        <KpiCard
          title="归母净利润(亿元)"
          value={kpi.netProfit}
          unit="亿"
          change={kpi.netProfitGrowth}
          precision={1}
        />
      </Col>
      <Col xs={12} sm={8} md={6} lg={6}>
        <KpiCard title="ROE" value={kpi.roe} unit="%" precision={1} />
      </Col>
      <Col xs={12} sm={8} md={6} lg={6}>
        <KpiCard title="资产负债率" value={kpi.debtRatio} unit="%" precision={1} />
      </Col>
    </Row>
  );
}
