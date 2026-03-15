import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  const t = useTranslations('Common');

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="font-pixel text-6xl text-green mb-6" style={{ textShadow: '0 0 40px rgba(0,211,149,0.8)' }}>
          404
        </div>
        <h1 className="text-2xl font-bold mb-2">{t('not_found')}</h1>
        <p className="text-subtle mb-8">{t('not_found_description')}</p>
        <Link
          href="/"
          className="bg-green hover:bg-green-dark text-white px-6 py-3 text-sm font-semibold transition-colors"
        >
          {t('back_home')}
        </Link>
      </div>
      <Footer />
    </>
  );
}
