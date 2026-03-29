import { Select, Space, Tag, Typography } from 'antd';
import { companyList, companiesMap } from '../../mock/companyData';
import { useIsMobile } from '../../hooks/useIsMobile';

interface CompanySelectorProps {
  value: string;
  onChange: (ticker: string) => void;
}

export function CompanySelector({ value, onChange }: CompanySelectorProps) {
  const isMobile = useIsMobile();
  const company = companiesMap[value];

  return (
    <div style={{ marginBottom: 16 }}>
      <Space align="center" wrap size={8}>
        <Typography.Text strong style={{ fontSize: isMobile ? 13 : 14 }}>
          选择公司：
        </Typography.Text>
        <Select
          value={value}
          onChange={onChange}
          showSearch
          optionFilterProp="label"
          options={companyList}
          style={{ width: isMobile ? 180 : 220 }}
          size={isMobile ? 'small' : 'middle'}
        />
        {company && (
          <Space size={6} wrap>
            <Tag color="blue" style={{ margin: 0 }}>
              {company.info.exchange === 'SSE' ? '上交所' : '深交所'}
            </Tag>
            <Tag color="geekblue" style={{ margin: 0 }}>
              {company.info.sector}
            </Tag>
            {!isMobile && (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {company.info.ticker}
              </Typography.Text>
            )}
          </Space>
        )}
      </Space>
    </div>
  );
}
