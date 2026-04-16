'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();

  const locale = pathname.startsWith('/en') ? 'en' : 'ar';
  const alternateLocale = locale === 'ar' ? 'en' : 'ar';
  const switchLocalePath = pathname.replace(/^\/(ar|en)/, `/${alternateLocale}`);

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/search`, label: t('nav.search') },
    { href: `/${locale}/operate`, label: locale === 'ar' ? 'شغّل عقارك' : 'Operate My Unit' },
    { href: `/${locale}/properties/new`, label: t('nav.addProperty') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img src="/Logo.avif" alt="Msakn" className="h-10 w-10" />
          <span className="text-lg font-bold tracking-tight text-[#1a1a1a]">
            {locale === 'ar' ? 'مساكن' : 'MSAKN'}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === `/${locale}`
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#fef2f2] text-[#c41e3a]'
                    : 'text-[#666] hover:bg-[#faf8f5] hover:text-[#1a1a1a]'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          <Link
            href={switchLocalePath}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#666] transition-colors hover:bg-[#faf8f5] hover:text-[#1a1a1a]"
            title={t('common.language')}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{t('common.language')}</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#666] transition-colors hover:bg-[#faf8f5] hover:text-[#1a1a1a] md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-[#ece5dc] bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#fef2f2] text-[#c41e3a]'
                      : 'text-[#666] hover:bg-[#faf8f5] hover:text-[#1a1a1a]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
