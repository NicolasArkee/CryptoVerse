'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number | null;
}

interface GlobalSearchProps {
  placeholder: string;
  noResultsLabel: string;
  viewLabel: string;
}

export function GlobalSearch({ placeholder, noResultsLabel, viewLabel }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const searchCoins = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      const coins = (data.coins || []).slice(0, 8).map((c: { id: string; name: string; symbol: string; thumb: string; market_cap_rank: number | null }) => ({
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        thumb: c.thumb,
        market_cap_rank: c.market_cap_rank,
      }));
      setResults(coins);
      setIsOpen(true);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchCoins(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, searchCoins]);

  // Click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-void border border-border text-light text-[0.85rem] px-4 py-3 focus:outline-none focus:border-green/50 transition-colors"
      />
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-dark border border-border border-t-0 z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-[0.8rem] text-muted">...</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-[0.8rem] text-muted">{noResultsLabel}</div>
          ) : (
            results.map(coin => (
              <a
                key={coin.id}
                href={`/tokens/${coin.id}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-void transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coin.thumb}
                  alt={coin.name}
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[0.8rem] text-light">{coin.name}</span>
                  <span className="text-[0.68rem] text-muted ml-2 uppercase">{coin.symbol}</span>
                </div>
                {coin.market_cap_rank && (
                  <span className="text-[0.65rem] text-muted">#{coin.market_cap_rank}</span>
                )}
                <span className="text-[0.68rem] text-muted">{viewLabel} &rarr;</span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
