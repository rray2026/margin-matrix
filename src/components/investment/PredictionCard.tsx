import { Badge, Tag, Typography, Button, Space, Tooltip } from 'antd';
import {
  ClockCircleOutlined, SyncOutlined, CheckCircleOutlined,
  CloseCircleOutlined, CalendarOutlined, AimOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import type { Prediction, PredictionStatus } from '../../types/investment';
import {
  PREDICTION_STATUS_LABEL,
  PREDICTION_TRANSITIONS,
} from '../../types/investment';

const { Text, Paragraph } = Typography;

/* ── Status visual config ────────────────── */

const STATUS_CONFIG: Record<PredictionStatus, {
  icon: React.ReactNode;
  borderColor: string;
  headerBg: string;
  badgeStatus: 'default' | 'processing' | 'success' | 'error';
}> = {
  pending: {
    icon: <ClockCircleOutlined />,
    borderColor: '#d9d9d9',
    headerBg: 'rgba(0,0,0,0.02)',
    badgeStatus: 'default',
  },
  active: {
    icon: <SyncOutlined spin />,
    borderColor: '#fa8c16',
    headerBg: 'rgba(250,140,22,0.06)',
    badgeStatus: 'processing',
  },
  realized: {
    icon: <CheckCircleOutlined />,
    borderColor: '#52c41a',
    headerBg: 'rgba(82,196,26,0.06)',
    badgeStatus: 'success',
  },
  invalidated: {
    icon: <CloseCircleOutlined />,
    borderColor: '#ff4d4f',
    headerBg: 'rgba(255,77,79,0.06)',
    badgeStatus: 'error',
  },
};

/* ── Transition buttons ──────────────────── */

function TransitionButtons({
  status,
  onTransition,
}: {
  status: PredictionStatus;
  onTransition: (next: PredictionStatus) => void;
}) {
  const nexts = PREDICTION_TRANSITIONS[status];
  if (nexts.length === 0) return null;

  const buttonConfig: Partial<Record<PredictionStatus, { label: string; type: 'primary' | 'default' | 'dashed'; danger?: boolean }>> = {
    pending:     { label: '开始验证', type: 'primary' },
    active:      { label: '开始验证', type: 'primary' },
    realized:    { label: '已兑现',   type: 'default' },
    invalidated: { label: '已证伪',   type: 'default', danger: true },
  };

  const labelMap: Record<PredictionStatus, string> = {
    pending:     '开始验证',
    active:      '验证中',
    realized:    '标记兑现',
    invalidated: '标记证伪',
  };

  const resetLabel = '重置为待验证';

  return (
    <Space size={6} wrap>
      {nexts.map(next => {
        const isReset = next === 'pending';
        const isRealized = next === 'realized';
        return (
          <Button
            key={next}
            size="small"
            type={isReset ? 'dashed' : isRealized ? 'primary' : 'default'}
            danger={next === 'invalidated'}
            onClick={() => onTransition(next)}
            style={{ fontSize: 11 }}
          >
            {isReset ? resetLabel : labelMap[next]}
          </Button>
        );
      })}
    </Space>
  );
}

/* ── Main Card ───────────────────────────── */

interface PredictionCardProps {
  prediction: Prediction;
  onTransition: (id: string, next: PredictionStatus) => void;
}

export function PredictionCard({ prediction, onTransition }: PredictionCardProps) {
  const { status } = prediction;
  const cfg = STATUS_CONFIG[status];

  return (
    <div style={{
      border: `1px solid ${cfg.borderColor}`,
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: cfg.headerBg,
        borderBottom: `1px solid ${cfg.borderColor}`,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}>
        <Badge status={cfg.badgeStatus} text={
          <Text style={{ fontSize: 12, fontWeight: 600 }}>
            {cfg.icon}&nbsp;{PREDICTION_STATUS_LABEL[status]}
          </Text>
        } />
        <Text type="secondary" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>
          <CalendarOutlined style={{ marginRight: 3 }} />
          {prediction.createdAt}
        </Text>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px' }}>
        {/* Title */}
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, lineHeight: 1.4 }}>
          {prediction.title}
        </div>

        {/* Basis */}
        <div style={{ marginBottom: 6 }}>
          <Text type="secondary" style={{ fontSize: 11 }}>
            <BulbOutlined style={{ marginRight: 4, color: '#fa8c16' }} />判断依据
          </Text>
          <Paragraph
            style={{ fontSize: 12, margin: '2px 0 0', lineHeight: 1.6 }}
            ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}
          >
            {prediction.basis}
          </Paragraph>
        </div>

        {/* Target */}
        <div style={{ marginBottom: 8 }}>
          <Text type="secondary" style={{ fontSize: 11 }}>
            <AimOutlined style={{ marginRight: 4, color: '#1677ff' }} />验证标准
          </Text>
          <div style={{ fontSize: 12, marginTop: 2, lineHeight: 1.6 }}>
            {prediction.target}
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          <Tag color="blue" style={{ fontSize: 10, margin: 0 }}>
            <ClockCircleOutlined style={{ marginRight: 2 }} />{prediction.timeframe}
          </Tag>
          {prediction.tags.map(t => (
            <Tag key={t} style={{ fontSize: 10, margin: 0 }}>{t}</Tag>
          ))}
        </div>

        {/* Resolved date */}
        {prediction.resolvedAt && (
          <div style={{ marginBottom: 8 }}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              结案时间：{prediction.resolvedAt}
            </Text>
          </div>
        )}

        {/* Transitions */}
        <TransitionButtons
          status={status}
          onTransition={next => onTransition(prediction.id, next)}
        />
      </div>
    </div>
  );
}
