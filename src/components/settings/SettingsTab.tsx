import { useState } from 'react';
import { List, Typography, Card } from 'antd';
import { DatabaseOutlined, RightOutlined } from '@ant-design/icons';
import { DataSourcesPage } from './DataSourcesPage';

type Page = 'settings' | 'datasources';

const SETTINGS_ITEMS = [
  {
    key: 'datasources' as Page,
    icon: <DatabaseOutlined style={{ fontSize: 18, color: '#1677ff' }} />,
    title: '数据来源',
    description: '查看所有数据源、更新频率及最近更新日期',
  },
];

export function SettingsTab() {
  const [page, setPage] = useState<Page>('settings');

  if (page === 'datasources') {
    return <DataSourcesPage onBack={() => setPage('settings')} />;
  }

  return (
    <div>
      <Typography.Text
        type="secondary"
        style={{ fontSize: 12, display: 'block', padding: '4px 0 8px' }}
      >
        数据与信息
      </Typography.Text>

      <Card size="small" style={{ padding: 0 }} styles={{ body: { padding: 0 } }}>
        <List
          dataSource={SETTINGS_ITEMS}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => setPage(item.key)}
              style={{
                cursor: 'pointer',
                padding: '12px 16px',
                borderBottom: index < SETTINGS_ITEMS.length - 1
                  ? '1px solid rgba(128,128,128,0.12)'
                  : 'none',
              }}
              extra={<RightOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />}
            >
              <List.Item.Meta
                avatar={
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(22,119,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {item.icon}
                  </div>
                }
                title={<span style={{ fontWeight: 500 }}>{item.title}</span>}
                description={
                  <span style={{ fontSize: 12 }}>{item.description}</span>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
