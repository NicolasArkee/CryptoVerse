'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: e.target.value });
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="bg-dark border border-border text-subtle text-sm px-2 py-1 font-[var(--font-ui)] cursor-pointer hover:border-border-light focus:border-green focus:outline-none"
    >
      {AppConfig.i18n.locales.map(loc => (
        <option key={loc} value={loc}>
          {AppConfig.i18n.localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
