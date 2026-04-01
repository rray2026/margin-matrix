import { useState } from 'react';
import { ConfigProvider, Layout, theme as antdTheme } from 'antd';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MacroTab } from './components/macro/MacroTab';
import { IndustryTab } from './components/industry/IndustryTab';
import { CompanyTab } from './components/company/CompanyTab';
import { NavSidebar } from './components/nav/NavSidebar';
import { BottomNav } from './components/nav/BottomNav';
import { lightTheme, darkTheme } from './styles/theme';
import { useIsMobile } from './hooks/useIsMobile';
import type { NavKey } from './components/nav/NavSidebar';
import './styles/global.css';

const { Sider, Content } = Layout;

function AppContent() {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();
  const [activeKey, setActiveKey] = useState<NavKey>('macro');

  const sidebarBg = isDark ? '#141414' : '#ffffff';
  const sidebarBorder = isDark ? '#2d2d2d' : '#f0f0f0';
  const contentBg = isDark ? '#141414' : '#f0f2f5';

  return (
    <ConfigProvider
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <DashboardLayout>
        <Layout style={{ flex: 1, background: 'transparent' }}>
          {!isMobile && (
            <Sider
              width={220}
              style={{
                background: sidebarBg,
                borderRight: `1px solid ${sidebarBorder}`,
                position: 'sticky',
                top: 56,
                height: 'calc(100vh - 56px)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <NavSidebar activeKey={activeKey} onChange={setActiveKey} />
            </Sider>
          )}
          <Content
            style={{
              background: contentBg,
              minHeight: isMobile ? 'calc(100vh - 48px)' : 'calc(100vh - 56px)',
            }}
          >
            {activeKey === 'macro' && <MacroTab />}
            {activeKey === 'industry' && <IndustryTab />}
            {activeKey === 'company' && <CompanyTab />}
            {isMobile && <div className="bottom-nav-placeholder" />}
          </Content>
        </Layout>

        {isMobile && <BottomNav activeKey={activeKey} onChange={setActiveKey} />}
      </DashboardLayout>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
