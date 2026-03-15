import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getCoins, getCategories, getExchanges } from '@/libs/CoinGecko';
import { getChains, getProtocols } from '@/libs/DefiLlama';

function entry(
  baseUrl: string,
  route: string,
  priority?: number,
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'],
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    ...(changeFrequency && { changeFrequency }),
    ...(priority !== undefined && { priority }),
    alternates: {
      languages: Object.fromEntries(
        routing.locales
          .filter(locale => locale !== routing.defaultLocale)
          .map(locale => [locale, `${baseUrl}${getI18nPath(route, locale)}`]),
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const staticRoutes = [
    '', '/tokens', '/categories', '/exchanges',
    '/blockchains', '/defi', '/trending', '/stablecoins',
    '/fear-greed', '/global', '/news', '/forex', '/yields', '/dex',
  ];

  let tokenRoutes: string[] = [];
  let categoryRoutes: string[] = [];
  let exchangeRoutes: string[] = [];
  let blockchainRoutes: string[] = [];
  let defiRoutes: string[] = [];

  try {
    const [coins, categories, exchanges, chains, protocols] = await Promise.all([
      getCoins(1, 100),
      getCategories(),
      getExchanges(1, 50),
      getChains().catch(() => []),
      getProtocols().catch(() => []),
    ]);

    tokenRoutes = coins.map(c => `/tokens/${c.id}`);
    categoryRoutes = categories
      .filter(c => c.market_cap && c.market_cap > 0)
      .slice(0, 50)
      .map(c => `/categories/${c.id}`);
    exchangeRoutes = exchanges.map(e => `/exchanges/${e.id}`);
    blockchainRoutes = chains
      .filter(c => c.tvl > 0)
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 30)
      .map(c => `/blockchains/${c.name.toLowerCase().replace(/\s+/g, '-')}`);
    defiRoutes = protocols
      .filter(p => p.tvl > 0)
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 50)
      .map(p => `/defi/${p.slug}`);
  } catch {
    // If API fails, generate sitemap without dynamic routes
  }

  return [
    ...staticRoutes.map(r => entry(baseUrl, r, r === '' ? 1.0 : 0.8, 'daily')),
    ...tokenRoutes.map(r => entry(baseUrl, r, 0.7, 'daily')),
    ...categoryRoutes.map(r => entry(baseUrl, r, 0.6, 'daily')),
    ...exchangeRoutes.map(r => entry(baseUrl, r, 0.5, 'weekly')),
    ...blockchainRoutes.map(r => entry(baseUrl, r, 0.6, 'weekly')),
    ...defiRoutes.map(r => entry(baseUrl, r, 0.5, 'weekly')),
  ];
}
