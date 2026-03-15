'use client';

import { useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { formatTVL } from '@/libs/DefiLlama';

interface ChainRow {
  name: string;
  slug: string;
  tvl: number;
  tokenSymbol: string;
  protocolCount: number;
}

type SortKey = 'tvl' | 'name' | 'protocolCount';

export function BlockchainsTable({ chains }: { chains: ChainRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('tvl');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === 'name');
    }
  };

  const sorted = [...chains].sort((a, b) => {
    const mul = sortAsc ? 1 : -1;
    if (sortKey === 'name') return mul * a.name.localeCompare(b.name);
    return mul * ((a[sortKey] ?? 0) - (b[sortKey] ?? 0));
  });

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortAsc ? ' ▲' : ' ▼') : '';

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
            <th className="text-left py-3 px-2 w-12">#</th>
            <th
              className="text-left py-3 px-2 cursor-pointer hover:text-white select-none"
              onClick={() => handleSort('name')}
            >
              Chain{arrow('name')}
            </th>
            <th className="text-left py-3 px-2 hidden md:table-cell">Token</th>
            <th
              className="text-right py-3 px-2 cursor-pointer hover:text-white select-none"
              onClick={() => handleSort('tvl')}
            >
              TVL{arrow('tvl')}
            </th>
            <th
              className="text-right py-3 px-2 cursor-pointer hover:text-white select-none hidden md:table-cell"
              onClick={() => handleSort('protocolCount')}
            >
              Protocols{arrow('protocolCount')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((chain, i) => (
            <tr key={chain.name} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
              <td className="py-3 px-2 text-muted tabular-nums">{i + 1}</td>
              <td className="py-3 px-2">
                <Link
                  href={`/blockchains/${chain.slug}`}
                  className="text-white font-medium hover:text-green transition-colors"
                >
                  {chain.name}
                </Link>
              </td>
              <td className="py-3 px-2 text-subtle text-xs hidden md:table-cell">
                {chain.tokenSymbol || '—'}
              </td>
              <td className="py-3 px-2 text-right text-white tabular-nums font-medium">
                {formatTVL(chain.tvl)}
              </td>
              <td className="py-3 px-2 text-right text-muted tabular-nums hidden md:table-cell">
                {chain.protocolCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
