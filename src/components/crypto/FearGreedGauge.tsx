import { getFearGreedColor } from '@/libs/FearGreed';

interface FearGreedGaugeProps {
  value: number;
  label: string;
}

export function FearGreedGauge({ value, label }: FearGreedGaugeProps) {
  const color = getFearGreedColor(value);
  const angle = -90 + (value / 100) * 180;
  const r = 80;
  const cx = 100;
  const cy = 100;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-64 h-auto">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#1A1A2E"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Colored gradient segments */}
        <path d="M 20 100 A 80 80 0 0 1 60 34" fill="none" stroke="#FF4444" strokeWidth="16" strokeLinecap="round" />
        <path d="M 60 34 A 80 80 0 0 1 100 20" fill="none" stroke="#FF8C00" strokeWidth="16" />
        <path d="M 100 20 A 80 80 0 0 1 140 34" fill="none" stroke="#FFCC00" strokeWidth="16" />
        <path d="M 140 34 A 80 80 0 0 1 180 100" fill="none" stroke="#00D395" strokeWidth="16" strokeLinecap="round" />
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + r * 0.7 * Math.cos((angle * Math.PI) / 180)}
          y2={cy + r * 0.7 * Math.sin((angle * Math.PI) / 180)}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill={color} />
        {/* Value text */}
        <text x={cx} y={cy - 15} textAnchor="middle" fill={color} fontSize="28" fontWeight="bold" fontFamily="var(--font-ui)">
          {value}
        </text>
      </svg>
      <div className="text-lg font-semibold mt-2" style={{ color }}>{label}</div>
    </div>
  );
}
