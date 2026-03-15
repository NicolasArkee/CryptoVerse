import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getFearGreedIndex, getFearGreedLabel } from '@/libs/FearGreed';
import { FearGreedGauge } from '@/components/crypto/FearGreedGauge';
import { FearGreedHistoryChart } from '@/components/crypto/FearGreedHistoryChart';

interface FearGreedPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: FearGreedPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'FearGreedPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/fear-greed', locale });
}

export default async function FearGreedPage(props: FearGreedPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'FearGreedPage' });

  let data: Awaited<ReturnType<typeof getFearGreedIndex>> = [];
  try {
    data = await getFearGreedIndex(31);
  } catch {
    // handle error
  }

  const current = data[0];
  const currentValue = current ? parseInt(current.value) : 50;
  const labelKey = getFearGreedLabel(currentValue);

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Gauge */}
        <section>
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-6">&#9654; {t('current')}</div>
          <div className="bg-dark border border-border p-8 flex justify-center">
            <FearGreedGauge value={currentValue} label={t(labelKey)} />
          </div>
        </section>

        {/* History Chart */}
        <section>
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-6">&#9654; {t('history')}</div>
          <div className="bg-dark border border-border p-4">
            <FearGreedHistoryChart data={data.map(d => ({ value: parseInt(d.value), timestamp: d.timestamp }))} />
          </div>
        </section>
      </div>

      {/* Legend */}
      <section className="mb-10">
        <div className="grid grid-cols-5 gap-2 max-w-2xl">
          {(['extreme_fear', 'fear', 'neutral', 'greed', 'extreme_greed'] as const).map((key, i) => {
            const colors = ['#FF4444', '#FF8C00', '#FFCC00', '#AADD00', '#00D395'];
            return (
              <div key={key} className="text-center">
                <div className="h-2 mb-1" style={{ backgroundColor: colors[i] }} />
                <div className="text-xs text-subtle">{t(key)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section>
        <div className="bg-dark border border-border p-6 text-light text-sm leading-relaxed max-w-2xl">
          {t('about')}
        </div>
      </section>
    </div>
  );
}
