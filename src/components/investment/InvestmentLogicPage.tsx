import { useState } from 'react';
import {
  Row, Col, Typography, Button, Empty, Tabs,
  Modal, Form, Input, Select,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InvestmentLogicCard } from './InvestmentLogicCard';
import { initialLogics } from '../../mock/investmentData';
import type { InvestmentLogic, LogicStatus } from '../../types/investment';
import { LOGIC_STATUS_LABEL } from '../../types/investment';

const STATUS_ORDER: (LogicStatus | 'all')[] = ['all', 'active', 'watching', 'exited'];

const STATUS_TAB_LABEL: Record<LogicStatus | 'all', string> = {
  all:      '全部',
  active:   '持有中',
  watching: '观察中',
  exited:   '已退出',
};

/* ── Add Logic Modal ─────────────────────── */

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (l: InvestmentLogic) => void;
}

function AddLogicModal({ open, onClose, onAdd }: AddModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onAdd({
        id: Date.now().toString(),
        subject:     values.subject,
        coreLogic:   values.coreLogic,
        catalysts:   (values.catalysts as string ?? '').split('\n').map((s: string) => s.trim()).filter(Boolean),
        risks:       (values.risks     as string ?? '').split('\n').map((s: string) => s.trim()).filter(Boolean),
        timeHorizon: values.timeHorizon,
        conviction:  values.conviction ?? 'medium',
        status:      'watching',
        createdAt:   new Date().toISOString().slice(0, 10),
        tags:        values.tags ?? [],
      });
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="新增投资逻辑"
      open={open}
      onCancel={() => { form.resetFields(); onClose(); }}
      onOk={handleOk}
      okText="添加"
      cancelText="取消"
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
        <Form.Item name="subject" label="投资标的" rules={[{ required: true, message: '请填写标的' }]}>
          <Input placeholder="e.g. 黄金 / GLD" />
        </Form.Item>
        <Form.Item name="coreLogic" label="核心逻辑" rules={[{ required: true, message: '请填写核心逻辑' }]}>
          <Input.TextArea rows={3} placeholder="支撑这一投资的底层逻辑" />
        </Form.Item>
        <Form.Item name="catalysts" label="催化剂（每行一条）">
          <Input.TextArea rows={3} placeholder="列出可能推动价格的催化因素，每行一条" />
        </Form.Item>
        <Form.Item name="risks" label="主要风险（每行一条）">
          <Input.TextArea rows={3} placeholder="列出主要风险，每行一条" />
        </Form.Item>
        <Form.Item name="timeHorizon" label="持有周期" rules={[{ required: true, message: '请填写周期' }]}>
          <Input placeholder="e.g. 1-2年" />
        </Form.Item>
        <Form.Item name="conviction" label="信念强度" initialValue="medium">
          <Select
            options={[
              { value: 'high',   label: '高' },
              { value: 'medium', label: '中' },
              { value: 'low',    label: '低' },
            ]}
          />
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

export function InvestmentLogicPage() {
  const [logics, setLogics] = useState<InvestmentLogic[]>(initialLogics);
  const [filterStatus, setFilterStatus] = useState<LogicStatus | 'all'>('all');
  const [addOpen, setAddOpen] = useState(false);

  const handleAdd = (l: InvestmentLogic) => {
    setLogics(prev => [l, ...prev]);
  };

  const visible = filterStatus === 'all'
    ? logics
    : logics.filter(l => l.status === filterStatus);

  const counts = logics.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
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
        <Typography.Text type="secondary" style={{ fontSize: 12, flex: 1 }}>
          共 {logics.length} 条
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
        onChange={key => setFilterStatus(key as LogicStatus | 'all')}
        items={tabItems}
        size="small"
        style={{ marginBottom: 12 }}
        tabBarStyle={{ marginBottom: 0 }}
      />

      {visible.length === 0 ? (
        <Empty
          description={`暂无${filterStatus !== 'all' ? LOGIC_STATUS_LABEL[filterStatus as LogicStatus] : ''}投资逻辑`}
          style={{ padding: '40px 0' }}
        />
      ) : (
        <Row gutter={[10, 10]}>
          {visible.map(l => (
            <Col key={l.id} xs={24} md={12} xl={8}>
              <InvestmentLogicCard logic={l} />
            </Col>
          ))}
        </Row>
      )}

      <AddLogicModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
