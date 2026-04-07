'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Globe, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();

  // Derive locale from the first path segment
  const locale = pathname.startsWith('/en') ? 'en' : 'ar';
  const isRTL = locale === 'ar';
  const alternateLocale = locale === 'ar' ? 'en' : 'ar';

  // Build the alternate-locale path by swapping the first segment
  const switchLocalePath = pathname.replace(/^\/(ar|en)/, `/${alternateLocale}`);

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/search`, label: t('nav.search') },
    { href: `/${locale}/requests/new`, label: t('nav.submitRequest') },
    { href: `/${locale}/dashboard`, label: t('nav.dashboard') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2d2d2d] bg-[#1a1a1a] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-white transition-colors hover:text-white/80"
        >
          <Building2 className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">
            {t('common.appName')}
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
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <Link
            href={switchLocalePath}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
            title={t('common.language')}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{t('common.language')}</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
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
        <nav className="border-t border-[#2d2d2d] bg-[#1a1a1a] px-4 pb-4 pt-2 md:hidden">
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
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
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
