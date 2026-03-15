// DexScreener API — Free, no auth required
// Docs: https://docs.dexscreener.com/api/reference
// Rate limit: 60-300 req/min depending on endpoint

const BASE_URL = 'https://api.dexscreener.com';

// ─── Types ───────────────────────────────────────

export interface DexToken {
  address: string;
  name: string;
  symbol: string;
}

export interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: DexToken;
  quoteToken: DexToken;
  priceNative: string;
  priceUsd: string | null;
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  } | null;
  fdv: number | null;
  marketCap: number | null;
  pairCreatedAt: number | null;
}

export interface DexSearchResult {
  pairs: DexPair[];
}

// ─── Fetch helper ────────────────────────────────

async function fetchDexScreener<T>(endpoint: string, revalidate: number = 300): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`DexScreener API error: ${res.status} for ${endpoint}`);
  }
  return res.json() as Promise<T>;
}

// ─── API Functions ───────────────────────────────

/**
 * Get DEX pairs for a token by contract address
 */
export async function getTokenPairs(address: string): Promise<DexPair[]> {
  const data = await fetchDexScreener<DexPair[]>(
    `/tokens/v1/${address}`,
    300,
  );
  return Array.isArray(data) ? data : [];
}

/**
 * Search for DEX pairs by query
 */
export async function searchPairs(query: string): Promise<DexPair[]> {
  const data = await fetchDexScreener<DexSearchResult>(
    `/dex/search?q=${encodeURIComponent(query)}`,
    300,
  );
  return data.pairs || [];
}

// ─── Helpers ─────────────────────────────────────

export function formatDexChain(chainId: string): string {
  const map: Record<string, string> = {
    ethereum: 'Ethereum',
    bsc: 'BSC',
    polygon: 'Polygon',
    arbitrum: 'Arbitrum',
    optimism: 'Optimism',
    avalanche: 'Avalanche',
    base: 'Base',
    solana: 'Solana',
    fantom: 'Fantom',
    cronos: 'Cronos',
  };
  return map[chainId] || chainId.charAt(0).toUpperCase() + chainId.slice(1);
}
