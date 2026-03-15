import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navbar() {
  const t = useTranslations('Navigation');

  return (
    <nav className="border-b border-border bg-deep">
      <div className="mx-auto max-w-[80rem] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-pixel text-sm text-white hover:text-green-bright transition-colors" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
            CRYPTOVERSE
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/tokens" className="text-subtle hover:text-white text-sm transition-colors">
              {t('tokens')}
            </Link>
            <Link href="/categories" className="text-subtle hover:text-white text-sm transition-colors">
              {t('categories')}
            </Link>
            <Link href="/exchanges" className="text-subtle hover:text-white text-sm transition-colors">
              {t('exchanges')}
            </Link>
            <Link href="/defi" className="text-subtle hover:text-white text-sm transition-colors">
              {t('defi')}
            </Link>
            <Link href="/blockchains" className="text-subtle hover:text-white text-sm transition-colors">
              {t('blockchains')}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
        </div>
      </div>
      {/* Secondary nav */}
      <div className="mx-auto max-w-[80rem] px-6 pb-2 hidden md:flex items-center gap-5">
        <Link href="/trending" className="text-muted hover:text-green text-xs transition-colors">
          {t('trending')}
        </Link>
        <Link href="/stablecoins" className="text-muted hover:text-green text-xs transition-colors">
          {t('stablecoins')}
        </Link>
        <Link href="/fear-greed" className="text-muted hover:text-green text-xs transition-colors">
          {t('fear_greed')}
        </Link>
        <Link href="/global" className="text-muted hover:text-green text-xs transition-colors">
          {t('global')}
        </Link>
      </div>
    </nav>
  );
}
