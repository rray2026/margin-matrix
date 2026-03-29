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

const TAB_ITEMS = [
  {
    key: 'macro',
    label: (
      <span>
        <LineChartOutlined style={{ display: 'block', margin: '0 auto 2px', fontSize: 18 }} />
        宏观整体
      </span>
    ),
    children: <MacroTab />,
  },
  {
    key: 'industry',
    label: (
      <span>
        <BarChartOutlined style={{ display: 'block', margin: '0 auto 2px', fontSize: 18 }} />
        行业
      </span>
    ),
    children: <IndustryTab />,
  },
  {
    key: 'company',
    label: (
      <span>
        <BankOutlined style={{ display: 'block', margin: '0 auto 2px', fontSize: 18 }} />
        公司
      </span>
    ),
    children: <CompanyTab />,
  },
];

const DESKTOP_TAB_ITEMS = TAB_ITEMS.map(item => ({
  ...item,
  label: (
    <span>
      {item.key === 'macro' && <LineChartOutlined style={{ marginRight: 6 }} />}
      {item.key === 'industry' && <BarChartOutlined style={{ marginRight: 6 }} />}
      {item.key === 'company' && <BankOutlined style={{ marginRight: 6 }} />}
      {item.key === 'macro' ? '宏观整体' : item.key === 'industry' ? '行业' : '公司'}
    </span>
  ),
}));

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
              items={TAB_ITEMS}
              className="mobile-tabs"
              tabBarStyle={{
                background: isDark ? '#1f1f1f' : '#ffffff',
              }}
              renderTabBar={(props, DefaultTabBar) => (
                <DefaultTabBar {...props} />
              )}
            />
            {/* Safe-area spacer so content isn't hidden behind bottom nav */}
            <div className="bottom-nav-placeholder" />
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
