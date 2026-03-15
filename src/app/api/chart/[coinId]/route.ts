import { NextResponse } from 'next/server';
import { getCoinMarketChart } from '@/libs/CoinGecko';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ coinId: string }> },
) {
  const { coinId } = await params;
  const { searchParams } = new URL(request.url);
  const days = Math.min(parseInt(searchParams.get('days') || '30'), 365);

  try {
    const data = await getCoinMarketChart(coinId, days);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ prices: [] }, { status: 500 });
  }
}
