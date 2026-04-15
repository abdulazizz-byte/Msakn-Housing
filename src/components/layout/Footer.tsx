'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();

  const locale = pathname.startsWith('/en') ? 'en' : 'ar';

  const footerLinks = [
    { href: `/${locale}/about`, label: t('footer.about') },
    { href: `/${locale}/terms`, label: t('footer.terms') },
    { href: `/${locale}/privacy`, label: t('footer.privacy') },
    { href: `/${locale}/contact`, label: t('footer.contact') },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2d2d2d] bg-[#1a1a1a]">
      <div className="w-full px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2 text-white">
            <img src="/Logo.avif" alt="Msakn" className="h-7 w-7 rounded bg-white/5 p-0.5" />
            <span className="text-sm font-semibold">
              {t('common.appName')}
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-[#2d2d2d] pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} {t('common.appName')}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
