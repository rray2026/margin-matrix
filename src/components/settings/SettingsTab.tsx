import { useState } from 'react';
import { List, Typography, Card, Switch } from 'antd';
import {
  DatabaseOutlined, RightOutlined,
  BulbOutlined, InfoCircleOutlined, AppstoreOutlined,
} from '@ant-design/icons';
import { DataSourcesPage } from './DataSourcesPage';
import { ProductFeaturesPage } from './ProductFeaturesPage';
import { useTheme } from '../../contexts/ThemeContext';

type Page = 'settings' | 'datasources' | 'features';

const buildTime = (() => {
  const d = new Date(__BUILD_TIME__);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
})();

export function SettingsTab() {
  const [page, setPage] = useState<Page>('settings');
  const { isDark, toggleTheme } = useTheme();

  if (page === 'datasources') {
    return <DataSourcesPage onBack={() => setPage('settings')} />;
  }
  if (page === 'features') {
    return <ProductFeaturesPage onBack={() => setPage('settings')} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* 外观 */}
      <div>
        <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', padding: '0 0 8px' }}>
          外观
        </Typography.Text>
        <Card size="small" styles={{ body: { padding: 0 } }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(250,173,20,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BulbOutlined style={{ fontSize: 18, color: '#faad14' }} />
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>深色模式</div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {isDark ? '当前：深色主题' : '当前：浅色主题'}
                </Typography.Text>
              </div>
            </div>
            <Switch checked={isDark} onChange={toggleTheme} size="default" />
          </div>
        </Card>
      </div>

      {/* 数据与信息 */}
      <div>
        <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', padding: '0 0 8px' }}>
          数据与信息
        </Typography.Text>
        <Card size="small" styles={{ body: { padding: 0 } }}>
          <List
            dataSource={[
              {
                key: 'features' as Page,
                icon: <AppstoreOutlined style={{ fontSize: 18, color: '#722ed1' }} />,
                iconBg: 'rgba(114,46,209,0.1)',
                title: '产品功能',
                description: '了解各模块的功能介绍与使用方式',
              },
              {
                key: 'datasources' as Page,
                icon: <DatabaseOutlined style={{ fontSize: 18, color: '#1677ff' }} />,
                iconBg: 'rgba(22,119,255,0.1)',
                title: '数据来源',
                description: '查看所有数据源、更新频率及最近更新日期',
              },
            ]}
            renderItem={item => (
              <List.Item
                onClick={() => setPage(item.key)}
                style={{ cursor: 'pointer', padding: '12px 16px' }}
                extra={<RightOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: item.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.icon}
                    </div>
                  }
                  title={<span style={{ fontWeight: 500 }}>{item.title}</span>}
                  description={<span style={{ fontSize: 12 }}>{item.description}</span>}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* 关于 */}
      <div>
        <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', padding: '0 0 8px' }}>
          关于
        </Typography.Text>
        <Card size="small" styles={{ body: { padding: 0 } }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(82,196,26,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <InfoCircleOutlined style={{ fontSize: 18, color: '#52c41a' }} />
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>构建时间</div>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {buildTime}
              </Typography.Text>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
