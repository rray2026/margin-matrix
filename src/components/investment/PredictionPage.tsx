import { useState } from 'react';
import { Tabs, Empty, Typography, Row, Col } from 'antd';
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

export function PredictionPage() {
  const [predictions, setPredictions] = useState<Prediction[]>(initialPredictions);
  const [filterStatus, setFilterStatus] = useState<PredictionStatus | 'all'>('all');

  const handleTransition = (id: string, next: PredictionStatus) => {
    const now = new Date().toISOString().slice(0, 10);
    setPredictions(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        status: next,
        activeAt:    next === 'active'                          ? now : p.activeAt,
        resolvedAt:  (next === 'realized' || next === 'invalidated') ? now : undefined,
      };
    }));
  };

  const visible = filterStatus === 'all'
    ? predictions
    : predictions.filter(p => p.status === filterStatus);

  /* Count per status for tab labels */
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
      <div style={{ marginBottom: 4 }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          共 {predictions.length} 条预判 · 点击按钮流转状态
        </Typography.Text>
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
    </div>
  );
}
