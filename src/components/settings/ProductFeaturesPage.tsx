import { Card, Typography, Button } from 'antd';
import {
  ArrowLeftOutlined,
  AppstoreOutlined,
  LineChartOutlined,
  BarChartOutlined,
  BankOutlined,
  FundOutlined,
  BulbOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Feature {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  summary: string;
  details: string[];
}

const FEATURES: Feature[] = [
  {
    icon: <AppstoreOutlined style={{ fontSize: 20, color: '#1677ff' }} />,
    iconBg: 'rgba(22,119,255,0.1)',
    title: '数据看板',
    summary: '聚合宏观、行业、公司三个维度的核心金融数据，提供结构化的投研信息入口。',
    details: [
      '三级导航结构，移动端顶部下拉切换，桌面端双层 Tab 展示',
      '数据卡片统一规范，便于快速浏览关键指标',
    ],
  },
  {
    icon: <LineChartOutlined style={{ fontSize: 20, color: '#722ed1' }} />,
    iconBg: 'rgba(114,46,209,0.1)',
    title: '宏观整体',
    summary: '追踪 GDP 增速、CPI、PPI、PMI、M2 等关键宏观经济指标，辅助判断经济周期所处位置。',
    details: [
      '主要宏观指标趋势图与同比/环比变化',
      '货币政策与财政政策动向',
      '美联储利率、美元指数、大宗商品价格等全球宏观数据',
    ],
  },
  {
    icon: <BarChartOutlined style={{ fontSize: 20, color: '#fa8c16' }} />,
    iconBg: 'rgba(250,140,22,0.1)',
    title: '行业分析',
    summary: '行业估值热力图与纵向估值分位对比，快速识别高估/低估行业，发现结构性机会。',
    details: [
      '行业 PE/PB 热力图，颜色直观反映估值水位',
      '各行业当前估值在历史区间中的分位排名',
      '供应链分析：涵盖汽车、半导体、新能源、消费电子、医药生物、食品饮料六大产业',
      '供应链节点可交互，点击查看产业上中下游结构及重点企业',
    ],
  },
  {
    icon: <BankOutlined style={{ fontSize: 20, color: '#52c41a' }} />,
    iconBg: 'rgba(82,196,26,0.1)',
    title: '公司研究',
    summary: '个股基本面数据展示，包括营收利润趋势、ROE 等核心财务指标。',
    details: [
      '营收与净利润多年趋势对比',
      'ROE / 毛利率 / 净利率等盈利质量指标',
      '个股估值指标与所在行业均值对比',
    ],
  },
  {
    icon: <FundOutlined style={{ fontSize: 20, color: '#eb2f96' }} />,
    iconBg: 'rgba(235,47,150,0.1)',
    title: '预测追踪',
    summary: '将投资预判结构化记录，通过状态流转追踪验证过程，复盘判断准确率。',
    details: [
      '四阶段状态：待验证 → 验证中 → 已兑现 / 已证伪',
      '每条预判包含标题、判断依据、可量化验证标准与时间范围',
      '按状态筛选，快速聚焦当前验证中的预判',
      '支持新增预判，记录每一个投研想法',
    ],
  },
  {
    icon: <BulbOutlined style={{ fontSize: 20, color: '#13c2c2' }} />,
    iconBg: 'rgba(19,194,194,0.1)',
    title: '投资逻辑',
    summary: '系统化记录每一个投资标的的核心逻辑、催化剂与风险，形成可沉淀的投研知识库。',
    details: [
      '信念强度分级（高/中/低），反映对逻辑的把握程度',
      '持有状态管理：持有中、观察中、已退出',
      '展开卡片查看完整催化剂列表与主要风险点',
      '标签体系便于跨标的检索相关逻辑',
    ],
  },
  {
    icon: <ApartmentOutlined style={{ fontSize: 20, color: '#f5222d' }} />,
    iconBg: 'rgba(245,34,45,0.1)',
    title: '供应链分析',
    summary: '可视化产业链上中下游结构，帮助理解行业内各环节的价值分布与竞争格局。',
    details: [
      '节点交互式展示：服务、产品、供应、购买等各层级',
      '点击节点查看该环节的重点企业与核心特征',
      '支持汽车、半导体、新能源、消费电子、医药生物、食品饮料六大产业',
      '产业链条形图直观对比各环节市值规模',
    ],
  },
];

interface Props {
  onBack: () => void;
  hideBack?: boolean;
}

export function ProductFeaturesPage({ onBack, hideBack }: Props) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: hideBack ? '0 0 16px' : '4px 0 16px' }}>
        {!hideBack && <Button type="text" icon={<ArrowLeftOutlined />} size="small" onClick={onBack} />}
        <Title level={5} style={{ margin: 0 }}>产品功能</Title>
      </div>

      <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 20 }}>
        Margin Matrix 是一款面向个人投资者的基本面研究工具，整合宏观数据、行业分析、供应链研究与投资记录管理，帮助你构建系统化的投研工作流。
      </Paragraph>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FEATURES.map(f => (
          <Card key={f.title} size="small" styles={{ body: { padding: '14px 16px' } }} style={{ borderRadius: 10 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: f.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}>
                {f.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <Paragraph style={{ fontSize: 13, margin: '0 0 8px', color: 'rgba(0,0,0,0.65)' }}>
                  {f.summary}
                </Paragraph>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {f.details.map((d, i) => (
                    <li key={i}>
                      <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>{d}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
