import { Layout, Typography, Space } from 'antd';
import { FundOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useIsMobile } from '../hooks/useIsMobile';
import type { ReactNode } from 'react';

const { Header, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
  /** On mobile, replaces the default app title area with custom content */
  headerLeftContent?: ReactNode;
}

export function DashboardLayout({ children, headerLeftContent }: DashboardLayoutProps) {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();

  const headerBg = isDark ? '#1f1f1f' : '#ffffff';
  const borderColor = isDark ? '#434343' : '#f0f0f0';

  return (
    <Layout style={{ minHeight: '100dvh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 12px' : '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: headerBg,
        borderBottom: `1px solid ${borderColor}`,
        height: isMobile ? 48 : 56,
        lineHeight: isMobile ? '48px' : '56px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        {isMobile && headerLeftContent ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {headerLeftContent}
          </div>
        ) : (
          <Space size={8} align="center">
            <FundOutlined style={{ fontSize: isMobile ? 18 : 22, color: '#1677ff' }} />
            <Typography.Title level={5} style={{ margin: 0, fontSize: isMobile ? 15 : 16 }}>
              基金研究仪表盘
            </Typography.Title>
            {!isMobile && (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Fund Research Dashboard
              </Typography.Text>
            )}
          </Space>
        )}
        {/* Right side intentionally empty — theme toggle moved to Settings */}
        <div />
      </Header>

      <Content style={{ background: isDark ? '#141414' : '#f0f2f5' }}>
        <div className="dashboard-content">
          {children}
        </div>
      </Content>
    </Layout>
  );
}
