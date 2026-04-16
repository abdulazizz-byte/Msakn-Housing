import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Trees,
  Users2,
  Home,
} from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tn = await getTranslations('nav');

  const isAr = locale === 'ar';

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#fafafa]">
      {/* Animated orb background */}
      <div className="orb-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="noise" />

      <div className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Hero: logo + bold headline */}
        <div className="mx-auto max-w-7xl text-center mb-6 lg:mb-8 animate-fade-up">
          <img
            src="/Logo.avif"
            alt="Msakn"
            className="mx-auto mb-3 h-12 w-12 sm:h-14 sm:w-14"
          />

          {/* Micro tag */}
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#c41e3a]/20 bg-[#c41e3a]/5 px-3 py-1 text-[11px] font-medium text-[#c41e3a] backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            {isAr ? 'مجمعات سكنية متكاملة الخدمات' : 'All-Inclusive Housing Compounds'}
          </div>

          <h1 className="mb-3 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1]">
            {isAr ? (
              <>
                <span className="gradient-text-subtle">حل سكني </span>
                <span className="gradient-text">يناسب الجميع</span>
              </>
            ) : (
              <>
                <span className="gradient-text-subtle">A Solution </span>
                <span className="gradient-text">for Everyone</span>
              </>
            )}
          </h1>

          <p className="mx-auto max-w-2xl text-sm text-[#525252] sm:text-base lg:text-lg">
            {isAr
              ? 'حلول إسكان مرنة تناسب جميع الاحتياجات والأحجام'
              : 'Flexible housing solutions for every need and every size'}
          </p>

          {/* Compound amenity highlights */}
          <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { icon: Trees, label: isAr ? 'حدائق ومساحات خضراء' : 'Parks & green spaces' },
              { icon: Users2, label: isAr ? 'مناطق ترفيهية' : 'Play areas' },
              { icon: Home, label: isAr ? 'وحدات مفروشة' : 'Furnished units' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/60 px-3 py-1 text-[#404040] backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[#c41e3a]" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Two glassmorphic beneficiary cards */}
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {/* I'm Looking for Housing */}
          <Link
            href={`/${locale}/search`}
            className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 backdrop-blur-xl transition-all hover:border-[#c41e3a]/20 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(196,30,58,0.2)] sm:p-8 lg:p-10"
          >
            {/* Corner accent */}
            <div className="absolute top-0 end-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-[#c41e3a]/20 to-transparent blur-3xl transition-opacity group-hover:opacity-80" />

            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/30">
                <Users2 className="h-6 w-6" />
              </div>

              <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#0a0a0a] lg:text-4xl">
                {isAr ? 'أبحث عن سكن' : "I'm Looking"}
              </h2>

              <p className="mb-5 text-base leading-relaxed text-[#525252]">
                {t('forCompaniesDesc')}
              </p>

              <ul className="mb-6 space-y-2">
                {(isAr
                  ? ['مرونة كاملة لجميع الأحجام', 'بحث متقدم بالموقع والسعة', 'نظام مطابقة ذكي وعروض فورية']
                  : ['Flexible solutions for all sizes', 'Advanced search by location & capacity', 'Smart matching with instant offers']
                ).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#525252]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#c41e3a]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-base font-semibold text-[#c41e3a] transition-transform group-hover:gap-3">
                {t('browseListings')}
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* I Have Property to Rent */}
          <Link
            href={`/${locale}/properties/new`}
            className="group relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-6 text-white transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10"
          >
            {/* Corner accent orb */}
            <div className="absolute top-0 end-0 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#c41e3a] blur-3xl opacity-40 transition-opacity group-hover:opacity-60" />
            <div className="absolute bottom-0 start-0 h-32 w-32 translate-y-1/2 -translate-x-1/2 rounded-full bg-[#14b8a6] blur-3xl opacity-20" />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <Home className="h-6 w-6 text-white" />
              </div>

              <h2 className="mb-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                {isAr ? 'لدي عقار' : 'I Have Property'}
              </h2>

              <p className="mb-5 text-base leading-relaxed text-white/70">
                {t('forProvidersDesc')}
              </p>

              <ul className="mb-6 space-y-2">
                {(isAr
                  ? ['اعرض غرفة واحدة أو مجمعاً كاملاً', 'استقبل طلبات مباشرة من جميع الأحجام', 'إدارة الحجوزات والعقود']
                  : ['List a single room or an entire complex', 'Receive direct requests of all sizes', 'Manage bookings & contracts']
                ).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#14b8a6]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-base font-semibold text-white transition-transform group-hover:gap-3">
                {tn('addProperty')}
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 lg:grid-cols-4">
          {[
            { value: '3,500', label: isAr ? 'سرير' : 'Beds' },
            { value: '592', label: isAr ? 'غرفة' : 'Rooms' },
            { value: '20,640', label: isAr ? 'م² مساحة' : 'm² Area' },
            { value: '24', label: isAr ? 'مرفق متكامل' : 'Facilities' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/80 p-4 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#737373]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
