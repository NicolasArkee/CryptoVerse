// DefiLlama API — Free, no API key needed
// Docs: https://defillama.com/docs/api

const BASE_URL = 'https://api.llama.fi';

// ─── Types ───────────────────────────────────────

export interface DeFiProtocol {
  id: string;
  name: string;
  slug: string;
  logo: string;
  category: string;
  chains: string[];
  tvl: number;
  change_1h: number | null;
  change_1d: number | null;
  change_7d: number | null;
  mcap: number | null;
  url: string;
  description: string;
  symbol: string;
  gecko_id: string | null;
}

export interface DeFiProtocolDetail {
  id: string;
  name: string;
  slug: string;
  logo: string;
  category: string;
  chains: string[];
  tvl: { date: number; totalLiquidityUSD: number }[];
  currentChainTvls: Record<string, number>;
  url: string;
  description: string;
  symbol: string;
  gecko_id: string | null;
  twitter: string | null;
  audit_links: string[];
}

export interface DeFiChain {
  gecko_id: string | null;
  tvl: number;
  tokenSymbol: string;
  cmcId: string | null;
  name: string;
  chainId: number | null;
}

export interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
  gecko_id: string | null;
  pegType: string;
  pegMechanism: string;
  circulating: Record<string, number>;
  circulatingPrevDay: Record<string, number>;
  circulatingPrevWeek: Record<string, number>;
  circulatingPrevMonth: Record<string, number>;
  price: number | null;
  chains: string[];
}

// ─── Fetch helper ────────────────────────────────

async function fetchDefiLlama<T>(endpoint: string, revalidate: number = 300): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`DefiLlama API error: ${res.status} for ${endpoint}`);
  }
  return res.json() as Promise<T>;
}

// ─── API Functions ───────────────────────────────

export async function getProtocols(): Promise<DeFiProtocol[]> {
  return fetchDefiLlama<DeFiProtocol[]>('/protocols', 300);
}

export async function getProtocol(slug: string): Promise<DeFiProtocolDetail> {
  return fetchDefiLlama<DeFiProtocolDetail>(`/protocol/${slug}`, 300);
}

export async function getProtocolTVL(slug: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/tvl/${slug}`, { next: { revalidate: 300 } });
  if (!res.ok) return 0;
  const val = await res.json();
  return typeof val === 'number' ? val : 0;
}

export async function getChains(): Promise<DeFiChain[]> {
  return fetchDefiLlama<DeFiChain[]>('/v2/chains', 3600);
}

export async function getStablecoins(): Promise<{ peggedAssets: Stablecoin[] }> {
  const res = await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=true', {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`DefiLlama stablecoins error: ${res.status}`);
  return res.json() as Promise<{ peggedAssets: Stablecoin[] }>;
}

export interface ChainHistoryEntry {
  date: number;
  tvl: number;
}

export interface ChainFees {
  total24h: number | null;
  total7d: number | null;
  total30d: number | null;
  totalAllTime: number | null;
}

export async function getChainHistory(chain: string): Promise<ChainHistoryEntry[]> {
  const res = await fetch(`${BASE_URL}/v2/historicalChainTvl/${chain}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json() as Promise<ChainHistoryEntry[]>;
}

export async function getChainFees(chain: string): Promise<ChainFees | null> {
  try {
    const res = await fetch(`${BASE_URL}/overview/fees/${chain}?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<ChainFees>;
  } catch {
    return null;
  }
}

// ─── Formatting ──────────────────────────────────

export function formatTVL(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}
