import { ConfigProvider, Tabs, theme as antdTheme } from 'antd';
import { BarChartOutlined, BankOutlined, LineChartOutlined } from '@ant-design/icons';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MacroTab } from './components/macro/MacroTab';
import { IndustryTab } from './components/industry/IndustryTab';
import { CompanyTab } from './components/company/CompanyTab';
import { lightTheme, darkTheme } from './styles/theme';
import './styles/global.css';

const TAB_ITEMS = [
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

function AppContent() {
  const { isDark } = useTheme();

  return (
    <ConfigProvider
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <DashboardLayout>
        <Tabs
          defaultActiveKey="macro"
          type="line"
          size="middle"
          items={TAB_ITEMS}
          tabBarStyle={{ marginBottom: 16 }}
        />
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
