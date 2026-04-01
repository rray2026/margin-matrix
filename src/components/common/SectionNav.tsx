import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useIsMobile } from '../../hooks/useIsMobile';

export interface SectionItem {
  id: string;
  label: string;
}

export function SectionNav({ sections }: { sections: SectionItem[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const { isDark } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveId(sections[0]?.id ?? '');
  }, [sections]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  };

  const headerH = isMobile ? 48 : 56;

  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        padding: isMobile ? '8px 12px' : '8px 24px',
        scrollbarWidth: 'none',
        background: isDark ? '#1a1a2e' : '#f0f4ff',
        borderBottom: `1px solid ${isDark ? '#2a2a40' : '#dde3f5'}`,
        position: 'sticky',
        top: headerH,
        zIndex: 49,
        flexShrink: 0,
      }}
    >
      {sections.map(({ id, label }) => {
        const active = activeId === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              padding: isMobile ? '4px 12px' : '5px 16px',
              border: 'none',
              borderRadius: 999,
              fontSize: isMobile ? 12 : 13,
              fontWeight: active ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              background: active
                ? isDark ? '#4096ff' : '#1677ff'
                : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(22,119,255,0.08)',
              color: active ? '#ffffff' : isDark ? '#8b9ab0' : '#4a6090',
              boxShadow: active ? '0 2px 8px rgba(22,119,255,0.35)' : 'none',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
