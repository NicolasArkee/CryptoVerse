// Frankfurter API — Free, no auth, no rate limits
// Data source: ECB (European Central Bank), updated daily ~16:00 CET
// Docs: https://frankfurter.dev/

const BASE_URL = 'https://api.frankfurter.app';

// ─── Types ───────────────────────────────────────

export interface ForexRates {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ForexTimeSeries {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>; // date → { currency → rate }
}

// ─── Fetch helper ────────────────────────────────

async function fetchFrankfurter<T>(endpoint: string, revalidate: number = 3600): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`Frankfurter API error: ${res.status} for ${endpoint}`);
  }
  return res.json() as Promise<T>;
}

// ─── API Functions ───────────────────────────────

/**
 * Get latest exchange rates
 */
export async function getLatestRates(
  base: string = 'USD',
  symbols?: string,
): Promise<ForexRates> {
  let endpoint = `/latest?base=${base}`;
  if (symbols) endpoint += `&symbols=${symbols}`;
  return fetchFrankfurter<ForexRates>(endpoint, 3600);
}

/**
 * Get historical rates for a specific date
 */
export async function getHistoricalRates(
  date: string, // YYYY-MM-DD
  base: string = 'USD',
): Promise<ForexRates> {
  return fetchFrankfurter<ForexRates>(`/${date}?base=${base}`, 86400);
}

/**
 * Get time series rates between two dates
 */
export async function getTimeSeries(
  from: string, // YYYY-MM-DD
  to: string,   // YYYY-MM-DD
  base: string = 'USD',
  symbols?: string,
): Promise<ForexTimeSeries> {
  let endpoint = `/${from}..${to}?base=${base}`;
  if (symbols) endpoint += `&symbols=${symbols}`;
  return fetchFrankfurter<ForexTimeSeries>(endpoint, 3600);
}

/**
 * Get available currencies
 */
export async function getCurrencies(): Promise<Record<string, string>> {
  return fetchFrankfurter<Record<string, string>>('/currencies', 86400);
}

// ─── Formatting ──────────────────────────────────

export function formatRate(value: number, decimals: number = 4): string {
  return value.toFixed(decimals);
}

/** Get flag emoji from currency code */
export function getCurrencyFlag(code: string): string {
  const flagMap: Record<string, string> = {
    USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵', CHF: '🇨🇭',
    CAD: '🇨🇦', AUD: '🇦🇺', CNY: '🇨🇳', KRW: '🇰🇷', INR: '🇮🇳',
    BRL: '🇧🇷', MXN: '🇲🇽', SGD: '🇸🇬', HKD: '🇭🇰', NOK: '🇳🇴',
    SEK: '🇸🇪', DKK: '🇩🇰', NZD: '🇳🇿', ZAR: '🇿🇦', TRY: '🇹🇷',
    RUB: '🇷🇺', PLN: '🇵🇱', THB: '🇹🇭', IDR: '🇮🇩', HUF: '🇭🇺',
    CZK: '🇨🇿', ILS: '🇮🇱', PHP: '🇵🇭', MYR: '🇲🇾', RON: '🇷🇴',
    BGN: '🇧🇬', HRK: '🇭🇷', ISK: '🇮🇸',
  };
  return flagMap[code] || '';
}
