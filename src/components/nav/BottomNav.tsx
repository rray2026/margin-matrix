import { LineChartOutlined, BarChartOutlined, BankOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import type { NavKey } from './NavSidebar';

const NAV_ITEMS: { key: NavKey; label: string; Icon: React.ComponentType<{ style?: React.CSSProperties }> }[] = [
  { key: 'macro', label: '宏观整体', Icon: LineChartOutlined },
  { key: 'industry', label: '行业', Icon: BarChartOutlined },
  { key: 'company', label: '公司', Icon: BankOutlined },
];

interface BottomNavProps {
  activeKey: NavKey;
  onChange: (key: NavKey) => void;
}

export function BottomNav({ activeKey, onChange }: BottomNavProps) {
  const { isDark } = useTheme();

  const bg = isDark ? '#1a1a1a' : '#ffffff';
  const borderColor = isDark ? '#2d2d2d' : '#e8e8e8';
  const activeColor = isDark ? '#4096ff' : '#1677ff';
  const inactiveColor = isDark ? '#5a5a5a' : '#b0b8c8';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        background: bg,
        borderTop: `1px solid ${borderColor}`,
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        boxShadow: isDark
          ? '0 -4px 20px rgba(0,0,0,0.4)'
          : '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {NAV_ITEMS.map(({ key, label, Icon }) => {
        const isActive = activeKey === key;
        const color = isActive ? activeColor : inactiveColor;

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: '10px 0 8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              position: 'relative',
              transition: 'opacity 0.15s',
            }}
          >
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 32,
                  height: 3,
                  borderRadius: '0 0 4px 4px',
                  background: activeColor,
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 28,
                borderRadius: 8,
                background: isActive
                  ? isDark ? 'rgba(64,150,255,0.15)' : 'rgba(22,119,255,0.10)'
                  : 'transparent',
                transition: 'background 0.2s',
              }}
            >
              <Icon style={{ fontSize: 18, color }} />
            </div>
            <span
              style={{
                fontSize: 11,
                color,
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
