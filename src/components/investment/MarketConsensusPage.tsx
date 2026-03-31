import { useState } from 'react';
import {
  Row, Col, Typography, Button, Empty, Tabs,
  Modal, Form, Input, Select, Radio,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MarketConsensusCard } from './MarketConsensusCard';
import { initialConsensus } from '../../mock/investmentData';
import type {
  MarketConsensus, ConsensusStance, ConsensusStatus,
} from '../../types/investment';
import {
  CONSENSUS_STANCE_LABEL, CONSENSUS_STATUS_LABEL,
} from '../../types/investment';

type FilterTab = 'all' | ConsensusStance | ConsensusStatus;

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all',         label: '全部'   },
  { key: 'agree',       label: '认同'   },
  { key: 'disagree',    label: '反对'   },
  { key: 'neutral',     label: '观望'   },
  { key: 'tracking',    label: '追踪中' },
  { key: 'confirmed',   label: '已证实' },
  { key: 'invalidated', label: '已证伪' },
];

/* ── Add Modal ──────────────────────────── */

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (c: MarketConsensus) => void;
}

function AddConsensusModal({ open, onClose, onAdd }: AddModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      const rawMetrics = (values.metrics as string ?? '').trim();
      const metrics = rawMetrics
        ? rawMetrics.split('\n').map((line: string) => {
            const [label, rest = ''] = line.split('：');
            const [value, source]   = rest.split('(');
            return {
              label: label.trim(),
              value: value.trim(),
              source: source ? source.replace(')', '').trim() : undefined,
            };
          })
        : undefined;

      onAdd({
        id:              Date.now().toString(),
        subject:         values.subject,
        subjectType:     values.subjectType,
        consensusType:   values.consensusType,
        content:         values.content,
        metrics:         metrics?.length ? metrics : undefined,
        myStance:        values.myStance ?? 'neutral',
        myReason:        values.myReason || undefined,
        status:          'tracking',
        createdAt:       new Date().toISOString().slice(0, 10),
        tags:            values.tags ?? [],
      });
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="录入市场共识"
      open={open}
      onCancel={() => { form.resetFields(); onClose(); }}
      onOk={handleOk}
      okText="添加"
      cancelText="取消"
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
        <Form.Item name="subject" label="标的名称" rules={[{ required: true, message: '请填写标的' }]}>
          <Input placeholder="e.g. 宁德时代 / 半导体行业" />
        </Form.Item>
        <Form.Item name="subjectType" label="标的类型" initialValue="stock">
          <Radio.Group>
            <Radio value="stock">个股</Radio>
            <Radio value="industry">行业</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="consensusType" label="共识类型" initialValue="qualitative">
          <Radio.Group>
            <Radio value="qualitative">定性</Radio>
            <Radio value="quantitative">定量</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="content" label="共识内容" rules={[{ required: true, message: '请描述共识' }]}>
          <Input.TextArea rows={3} placeholder="市场对该标的的主流观点或预期" />
        </Form.Item>
        <Form.Item
          name="metrics"
          label="定量指标（可选，每行格式：指标名称：数值(来源)）"
          extra="例：目标价中值：¥192(彭博一致预期)"
        >
          <Input.TextArea rows={3} placeholder="仅定量共识填写" />
        </Form.Item>
        <Form.Item name="myStance" label="我的立场" initialValue="neutral">
          <Select
            options={(['agree', 'disagree', 'neutral'] as ConsensusStance[]).map(s => ({
              value: s,
              label: CONSENSUS_STANCE_LABEL[s],
            }))}
          />
        </Form.Item>
        <Form.Item name="myReason" label="立场理由（可选）">
          <Input.TextArea rows={2} placeholder="支持或反对该共识的具体理由" />
        </Form.Item>
        <Form.Item name="tags" label="标签（可选）">
          <Select
            mode="tags"
            placeholder="输入标签后按回车"
            tokenSeparators={[',']}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

/* ── Main Component ─────────────────────── */

export function MarketConsensusPage() {
  const [items, setItems]           = useState<MarketConsensus[]>(initialConsensus);
  const [filterTab, setFilterTab]   = useState<FilterTab>('all');
  const [addOpen, setAddOpen]       = useState(false);

  const handleAdd = (c: MarketConsensus) => {
    setItems(prev => [c, ...prev]);
  };

  const handleUpdate = (id: string, stance: ConsensusStance, reason: string) => {
    setItems(prev => prev.map(c =>
      c.id === id
        ? { ...c, myStance: stance, myReason: reason, updatedAt: new Date().toISOString().slice(0, 10) }
        : c
    ));
  };

  const visible = items.filter(c => {
    if (filterTab === 'all') return true;
    if (filterTab === 'agree' || filterTab === 'disagree' || filterTab === 'neutral') {
      return c.myStance === filterTab;
    }
    return c.status === filterTab;
  });

  const counts = items.reduce<Record<string, number>>((acc, c) => {
    acc[c.myStance] = (acc[c.myStance] ?? 0) + 1;
    acc[c.status]   = (acc[c.status]   ?? 0) + 1;
    return acc;
  }, {});

  const tabItems = FILTER_TABS.map(({ key, label }) => ({
    key,
    label: (
      <span>
        {label}
        {key !== 'all' && counts[key]
          ? <span style={{
              marginLeft: 4,
              background: 'rgba(128,128,128,0.15)',
              borderRadius: 8,
              padding: '0 5px',
              fontSize: 10,
            }}>{counts[key]}</span>
          : null}
      </span>
    ),
  }));

  const emptyDesc = filterTab === 'all'
    ? '暂无市场共识记录'
    : `暂无「${
        CONSENSUS_STANCE_LABEL[filterTab as ConsensusStance]
        ?? CONSENSUS_STATUS_LABEL[filterTab as ConsensusStatus]
        ?? ''
      }」记录`;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0 12px' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12, flex: 1 }}>
          共 {items.length} 条
        </Typography.Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="small"
          onClick={() => setAddOpen(true)}
        >
          录入
        </Button>
      </div>

      {/* Filter tabs */}
      <Tabs
        activeKey={filterTab}
        onChange={key => setFilterTab(key as FilterTab)}
        items={tabItems}
        size="small"
        style={{ marginBottom: 12 }}
        tabBarStyle={{ marginBottom: 0 }}
      />

      {visible.length === 0 ? (
        <Empty description={emptyDesc} style={{ padding: '40px 0' }} />
      ) : (
        <Row gutter={[10, 10]}>
          {visible.map(c => (
            <Col key={c.id} xs={24} md={12} xl={8}>
              <MarketConsensusCard consensus={c} onUpdate={handleUpdate} />
            </Col>
          ))}
        </Row>
      )}

      <AddConsensusModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
