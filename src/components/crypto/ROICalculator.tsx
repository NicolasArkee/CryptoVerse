'use client';

import { useState } from 'react';

interface ROICalculatorProps {
  currentPrice: number;
  atl: number;
  atlDate: string;
  symbol: string;
}

export function ROICalculator({ currentPrice, atl, atlDate, symbol }: ROICalculatorProps) {
  const [investment, setInvestment] = useState('1000');
  const amount = parseFloat(investment) || 0;
  const tokensBought = atl > 0 ? amount / atl : 0;
  const currentValue = tokensBought * currentPrice;
  const roi = amount > 0 ? ((currentValue - amount) / amount) * 100 : 0;

  return (
    <div>
      <div className="mb-3">
        <label className="text-xs text-muted mb-1 block">
          Investment at ATL ({new Date(atlDate).toLocaleDateString()})
        </label>
        <div className="flex items-center gap-2">
          <span className="text-muted text-sm">$</span>
          <input
            type="number"
            value={investment}
            onChange={e => setInvestment(e.target.value)}
            className="bg-dark border border-border text-white px-3 py-2 text-sm tabular-nums w-32 focus:border-green/50 outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted text-xs">{symbol.toUpperCase()} bought</div>
          <div className="text-white tabular-nums">{tokensBought.toFixed(4)}</div>
        </div>
        <div>
          <div className="text-muted text-xs">Current value</div>
          <div className="text-white tabular-nums">${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div className="text-muted text-xs">ROI</div>
          <div className={`tabular-nums font-semibold ${roi >= 0 ? 'text-green' : 'text-red'}`}>
            {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
