'use client';

import { useState } from 'react';

interface PriceConverterProps {
  symbol: string;
  priceUsd: number;
}

export function PriceConverter({ symbol, priceUsd }: PriceConverterProps) {
  const [usd, setUsd] = useState('100');
  const [crypto, setCrypto] = useState((100 / priceUsd).toFixed(8));

  const handleUsdChange = (v: string) => {
    setUsd(v);
    const n = parseFloat(v);
    setCrypto(isNaN(n) ? '' : (n / priceUsd).toFixed(8));
  };

  const handleCryptoChange = (v: string) => {
    setCrypto(v);
    const n = parseFloat(v);
    setUsd(isNaN(n) ? '' : (n * priceUsd).toFixed(2));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex-1 w-full">
        <label className="text-xs text-muted mb-1 block">USD</label>
        <input
          type="number"
          value={usd}
          onChange={e => handleUsdChange(e.target.value)}
          className="w-full bg-dark border border-border text-white px-3 py-2 text-sm tabular-nums focus:border-green/50 outline-none"
        />
      </div>
      <span className="text-muted text-xl mt-4">=</span>
      <div className="flex-1 w-full">
        <label className="text-xs text-muted mb-1 block">{symbol.toUpperCase()}</label>
        <input
          type="number"
          value={crypto}
          onChange={e => handleCryptoChange(e.target.value)}
          className="w-full bg-dark border border-border text-white px-3 py-2 text-sm tabular-nums focus:border-green/50 outline-none"
        />
      </div>
    </div>
  );
}
