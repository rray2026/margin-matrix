import { useState } from 'react';
import { ConfigProvider, Tabs, theme as antdTheme } from 'antd';
import { BarChartOutlined, BankOutlined, LineChartOutlined } from '@ant-design/icons';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MacroTab } from './components/macro/MacroTab';
import { IndustryTab } from './components/industry/IndustryTab';
import { CompanyTab } from './components/company/CompanyTab';
import { lightTheme, darkTheme } from './styles/theme';
import { useIsMobile } from './hooks/useIsMobile';
import './styles/global.css';

const CONTENT_ITEMS = [
  { key: 'macro', label: '宏观整体', children: <MacroTab /> },
  { key: 'industry', label: '行业', children: <IndustryTab /> },
  { key: 'company', label: '公司', children: <CompanyTab /> },
];

const DESKTOP_TAB_ITEMS = [
  {
    key: 'macro',
    label: <span><LineChartOutlined style={{ marginRight: 6 }} />宏观整体</span>,
    children: <MacroTab />,
  },
  {
    key: 'industry',
    label: <span><BarChartOutlined style={{ marginRight: 6 }} />行业</span>,
    children: <IndustryTab />,
  },
  {
    key: 'company',
    label: <span><BankOutlined style={{ marginRight: 6 }} />公司</span>,
    children: <CompanyTab />,
  },
];

const MOBILE_NAV = [
  { key: 'macro', Icon: LineChartOutlined, label: '宏观整体' },
  { key: 'industry', Icon: BarChartOutlined, label: '行业' },
  { key: 'company', Icon: BankOutlined, label: '公司' },
];

function AppContent() {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();
  const [activeKey, setActiveKey] = useState('macro');

  return (
    <ConfigProvider
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <DashboardLayout>
        {isMobile ? (
          <>
            <Tabs
              activeKey={activeKey}
              onChange={setActiveKey}
              items={CONTENT_ITEMS}
              tabBarStyle={{ display: 'none' }}
            />
            <div className="bottom-nav-placeholder" />
            <nav className="mobile-bottom-nav" style={{
              background: isDark ? '#1f1f1f' : '#ffffff',
              borderTop: `1px solid ${isDark ? '#434343' : '#f0f0f0'}`,
            }}>
              {MOBILE_NAV.map(({ key, Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className="mobile-bottom-nav-item"
                  style={{
                    color: activeKey === key
                      ? '#1677ff'
                      : (isDark ? '#8c8c8c' : '#8c8c8c'),
                  }}
                >
                  <Icon style={{ fontSize: 22 }} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </>
        ) : (
          <Tabs
            defaultActiveKey="macro"
            type="line"
            size="middle"
            items={DESKTOP_TAB_ITEMS}
            className="desktop-tabs"
            tabBarStyle={{ marginBottom: 16 }}
          />
        )}
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
