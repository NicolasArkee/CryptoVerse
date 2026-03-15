'use client';

import { useState } from 'react';
import { getCurrencyFlag } from '@/libs/Frankfurter';

interface ForexRatesTableProps {
  rates: Record<string, number>;
  base: string;
  currencyNames?: Record<string, string>;
}

export function ForexRatesTable({ rates, base, currencyNames }: ForexRatesTableProps) {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const entries = Object.entries(rates)
    .filter(([code]) =>
      !search || code.toLowerCase().includes(search.toLowerCase()) ||
      (currencyNames?.[code] || '').toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => sortAsc ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]));

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search currency..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-dark border border-border px-3 py-2 text-sm text-white placeholder-muted focus:border-green/50 outline-none w-64"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="text-xs text-muted border border-border px-3 py-2 hover:text-white transition-colors"
        >
          {sortAsc ? 'A→Z' : 'Z→A'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
              <th className="text-left py-2 px-2">Currency</th>
              <th className="text-left py-2 px-2">Name</th>
              <th className="text-right py-2 px-2">1 {base} =</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([code, rate]) => (
              <tr key={code} className="border-b border-border/50 hover:bg-dark/50">
                <td className="py-2 px-2 text-white">
                  {getCurrencyFlag(code)} {code}
                </td>
                <td className="py-2 px-2 text-muted text-xs">
                  {currencyNames?.[code] || code}
                </td>
                <td className="py-2 px-2 text-right text-white tabular-nums">
                  {rate < 1 ? rate.toFixed(6) : rate < 100 ? rate.toFixed(4) : rate.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {entries.length === 0 && (
        <div className="text-center text-muted text-sm py-8">No currencies found.</div>
      )}
    </div>
  );
}
