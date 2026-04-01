import { Layout, Typography, Space } from 'antd';
import { FundOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useIsMobile } from '../hooks/useIsMobile';
import type { ReactNode } from 'react';

const { Header, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
  /** Mobile: replaces the default app title area */
  headerLeftContent?: ReactNode;
  /** Desktop: nav items rendered next to the logo */
  desktopNav?: ReactNode;
  /** Desktop: right-side content (settings button etc.) */
  desktopRight?: ReactNode;
}

export function DashboardLayout({
  children,
  headerLeftContent,
  desktopNav,
  desktopRight,
}: DashboardLayoutProps) {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();

  const headerBg    = isDark ? '#1f1f1f' : '#ffffff';
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
        {isMobile ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {headerLeftContent ?? (
                <Space size={8} align="center">
                  <FundOutlined style={{ fontSize: 18, color: '#1677ff' }} />
                  <Typography.Title level={5} style={{ margin: 0, fontSize: 15 }}>
                    基金研究仪表盘
                  </Typography.Title>
                </Space>
              )}
            </div>
            <div />
          </>
        ) : (
          <>
            {/* Left: logo + nav items */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <Space size={8} align="center">
                <FundOutlined style={{ fontSize: 22, color: '#1677ff' }} />
                <Typography.Title level={5} style={{ margin: 0, fontSize: 16 }}>
                  基金研究仪表盘
                </Typography.Title>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  Fund Research Dashboard
                </Typography.Text>
              </Space>
              {desktopNav}
            </div>
            {/* Right: settings etc. */}
            {desktopRight ?? <div />}
          </>
        )}
      </Header>

      <Content style={{ background: isDark ? '#141414' : '#f0f2f5' }}>
        <div className="dashboard-content">
          {children}
        </div>
      </Content>
    </Layout>
  );
}
