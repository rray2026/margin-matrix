import { Select, Space, Tag, Typography } from 'antd';
import { companyList, companiesMap } from '../../mock/companyData';

interface CompanySelectorProps {
  value: string;
  onChange: (ticker: string) => void;
}

export function CompanySelector({ value, onChange }: CompanySelectorProps) {
  const company = companiesMap[value];

  return (
    <Space align="center" wrap style={{ marginBottom: 20 }}>
      <Typography.Text strong>选择公司：</Typography.Text>
      <Select
        value={value}
        onChange={onChange}
        showSearch
        optionFilterProp="label"
        options={companyList}
        style={{ width: 220 }}
        size="middle"
      />
      {company && (
        <Space size={8}>
          <Tag color="blue">{company.info.exchange === 'SSE' ? '上交所' : '深交所'}</Tag>
          <Tag color="geekblue">{company.info.sector}</Tag>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            股票代码：{company.info.ticker}
          </Typography.Text>
        </Space>
      )}
    </Space>
  );
}
