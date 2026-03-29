import { Table, Tag, Typography, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ResearchReport } from '../../types/company';

interface ResearchReportsTableProps {
  data: ResearchReport[];
}

const ratingColors: Record<string, string> = {
  '买入': 'red',
  '增持': 'orange',
  '中性': 'default',
  '减持': 'green',
  '卖出': 'cyan',
};

export function ResearchReportsTable({ data }: ResearchReportsTableProps) {
  const columns: ColumnsType<ResearchReport> = [
    {
      title: '日期',
      dataIndex: 'date',
      width: 100,
      sorter: (a, b) => a.date.localeCompare(b.date),
      defaultSortOrder: 'descend',
    },
    {
      title: '报告标题',
      dataIndex: 'title',
      ellipsis: true,
      render: (val: string) => (
        <Tooltip title={val}>
          <Typography.Text>{val}</Typography.Text>
        </Tooltip>
      ),
    },
    {
      title: '机构',
      dataIndex: 'institution',
      width: 90,
    },
    {
      title: '分析师',
      dataIndex: 'analyst',
      width: 76,
    },
    {
      title: '评级',
      dataIndex: 'rating',
      width: 70,
      filters: [
        { text: '买入', value: '买入' },
        { text: '增持', value: '增持' },
        { text: '中性', value: '中性' },
      ],
      onFilter: (value, record) => record.rating === value,
      render: (val: string) => <Tag color={ratingColors[val] ?? 'default'}>{val}</Tag>,
    },
    {
      title: '目标价',
      dataIndex: 'targetPrice',
      width: 80,
      sorter: (a, b) => a.targetPrice - b.targetPrice,
      render: (val: number) => (
        <Typography.Text strong style={{ color: '#f5222d' }}>
          ¥{val.toFixed(2)}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5, size: 'small' }}
      size="small"
    />
  );
}
