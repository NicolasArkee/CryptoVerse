'use client';

import { useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { useTranslations } from 'next-intl';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Navigation');

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="text-subtle hover:text-white p-1"
        aria-label="Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />
          <div className="fixed top-0 right-0 w-64 h-full bg-deep border-l border-border z-50 p-6 overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-subtle hover:text-white"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav className="flex flex-col gap-1 mt-8">
              <div className="font-pixel text-[0.4rem] text-green-bright tracking-widest mb-2">MENU</div>
              {[
                { href: '/tokens', label: t('tokens') },
                { href: '/categories', label: t('categories') },
                { href: '/exchanges', label: t('exchanges') },
                { href: '/defi', label: t('defi') },
                { href: '/blockchains', label: t('blockchains') },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-subtle hover:text-white text-sm py-2 border-b border-border/30 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="font-pixel text-[0.4rem] text-green-bright tracking-widest mb-2 mt-6">MORE</div>
              {[
                { href: '/trending', label: t('trending') },
                { href: '/stablecoins', label: t('stablecoins') },
                { href: '/fear-greed', label: t('fear_greed') },
                { href: '/global', label: t('global') },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-green text-sm py-2 border-b border-border/30 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
