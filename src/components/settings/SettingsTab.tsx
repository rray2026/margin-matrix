import { useState } from 'react';
import { List, Typography, Card, Switch } from 'antd';
import {
  DatabaseOutlined, RightOutlined,
  BulbOutlined, InfoCircleOutlined, AppstoreOutlined,
} from '@ant-design/icons';
import { DataSourcesPage } from './DataSourcesPage';
import { ProductFeaturesPage } from './ProductFeaturesPage';
import { useTheme } from '../../contexts/ThemeContext';
import { useIsMobile } from '../../hooks/useIsMobile';

type MobilePage = 'settings' | 'datasources' | 'features';
type DesktopSection = 'appearance' | 'features' | 'datasources';

const buildTime = (() => {
  const d = new Date(__BUILD_TIME__);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
})();

const DESKTOP_NAV = [
  {
    key: 'appearance' as DesktopSection,
    icon: <BulbOutlined style={{ fontSize: 16 }} />,
    label: '外观',
  },
  {
    key: 'features' as DesktopSection,
    icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
    label: '产品功能',
  },
  {
    key: 'datasources' as DesktopSection,
    icon: <DatabaseOutlined style={{ fontSize: 16 }} />,
    label: '数据来源',
  },
];

export function SettingsTab() {
  const [mobilePage, setMobilePage] = useState<MobilePage>('settings');
  const [desktopSection, setDesktopSection] = useState<DesktopSection>('appearance');
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  /* ── Mobile layout (drill-down navigation) ── */
  if (isMobile) {
    if (mobilePage === 'datasources') {
      return <DataSourcesPage onBack={() => setMobilePage('settings')} />;
    }
    if (mobilePage === 'features') {
      return <ProductFeaturesPage onBack={() => setMobilePage('settings')} />;
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
                  key: 'features' as MobilePage,
                  icon: <AppstoreOutlined style={{ fontSize: 18, color: '#722ed1' }} />,
                  iconBg: 'rgba(114,46,209,0.1)',
                  title: '产品功能',
                  description: '了解各模块的功能介绍与使用方式',
                },
                {
                  key: 'datasources' as MobilePage,
                  icon: <DatabaseOutlined style={{ fontSize: 18, color: '#1677ff' }} />,
                  iconBg: 'rgba(22,119,255,0.1)',
                  title: '数据来源',
                  description: '查看所有数据源、更新频率及最近更新日期',
                },
              ]}
              renderItem={item => (
                <List.Item
                  onClick={() => setMobilePage(item.key)}
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

  /* ── Desktop layout (two-panel) ── */
  const navBorderColor = isDark ? '#303030' : '#f0f0f0';
  const activeNavBg    = isDark ? 'rgba(22,119,255,0.18)' : 'rgba(22,119,255,0.1)';
  const inactiveColor  = isDark ? 'rgba(255,255,255,0.65)' : '#595959';

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 200px)', gap: 0 }}>

      {/* Left navigation panel */}
      <div style={{
        width: 200,
        flexShrink: 0,
        borderRight: `1px solid ${navBorderColor}`,
        paddingRight: 12,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography.Text type="secondary" style={{ fontSize: 11, display: 'block', padding: '0 4px 8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          设置
        </Typography.Text>

        {DESKTOP_NAV.map(({ key, icon, label }) => {
          const isActive = desktopSection === key;
          return (
            <div
              key={key}
              className="settings-nav-item"
              onClick={() => setDesktopSection(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                marginBottom: 2,
                background: isActive ? activeNavBg : 'transparent',
                color: isActive ? '#1677ff' : inactiveColor,
                fontWeight: isActive ? 500 : 400,
                fontSize: 14,
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {icon}
              {label}
            </div>
          );
        })}

        {/* About info at bottom */}
        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 8,
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
          }}>
            <InfoCircleOutlined style={{ fontSize: 14, color: '#52c41a' }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: inactiveColor }}>构建时间</div>
              <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                {buildTime}
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div style={{ flex: 1, paddingLeft: 32, minWidth: 0, paddingTop: 4 }}>
        {desktopSection === 'appearance' && (
          <div style={{ maxWidth: 560 }}>
            <Typography.Title level={5} style={{ margin: '0 0 20px' }}>外观</Typography.Title>
            <Card size="small" styles={{ body: { padding: 0 } }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(250,173,20,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <BulbOutlined style={{ fontSize: 20, color: '#faad14' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 15 }}>深色模式</div>
                    <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                      {isDark ? '当前：深色主题' : '当前：浅色主题'}
                    </Typography.Text>
                  </div>
                </div>
                <Switch checked={isDark} onChange={toggleTheme} />
              </div>
            </Card>
          </div>
        )}

        {desktopSection === 'features' && (
          <ProductFeaturesPage onBack={() => {}} hideBack />
        )}

        {desktopSection === 'datasources' && (
          <DataSourcesPage onBack={() => {}} hideBack />
        )}
      </div>

    </div>
  );
}
