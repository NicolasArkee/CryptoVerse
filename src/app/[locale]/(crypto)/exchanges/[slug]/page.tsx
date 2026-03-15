import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/Seo';
import { getExchange, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { Breadcrumbs } from '@/components/crypto/Breadcrumbs';

interface ExchangeDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata(props: ExchangeDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: 'ExchangeDetailPage' });

  let title = `${slug} | CryptoVerse`;
  let description = '';

  try {
    const exchange = await getExchange(slug);
    title = `${exchange.name} — Exchange | CryptoVerse`;
    description = `${exchange.name}: ${t('trust_score')} ${exchange.trust_score}/10. ${t('volume_24h')}, ${t('country')} — CryptoVerse`;
  } catch {
    // fallback
  }

  return buildMetadata({ title, description, path: `/exchanges/${slug}`, locale });
}

function renderTrustScore(score: number) {
  const dots = [];
  for (let i = 0; i < 10; i++) {
    const color = i < score ? '#00D395' : '#2A2A3E';
    dots.push(
      <span
        key={i}
        className="inline-block w-3 h-3 mr-1"
        style={{ backgroundColor: color }}
      />,
    );
  }
  return <div className="flex items-center">{dots}</div>;
}

export default async function ExchangeDetailPage(props: ExchangeDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ExchangeDetailPage' });
  const intlLocale = getLocaleForIntl(locale);

  let exchange: Awaited<ReturnType<typeof getExchange>>;

  try {
    exchange = await getExchange(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <Breadcrumbs items={[
        { label: 'Exchanges', href: '/exchanges' },
        { label: exchange.name },
      ]} />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={exchange.image} alt={exchange.name} width={64} height={64} />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{exchange.name}</h1>
          <div className="text-muted text-sm mt-1">
            {exchange.centralized ? 'Centralized Exchange' : 'Decentralized Exchange'}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-2">{t('trust_score')}</div>
          {renderTrustScore(exchange.trust_score)}
          <div className="text-sm text-white mt-1">{exchange.trust_score}/10</div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('volume_24h')}</div>
          <div className="text-base font-semibold text-white tabular-nums">
            {formatCurrency(exchange.trade_volume_24h_btc * 60000, 'USD', intlLocale)}
          </div>
          <div className="text-[0.65rem] text-muted tabular-nums">
            {exchange.trade_volume_24h_btc.toFixed(2)} BTC
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('year_established')}</div>
          <div className="text-base font-semibold text-white">
            {exchange.year_established || '--'}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('country')}</div>
          <div className="text-base font-semibold text-white">
            {exchange.country || '--'}
          </div>
        </div>
      </div>

      {/* Description */}
      {exchange.description && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('description')}
          </div>
          <div className="bg-dark border border-border p-6 text-light text-sm leading-relaxed max-w-3xl">
            {exchange.description.replace(/<[^>]*>/g, '')}
          </div>
        </section>
      )}

      {/* Links */}
      <section className="mb-10">
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
          &#9654; {t('website')}
        </div>
        <div className="flex flex-wrap gap-3">
          {exchange.url && (
            <a
              href={exchange.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:border-green/50 text-subtle hover:text-white px-4 py-2 text-sm transition-colors"
            >
              {t('website')} &rarr;
            </a>
          )}
          {exchange.facebook_url && (
            <a
              href={exchange.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:border-border-light text-subtle hover:text-white px-4 py-2 text-sm transition-colors"
            >
              Facebook &rarr;
            </a>
          )}
          {exchange.reddit_url && (
            <a
              href={exchange.reddit_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:border-border-light text-subtle hover:text-white px-4 py-2 text-sm transition-colors"
            >
              Reddit &rarr;
            </a>
          )}
          {exchange.telegram_url && (
            <a
              href={exchange.telegram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:border-sky-400/50 text-subtle hover:text-white px-4 py-2 text-sm transition-colors"
            >
              Telegram &rarr;
            </a>
          )}
          {exchange.other_url_1 && (
            <a
              href={exchange.other_url_1}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:border-border-light text-subtle hover:text-white px-4 py-2 text-sm transition-colors"
            >
              More &rarr;
            </a>
          )}
          {exchange.other_url_2 && (
            <a
              href={exchange.other_url_2}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:border-border-light text-subtle hover:text-white px-4 py-2 text-sm transition-colors"
            >
              More &rarr;
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
