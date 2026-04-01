import { Layout, Typography, Space } from 'antd';
import { FundOutlined } from '@ant-design/icons';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { useIsMobile } from '../hooks/useIsMobile';
import type { ReactNode } from 'react';

const { Header } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();

  const headerBg = isDark ? '#1f1f1f' : '#ffffff';
  const borderColor = isDark ? '#2d2d2d' : '#f0f0f0';

  return (
    <Layout style={{ minHeight: '100dvh' }}>
      <Header
        style={{
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
          boxShadow: isDark
            ? '0 1px 8px rgba(0,0,0,0.3)'
            : '0 1px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Space size={8} align="center">
          <FundOutlined style={{ fontSize: isMobile ? 18 : 20, color: '#1677ff' }} />
          <Typography.Title
            level={5}
            style={{ margin: 0, fontSize: isMobile ? 15 : 16 }}
          >
            基金研究仪表盘
          </Typography.Title>
          {!isMobile && (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Fund Research Dashboard
            </Typography.Text>
          )}
        </Space>
        <ThemeToggle />
      </Header>

      {children}
    </Layout>
  );
}
