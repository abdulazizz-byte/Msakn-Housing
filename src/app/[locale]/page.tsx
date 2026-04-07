import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  Search,
  ClipboardList,
  MessageSquare,
  CheckCircle,
  Building2,
  Users,
  Briefcase,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Headphones,
  UtensilsCrossed,
  Bus,
  Sparkles,
  Wrench,
  ChevronRight,
  ChevronLeft,
  Star,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { sampleProperties } from '@/lib/sample-data';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');

  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  const featuredProperties = sampleProperties.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* ══════════════════════════════════════
          HERO — msakn.sa inspired: warm cream bg,
          geometric patterns, centered branding
          ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f5f0eb]">
        {/* Geometric line pattern */}
        <div className="absolute inset-0 geo-lines opacity-60" />

        {/* Subtle geometric shapes — decorative SVG */}
        <svg className="absolute top-12 start-8 w-64 h-64 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
          <path d="M20 180 L100 20 L180 180" stroke="#c41e3a" strokeWidth="1.5" />
          <path d="M50 180 L100 60 L150 180" stroke="#c41e3a" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-8 end-12 w-48 h-48 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
          <rect x="30" y="30" width="140" height="140" stroke="#c41e3a" strokeWidth="1.5" />
          <rect x="60" y="60" width="80" height="80" stroke="#c41e3a" strokeWidth="1" />
        </svg>

        <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Top spacer */}
          <div className="pt-16 sm:pt-20 lg:pt-28" />

          {/* Two column hero */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Branding + Text */}
            <div className="max-w-2xl">
              {/* Brand mark */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#c41e3a]/20 bg-white">
                  <Building2 className="h-7 w-7 text-[#c41e3a]" />
                </div>
                <div>
                  <span className="block text-xs font-semibold tracking-[0.3em] text-[#999] uppercase">
                    {locale === 'ar' ? 'م س ا ك ن' : 'M S A K N'}
                  </span>
                  <span className="text-xs text-[#999]">
                    {locale === 'ar' ? 'سكن القوى العاملة' : 'Workforce Housing'}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
                <span className="gradient-text">{locale === 'ar' ? 'مساكن' : 'MSAKN'}</span>
                <br />
                <span className="text-[#1a1a1a]">
                  {locale === 'ar'
                    ? 'سكن عمال متكامل'
                    : 'Labor Accommodation'}
                </span>
              </h1>

              <p className="mt-6 text-lg text-[#666] leading-relaxed sm:text-xl max-w-xl">
                {locale === 'ar'
                  ? 'الشركة الرائدة في تقديم حلول الإسكان المتكاملة للقوى العاملة في المملكة العربية السعودية'
                  : 'The Leading Company in Providing Integrated Accommodation Solutions in Saudi Arabia'}
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href={`/${locale}/search`}>
                  <Button size="lg" className="w-full sm:w-auto bg-[#c41e3a] hover:bg-[#a91b32] text-white border-0 px-8">
                    {t('browseListings')}
                    <ArrowIcon className="h-4 w-4 ms-2" />
                  </Button>
                </Link>
                <Link href={`/${locale}/requests/new`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-8"
                  >
                    {t('submitRequest')}
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex items-center gap-6 text-sm text-[#999]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#c41e3a]" />
                  <span>{locale === 'ar' ? 'مرخص رسمياً' : 'Officially Licensed'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#c41e3a]" />
                  <span>{locale === 'ar' ? 'تقييم 4.8/5' : '4.8/5 Rating'}</span>
                </div>
              </div>
            </div>

            {/* Right: Search card on warm background */}
            <div className="w-full">
              <div className="rounded-3xl bg-white p-8 lg:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">
                  {locale === 'ar' ? 'ابحث عن سكن عمال' : 'Find Worker Housing'}
                </h2>

                {/* Search input */}
                <div className="relative mb-4">
                  <Search className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#999]" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="w-full rounded-xl border border-[#ece5dc] bg-[#faf8f5] py-4 pe-4 ps-12 text-[#1a1a1a] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/20 focus:border-[#c41e3a]"
                  />
                </div>

                {/* Quick area filters */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {(['north', 'south', 'east', 'west'] as const).map((area) => (
                    <Link
                      key={area}
                      href={`/${locale}/search?area=${area}`}
                      className="flex items-center gap-2 rounded-xl border border-[#ece5dc] bg-[#faf8f5] px-4 py-3 text-sm text-[#666] hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors"
                    >
                      <MapPin className="h-4 w-4 shrink-0" />
                      {isRTL
                        ? { north: 'شمال الرياض', south: 'جنوب الرياض', east: 'شرق الرياض', west: 'غرب الرياض' }[area]
                        : { north: 'North Riyadh', south: 'South Riyadh', east: 'East Riyadh', west: 'West Riyadh' }[area]}
                    </Link>
                  ))}
                </div>

                <Link href={`/${locale}/search`} className="block">
                  <Button className="w-full bg-[#c41e3a] hover:bg-[#a91b32] text-white border-0" size="lg">
                    <Search className="h-4 w-4 me-2" />
                    {tc('search')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom spacer */}
          <div className="pb-16 sm:pb-20 lg:pb-28" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS — clean row on white
          ══════════════════════════════════════ */}
      <section className="border-y border-[#ece5dc] bg-white">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: '150+', label: locale === 'ar' ? 'عقار متاح' : 'Available Properties', icon: Building2 },
              { value: '500+', label: locale === 'ar' ? 'شركة مسجلة' : 'Registered Companies', icon: Briefcase },
              { value: '50,000+', label: locale === 'ar' ? 'عامل تم إسكانه' : 'Workers Housed', icon: Users },
              { value: '3', label: locale === 'ar' ? 'مدن' : 'Cities', icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fef2f2]">
                  <stat.icon className="h-6 w-6 text-[#c41e3a]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</p>
                  <p className="text-sm text-[#999]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES — what we offer
          ══════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Section header */}
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-semibold tracking-widest text-[#c41e3a] uppercase">
              {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl lg:text-5xl">
              {locale === 'ar' ? 'حلول سكنية متكاملة' : 'Integrated Housing Solutions'}
            </h2>
            <p className="mt-4 text-lg text-[#666]">
              {locale === 'ar'
                ? 'نقدم خدمات شاملة تغطي جميع احتياجات سكن القوى العاملة'
                : 'Comprehensive services covering all workforce accommodation needs'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              { icon: Building2, title: locale === 'ar' ? 'سكن مفروش' : 'Furnished Housing', desc: locale === 'ar' ? 'وحدات سكنية مفروشة بالكامل وجاهزة للسكن الفوري' : 'Fully furnished units ready for immediate occupancy' },
              { icon: UtensilsCrossed, title: locale === 'ar' ? 'خدمات التموين' : 'Catering Services', desc: locale === 'ar' ? 'وجبات يومية متكاملة تلبي احتياجات العمال الغذائية' : 'Complete daily meals meeting worker nutritional needs' },
              { icon: Bus, title: locale === 'ar' ? 'خدمات النقل' : 'Transportation', desc: locale === 'ar' ? 'نقل العمال من وإلى مواقع العمل بأسطول حديث' : 'Worker transport to and from work sites with modern fleet' },
              { icon: Sparkles, title: locale === 'ar' ? 'النظافة والصيانة' : 'Cleaning & Maintenance', desc: locale === 'ar' ? 'خدمات نظافة وصيانة دورية لضمان بيئة صحية' : 'Regular cleaning and maintenance for a healthy environment' },
              { icon: Wrench, title: locale === 'ar' ? 'الصيانة الفنية' : 'Technical Maintenance', desc: locale === 'ar' ? 'فريق صيانة متخصص متاح على مدار الساعة' : 'Specialized maintenance team available 24/7' },
              { icon: ShieldCheck, title: locale === 'ar' ? 'الأمن والسلامة' : 'Security & Safety', desc: locale === 'ar' ? 'أنظمة أمنية متكاملة وحراسة على مدار الساعة' : 'Integrated security systems with 24/7 surveillance' },
              { icon: Headphones, title: locale === 'ar' ? 'دعم العملاء' : 'Customer Support', desc: locale === 'ar' ? 'فريق دعم متخصص لخدمة الشركات والعمال' : 'Dedicated support team for companies and workers' },
              { icon: ClipboardList, title: locale === 'ar' ? 'إدارة العقود' : 'Contract Management', desc: locale === 'ar' ? 'إدارة احترافية للعقود والتراخيص والتصاريح' : 'Professional management of contracts, licenses and permits' },
            ].map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-[#ece5dc] bg-[#faf8f5] p-6 transition-all hover:border-[#c41e3a]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[#ece5dc] group-hover:border-[#c41e3a]/20 group-hover:bg-[#fef2f2] transition-colors">
                  <service.icon className="h-5 w-5 text-[#c41e3a]" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#1a1a1a]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-[#666] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS — 3 steps
          ══════════════════════════════════════ */}
      <section className="bg-[#f5f0eb] py-20 lg:py-28 geo-pattern">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest text-[#c41e3a] uppercase">
              {locale === 'ar' ? 'آلية العمل' : 'How It Works'}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl">
              {t('howItWorks')}
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: ClipboardList, num: '01', title: t('step1Title'), desc: t('step1Desc') },
              { icon: MessageSquare, num: '02', title: t('step2Title'), desc: t('step2Desc') },
              { icon: CheckCircle, num: '03', title: t('step3Title'), desc: t('step3Desc') },
            ].map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="inline-flex flex-col items-center">
                  <span className="text-5xl font-bold text-[#c41e3a]/10">{step.num}</span>
                  <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                    <step.icon className="h-7 w-7 text-[#c41e3a]" />
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#1a1a1a]">{step.title}</h3>
                <p className="mt-3 text-sm text-[#666] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED PROPERTIES
          ══════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold tracking-widest text-[#c41e3a] uppercase">
                {locale === 'ar' ? 'عقارات مختارة' : 'Featured'}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl">
                {t('featuredProperties')}
              </h2>
            </div>
            <Link
              href={`/${locale}/search`}
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#c41e3a] hover:text-[#a91b32]"
            >
              {tc('showMore')}
              <ChevronIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} locale={locale} />
            ))}
          </div>

          {/* Mobile show more */}
          <div className="mt-8 text-center sm:hidden">
            <Link href={`/${locale}/search`}>
              <Button variant="outline" className="border-[#c41e3a] text-[#c41e3a]">
                {tc('showMore')}
                <ChevronIcon className="h-4 w-4 ms-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TWO-COLUMN VALUE PROPS
          ══════════════════════════════════════ */}
      <section className="bg-[#faf8f5] py-20 lg:py-28">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* For Companies */}
            <div className="rounded-3xl bg-white p-8 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef2f2]">
                <Briefcase className="h-7 w-7 text-[#c41e3a]" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1a1a1a] lg:text-3xl">
                {t('forCompanies')}
              </h3>
              <p className="mt-4 text-[#666] text-lg leading-relaxed">
                {t('forCompaniesDesc')}
              </p>
              <ul className="mt-6 space-y-3">
                {(locale === 'ar'
                  ? ['بحث متقدم بالموقع والسعة', 'مقارنة عروض من عدة مزودين', 'نظام مطابقة ذكي']
                  : ['Advanced search by location & capacity', 'Compare offers from multiple providers', 'Smart matching system']
                ).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#666]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#c41e3a]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/search`} className="mt-8 inline-block">
                <Button className="bg-[#c41e3a] hover:bg-[#a91b32] text-white border-0 px-6">
                  {t('browseListings')}
                  <ArrowIcon className="h-4 w-4 ms-2" />
                </Button>
              </Link>
            </div>

            {/* For Providers */}
            <div className="rounded-3xl bg-[#1a1a1a] p-8 lg:p-12 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold lg:text-3xl">
                {t('forProviders')}
              </h3>
              <p className="mt-4 text-gray-400 text-lg leading-relaxed">
                {t('forProvidersDesc')}
              </p>
              <ul className="mt-6 space-y-3">
                {(locale === 'ar'
                  ? ['اعرض عقارك لآلاف الشركات', 'استقبل طلبات مباشرة', 'إدارة الحجوزات والعقود']
                  : ['List your property to thousands of companies', 'Receive direct requests', 'Manage bookings & contracts']
                ).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#c41e3a]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/requests/new`} className="mt-8 inline-block">
                <Button className="bg-white text-[#1a1a1a] hover:bg-gray-100 border-0 px-6">
                  {tn('addProperty')}
                  <ArrowIcon className="h-4 w-4 ms-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
          ══════════════════════════════════════ */}
      <section className="bg-[#c41e3a] py-16 lg:py-20">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <div className="text-center lg:text-start">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {locale === 'ar' ? 'هل تبحث عن سكن لعمالك؟' : 'Looking for worker housing?'}
              </h2>
              <p className="mt-3 text-lg text-white/80">
                {locale === 'ar'
                  ? 'تواصل معنا اليوم واحصل على أفضل العروض'
                  : 'Contact us today and get the best offers'}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/requests/new`}>
                <Button size="lg" className="bg-white text-[#c41e3a] hover:bg-gray-100 border-0 px-8">
                  {t('submitRequest')}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                <Phone className="h-4 w-4 me-2" />
                {locale === 'ar' ? 'اتصل بنا' : 'Call Us'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
