import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getCategories, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { Link } from '@/libs/I18nNavigation';
import { PriceChange } from '@/components/crypto/PriceChange';

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: CategoriesPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'CategoriesPage' });
  return buildMetadata({
    title: t('meta_title'),
    description: t('meta_description'),
    path: '/categories',
    locale,
  });
}

export default async function CategoriesPage(props: CategoriesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'CategoriesPage' });
  const intlLocale = getLocaleForIntl(locale);

  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch {
    // handle API error
  }

  // Filter out categories with no market cap
  const validCategories = categories.filter(c => c.market_cap && c.market_cap > 0);

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <div className="mb-8">
        <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
          {t('title')}
        </h1>
        <p className="text-subtle text-sm">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {validCategories.slice(0, 60).map(category => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group block bg-dark border border-border hover:border-border-light transition-colors p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-sm font-semibold text-light group-hover:text-white transition-colors leading-tight pr-2">
                {category.name}
              </h2>
              <PriceChange value={category.market_cap_change_24h} />
            </div>

            {/* Top 3 coin icons */}
            {category.top_3_coins && category.top_3_coins.length > 0 && (
              <div className="flex -space-x-2 mb-3">
                {category.top_3_coins.filter(Boolean).slice(0, 3).map((img, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={i}
                    src={img}
                    alt=""
                    width={24}
                    height={24}
                    className="border border-border rounded-full bg-void"
                  />
                ))}
              </div>
            )}

            <div className="text-[0.72rem] text-muted">
              {t('market_cap')}: <span className="text-light tabular-nums">{formatCurrency(category.market_cap, 'USD', intlLocale)}</span>
            </div>
            {category.volume_24h > 0 && (
              <div className="text-[0.68rem] text-muted mt-0.5">
                Vol 24h: <span className="text-light tabular-nums">{formatCurrency(category.volume_24h, 'USD', intlLocale)}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
