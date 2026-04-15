'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Phone, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();

  const locale = pathname.startsWith('/en') ? 'en' : 'ar';
  const isAr = locale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2d2d2d] bg-[#1a1a1a]">
      <div className="w-full px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2 text-white">
            <img src="/Logo.avif" alt="Msakn" className="h-8 w-8" />
            <div>
              <span className="block text-sm font-semibold">
                {isAr ? 'مساكن' : 'MSAKN'}
              </span>
              <span className="text-xs text-gray-400">
                {isAr ? 'سكن القوى العاملة' : 'Workforce Housing'}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
            <a
              href="tel:+966503755446"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              +966 50 375 5446
            </a>
            <a
              href="mailto:kalthaidy@msakn.sa"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              kalthaidy@msakn.sa
            </a>
            <a
              href="https://www.msakn.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Globe className="h-3.5 w-3.5" />
              www.msakn.sa
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-[#2d2d2d] pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} {isAr ? 'مساكن' : 'MSAKN'}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
