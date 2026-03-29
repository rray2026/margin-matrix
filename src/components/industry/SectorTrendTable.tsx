import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { SectorTrendRow } from '../../types/industry';

interface SectorTrendTableProps {
  data: SectorTrendRow[];
}

function ChangeCell({ value }: { value: number }) {
  const color = value > 0 ? '#f5222d' : value < 0 ? '#52c41a' : '#8c8c8c';
  return (
    <Typography.Text style={{ color, fontWeight: 500 }}>
      {value > 0 ? '+' : ''}{value.toFixed(2)}%
    </Typography.Text>
  );
}

export function SectorTrendTable({ data }: SectorTrendTableProps) {
  const columns: ColumnsType<SectorTrendRow> = [
    {
      title: '行业',
      dataIndex: 'sector',
      fixed: 'left',
      width: 88,
      render: (val: string) => <Typography.Text strong>{val}</Typography.Text>,
    },
    {
      title: '日涨跌',
      dataIndex: 'change1d',
      width: 80,
      sorter: (a, b) => a.change1d - b.change1d,
      render: (val: number) => <ChangeCell value={val} />,
    },
    {
      title: '周涨跌',
      dataIndex: 'change1w',
      width: 80,
      sorter: (a, b) => a.change1w - b.change1w,
      render: (val: number) => <ChangeCell value={val} />,
    },
    {
      title: '月涨跌',
      dataIndex: 'change1m',
      width: 80,
      sorter: (a, b) => a.change1m - b.change1m,
      render: (val: number) => <ChangeCell value={val} />,
    },
    {
      title: '季涨跌',
      dataIndex: 'change3m',
      width: 80,
      sorter: (a, b) => a.change3m - b.change3m,
      render: (val: number) => <ChangeCell value={val} />,
    },
    {
      title: 'PE(TTM)',
      dataIndex: 'pe',
      width: 80,
      sorter: (a, b) => a.pe - b.pe,
      render: (val: number) => val.toFixed(1),
    },
    {
      title: 'PB',
      dataIndex: 'pb',
      width: 70,
      sorter: (a, b) => a.pb - b.pb,
      render: (val: number) => val.toFixed(2),
    },
    {
      title: '北向净流入(亿)',
      dataIndex: 'northboundFlow',
      width: 110,
      sorter: (a, b) => a.northboundFlow - b.northboundFlow,
      render: (val: number) => (
        <Typography.Text style={{ color: val > 0 ? '#f5222d' : val < 0 ? '#52c41a' : '#8c8c8c' }}>
          {val > 0 ? '+' : ''}{val.toFixed(1)}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="key"
      pagination={false}
      size="small"
      scroll={{ x: 680 }}
    />
  );
}
