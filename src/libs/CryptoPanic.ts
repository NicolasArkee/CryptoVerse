// CryptoPanic API — Free public endpoint, no auth needed
// Docs: https://cryptopanic.com/developers/api/

const BASE_URL = 'https://cryptopanic.com/api/free/v1';

// ─── Types ───────────────────────────────────────

export interface NewsSource {
  title: string;
  region: string;
  domain: string;
  path: string | null;
}

export interface NewsCurrency {
  code: string;
  title: string;
  slug: string;
  url: string;
}

export interface NewsPost {
  kind: 'news' | 'media';
  domain: string;
  title: string;
  published_at: string;
  slug: string;
  id: number;
  url: string;
  source: NewsSource;
  currencies: NewsCurrency[] | null;
}

export interface NewsResponse {
  count: number;
  results: NewsPost[];
}

// ─── Fetch helper ────────────────────────────────

async function fetchCryptoPanic<T>(endpoint: string, revalidate: number = 300): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`CryptoPanic API error: ${res.status} for ${endpoint}`);
  }
  return res.json() as Promise<T>;
}

// ─── API Functions ───────────────────────────────

/**
 * Get latest crypto news
 * @param filter - rising, hot, bullish, bearish, important, lol
 * @param currencies - comma-separated currency codes (e.g. "BTC,ETH")
 */
export async function getLatestNews(
  filter?: string,
  currencies?: string,
): Promise<NewsPost[]> {
  let endpoint = '/posts/?public=true';
  if (filter) endpoint += `&filter=${filter}`;
  if (currencies) endpoint += `&currencies=${currencies}`;
  const data = await fetchCryptoPanic<NewsResponse>(endpoint, 300);
  return data.results || [];
}

/**
 * Get news for a specific coin symbol
 */
export async function getNewsByCoin(symbol: string): Promise<NewsPost[]> {
  return getLatestNews(undefined, symbol.toUpperCase());
}

// ─── Helpers ─────────────────────────────────────

export function formatNewsDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
