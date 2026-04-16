import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Trees,
  Users2,
  Home,
  Search,
  ClipboardCheck,
  KeyRound,
  Shield,
  Headphones,
  Wallet,
} from 'lucide-react';
import { LookingForHousingCard } from '@/components/home/LookingForHousingCard';
import { WorkerCategories } from '@/components/home/WorkerCategories';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { sampleProperties } from '@/lib/sample-data';

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
          {/* I'm Looking for Housing — opens wizard */}
          <LookingForHousingCard
            locale={locale}
            title={isAr ? 'أبحث عن سكن' : "I'm Looking"}
            description={t('forCompaniesDesc')}
            bullets={
              isAr
                ? ['مرونة كاملة لجميع الأحجام', 'بحث متقدم بالموقع والسعة', 'نظام مطابقة ذكي وعروض فورية']
                : ['Flexible solutions for all sizes', 'Advanced search by location & capacity', 'Smart matching with instant offers']
            }
            ctaLabel={t('browseListings')}
          />

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

      {/* ══════════════════════════════════════
          HOW IT WORKS — 3-step process
          ══════════════════════════════════════ */}
      <section className="relative z-10 border-t border-black/5 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c41e3a]">
              {isAr ? 'كيف تعمل المنصة' : 'How It Works'}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
              {isAr ? 'ثلاث خطوات بسيطة' : 'Three Simple Steps'}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                titleAr: 'اكتشف واختر',
                titleEn: 'Explore & Select',
                descAr: 'تصفح الوحدات المتاحة واختر ما يناسب احتياجات فريقك من حيث الموقع والسعة والخدمات',
                descEn: 'Browse available units and select what fits your team needs by location, capacity, and services',
                step: '01',
              },
              {
                icon: ClipboardCheck,
                titleAr: 'خصص طلبك',
                titleEn: 'Customize',
                descAr: 'حدد مدة الإقامة، عدد الأسرّة، والخدمات الإضافية المطلوبة لفريقك',
                descEn: 'Set your duration, number of beds, and additional services needed',
                step: '02',
              },
              {
                icon: KeyRound,
                titleAr: 'احجز بأمان',
                titleEn: 'Confirm & Book',
                descAr: 'أكد الحجز بعد مراجعة التفاصيل وادفع عبر وسائل الدفع الآمنة',
                descEn: 'Confirm after reviewing details and pay securely through trusted methods',
                step: '03',
              },
            ].map(({ icon: Icon, titleAr, titleEn, descAr, descEn, step }) => (
              <div
                key={step}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-[#fafafa] p-8 transition-all hover:border-[#c41e3a]/20 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black text-[#c41e3a]/10">
                    {step}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#0a0a0a]">
                  {isAr ? titleAr : titleEn}
                </h3>
                <p className="text-sm leading-relaxed text-[#525252]">
                  {isAr ? descAr : descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WORKER CATEGORIES — who we serve
          ══════════════════════════════════════ */}
      <WorkerCategories locale={locale} />

      {/* ══════════════════════════════════════
          FEATURED PROPERTIES
          ══════════════════════════════════════ */}
      <section className="relative z-10 bg-[#fafafa] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c41e3a]">
                {isAr ? 'عقارات مميزة' : 'Featured Properties'}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
                {isAr ? 'مساكن جاهزة للسكن' : 'Move-in Ready Units'}
              </h2>
            </div>
            <Link
              href={`/${locale}/search`}
              className="hidden items-center gap-1 text-sm font-semibold text-[#c41e3a] transition-transform hover:gap-2 sm:inline-flex"
            >
              {isAr ? 'عرض الكل' : 'View all'}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sampleProperties.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY MSAKN — Trust pillars
          ══════════════════════════════════════ */}
      <section className="relative z-10 border-y border-black/5 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c41e3a]">
              {isAr ? 'لماذا مساكن' : 'Why Msakn'}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
              {isAr ? 'ثقة الآلاف من الشركات' : 'Trusted by Thousands'}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                titleAr: 'موثق رسمياً',
                titleEn: 'Fully Licensed',
                descAr: 'جميع العقارات موثقة من الأمانة والدفاع المدني',
                descEn: 'All properties verified by municipality and civil defense',
              },
              {
                icon: Headphones,
                titleAr: 'دعم على مدار الساعة',
                titleEn: '24/7 Support',
                descAr: 'فريق دعم متخصص متاح دائماً لخدمتك',
                descEn: 'Dedicated support team always available',
              },
              {
                icon: Wallet,
                titleAr: 'دفع آمن',
                titleEn: 'Secure Payment',
                descAr: 'مدى، فيزا، ماستركارد، ساداد، تحويل بنكي',
                descEn: 'Mada, Visa, Mastercard, Sadad, Bank Transfer',
              },
              {
                icon: Sparkles,
                titleAr: 'خدمات متكاملة',
                titleEn: 'All-Inclusive',
                descAr: 'إعاشة، نظافة، صيانة، نقل — كل شيء في مكان واحد',
                descEn: 'Catering, cleaning, maintenance, transport — all in one',
              },
            ].map(({ icon: Icon, titleAr, titleEn, descAr, descEn }) => (
              <div key={titleEn} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef2f2]">
                  <Icon className="h-7 w-7 text-[#c41e3a]" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-[#0a0a0a]">
                  {isAr ? titleAr : titleEn}
                </h3>
                <p className="text-sm text-[#737373]">
                  {isAr ? descAr : descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Payment methods visual strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-black/5 pt-8">
            <span className="text-xs font-medium uppercase tracking-wider text-[#a3a3a3]">
              {isAr ? 'نقبل' : 'We accept'}
            </span>
            {['Mada', 'Visa', 'Mastercard', 'Sadad', 'Bank Transfer'].map((method) => (
              <span
                key={method}
                className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#404040]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════ */}
      <section className="relative z-10 overflow-hidden bg-[#0a0a0a] py-16 lg:py-24">
        <div className="absolute top-0 end-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-[#c41e3a] opacity-20 blur-3xl" />
        <div className="absolute bottom-0 start-0 h-96 w-96 translate-y-1/3 -translate-x-1/3 rounded-full bg-[#14b8a6] opacity-10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {isAr ? 'جاهز تبدأ رحلتك معنا؟' : 'Ready to get started?'}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
            {isAr
              ? 'سواء كنت تبحث عن سكن أو لديك عقار للتأجير، مساكن هي وجهتك الأولى'
              : 'Whether you need housing or have a property to rent, Msakn is your first destination'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/search`}
              className="inline-flex items-center gap-2 rounded-full bg-[#c41e3a] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-[#c41e3a]/30 transition-all hover:bg-[#a91b32] hover:shadow-2xl"
            >
              {isAr ? 'تصفح المساكن' : 'Browse Units'}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/properties/new`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              {isAr ? 'سجّل عقارك' : 'List Your Property'}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
