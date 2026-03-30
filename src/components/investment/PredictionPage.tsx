import { useState } from 'react';
import {
  Tabs, Empty, Typography, Row, Col,
  Button, Modal, Form, Input, Select,
} from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { PredictionCard } from './PredictionCard';
import { initialPredictions } from '../../mock/investmentData';
import type { Prediction, PredictionStatus } from '../../types/investment';
import { PREDICTION_STATUS_LABEL } from '../../types/investment';

const STATUS_ORDER: (PredictionStatus | 'all')[] = [
  'all', 'active', 'pending', 'realized', 'invalidated',
];

const STATUS_TAB_LABEL: Record<PredictionStatus | 'all', string> = {
  all:         '全部',
  active:      '验证中',
  pending:     '待验证',
  realized:    '已兑现',
  invalidated: '已证伪',
};

/* ── Add Prediction Modal ────────────────── */

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (p: Prediction) => void;
}

function AddPredictionModal({ open, onClose, onAdd }: AddModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onAdd({
        id: Date.now().toString(),
        title:     values.title,
        basis:     values.basis,
        target:    values.target,
        timeframe: values.timeframe,
        tags:      values.tags ?? [],
        status:    'pending',
        createdAt: new Date().toISOString().slice(0, 10),
      });
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="新增预判"
      open={open}
      onCancel={() => { form.resetFields(); onClose(); }}
      onOk={handleOk}
      okText="添加"
      cancelText="取消"
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
        <Form.Item name="title" label="预判标题" rules={[{ required: true, message: '请填写标题' }]}>
          <Input placeholder="简短描述你的预判，e.g. 黄金突破 3,000 美元" />
        </Form.Item>
        <Form.Item name="basis" label="判断依据" rules={[{ required: true, message: '请填写依据' }]}>
          <Input.TextArea rows={3} placeholder="支持这一预判的理由与逻辑" />
        </Form.Item>
        <Form.Item name="target" label="验证标准" rules={[{ required: true, message: '请填写验证标准' }]}>
          <Input.TextArea rows={2} placeholder="明确可量化的验证条件，e.g. COMEX黄金期货收盘价 ≥ 3,000 USD" />
        </Form.Item>
        <Form.Item name="timeframe" label="时间范围" rules={[{ required: true, message: '请填写时间范围' }]}>
          <Input placeholder="e.g. 2025年Q3" />
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

interface PredictionPageProps {
  onBack?: () => void;
}

export function PredictionPage({ onBack }: PredictionPageProps) {
  const [predictions, setPredictions] = useState<Prediction[]>(initialPredictions);
  const [filterStatus, setFilterStatus] = useState<PredictionStatus | 'all'>('all');
  const [addOpen, setAddOpen] = useState(false);

  const handleTransition = (id: string, next: PredictionStatus) => {
    const now = new Date().toISOString().slice(0, 10);
    setPredictions(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        status:     next,
        activeAt:   next === 'active' ? now : p.activeAt,
        resolvedAt: (next === 'realized' || next === 'invalidated') ? now : undefined,
      };
    }));
  };

  const handleAdd = (p: Prediction) => {
    setPredictions(prev => [p, ...prev]);
  };

  const visible = filterStatus === 'all'
    ? predictions
    : predictions.filter(p => p.status === filterStatus);

  const counts = predictions.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  }, {});

  const tabItems = STATUS_ORDER.map(s => ({
    key: s,
    label: (
      <span>
        {STATUS_TAB_LABEL[s]}
        {s !== 'all' && counts[s]
          ? <span style={{
              marginLeft: 4,
              background: 'rgba(128,128,128,0.15)',
              borderRadius: 8,
              padding: '0 5px',
              fontSize: 10,
            }}>{counts[s]}</span>
          : null}
      </span>
    ),
  }));

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0 12px' }}>
        {onBack && (
          <Button type="text" icon={<ArrowLeftOutlined />} size="small" onClick={onBack} />
        )}
        <Typography.Title level={5} style={{ margin: 0, flex: 1 }}>预测</Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 12, marginRight: 4 }}>
          共 {predictions.length} 条
        </Typography.Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="small"
          onClick={() => setAddOpen(true)}
        >
          新增
        </Button>
      </div>

      {/* Filter tabs */}
      <Tabs
        activeKey={filterStatus}
        onChange={key => setFilterStatus(key as PredictionStatus | 'all')}
        items={tabItems}
        size="small"
        style={{ marginBottom: 12 }}
        tabBarStyle={{ marginBottom: 0 }}
      />

      {visible.length === 0 ? (
        <Empty
          description={`暂无${PREDICTION_STATUS_LABEL[filterStatus as PredictionStatus] ?? ''}预判`}
          style={{ padding: '40px 0' }}
        />
      ) : (
        <Row gutter={[10, 10]}>
          {visible.map(p => (
            <Col key={p.id} xs={24} md={12} xl={8}>
              <PredictionCard prediction={p} onTransition={handleTransition} />
            </Col>
          ))}
        </Row>
      )}

      <AddPredictionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
