import { useState } from 'react';
import { ConfigProvider, Dropdown, Space, Typography, theme as antdTheme } from 'antd';
import {
  BarChartOutlined, BankOutlined, LineChartOutlined,
  SettingOutlined, AppstoreOutlined, DownOutlined,
  RiseOutlined, FundOutlined, BulbOutlined, TeamOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MacroTab } from './components/macro/MacroTab';
import { IndustryTab } from './components/industry/IndustryTab';
import { CompanyTab } from './components/company/CompanyTab';
import { SettingsTab } from './components/settings/SettingsTab';
import type { SettingsSection } from './components/settings/SettingsTab';
import { PredictionPage } from './components/investment/PredictionPage';
import { InvestmentLogicPage } from './components/investment/InvestmentLogicPage';
import { MarketConsensusPage } from './components/investment/MarketConsensusPage';
import { lightTheme, darkTheme } from './styles/theme';
import { useIsMobile } from './hooks/useIsMobile';
import './styles/global.css';

type MainTab = 'data' | 'invest' | 'settings';
type DataTab = 'macro' | 'industry' | 'company';
type InvestTab = 'predictions' | 'logic' | 'consensus';

/* ── Sub-item definitions (shared mobile + desktop) ── */

const DATA_SUB_ITEMS = [
  {
    key: 'macro' as DataTab,
    Icon: LineChartOutlined,
    label: '宏观整体',
    desc: 'GDP、CPI、PMI 等核心宏观指标',
    color: '#722ed1',
    bg: 'rgba(114,46,209,0.1)',
  },
  {
    key: 'industry' as DataTab,
    Icon: BarChartOutlined,
    label: '行业',
    desc: '行业估值热力图与景气度分析',
    color: '#fa8c16',
    bg: 'rgba(250,140,22,0.1)',
  },
  {
    key: 'company' as DataTab,
    Icon: BankOutlined,
    label: '公司',
    desc: '个股财务数据与估值对比',
    color: '#52c41a',
    bg: 'rgba(82,196,26,0.1)',
  },
];

const INVEST_SUB_ITEMS = [
  {
    key: 'predictions' as InvestTab,
    Icon: FundOutlined,
    label: '预测',
    desc: '记录并追踪投资预判的验证过程',
    color: '#eb2f96',
    bg: 'rgba(235,47,150,0.1)',
  },
  {
    key: 'logic' as InvestTab,
    Icon: BulbOutlined,
    label: '投资逻辑',
    desc: '系统化管理每个标的的投研逻辑',
    color: '#13c2c2',
    bg: 'rgba(19,194,194,0.1)',
  },
  {
    key: 'consensus' as InvestTab,
    Icon: TeamOutlined,
    label: '市场共识',
    desc: '市场主流观点与共识追踪',
    color: '#1677ff',
    bg: 'rgba(22,119,255,0.1)',
  },
];

const SETTINGS_SUB_ITEMS: Array<{
  key: SettingsSection;
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  label: string;
  desc: string;
  color: string;
  bg: string;
}> = [
  {
    key: 'appearance',
    Icon: BulbOutlined,
    label: '外观',
    desc: '主题与显示偏好设置',
    color: '#faad14',
    bg: 'rgba(250,173,20,0.12)',
  },
  {
    key: 'features',
    Icon: AppstoreOutlined,
    label: '产品功能',
    desc: '了解各模块的功能介绍',
    color: '#722ed1',
    bg: 'rgba(114,46,209,0.1)',
  },
  {
    key: 'datasources',
    Icon: DatabaseOutlined,
    label: '数据来源',
    desc: '查看数据源与更新频率',
    color: '#1677ff',
    bg: 'rgba(22,119,255,0.1)',
  },
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
  const [activeMain,    setActiveMain]    = useState<MainTab>('data');
  const [activeData,    setActiveData]    = useState<DataTab>('macro');
  const [activeInvest,  setActiveInvest]  = useState<InvestTab>('predictions');
  const [activeSettings, setActiveSettings] = useState<SettingsSection>('appearance');

  const currentDataSubLabel   = DATA_SUB_ITEMS.find(t => t.key === activeData)?.label     ?? '宏观整体';
  const currentInvestSubLabel = INVEST_SUB_ITEMS.find(t => t.key === activeInvest)?.label ?? '预测';

  const navTextColor = isDark ? 'rgba(255,255,255,0.75)' : '#262626';

  /* ── Rich dropdown panel renderer ── */
  function renderDropdownPanel<K extends string>(
    items: Array<{
      key: K;
      Icon: React.ComponentType<{ style?: React.CSSProperties }>;
      label: string;
      desc: string;
      color: string;
      bg: string;
    }>,
    selectedKey: string,
    onSelect: (key: K) => void,
  ) {
    return (
      <div style={{
        background: isDark ? '#1f1f1f' : '#ffffff',
        borderRadius: 12,
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)'
          : '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
        padding: 6,
        minWidth: 270,
      }}>
        {items.map(({ key, Icon, label, desc, color, bg }) => {
          const isSelected = selectedKey === key;
          return (
            <div
              key={key}
              className="dropdown-menu-item"
              onClick={() => onSelect(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                background: isSelected
                  ? (isDark ? 'rgba(22,119,255,0.16)' : 'rgba(22,119,255,0.08)')
                  : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <div style={{
                width: 38, height: 38,
                borderRadius: 9,
                background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon style={{ fontSize: 18, color }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '20px',
                  color: isSelected
                    ? '#1677ff'
                    : (isDark ? 'rgba(255,255,255,0.88)' : '#262626'),
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: 12,
                  lineHeight: '18px',
                  color: isDark ? 'rgba(255,255,255,0.4)' : '#8c8c8c',
                  marginTop: 1,
                }}>
                  {desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Desktop top navigation ── */
  const desktopNav = (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Dropdown
        trigger={['hover']}
        dropdownRender={() =>
          renderDropdownPanel(DATA_SUB_ITEMS, activeData, (key) => {
            setActiveMain('data');
            setActiveData(key);
          })
        }
      >
        <div
          className={`desktop-nav-item${activeMain === 'data' ? ' active' : ''}`}
          onClick={() => setActiveMain('data')}
          style={{ color: activeMain === 'data' ? '#1677ff' : navTextColor }}
        >
          数据
          <DownOutlined style={{ fontSize: 10, marginLeft: 4, opacity: 0.55 }} />
        </div>
      </Dropdown>

      <Dropdown
        trigger={['hover']}
        dropdownRender={() =>
          renderDropdownPanel(INVEST_SUB_ITEMS, activeInvest, (key) => {
            setActiveMain('invest');
            setActiveInvest(key);
          })
        }
      >
        <div
          className={`desktop-nav-item${activeMain === 'invest' ? ' active' : ''}`}
          onClick={() => setActiveMain('invest')}
          style={{ color: activeMain === 'invest' ? '#1677ff' : navTextColor }}
        >
          投资
          <DownOutlined style={{ fontSize: 10, marginLeft: 4, opacity: 0.55 }} />
        </div>
      </Dropdown>
    </nav>
  );

  const desktopRight = (
    <Dropdown
      trigger={['hover']}
      dropdownRender={() =>
        renderDropdownPanel(SETTINGS_SUB_ITEMS, activeSettings, (key) => {
          setActiveMain('settings');
          setActiveSettings(key);
        })
      }
      placement="bottomRight"
    >
      <button
        className={`desktop-nav-icon-btn${activeMain === 'settings' ? ' active' : ''}`}
        onClick={() => setActiveMain('settings')}
        title="设置"
        style={{ color: activeMain === 'settings' ? '#1677ff' : navTextColor }}
      >
        <SettingOutlined style={{ fontSize: 18 }} />
      </button>
    </Dropdown>
  );

  /* ── Mobile header left area ── */
  const mobileHeaderLeft = activeMain === 'data' ? (
    <Dropdown
      menu={{
        selectedKeys: [activeData],
        onClick: ({ key }) => setActiveData(key as DataTab),
        items: DATA_SUB_ITEMS.map(({ key, Icon, label }) => ({
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
        items: INVEST_SUB_ITEMS.map(({ key, Icon, label }) => ({
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

  return (
    <ConfigProvider
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <DashboardLayout
        headerLeftContent={isMobile ? mobileHeaderLeft : undefined}
        desktopNav={isMobile ? undefined : desktopNav}
        desktopRight={isMobile ? undefined : desktopRight}
      >
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
            <div style={{ display: activeMain === 'settings' ? 'block' : 'none' }}>
              <SettingsTab
                desktopSection={activeSettings}
                onDesktopSectionChange={setActiveSettings}
              />
            </div>
          </>
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
