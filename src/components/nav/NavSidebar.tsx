import { Typography } from 'antd';
import { LineChartOutlined, BarChartOutlined, BankOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

export type NavKey = 'macro' | 'industry' | 'company';

const NAV_ITEMS: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: 'macro', label: '宏观整体', icon: <LineChartOutlined /> },
  { key: 'industry', label: '行业', icon: <BarChartOutlined /> },
  { key: 'company', label: '公司', icon: <BankOutlined /> },
];

interface NavSidebarProps {
  activeKey: NavKey;
  onChange: (key: NavKey) => void;
}

export function NavSidebar({ activeKey, onChange }: NavSidebarProps) {
  const { isDark } = useTheme();

  const borderColor = isDark ? '#2d2d2d' : '#f0f0f0';
  const activeColor = isDark ? '#4096ff' : '#1677ff';
  const inactiveColor = isDark ? '#8c8c8c' : '#595959';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '16px 10px',
      }}
    >
      <Typography.Text
        type="secondary"
        style={{ fontSize: 11, padding: '0 10px 12px', display: 'block', letterSpacing: '0.05em' }}
      >
        导航
      </Typography.Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ key, label, icon }) => {
          const isActive = activeKey === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                background: isActive
                  ? isDark ? 'rgba(64,150,255,0.15)' : 'rgba(22,119,255,0.08)'
                  : 'transparent',
                color: isActive ? activeColor : inactiveColor,
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                borderLeft: `3px solid ${isActive ? activeColor : 'transparent'}`,
              }}
            >
              <span style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        <Typography.Text type="secondary" style={{ fontSize: 11, padding: '0 10px', display: 'block' }}>
          数据更新：2025-03-29
        </Typography.Text>
      </div>
    </div>
  );
}
