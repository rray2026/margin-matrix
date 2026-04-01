import { Card, Tag, Typography } from 'antd';
import { RightOutlined, PartitionOutlined } from '@ant-design/icons';
import { supplyChainIndustries } from '../../mock/supplychainData';
import type { SupplyChainIndustry } from '../../types/industry';

const { Text } = Typography;

interface SupplyChainListProps {
  onSelect: (industry: SupplyChainIndustry) => void;
}

export function SupplyChainList({ onSelect }: SupplyChainListProps) {
  return (
    <div>
      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 10 }}>
        选择行业查看完整供应链分析
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {supplyChainIndustries.map(industry => (
          <Card
            key={industry.key}
            size="small"
            hoverable
            onClick={() => onSelect(industry)}
            style={{ cursor: 'pointer', borderLeft: `4px solid ${industry.accentColor}` }}
            styles={{ body: { padding: '10px 12px' } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: `${industry.accentColor}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <PartitionOutlined style={{ fontSize: 18, color: industry.accentColor }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{industry.name}</span>
                    <Tag color={industry.tagColor} style={{ fontSize: 10, padding: '0 5px', lineHeight: '18px', margin: 0 }}>
                      {industry.tag}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {industry.layers.length} 个环节
                    </Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: 12 }} ellipsis>
                    {industry.description}
                  </Text>
                </div>
              </div>
              <RightOutlined style={{ color: '#bfbfbf', fontSize: 12, flexShrink: 0, marginLeft: 8 }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
