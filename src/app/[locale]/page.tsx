import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  CheckCircle,
  Building2,
  Briefcase,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tn = await getTranslations('nav');

  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#f5f0eb] pt-8 pb-12 lg:pt-10 lg:pb-16">
      {/* Decorative geometric patterns */}
      <div className="absolute inset-0 geo-lines opacity-60" />
      <svg className="absolute top-12 start-8 w-64 h-64 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
        <path d="M20 180 L100 20 L180 180" stroke="#c41e3a" strokeWidth="1.5" />
        <path d="M50 180 L100 60 L150 180" stroke="#c41e3a" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-8 end-12 w-48 h-48 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
        <rect x="30" y="30" width="140" height="140" stroke="#c41e3a" strokeWidth="1.5" />
        <rect x="60" y="60" width="80" height="80" stroke="#c41e3a" strokeWidth="1" />
      </svg>

      <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand + headline */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <img
            src="/Logo.avif"
            alt="Msakn"
            className="mx-auto mb-4 h-20 w-20 sm:h-24 sm:w-24"
          />
          <h1 className="text-3xl font-bold text-[#1a1a1a] sm:text-4xl lg:text-5xl leading-[1.1]">
            {isRTL ? 'حل يناسب الجميع' : 'A Solution for Everyone'}
          </h1>
          <p className="mt-4 text-base text-[#666] sm:text-lg max-w-2xl mx-auto">
            {isRTL
              ? 'من فرد يبحث عن سكن لسائقه إلى شركة بعشرات الآلاف من الموظفين'
              : 'From an individual seeking housing for their driver to a company with tens of thousands of employees'}
          </p>
        </div>

        {/* Two beneficiary cards */}
        <div className="grid gap-8 lg:grid-cols-2 max-w-[1400px] mx-auto">
          {/* I'm Looking for Housing */}
          <Link
            href={`/${locale}/search`}
            className="group rounded-3xl bg-white p-10 lg:p-14 xl:p-16 min-h-[480px] lg:min-h-[560px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_48px_rgba(196,30,58,0.15)] hover:-translate-y-1 flex flex-col"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fef2f2] group-hover:bg-[#c41e3a] transition-colors">
              <Briefcase className="h-8 w-8 text-[#c41e3a] group-hover:text-white transition-colors" />
            </div>
            <h3 className="mt-8 text-3xl font-bold text-[#1a1a1a] lg:text-4xl xl:text-5xl">
              {t('forCompanies')}
            </h3>
            <p className="mt-5 text-[#666] text-lg lg:text-xl leading-relaxed">
              {t('forCompaniesDesc')}
            </p>
            <ul className="mt-8 space-y-4 flex-1">
              {(isRTL
                ? ['من فرد واحد إلى 60,000+ موظف', 'بحث متقدم بالموقع والسعة', 'نظام مطابقة ذكي وعروض فورية']
                : ['From 1 person to 60,000+ employees', 'Advanced search by location & capacity', 'Smart matching with instant offers']
              ).map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-[#666]">
                  <CheckCircle className="h-5 w-5 shrink-0 text-[#c41e3a]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 inline-flex">
              <Button size="lg" className="bg-[#c41e3a] hover:bg-[#a91b32] text-white border-0 px-8 py-4 text-base pointer-events-none">
                {t('browseListings')}
                <ArrowIcon className="h-5 w-5 ms-2" />
              </Button>
            </div>
          </Link>

          {/* I Have Property to Rent */}
          <Link
            href={`/${locale}/properties/new`}
            className="group rounded-3xl bg-[#1a1a1a] p-10 lg:p-14 xl:p-16 min-h-[480px] lg:min-h-[560px] text-white transition-all hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)] hover:-translate-y-1 flex flex-col"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 group-hover:bg-[#c41e3a] transition-colors">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="mt-8 text-3xl font-bold lg:text-4xl xl:text-5xl">
              {t('forProviders')}
            </h3>
            <p className="mt-5 text-gray-400 text-lg lg:text-xl leading-relaxed">
              {t('forProvidersDesc')}
            </p>
            <ul className="mt-8 space-y-4 flex-1">
              {(isRTL
                ? ['اعرض غرفة واحدة أو مجمعاً كاملاً', 'استقبل طلبات مباشرة من جميع الأحجام', 'إدارة الحجوزات والعقود']
                : ['List a single room or an entire complex', 'Receive direct requests of all sizes', 'Manage bookings & contracts']
              ).map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-gray-400">
                  <CheckCircle className="h-5 w-5 shrink-0 text-[#c41e3a]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 inline-flex">
              <Button size="lg" className="!bg-white !text-[#1a1a1a] hover:!bg-gray-100 border-0 px-8 py-4 text-base pointer-events-none">
                {tn('addProperty')}
                <ArrowIcon className="h-5 w-5 ms-2" />
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
