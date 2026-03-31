import { useState } from 'react';
import { Card, Tag, Badge, Typography, Space, Button, Input, Divider } from 'antd';
import { CheckOutlined, CloseOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import type { MarketConsensus, ConsensusStance } from '../../types/investment';
import {
  CONSENSUS_STANCE_LABEL, CONSENSUS_STANCE_COLOR,
  CONSENSUS_STATUS_LABEL, CONSENSUS_STATUS_COLOR,
  CONSENSUS_TYPE_LABEL,
} from '../../types/investment';

const { Text, Paragraph } = Typography;

const STANCE_ICONS: Record<ConsensusStance, React.ReactNode> = {
  agree:    <CheckOutlined />,
  disagree: <CloseOutlined />,
  neutral:  <MinusOutlined />,
};

interface Props {
  consensus: MarketConsensus;
  onUpdate: (id: string, stance: ConsensusStance, reason: string) => void;
}

export function MarketConsensusCard({ consensus: c, onUpdate }: Props) {
  const [editingReason, setEditingReason] = useState(false);
  const [reasonDraft, setReasonDraft]     = useState(c.myReason ?? '');

  const handleStance = (stance: ConsensusStance) => {
    onUpdate(c.id, stance, stance === c.myStance ? c.myReason ?? '' : c.myReason ?? '');
  };

  const saveReason = () => {
    onUpdate(c.id, c.myStance, reasonDraft);
    setEditingReason(false);
  };

  return (
    <Card
      size="small"
      style={{ borderRadius: 10 }}
      styles={{ body: { padding: '12px 14px' } }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Space size={4} wrap style={{ marginBottom: 4 }}>
            <Text strong style={{ fontSize: 14 }}>{c.subject}</Text>
            <Tag style={{ fontSize: 10, margin: 0, padding: '0 5px', lineHeight: '16px' }}>
              {c.subjectType === 'stock' ? '个股' : '行业'}
            </Tag>
            <Tag
              color={c.consensusType === 'qualitative' ? 'purple' : 'blue'}
              style={{ fontSize: 10, margin: 0, padding: '0 5px', lineHeight: '16px' }}
            >
              {CONSENSUS_TYPE_LABEL[c.consensusType]}
            </Tag>
          </Space>
        </div>
        <Badge
          status={CONSENSUS_STATUS_COLOR[c.status] as any}
          text={<Text style={{ fontSize: 11 }}>{CONSENSUS_STATUS_LABEL[c.status]}</Text>}
        />
      </div>

      {/* Consensus content */}
      <Paragraph
        style={{ fontSize: 13, color: 'rgba(0,0,0,0.72)', margin: '0 0 10px', lineHeight: 1.65 }}
      >
        {c.content}
      </Paragraph>

      {/* Quantitative metrics */}
      {c.metrics && c.metrics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {c.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(22,119,255,0.06)',
                border: '1px solid rgba(22,119,255,0.15)',
                borderRadius: 6,
                padding: '3px 8px',
              }}
            >
              <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{m.label}：</Text>
              <Text style={{ fontSize: 12, fontWeight: 600, color: '#1677ff' }}>{m.value}</Text>
              {m.source && (
                <Text style={{ fontSize: 10, color: '#bfbfbf', marginLeft: 4 }}>({m.source})</Text>
              )}
            </div>
          ))}
        </div>
      )}

      <Divider style={{ margin: '8px 0' }} />

      {/* Personal stance */}
      <div>
        <Text style={{ fontSize: 11, color: '#8c8c8c', display: 'block', marginBottom: 6 }}>
          我的立场
        </Text>
        <Space size={6} style={{ marginBottom: 8 }}>
          {(['agree', 'disagree', 'neutral'] as ConsensusStance[]).map(stance => {
            const active = c.myStance === stance;
            return (
              <Button
                key={stance}
                size="small"
                icon={STANCE_ICONS[stance]}
                onClick={() => handleStance(stance)}
                style={{
                  fontSize: 12,
                  borderColor: active ? CONSENSUS_STANCE_COLOR[stance] : undefined,
                  color:       active ? CONSENSUS_STANCE_COLOR[stance] : undefined,
                  background:  active ? `${CONSENSUS_STANCE_COLOR[stance]}15` : undefined,
                  fontWeight:  active ? 600 : 400,
                }}
              >
                {CONSENSUS_STANCE_LABEL[stance]}
              </Button>
            );
          })}
        </Space>

        {/* Reason */}
        {editingReason ? (
          <div>
            <Input.TextArea
              autoFocus
              rows={3}
              value={reasonDraft}
              onChange={e => setReasonDraft(e.target.value)}
              placeholder="说明理由…"
              style={{ fontSize: 12, marginBottom: 6 }}
            />
            <Space size={6}>
              <Button size="small" type="primary" onClick={saveReason}>保存</Button>
              <Button size="small" onClick={() => { setReasonDraft(c.myReason ?? ''); setEditingReason(false); }}>取消</Button>
            </Space>
          </div>
        ) : (
          <div
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 4 }}
            onClick={() => { setReasonDraft(c.myReason ?? ''); setEditingReason(true); }}
          >
            {c.myReason ? (
              <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)', flex: 1, lineHeight: 1.6 }}>
                {c.myReason}
              </Text>
            ) : (
              <Text style={{ fontSize: 12, color: '#bfbfbf', fontStyle: 'italic' }}>
                点击添加理由…
              </Text>
            )}
            <EditOutlined style={{ fontSize: 11, color: '#d9d9d9', flexShrink: 0, marginTop: 2 }} />
          </div>
        )}
      </div>

      {/* Footer tags */}
      {c.tags.length > 0 && (
        <>
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {c.tags.map(t => (
              <Tag key={t} style={{ fontSize: 10, margin: 0, padding: '0 5px', lineHeight: '16px' }}>{t}</Tag>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
