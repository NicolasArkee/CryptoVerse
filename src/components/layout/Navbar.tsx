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
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}
