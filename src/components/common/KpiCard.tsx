import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useIsMobile } from '../../hooks/useIsMobile';

interface KpiCardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  precision?: number;
  prefix?: React.ReactNode;
}

export function KpiCard({ title, value, unit, change, precision = 2, prefix }: KpiCardProps) {
  const isMobile = useIsMobile();
  const changeColor = change === undefined ? undefined : change > 0 ? '#f5222d' : '#52c41a';
  const changeIcon = change === undefined ? null : change > 0
    ? <ArrowUpOutlined />
    : <ArrowDownOutlined />;

  return (
    <Card size="small" style={{ height: '100%' }} bodyStyle={{ padding: isMobile ? '10px 12px' : '16px' }}>
      <Statistic
        title={<span style={{ fontSize: isMobile ? 11 : 13 }}>{title}</span>}
        value={value}
        precision={typeof value === 'number' ? precision : undefined}
        suffix={unit}
        prefix={prefix}
        valueStyle={{ fontSize: isMobile ? 18 : 22, fontWeight: 600 }}
      />
      {change !== undefined && (
        <div style={{ marginTop: 4, fontSize: 11, color: changeColor }}>
          {changeIcon}
          <span style={{ marginLeft: 3 }}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      )}
    </Card>
  );
}
