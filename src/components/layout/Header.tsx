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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#F15A29] shadow-sm">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Logo lockup — white on red */}
        <Link
          href={`/${locale}`}
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <img
            src="/logo-white.webp"
            alt="Msakn"
            className="h-10 w-auto object-contain"
          />
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
                    ? 'bg-white text-[#F15A29]'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
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
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            title={t('common.language')}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{t('common.language')}</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-white/85 transition-colors hover:bg-white/10 hover:text-white md:hidden"
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
        <nav className="border-t border-white/10 bg-[#F15A29] px-4 pb-4 pt-2 md:hidden">
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
                      ? 'bg-white text-[#F15A29]'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
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
