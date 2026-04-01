import { Table, Button, Typography, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DataSource {
  key: string;
  source: string;
  type: string;
  description: string;
  frequency: string;
  lastUpdate: string;
  tab: string;
}

const DATA_SOURCES: DataSource[] = [
  // 宏观
  {
    key: '1',
    source: '国家统计局',
    type: 'GDP增速',
    description: '季度GDP同比 / 环比增速',
    frequency: '季度',
    lastUpdate: '2025-01-17',
    tab: '宏观整体',
  },
  {
    key: '2',
    source: '国家统计局',
    type: 'CPI / PPI',
    description: '居民消费与生产者价格指数',
    frequency: '月度',
    lastUpdate: '2025-03-12',
    tab: '宏观整体',
  },
  {
    key: '3',
    source: '中国人民银行',
    type: '利率数据',
    description: 'LPR、MLF 等政策利率',
    frequency: '月度',
    lastUpdate: '2025-02-20',
    tab: '宏观整体',
  },
  {
    key: '4',
    source: '中国外汇交易中心',
    type: '汇率',
    description: 'USD/CNY、EUR/CNY 中间价',
    frequency: '交易日',
    lastUpdate: '2025-03-29',
    tab: '宏观整体',
  },
  {
    key: '5',
    source: '国家统计局 / 财新',
    type: 'PMI',
    description: '制造业、非制造业、综合 PMI',
    frequency: '月度',
    lastUpdate: '2025-03-31',
    tab: '宏观整体',
  },
  // 行业
  {
    key: '6',
    source: '上交所 / 深交所',
    type: '行业涨跌幅',
    description: '申万一级行业区间收益率',
    frequency: '交易日',
    lastUpdate: '2025-03-29',
    tab: '行业',
  },
  {
    key: '7',
    source: 'Wind',
    type: '行业估值',
    description: '申万行业 PE(TTM) / PB',
    frequency: '交易日',
    lastUpdate: '2025-03-29',
    tab: '行业',
  },
  {
    key: '8',
    source: '沪深港通',
    type: '北向资金',
    description: '北向资金行业净流入金额',
    frequency: '交易日',
    lastUpdate: '2025-03-29',
    tab: '行业',
  },
  {
    key: '9',
    source: 'Wind / 同花顺',
    type: '行业景气度',
    description: '动量、估值、盈利、资金、情绪综合评分',
    frequency: '周度',
    lastUpdate: '2025-03-28',
    tab: '行业',
  },
  // 公司
  {
    key: '10',
    source: '上交所 / 深交所',
    type: '股票行情',
    description: 'A 股日 K 线行情数据',
    frequency: '交易日',
    lastUpdate: '2025-03-29',
    tab: '公司',
  },
  {
    key: '11',
    source: 'Wind / 同花顺',
    type: '公司财务',
    description: '上市公司营收、利润、ROE 等指标',
    frequency: '季度',
    lastUpdate: '2024-10-31',
    tab: '公司',
  },
  {
    key: '12',
    source: '各大券商',
    type: '研究报告',
    description: '卖方分析师评级与目标价',
    frequency: '实时',
    lastUpdate: '2025-03-28',
    tab: '公司',
  },
];

const FREQUENCY_COLOR: Record<string, string> = {
  '实时':  'red',
  '交易日': 'blue',
  '周度':  'cyan',
  '月度':  'green',
  '季度':  'orange',
};

const TAB_COLOR: Record<string, string> = {
  '宏观整体': 'purple',
  '行业':    'blue',
  '公司':    'cyan',
};

const columns: ColumnsType<DataSource> = [
  {
    title: '数据源',
    dataIndex: 'source',
    width: 130,
  },
  {
    title: '数据类型',
    dataIndex: 'type',
    width: 100,
    render: (val: string, row: DataSource) => (
      <span>
        <Tag color={TAB_COLOR[row.tab]} style={{ marginBottom: 2 }}>{row.tab}</Tag>
        <br />{val}
      </span>
    ),
  },
  {
    title: '说明',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: '更新频率',
    dataIndex: 'frequency',
    width: 76,
    render: (val: string) => <Tag color={FREQUENCY_COLOR[val] ?? 'default'}>{val}</Tag>,
  },
  {
    title: '最近更新',
    dataIndex: 'lastUpdate',
    width: 100,
  },
];

interface DataSourcesPageProps {
  onBack: () => void;
  hideBack?: boolean;
}

export function DataSourcesPage({ onBack, hideBack }: DataSourcesPageProps) {
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: hideBack ? '0 4px 16px' : '8px 4px 12px',
      }}>
        {!hideBack && (
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            size="small"
          />
        )}
        <Typography.Title level={5} style={{ margin: 0 }}>
          数据来源
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          共 {DATA_SOURCES.length} 项
        </Typography.Text>
      </div>

      <Table
        columns={columns}
        dataSource={DATA_SOURCES}
        pagination={false}
        size="small"
        scroll={{ x: 'max-content' }}
        rowKey="key"
      />
    </div>
  );
}
