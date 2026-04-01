import { useState } from 'react';
import { Card, Tag, Badge, Typography, Space, Divider } from 'antd';
import { BulbOutlined, WarningOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { InvestmentLogic } from '../../types/investment';
import {
  LOGIC_STATUS_LABEL, LOGIC_STATUS_COLOR,
  CONVICTION_LABEL, CONVICTION_COLOR,
} from '../../types/investment';

const { Text, Paragraph } = Typography;

interface Props {
  logic: InvestmentLogic;
}

export function InvestmentLogicCard({ logic }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      size="small"
      style={{ borderRadius: 10 }}
      styles={{ body: { padding: '12px 14px' } }}
    >
      {/* Top row: subject + badges */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <Text strong style={{ flex: 1, fontSize: 15 }}>{logic.subject}</Text>
        <Space size={4} wrap>
          <Badge
            status={LOGIC_STATUS_COLOR[logic.status] as any}
            text={<Text style={{ fontSize: 11 }}>{LOGIC_STATUS_LABEL[logic.status]}</Text>}
          />
          <Tag
            style={{
              fontSize: 10,
              lineHeight: '16px',
              padding: '0 5px',
              borderColor: CONVICTION_COLOR[logic.conviction],
              color: CONVICTION_COLOR[logic.conviction],
              background: 'transparent',
              margin: 0,
            }}
          >
            信念 {CONVICTION_LABEL[logic.conviction]}
          </Tag>
        </Space>
      </div>

      {/* Core logic */}
      <Paragraph
        style={{ fontSize: 13, color: 'rgba(0,0,0,0.65)', margin: '0 0 8px' }}
        ellipsis={expanded ? false : { rows: 2, expandable: false }}
      >
        {logic.coreLogic}
      </Paragraph>

      {!expanded && (
        <Text
          style={{ fontSize: 12, color: '#1677ff', cursor: 'pointer' }}
          onClick={() => setExpanded(true)}
        >
          展开详情
        </Text>
      )}

      {expanded && (
        <>
          <Divider style={{ margin: '8px 0' }} />

          {/* Catalysts */}
          <div style={{ marginBottom: 8 }}>
            <Space size={4} style={{ marginBottom: 4 }}>
              <BulbOutlined style={{ color: '#52c41a', fontSize: 12 }} />
              <Text style={{ fontSize: 12, fontWeight: 600 }}>催化剂</Text>
            </Space>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {logic.catalysts.map((c, i) => (
                <li key={i} style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', lineHeight: '1.7' }}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div style={{ marginBottom: 8 }}>
            <Space size={4} style={{ marginBottom: 4 }}>
              <WarningOutlined style={{ color: '#ff4d4f', fontSize: 12 }} />
              <Text style={{ fontSize: 12, fontWeight: 600 }}>主要风险</Text>
            </Space>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {logic.risks.map((r, i) => (
                <li key={i} style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', lineHeight: '1.7' }}>{r}</li>
              ))}
            </ul>
          </div>

          <Text
            style={{ fontSize: 12, color: '#1677ff', cursor: 'pointer' }}
            onClick={() => setExpanded(false)}
          >
            收起
          </Text>
          <Divider style={{ margin: '8px 0' }} />
        </>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: expanded ? 0 : 8, flexWrap: 'wrap' }}>
        <ClockCircleOutlined style={{ fontSize: 11, color: '#8c8c8c' }} />
        <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{logic.timeHorizon}</Text>
        <span style={{ flex: 1 }} />
        {logic.tags.map(tag => (
          <Tag key={tag} style={{ fontSize: 10, margin: 0, padding: '0 5px', lineHeight: '16px' }}>
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
}
