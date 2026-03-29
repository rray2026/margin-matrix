import { Switch, Tooltip } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDark ? '切换亮色主题' : '切换暗色主题'}>
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        checkedChildren={<BulbFilled />}
        unCheckedChildren={<BulbOutlined />}
      />
    </Tooltip>
  );
}
