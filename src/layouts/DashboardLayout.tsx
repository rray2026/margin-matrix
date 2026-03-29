import { Layout, Typography, Space } from 'antd';
import { FundOutlined } from '@ant-design/icons';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import type { ReactNode } from 'react';

const { Header, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isDark } = useTheme();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: isDark ? '#1f1f1f' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#434343' : '#f0f0f0'}`,
        height: 56,
        lineHeight: '56px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <Space size={12} align="center">
          <FundOutlined style={{ fontSize: 22, color: '#1677ff' }} />
          <Typography.Title level={5} style={{ margin: 0, lineHeight: '56px' }}>
            基金研究仪表盘
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Fund Research Dashboard
          </Typography.Text>
        </Space>
        <Space>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            数据更新：2025-03-29
          </Typography.Text>
          <ThemeToggle />
        </Space>
      </Header>
      <Content style={{ background: isDark ? '#141414' : '#f0f2f5' }}>
        <div className="dashboard-content">
          {children}
        </div>
      </Content>
    </Layout>
  );
}
