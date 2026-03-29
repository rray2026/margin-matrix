import { Typography } from 'antd';
import { useIsMobile } from '../../hooks/useIsMobile';

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: isMobile ? 8 : 12,
      marginTop: isMobile ? 4 : 8,
    }}>
      <div style={{
        width: 3,
        height: 16,
        background: '#1677ff',
        borderRadius: 2,
        marginRight: 8,
        flexShrink: 0,
      }} />
      <Typography.Title level={5} style={{ margin: 0, fontSize: isMobile ? 13 : 14 }}>
        {children}
      </Typography.Title>
    </div>
  );
}
