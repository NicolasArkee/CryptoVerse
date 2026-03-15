import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getCoins, getCategories, getExchanges } from '@/libs/CoinGecko';

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

  const staticRoutes = ['', '/tokens', '/categories', '/exchanges'];

  // Fetch data for dynamic routes
  let tokenRoutes: string[] = [];
  let categoryRoutes: string[] = [];
  let exchangeRoutes: string[] = [];

  try {
    const [coins, categories, exchanges] = await Promise.all([
      getCoins(1, 100),
      getCategories(),
      getExchanges(1, 50),
    ]);

    tokenRoutes = coins.map(c => `/tokens/${c.id}`);
    categoryRoutes = categories
      .filter(c => c.market_cap && c.market_cap > 0)
      .slice(0, 50)
      .map(c => `/categories/${c.id}`);
    exchangeRoutes = exchanges.map(e => `/exchanges/${e.id}`);
  } catch {
    // If API fails, generate sitemap without dynamic routes
  }

  return [
    ...staticRoutes.map(r => entry(baseUrl, r, r === '' ? 1.0 : 0.8, 'daily')),
    ...tokenRoutes.map(r => entry(baseUrl, r, 0.7, 'daily')),
    ...categoryRoutes.map(r => entry(baseUrl, r, 0.6, 'daily')),
    ...exchangeRoutes.map(r => entry(baseUrl, r, 0.5, 'weekly')),
  ];
}
