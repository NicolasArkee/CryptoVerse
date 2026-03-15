'use client';

interface TVLChartProps {
  data: { date: number; totalLiquidityUSD: number }[];
}

export function TVLChart({ data }: TVLChartProps) {
  if (!data || data.length < 2) return null;

  const width = 800;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 80 };
  const cw = width - padding.left - padding.right;
  const ch = height - padding.top - padding.bottom;

  const values = data.map(d => d.totalLiquidityUSD);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * cw;
    const y = padding.top + ch - ((d.totalLiquidityUSD - min) / range) * ch;
    return `${x},${y}`;
  }).join(' ');

  const lastX = padding.left + cw;
  const bottomY = padding.top + ch;

  const fmt = (v: number) => {
    if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
    return `$${(v / 1e3).toFixed(0)}K`;
  };

  const priceLabels = Array.from({ length: 5 }, (_, i) => ({
    value: min + (range * i) / 4,
    y: padding.top + ch - (i / 4) * ch,
  }));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {priceLabels.map((l, i) => (
        <g key={i}>
          <line x1={padding.left} y1={l.y} x2={padding.left + cw} y2={l.y} stroke="rgba(42,42,62,0.5)" strokeDasharray="4,4" />
          <text x={padding.left - 8} y={l.y + 4} textAnchor="end" fill="#666680" fontSize="10" fontFamily="var(--font-ui)">{fmt(l.value)}</text>
        </g>
      ))}
      <polygon points={`${padding.left},${bottomY} ${points} ${lastX},${bottomY}`} fill="rgba(0,211,149,0.1)" />
      <polyline points={points} fill="none" stroke="#00D395" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
