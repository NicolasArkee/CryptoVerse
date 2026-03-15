'use client';

import { getFearGreedColor } from '@/libs/FearGreed';

interface FearGreedHistoryChartProps {
  data: { value: number; timestamp: string }[];
}

export function FearGreedHistoryChart({ data }: FearGreedHistoryChartProps) {
  if (!data || data.length < 2) return null;

  const width = 800;
  const height = 200;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const cw = width - padding.left - padding.right;
  const ch = height - padding.top - padding.bottom;

  const reversed = [...data].reverse();
  const points = reversed.map((d, i) => {
    const x = padding.left + (i / (reversed.length - 1)) * cw;
    const y = padding.top + ch - (d.value / 100) * ch;
    return { x, y, value: d.value, ts: d.timestamp };
  });

  const dateLabels = [0, Math.floor(reversed.length / 2), reversed.length - 1].map(idx => {
    const d = new Date(parseInt(reversed[idx]!.timestamp) * 1000);
    return {
      label: `${d.getDate()}/${d.getMonth() + 1}`,
      x: padding.left + (idx / (reversed.length - 1)) * cw,
    };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {/* Zones */}
      <rect x={padding.left} y={padding.top} width={cw} height={ch * 0.2} fill="rgba(0,211,149,0.05)" />
      <rect x={padding.left} y={padding.top + ch * 0.2} width={cw} height={ch * 0.2} fill="rgba(170,221,0,0.03)" />
      <rect x={padding.left} y={padding.top + ch * 0.6} width={cw} height={ch * 0.2} fill="rgba(255,140,0,0.03)" />
      <rect x={padding.left} y={padding.top + ch * 0.8} width={cw} height={ch * 0.2} fill="rgba(255,68,68,0.05)" />

      {/* Line with gradient color */}
      {points.slice(0, -1).map((p, i) => (
        <line
          key={i}
          x1={p.x}
          y1={p.y}
          x2={points[i + 1]!.x}
          y2={points[i + 1]!.y}
          stroke={getFearGreedColor(p.value)}
          strokeWidth={2}
        />
      ))}

      {/* Y axis labels */}
      {[0, 25, 50, 75, 100].map(v => (
        <text key={v} x={padding.left - 5} y={padding.top + ch - (v / 100) * ch + 4} textAnchor="end" fill="#666680" fontSize="10" fontFamily="var(--font-ui)">
          {v}
        </text>
      ))}

      {/* Date labels */}
      {dateLabels.map((dl, i) => (
        <text key={i} x={dl.x} y={height - 8} textAnchor="middle" fill="#666680" fontSize="10" fontFamily="var(--font-ui)">
          {dl.label}
        </text>
      ))}
    </svg>
  );
}
