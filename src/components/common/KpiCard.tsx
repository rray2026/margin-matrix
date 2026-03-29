import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface KpiCardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  precision?: number;
  prefix?: React.ReactNode;
}

export function KpiCard({ title, value, unit, change, precision = 2, prefix }: KpiCardProps) {
  const changeColor = change === undefined ? undefined : change > 0 ? '#f5222d' : '#52c41a';
  const changeIcon = change === undefined ? null : change > 0
    ? <ArrowUpOutlined />
    : <ArrowDownOutlined />;

  return (
    <Card size="small" style={{ height: '100%' }}>
      <Statistic
        title={title}
        value={value}
        precision={typeof value === 'number' ? precision : undefined}
        suffix={unit}
        prefix={prefix}
        valueStyle={{ fontSize: 22, fontWeight: 600 }}
      />
      {change !== undefined && (
        <div style={{ marginTop: 6, fontSize: 12, color: changeColor }}>
          {changeIcon}
          <span style={{ marginLeft: 4 }}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      )}
    </Card>
  );
}
