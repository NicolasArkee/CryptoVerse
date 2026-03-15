'use client';

import { useState } from 'react';
import type { YieldPool } from '@/libs/DefiLlama';
import { formatTVL } from '@/libs/DefiLlama';

interface YieldPoolsTableProps {
  pools: YieldPool[];
}

type SortKey = 'apy' | 'tvlUsd' | 'apyBase' | 'chain';

export function YieldPoolsTable({ pools }: YieldPoolsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('tvlUsd');
  const [sortAsc, setSortAsc] = useState(false);
  const [chainFilter, setChainFilter] = useState('');

  const chains = [...new Set(pools.map(p => p.chain))].sort();

  const filtered = pools
    .filter(p => !chainFilter || p.chain === chainFilter)
    .sort((a, b) => {
      const va = a[sortKey] ?? 0;
      const vb = b[sortKey] ?? 0;
      if (typeof va === 'string' && typeof vb === 'string') {
        return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortAsc ? (va as number) - (vb as number) : (vb as number) - (va as number);
    })
    .slice(0, 100);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  const sortIcon = (key: SortKey) =>
    sortKey === key ? (sortAsc ? ' ↑' : ' ↓') : '';

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <select
          value={chainFilter}
          onChange={e => setChainFilter(e.target.value)}
          className="bg-dark border border-border px-3 py-2 text-sm text-white focus:border-green/50 outline-none"
        >
          <option value="">All Chains</option>
          {chains.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
              <th className="text-left py-2 px-2">Protocol</th>
              <th className="text-left py-2 px-2 cursor-pointer hover:text-white" onClick={() => handleSort('chain')}>Chain{sortIcon('chain')}</th>
              <th className="text-left py-2 px-2">Pool</th>
              <th className="text-right py-2 px-2 cursor-pointer hover:text-white" onClick={() => handleSort('tvlUsd')}>TVL{sortIcon('tvlUsd')}</th>
              <th className="text-right py-2 px-2 cursor-pointer hover:text-white" onClick={() => handleSort('apyBase')}>APY Base{sortIcon('apyBase')}</th>
              <th className="text-right py-2 px-2 cursor-pointer hover:text-white" onClick={() => handleSort('apy')}>APY Total{sortIcon('apy')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pool) => (
              <tr key={pool.pool} className="border-b border-border/50 hover:bg-dark/50">
                <td className="py-2 px-2 text-white capitalize">{pool.project}</td>
                <td className="py-2 px-2 text-muted">{pool.chain}</td>
                <td className="py-2 px-2 text-muted text-xs">{pool.symbol}</td>
                <td className="py-2 px-2 text-right text-white tabular-nums">{formatTVL(pool.tvlUsd)}</td>
                <td className="py-2 px-2 text-right text-white tabular-nums">
                  {pool.apyBase != null ? `${pool.apyBase.toFixed(2)}%` : '--'}
                </td>
                <td className="py-2 px-2 text-right text-green tabular-nums font-semibold">
                  {pool.apy.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <div className="text-center text-muted text-sm py-8">No pools found.</div>
      )}
    </div>
  );
}
