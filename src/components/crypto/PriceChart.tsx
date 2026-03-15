'use client';

interface PriceChartProps {
  data: [number, number][]; // [timestamp, price]
  width?: number;
  height?: number;
}

export function PriceChart({ data, width = 800, height = 300 }: PriceChartProps) {
  if (!data || data.length < 2) {
    return <div className="text-muted text-sm">No chart data available.</div>;
  }

  const prices = data.map(d => d[1]);
  const timestamps = data.map(d => d[0]);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const padding = { top: 20, right: 20, bottom: 40, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data
    .map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((d[1] - min) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  const lastX = padding.left + chartWidth;
  const bottomY = padding.top + chartHeight;

  // Price labels (5 levels)
  const priceLabels = Array.from({ length: 5 }, (_, i) => {
    const value = min + (range * i) / 4;
    const y = padding.top + chartHeight - (i / 4) * chartHeight;
    return { value, y };
  });

  // Date labels (5 labels)
  const dateLabels = Array.from({ length: 5 }, (_, i) => {
    const idx = Math.floor((i / 4) * (timestamps.length - 1));
    const date = new Date(timestamps[idx]!);
    const x = padding.left + (idx / (timestamps.length - 1)) * chartWidth;
    return { date: `${date.getDate()}/${date.getMonth() + 1}`, x };
  });

  const isPositive = prices[prices.length - 1]! >= prices[0]!;
  const strokeColor = isPositive ? '#00D395' : '#FF4444';
  const fillColor = isPositive ? 'rgba(0,211,149,0.1)' : 'rgba(255,68,68,0.1)';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Grid lines */}
      {priceLabels.map((label, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            y1={label.y}
            x2={padding.left + chartWidth}
            y2={label.y}
            stroke="rgba(42,42,62,0.5)"
            strokeDasharray="4,4"
          />
          <text
            x={padding.left - 8}
            y={label.y + 4}
            textAnchor="end"
            fill="#666680"
            fontSize="10"
            fontFamily="var(--font-ui)"
          >
            ${label.value >= 1 ? label.value.toFixed(2) : label.value.toFixed(6)}
          </text>
        </g>
      ))}

      {/* Date labels */}
      {dateLabels.map((label, i) => (
        <text
          key={i}
          x={label.x}
          y={height - 10}
          textAnchor="middle"
          fill="#666680"
          fontSize="10"
          fontFamily="var(--font-ui)"
        >
          {label.date}
        </text>
      ))}

      {/* Area fill */}
      <polygon
        points={`${padding.left},${bottomY} ${points} ${lastX},${bottomY}`}
        fill={fillColor}
      />

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
