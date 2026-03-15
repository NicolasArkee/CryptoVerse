import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getLatestNews } from '@/libs/CryptoPanic';
import { NewsFeed } from '@/components/crypto/NewsFeed';

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: NewsPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'NewsPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/news', locale });
}

export default async function NewsPage(props: NewsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'NewsPage' });

  const [allNews, risingNews, hotNews] = await Promise.all([
    getLatestNews().catch(() => []),
    getLatestNews('rising').catch(() => []),
    getLatestNews('hot').catch(() => []),
  ]);

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      {/* Hot News */}
      {hotNews.length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('filter_hot')}
          </div>
          <NewsFeed posts={hotNews} maxItems={5} />
        </section>
      )}

      {/* Rising News */}
      {risingNews.length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('filter_rising')}
          </div>
          <NewsFeed posts={risingNews} maxItems={5} />
        </section>
      )}

      {/* All News */}
      <section>
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
          &#9654; {t('filter_all')}
        </div>
        <NewsFeed posts={allNews} maxItems={20} />
      </section>
    </div>
  );
}
