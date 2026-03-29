import { Typography } from 'antd';

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, marginTop: 8 }}>
      <div style={{
        width: 4, height: 18, background: '#1677ff',
        borderRadius: 2, marginRight: 10, flexShrink: 0,
      }} />
      <Typography.Title level={5} style={{ margin: 0 }}>
        {children}
      </Typography.Title>
    </div>
  );
}
