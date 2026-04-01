import { useState } from 'react';
import { ConfigProvider, Tabs, Dropdown, Space, Typography, theme as antdTheme } from 'antd';
import {
  BarChartOutlined, BankOutlined, LineChartOutlined,
  SettingOutlined, AppstoreOutlined, DownOutlined,
  RiseOutlined, FundOutlined, BulbOutlined, TeamOutlined,
} from '@ant-design/icons';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MacroTab } from './components/macro/MacroTab';
import { IndustryTab } from './components/industry/IndustryTab';
import { CompanyTab } from './components/company/CompanyTab';
import { SettingsTab } from './components/settings/SettingsTab';
import { PredictionPage } from './components/investment/PredictionPage';
import { InvestmentLogicPage } from './components/investment/InvestmentLogicPage';
import { MarketConsensusPage } from './components/investment/MarketConsensusPage';
import { lightTheme, darkTheme } from './styles/theme';
import { useIsMobile } from './hooks/useIsMobile';
import './styles/global.css';

type MainTab = 'data' | 'invest' | 'settings';
type DataTab = 'macro' | 'industry' | 'company';
type InvestTab = 'predictions' | 'logic' | 'consensus';

const DATA_SUB_TABS = [
  { key: 'macro'    as DataTab, Icon: LineChartOutlined, label: '宏观整体' },
  { key: 'industry' as DataTab, Icon: BarChartOutlined,  label: '行业'     },
  { key: 'company'  as DataTab, Icon: BankOutlined,      label: '公司'     },
];

const INVEST_SUB_TABS = [
  { key: 'predictions' as InvestTab, Icon: FundOutlined,  label: '预测'     },
  { key: 'logic'       as InvestTab, Icon: BulbOutlined,  label: '投资逻辑' },
  { key: 'consensus'   as InvestTab, Icon: TeamOutlined,  label: '市场共识' },
];

const MOBILE_MAIN_NAV = [
  { key: 'data'     as MainTab, Icon: AppstoreOutlined, label: '数据'  },
  { key: 'invest'   as MainTab, Icon: RiseOutlined,     label: '投资'  },
  { key: 'settings' as MainTab, Icon: SettingOutlined,  label: '设置'  },
];

const MAIN_TAB_LABEL: Record<MainTab, string> = {
  data:     '数据',
  invest:   '投资',
  settings: '设置',
};

function AppContent() {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();
  const [activeMain, setActiveMain] = useState<MainTab>('data');
  const [activeData, setActiveData] = useState<DataTab>('macro');
  const [activeInvest, setActiveInvest] = useState<InvestTab>('predictions');

  const currentDataSubLabel   = DATA_SUB_TABS.find(t => t.key === activeData)?.label     ?? '宏观整体';
  const currentInvestSubLabel = INVEST_SUB_TABS.find(t => t.key === activeInvest)?.label ?? '预测';

  const sidebarBorderColor = isDark ? '#303030' : '#f0f0f0';
  const activeNavBg        = isDark ? 'rgba(22,119,255,0.18)' : 'rgba(22,119,255,0.1)';
  const inactiveNavColor   = isDark ? 'rgba(255,255,255,0.65)' : '#595959';

  // Mobile header left area
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
          {currentDataSubLabel}
        </Typography.Title>
        <DownOutlined style={{ fontSize: 11, color: '#8c8c8c' }} />
      </Space>
    </Dropdown>
  ) : activeMain === 'invest' ? (
    <Dropdown
      menu={{
        selectedKeys: [activeInvest],
        onClick: ({ key }) => setActiveInvest(key as InvestTab),
        items: INVEST_SUB_TABS.map(({ key, Icon, label }) => ({
          key,
          icon: <Icon />,
          label,
        })),
      }}
      trigger={['click']}
    >
      <Space size={4} style={{ cursor: 'pointer' }}>
        <Typography.Title level={5} style={{ margin: 0, fontSize: 15 }}>
          {currentInvestSubLabel}
        </Typography.Title>
        <DownOutlined style={{ fontSize: 11, color: '#8c8c8c' }} />
      </Space>
    </Dropdown>
  ) : (
    <Typography.Title level={5} style={{ margin: 0, fontSize: 15 }}>
      {MAIN_TAB_LABEL[activeMain]}
    </Typography.Title>
  );

  /** Renders a sidebar + content layout for data/invest sub-navigation on desktop */
  function DesktopSubNav<K extends string>({
    tabs,
    activeKey,
    setActive,
    children,
  }: {
    tabs: { key: K; Icon: React.ComponentType<{ style?: React.CSSProperties }>; label: string }[];
    activeKey: K;
    setActive: (k: K) => void;
    children: React.ReactNode;
  }) {
    return (
      <div style={{ display: 'flex', paddingTop: 8, minHeight: 'calc(100vh - 170px)' }}>
        {/* Sidebar */}
        <div style={{
          width: 160,
          flexShrink: 0,
          borderRight: `1px solid ${sidebarBorderColor}`,
          paddingRight: 8,
          paddingTop: 4,
        }}>
          {tabs.map(({ key, Icon, label }) => {
            const isActive = activeKey === key;
            return (
              <div
                key={key}
                className="sidebar-nav-item"
                onClick={() => setActive(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '9px 12px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  marginBottom: 2,
                  background: isActive ? activeNavBg : 'transparent',
                  color: isActive ? '#1677ff' : inactiveNavColor,
                  fontWeight: isActive ? 500 : 400,
                  fontSize: 14,
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                <Icon style={{ fontSize: 16 }} />
                {label}
              </div>
            );
          })}
        </div>
        {/* Content */}
        <div style={{ flex: 1, paddingLeft: 24, minWidth: 0 }}>
          {children}
        </div>
      </div>
    );
  }

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
            <div style={{ display: activeMain === 'data' ? 'block' : 'none' }}>
              <div style={{ display: activeData === 'macro'    ? 'block' : 'none' }}><MacroTab /></div>
              <div style={{ display: activeData === 'industry' ? 'block' : 'none' }}><IndustryTab /></div>
              <div style={{ display: activeData === 'company'  ? 'block' : 'none' }}><CompanyTab /></div>
            </div>
            <div style={{ display: activeMain === 'invest' ? 'block' : 'none' }}>
              <div style={{ display: activeInvest === 'predictions' ? 'block' : 'none' }}><PredictionPage /></div>
              <div style={{ display: activeInvest === 'logic'       ? 'block' : 'none' }}><InvestmentLogicPage /></div>
              <div style={{ display: activeInvest === 'consensus'   ? 'block' : 'none' }}><MarketConsensusPage /></div>
            </div>
            <div style={{ display: activeMain === 'settings' ? 'block' : 'none' }}><SettingsTab /></div>

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
                  style={{ color: activeMain === key ? '#1677ff' : (isDark ? '#8c8c8c' : '#8c8c8c') }}
                >
                  <Icon style={{ fontSize: 22 }} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </>
        ) : (
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
                  <DesktopSubNav
                    tabs={DATA_SUB_TABS}
                    activeKey={activeData}
                    setActive={setActiveData}
                  >
                    <div style={{ display: activeData === 'macro'    ? 'block' : 'none' }}><MacroTab /></div>
                    <div style={{ display: activeData === 'industry' ? 'block' : 'none' }}><IndustryTab /></div>
                    <div style={{ display: activeData === 'company'  ? 'block' : 'none' }}><CompanyTab /></div>
                  </DesktopSubNav>
                ),
              },
              {
                key: 'invest',
                label: <span><RiseOutlined style={{ marginRight: 6 }} />投资</span>,
                children: (
                  <DesktopSubNav
                    tabs={INVEST_SUB_TABS}
                    activeKey={activeInvest}
                    setActive={setActiveInvest}
                  >
                    <div style={{ display: activeInvest === 'predictions' ? 'block' : 'none' }}><PredictionPage /></div>
                    <div style={{ display: activeInvest === 'logic'       ? 'block' : 'none' }}><InvestmentLogicPage /></div>
                    <div style={{ display: activeInvest === 'consensus'   ? 'block' : 'none' }}><MarketConsensusPage /></div>
                  </DesktopSubNav>
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
