'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Phone, Globe } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();

  const locale = pathname.startsWith('/en') ? 'en' : 'ar';
  const isAr = locale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#ece5dc] bg-white">
      <div className="w-full px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="Msakn" className="h-10 w-auto object-contain" />
            <div>
              <span className="block text-sm font-semibold text-[#1a1a1a]">
                {isAr ? 'مساكن' : 'MSAKN'}
              </span>
              <span className="text-xs text-[#666]">
                {isAr ? 'سكن القوى العاملة' : 'Workforce Housing'}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-[#666]">
            <a
              href="tel:+966503755446"
              className="flex items-center gap-1.5 transition-colors hover:text-[#F15A29]"
              dir="ltr"
            >
              <Phone className="h-3.5 w-3.5" />
              +966 50 375 5446
            </a>
            <a
              href="https://www.msakn.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[#F15A29]"
            >
              <Globe className="h-3.5 w-3.5" />
              www.msakn.sa
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-[#ece5dc] pt-6 text-center">
          <p className="text-xs text-[#999]">
            &copy; {currentYear} {isAr ? 'مساكن' : 'MSAKN'}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
