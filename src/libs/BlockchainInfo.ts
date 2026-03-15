// Blockchain.com stats API — Free, no API key
// BTC network statistics

const BASE_URL = 'https://api.blockchain.info';

export interface BTCStats {
  market_price_usd: number;
  hash_rate: number;
  total_fees_btc: number;
  n_btc_mined: number;
  n_tx: number;
  n_blocks_mined: number;
  minutes_between_blocks: number;
  totalbc: number;
  n_blocks_total: number;
  estimated_transaction_volume_usd: number;
  blocks_size: number;
  miners_revenue_usd: number;
  nextretarget: number;
  difficulty: number;
  estimated_btc_sent: number;
  miners_revenue_btc: number;
  total_btc_sent: number;
  trade_volume_btc: number;
  trade_volume_usd: number;
  timestamp: number;
}

export async function getBTCStats(): Promise<BTCStats> {
  const res = await fetch(`${BASE_URL}/stats?format=json`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Blockchain.info API error: ${res.status}`);
  return res.json() as Promise<BTCStats>;
}

export function formatHashRate(value: number): string {
  if (value >= 1e18) return `${(value / 1e18).toFixed(2)} EH/s`;
  if (value >= 1e15) return `${(value / 1e15).toFixed(2)} PH/s`;
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)} TH/s`;
  return `${(value / 1e9).toFixed(2)} GH/s`;
}

export function formatDifficulty(value: number): string {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  return `${(value / 1e6).toFixed(2)}M`;
}
