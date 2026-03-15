// CoinGecko API v3 — Free tier, no API key needed
// Base URL: https://api.coingecko.com/api/v3
// Rate limit: 10-50 calls/minute

const BASE_URL = 'https://api.coingecko.com/api/v3';

// ─── Types ───────────────────────────────────────

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: { price: number[] };
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  categories: string[];
  description: Record<string, string>;
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    subreddit_url: string;
    repos_url: { github: string[]; bitbucket: string[] };
  };
  image: { thumb: string; small: string; large: string };
  market_cap_rank: number;
  market_data: {
    current_price: Record<string, number>;
    ath: Record<string, number>;
    ath_change_percentage: Record<string, number>;
    ath_date: Record<string, string>;
    atl: Record<string, number>;
    atl_change_percentage: Record<string, number>;
    atl_date: Record<string, string>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap_change_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    fully_diluted_valuation: Record<string, number>;
    sparkline_7d?: { price: number[] };
  };
  community_data: {
    twitter_followers: number | null;
    reddit_subscribers: number | null;
  };
  developer_data: {
    forks: number | null;
    stars: number | null;
  };
  last_updated: string;
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface Category {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  content: string;
  top_3_coins: string[];
  volume_24h: number;
  updated_at: string;
}

export interface Exchange {
  id: string;
  name: string;
  year_established: number | null;
  country: string | null;
  description: string;
  url: string;
  image: string;
  has_trading_incentive: boolean | null;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
}

export interface ExchangeDetail {
  name: string;
  year_established: number | null;
  country: string | null;
  description: string;
  url: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  facebook_url: string;
  reddit_url: string;
  telegram_url: string;
  other_url_1: string;
  other_url_2: string;
  centralized: boolean;
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: number;
      price_change_percentage_24h: Record<string, number>;
      market_cap: string;
      sparkline: string;
    };
  };
}

export interface GlobalData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export interface SearchResult {
  coins: {
    id: string;
    name: string;
    api_symbol: string;
    symbol: string;
    market_cap_rank: number | null;
    thumb: string;
    large: string;
  }[];
  exchanges: { id: string; name: string; market_type: string; thumb: string; large: string }[];
  categories: { id: number; name: string }[];
}

export interface GlobalDeFiData {
  data: {
    defi_market_cap: string;
    eth_market_cap: string;
    defi_to_eth_ratio: string;
    trading_volume_24h: string;
    defi_dominance: string;
    top_coin_name: string;
    top_coin_defi_dominance: number;
  };
}

export interface CoinTicker {
  base: string;
  target: string;
  market: { name: string; identifier: string; has_trading_incentive: boolean };
  last: number;
  volume: number;
  converted_last: { usd: number; btc: number; eth: number };
  converted_volume: { usd: number; btc: number; eth: number };
  trust_score: string | null;
  bid_ask_spread_percentage: number | null;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string | null;
  coin_id: string;
  target_coin_id?: string;
}

export interface AssetPlatform {
  id: string;
  chain_identifier: number | null;
  name: string;
  shortname: string;
  native_coin_id: string;
  image: { thumb: string; small: string; large: string } | null;
}

// ─── Fetch helpers ───────────────────────────────

async function fetchCoinGecko<T>(
  endpoint: string,
  revalidate: number = 300,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`CoinGecko API error: ${res.status} ${res.statusText} for ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

// ─── API Functions ───────────────────────────────

/**
 * Get top coins by market cap with sparkline data
 */
export async function getCoins(
  page: number = 1,
  perPage: number = 50,
  currency: string = 'usd',
): Promise<CoinMarket[]> {
  return fetchCoinGecko<CoinMarket[]>(
    `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=7d,30d`,
    300, // 5 min cache for market data
  );
}

/**
 * Get detailed coin info
 */
export async function getCoin(id: string): Promise<CoinDetail> {
  return fetchCoinGecko<CoinDetail>(
    `/coins/${id}?localization=true&tickers=false&community_data=true&developer_data=true&sparkline=true`,
    300,
  );
}

/**
 * Get coin price chart data
 */
export async function getCoinMarketChart(
  id: string,
  days: number = 30,
  currency: string = 'usd',
): Promise<MarketChartData> {
  return fetchCoinGecko<MarketChartData>(
    `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    300,
  );
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  return fetchCoinGecko<Category[]>(
    '/coins/categories?order=market_cap_desc',
    3600, // 1 hour cache for categories
  );
}

/**
 * Get a single category by ID
 */
export async function getCategory(id: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(c => c.id === id) || null;
}

/**
 * Get exchanges list
 */
export async function getExchanges(
  page: number = 1,
  perPage: number = 50,
): Promise<Exchange[]> {
  return fetchCoinGecko<Exchange[]>(
    `/exchanges?per_page=${perPage}&page=${page}`,
    3600,
  );
}

/**
 * Get exchange detail
 */
export async function getExchange(id: string): Promise<ExchangeDetail> {
  return fetchCoinGecko<ExchangeDetail>(
    `/exchanges/${id}`,
    3600,
  );
}

/**
 * Get trending coins
 */
export async function getTrending(): Promise<TrendingCoin[]> {
  const data = await fetchCoinGecko<{ coins: TrendingCoin[] }>(
    '/search/trending',
    300,
  );
  return data.coins;
}

/**
 * Get global market data
 */
export async function getGlobalData(): Promise<GlobalData> {
  return fetchCoinGecko<GlobalData>('/global', 300);
}

/**
 * Search coins
 */
export async function searchCoins(query: string): Promise<SearchResult> {
  return fetchCoinGecko<SearchResult>(
    `/search?query=${encodeURIComponent(query)}`,
    300,
  );
}

/**
 * Get coins for a specific category
 */
export async function getCoinsByCategory(
  categoryId: string,
  page: number = 1,
  perPage: number = 50,
  currency: string = 'usd',
): Promise<CoinMarket[]> {
  return fetchCoinGecko<CoinMarket[]>(
    `/coins/markets?vs_currency=${currency}&category=${categoryId}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true`,
    300,
  );
}

/**
 * Get coin tickers (trading pairs)
 */
export async function getCoinTickers(
  id: string,
  page: number = 1,
): Promise<{ tickers: CoinTicker[] }> {
  return fetchCoinGecko<{ tickers: CoinTicker[] }>(
    `/coins/${id}/tickers?page=${page}&order=volume_desc`,
    300,
  );
}

/**
 * Get global DeFi data
 */
export async function getGlobalDeFiData(): Promise<GlobalDeFiData> {
  return fetchCoinGecko<GlobalDeFiData>('/global/decentralized_finance_defi', 300);
}

/**
 * Get exchange rates (BTC-based)
 */
export async function getExchangeRates(): Promise<{ rates: Record<string, { name: string; unit: string; value: number; type: string }> }> {
  return fetchCoinGecko('/exchange_rates', 300);
}

/**
 * Get blockchain asset platforms
 */
export async function getAssetPlatforms(): Promise<AssetPlatform[]> {
  return fetchCoinGecko<AssetPlatform[]>(
    '/asset_platforms?filter=blockchain',
    3600,
  );
}

// ─── Formatting helpers ──────────────────────────

export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string {
  if (value >= 1_000_000_000_000) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  }
  if (value >= 1_000_000) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  }
  if (value >= 1) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  // Small values (sub-$1) — show more decimals
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
}

export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function getLocaleForIntl(locale: string): string {
  const map: Record<string, string> = {
    fr: 'fr-FR',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE',
    it: 'it-IT',
  };
  return map[locale] || 'en-US';
}

/**
 * Get localized description from CoinGecko's localization data
 */
export function getLocalizedDescription(
  descriptions: Record<string, string>,
  locale: string,
): string {
  // CoinGecko uses full language names, not codes
  const localeMap: Record<string, string> = {
    fr: 'fr',
    en: 'en',
    es: 'es',
    de: 'de',
    it: 'it',
  };
  const key = localeMap[locale] || 'en';
  return descriptions[key] || descriptions.en || '';
}
