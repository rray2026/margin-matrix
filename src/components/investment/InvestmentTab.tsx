import { useState } from 'react';
import { Card, Typography } from 'antd';
import { ArrowLeftOutlined, FundProjectionScreenOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PredictionPage } from './PredictionPage';

type Page = 'main' | 'predictions';

const SECTIONS = [
  {
    key: 'predictions' as Page,
    icon: <FundProjectionScreenOutlined style={{ fontSize: 18, color: '#722ed1' }} />,
    iconBg: 'rgba(114,46,209,0.1)',
    title: '预测',
    description: '记录市场预判，追踪验证进度与结果',
  },
];

export function InvestmentTab() {
  const [page, setPage] = useState<Page>('main');

  if (page === 'predictions') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0 12px' }}>
          <Button type="text" icon={<ArrowLeftOutlined />} size="small" onClick={() => setPage('main')} />
          <Typography.Title level={5} style={{ margin: 0 }}>预测</Typography.Title>
        </div>
        <PredictionPage />
      </div>
    );
  }

  return (
    <div>
      <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 10 }}>
        投资研究工具
      </Typography.Text>

      <Card size="small" style={{ padding: 0 }} styles={{ body: { padding: 0 } }}>
        {SECTIONS.map((section, index) => (
          <div
            key={section.key}
            onClick={() => setPage(section.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              cursor: 'pointer',
              borderBottom: index < SECTIONS.length - 1 ? '1px solid rgba(128,128,128,0.12)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: section.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {section.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 1 }}>{section.title}</div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>{section.description}</Typography.Text>
              </div>
            </div>
            <RightOutlined style={{ color: '#bfbfbf', fontSize: 12 }} />
          </div>
        ))}
      </Card>
    </div>
  );
}
