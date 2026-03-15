import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/Seo';
import { getCategory, getCoinsByCategory, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { CoinGrid } from '@/components/crypto/CoinGrid';
import { PriceChange } from '@/components/crypto/PriceChange';

interface CategoryDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata(props: CategoryDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: 'CategoriesPage' });

  let title = `${slug} | CryptoVerse`;
  try {
    const category = await getCategory(slug);
    if (category) {
      title = `${category.name} — ${t('title')} | CryptoVerse`;
    }
  } catch {
    // fallback
  }

  return buildMetadata({ title, description: t('description'), path: `/categories/${slug}`, locale });
}

export default async function CategoryDetailPage(props: CategoryDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'CategoriesPage' });
  const intlLocale = getLocaleForIntl(locale);

  let category: Awaited<ReturnType<typeof getCategory>>;
  let coins: Awaited<ReturnType<typeof getCoinsByCategory>> = [];

  try {
    category = await getCategory(slug);
    if (!category) notFound();
    coins = await getCoinsByCategory(slug, 1, 50);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-pixel text-xl md:text-2xl text-white mb-3" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
          {category!.name}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-muted">{t('market_cap')}: </span>
            <span className="text-white tabular-nums font-medium">
              {formatCurrency(category!.market_cap || 0, 'USD', intlLocale)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted">{t('change_24h')}: </span>
            <PriceChange value={category!.market_cap_change_24h} />
          </div>
        </div>

        {category!.content && (
          <p className="text-subtle text-sm mt-4 max-w-3xl leading-relaxed">
            {category!.content.replace(/<[^>]*>/g, '')}
          </p>
        )}
      </div>

      {/* Coins Grid */}
      <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-6">
        &#9654; TOKENS ({coins.length})
      </div>
      <CoinGrid
        coins={coins.map(c => ({
          id: c.id,
          name: c.name,
          symbol: c.symbol,
          image: c.image,
          currentPrice: c.current_price,
          priceChange24h: c.price_change_percentage_24h,
          marketCap: c.market_cap,
          sparkline: c.sparkline_in_7d?.price,
          rank: c.market_cap_rank,
        }))}
        locale={locale}
      />
    </div>
  );
}
