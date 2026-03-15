'use client';

import type { OHLCData } from '@/libs/CoinGecko';

interface CandlestickChartProps {
  data: OHLCData;
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  if (!data || data.length === 0) return null;

  const W = 800;
  const H = 300;
  const PAD = { top: 10, right: 10, bottom: 20, left: 60 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const prices = data.flatMap(([, o, h, l, c]) => [o, h, l, c]);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;

  const candleW = Math.max(Math.floor(chartW / data.length) - 2, 2);

  function yPos(price: number): number {
    return PAD.top + chartH - ((price - minP) / range) * chartH;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {/* Y-axis grid lines */}
      {Array.from({ length: 5 }).map((_, i) => {
        const price = minP + (range * i) / 4;
        const y = yPos(price);
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#2A2A3E" strokeWidth={0.5} />
            <text x={PAD.left - 4} y={y + 3} textAnchor="end" fill="#666" fontSize={8}>
              {price >= 1 ? price.toFixed(2) : price.toFixed(6)}
            </text>
          </g>
        );
      })}

      {/* Candlesticks */}
      {data.map(([, open, high, low, close], i) => {
        const bullish = close >= open;
        const color = bullish ? '#00D395' : '#EF4444';
        const x = PAD.left + (i / data.length) * chartW + candleW / 2;
        const bodyTop = yPos(Math.max(open, close));
        const bodyBottom = yPos(Math.min(open, close));
        const bodyH = Math.max(bodyBottom - bodyTop, 1);

        return (
          <g key={i}>
            {/* Wick */}
            <line x1={x} y1={yPos(high)} x2={x} y2={yPos(low)} stroke={color} strokeWidth={1} />
            {/* Body */}
            <rect
              x={x - candleW / 2}
              y={bodyTop}
              width={candleW}
              height={bodyH}
              fill={bullish ? color : color}
              stroke={color}
              strokeWidth={0.5}
            />
          </g>
        );
      })}
    </svg>
  );
}
