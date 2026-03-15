// Alternative.me Fear & Greed Index — Free, no API key
// Docs: https://alternative.me/crypto/fear-and-greed-index/

const BASE_URL = 'https://api.alternative.me/fng/';

export interface FearGreedEntry {
  value: string;
  value_classification: string;
  timestamp: string;
}

export async function getFearGreedIndex(limit: number = 1): Promise<FearGreedEntry[]> {
  const res = await fetch(`${BASE_URL}?limit=${limit}&format=json`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Fear & Greed API error: ${res.status}`);
  const data = (await res.json()) as { data: FearGreedEntry[] };
  return data.data;
}

export function getFearGreedColor(value: number): string {
  if (value <= 20) return '#FF4444';
  if (value <= 40) return '#FF8C00';
  if (value <= 60) return '#FFCC00';
  if (value <= 80) return '#AADD00';
  return '#00D395';
}

export function getFearGreedLabel(value: number): string {
  if (value <= 20) return 'extreme_fear';
  if (value <= 40) return 'fear';
  if (value <= 60) return 'neutral';
  if (value <= 80) return 'greed';
  return 'extreme_greed';
}
