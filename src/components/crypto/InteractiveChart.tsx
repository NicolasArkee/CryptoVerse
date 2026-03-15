'use client';

import { useState } from 'react';
import { PriceChart } from './PriceChart';

interface InteractiveChartProps {
  coinId: string;
  initialData: [number, number][];
  initialDays: number;
}

const TIMEFRAMES = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: '1Y', days: 365 },
];

export function InteractiveChart({ coinId, initialData, initialDays }: InteractiveChartProps) {
  const [activeDays, setActiveDays] = useState(initialDays);
  const [data, setData] = useState<[number, number][]>(initialData);
  const [loading, setLoading] = useState(false);

  const handleTimeframe = async (days: number) => {
    if (days === activeDays) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/chart/${coinId}?days=${days}`);
      if (res.ok) {
        const json = await res.json();
        setData(json.prices);
      }
    } catch {
      // keep current data
    }
    setActiveDays(days);
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {TIMEFRAMES.map(tf => (
          <button
            key={tf.days}
            onClick={() => handleTimeframe(tf.days)}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              activeDays === tf.days
                ? 'bg-green/20 text-green border border-green/40'
                : 'text-muted hover:text-white border border-border hover:border-border-light'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>
      <div className={loading ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        <PriceChart data={data} />
      </div>
    </div>
  );
}
