import { useState } from 'react';
import { ConfigProvider, Tabs, Dropdown, Space, Typography, theme as antdTheme } from 'antd';
import {
  BarChartOutlined, BankOutlined, LineChartOutlined,
  SettingOutlined, AppstoreOutlined, DownOutlined,
} from '@ant-design/icons';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MacroTab } from './components/macro/MacroTab';
import { IndustryTab } from './components/industry/IndustryTab';
import { CompanyTab } from './components/company/CompanyTab';
import { SettingsTab } from './components/settings/SettingsTab';
import { lightTheme, darkTheme } from './styles/theme';
import { useIsMobile } from './hooks/useIsMobile';
import './styles/global.css';

type MainTab = 'data' | 'settings';
type DataTab = 'macro' | 'industry' | 'company';

const DATA_SUB_TABS = [
  { key: 'macro' as DataTab,    Icon: LineChartOutlined, label: '宏观整体' },
  { key: 'industry' as DataTab, Icon: BarChartOutlined,  label: '行业'     },
  { key: 'company' as DataTab,  Icon: BankOutlined,      label: '公司'     },
];

const DESKTOP_DATA_TAB_ITEMS = [
  { key: 'macro',    label: <span><LineChartOutlined style={{ marginRight: 6 }} />宏观整体</span>, children: <MacroTab />    },
  { key: 'industry', label: <span><BarChartOutlined  style={{ marginRight: 6 }} />行业</span>,     children: <IndustryTab /> },
  { key: 'company',  label: <span><BankOutlined      style={{ marginRight: 6 }} />公司</span>,     children: <CompanyTab />  },
];

const MOBILE_MAIN_NAV = [
  { key: 'data'     as MainTab, Icon: AppstoreOutlined, label: '数据' },
  { key: 'settings' as MainTab, Icon: SettingOutlined,  label: '设置' },
];

function AppContent() {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();
  const [activeMain, setActiveMain] = useState<MainTab>('data');
  const [activeData, setActiveData] = useState<DataTab>('macro');

  const currentSubLabel = DATA_SUB_TABS.find(t => t.key === activeData)?.label ?? '宏观整体';

  // Mobile header left: dropdown to switch data sub-tab, or plain "设置" title
  const mobileHeaderLeft = activeMain === 'data' ? (
    <Dropdown
      menu={{
        selectedKeys: [activeData],
        onClick: ({ key }) => setActiveData(key as DataTab),
        items: DATA_SUB_TABS.map(({ key, Icon, label }) => ({
          key,
          icon: <Icon />,
          label,
        })),
      }}
      trigger={['click']}
    >
      <Space size={4} style={{ cursor: 'pointer' }}>
        <Typography.Title level={5} style={{ margin: 0, fontSize: 15 }}>
          {currentSubLabel}
        </Typography.Title>
        <DownOutlined style={{ fontSize: 11, color: '#8c8c8c' }} />
      </Space>
    </Dropdown>
  ) : (
    <Typography.Title level={5} style={{ margin: 0, fontSize: 15 }}>
      设置
    </Typography.Title>
  );

  return (
    <ConfigProvider
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <DashboardLayout headerLeftContent={isMobile ? mobileHeaderLeft : undefined}>
        {isMobile ? (
          <>
            {/* Render all panels; hide inactive ones to preserve chart state */}
            <div style={{ display: activeMain === 'data' ? 'block' : 'none' }}>
              <div style={{ display: activeData === 'macro'    ? 'block' : 'none' }}><MacroTab /></div>
              <div style={{ display: activeData === 'industry' ? 'block' : 'none' }}><IndustryTab /></div>
              <div style={{ display: activeData === 'company'  ? 'block' : 'none' }}><CompanyTab /></div>
            </div>
            <div style={{ display: activeMain === 'settings' ? 'block' : 'none' }}>
              <SettingsTab />
            </div>

            <div className="bottom-nav-placeholder" />
            <nav className="mobile-bottom-nav" style={{
              background: isDark ? '#1f1f1f' : '#ffffff',
              borderTop: `1px solid ${isDark ? '#434343' : '#f0f0f0'}`,
            }}>
              {MOBILE_MAIN_NAV.map(({ key, Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveMain(key)}
                  className="mobile-bottom-nav-item"
                  style={{
                    color: activeMain === key ? '#1677ff' : (isDark ? '#8c8c8c' : '#8c8c8c'),
                  }}
                >
                  <Icon style={{ fontSize: 22 }} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </>
        ) : (
          /* Desktop: outer tab (数据/设置) → inner tabs for data sub-sections */
          <Tabs
            activeKey={activeMain}
            onChange={key => setActiveMain(key as MainTab)}
            className="desktop-tabs"
            tabBarStyle={{ marginBottom: 0 }}
            items={[
              {
                key: 'data',
                label: <span><AppstoreOutlined style={{ marginRight: 6 }} />数据</span>,
                children: (
                  <Tabs
                    activeKey={activeData}
                    onChange={key => setActiveData(key as DataTab)}
                    tabBarStyle={{ margin: '8px 0 16px' }}
                    items={DESKTOP_DATA_TAB_ITEMS}
                  />
                ),
              },
              {
                key: 'settings',
                label: <span><SettingOutlined style={{ marginRight: 6 }} />设置</span>,
                children: <div style={{ paddingTop: 16 }}><SettingsTab /></div>,
              },
            ]}
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
