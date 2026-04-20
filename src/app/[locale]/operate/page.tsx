import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  ArrowUpRight,
  ClipboardCheck,
  Hammer,
  Wrench,
  Check,
  X as XIcon,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
  Droplets,
  Wifi,
  Cctv,
  Paintbrush,
  Bug,
  Flame,
} from 'lucide-react';
import { OperatePricingCta } from '@/components/operate/OperatePricingCta';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OperatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === 'ar';

  const steps = [
    {
      n: '01',
      icon: ClipboardCheck,
      titleAr: 'تقييم شامل',
      titleEn: 'Inspect & Assess',
      descAr: 'فريقنا يزور عقارك ويقيّم الحالة الحالية والبنية التحتية ويضع خطة مطابقة لمعايير التشغيل',
      descEn: 'Our team visits your property, evaluates its current state, and aligns it with our operational standards',
    },
    {
      n: '02',
      icon: Hammer,
      titleAr: 'تطوير وتجهيز',
      titleEn: 'Develop & Furnish',
      descAr: 'نخطط المساحات، نجهّز الغرف بالأثاث، ونهيّئ المرافق المشتركة وفق باقة التشغيل المختارة',
      descEn: 'We plan the spaces, furnish the rooms, and prepare shared facilities per your chosen tier',
    },
    {
      n: '03',
      icon: Wrench,
      titleAr: 'تشغيل كامل',
      titleEn: 'Operate Daily',
      descAr: 'نتولى إدارة السكان، الصيانة اليومية، الأمن، والنظافة — أنت تجني الدخل ونحن نشغّل',
      descEn: 'We manage residents, daily maintenance, security, and cleaning — you earn, we operate',
    },
  ];

  const tiers: {
    key: 'basic' | 'comfort' | 'complete';
    nameAr: string;
    nameEn: string;
    price: number;
    tagAr: string;
    tagEn: string;
    popular?: boolean;
    features: { icon: typeof Check; labelAr: string; labelEn: string; included: boolean | 'partial' }[];
  }[] = [
    {
      key: 'basic',
      nameAr: 'الأساسية',
      nameEn: 'Basic',
      price: 135,
      tagAr: 'للاحتياجات الأساسية',
      tagEn: 'Cost-conscious essentials',
      features: [
        { icon: Zap, labelAr: 'كهرباء وماء', labelEn: 'Electricity & water', included: true },
        { icon: Flame, labelAr: 'تغطية الغاز', labelEn: 'Gas coverage', included: 'partial' },
        { icon: Wrench, labelAr: 'صيانة أساسية', labelEn: 'Basic maintenance', included: true },
        { icon: Wifi, labelAr: 'إنترنت عالي السرعة', labelEn: 'Fast internet', included: false },
        { icon: Paintbrush, labelAr: 'تجديدات', labelEn: 'Renovations', included: false },
        { icon: Bug, labelAr: 'مكافحة حشرات شهرية', labelEn: 'Monthly pest control', included: false },
        { icon: Cctv, labelAr: 'كاميرات وأمن', labelEn: 'Cameras & security', included: 'partial' },
      ],
    },
    {
      key: 'comfort',
      nameAr: 'المريحة',
      nameEn: 'Comfortable',
      price: 165,
      tagAr: 'معايير نظافة وإدارة أعلى',
      tagEn: 'Higher cleanliness & management',
      popular: true,
      features: [
        { icon: Zap, labelAr: 'كهرباء وماء', labelEn: 'Electricity & water', included: true },
        { icon: Flame, labelAr: 'تغطية الغاز', labelEn: 'Gas coverage', included: true },
        { icon: Wrench, labelAr: 'صيانة مع قطع غيار', labelEn: 'Maintenance + spare parts', included: true },
        { icon: Wifi, labelAr: 'إنترنت عالي السرعة', labelEn: 'Fast internet', included: true },
        { icon: Paintbrush, labelAr: 'تجديدات بسيطة', labelEn: 'Light renovations', included: 'partial' },
        { icon: Bug, labelAr: 'مكافحة حشرات شهرية', labelEn: 'Monthly pest control', included: true },
        { icon: Cctv, labelAr: 'كاميرات وحارس', labelEn: 'Cameras + on-site guard', included: true },
      ],
    },
    {
      key: 'complete',
      nameAr: 'المتكاملة',
      nameEn: 'Complete',
      price: 185,
      tagAr: 'أعلى مستوى معيشة واحتفاظ بالموظفين',
      tagEn: 'Premium living & employee retention',
      features: [
        { icon: Zap, labelAr: 'كهرباء وماء', labelEn: 'Electricity & water', included: true },
        { icon: Flame, labelAr: 'تغطية الغاز الكاملة', labelEn: 'Full gas coverage', included: true },
        { icon: Wrench, labelAr: 'صيانة شاملة + قطع غيار', labelEn: 'Full maintenance + spare parts', included: true },
        { icon: Wifi, labelAr: 'إنترنت عالي السرعة', labelEn: 'Fast internet', included: true },
        { icon: Paintbrush, labelAr: 'تجديدات كاملة', labelEn: 'Full renovations', included: true },
        { icon: Bug, labelAr: 'مكافحة حشرات شهرية', labelEn: 'Monthly pest control', included: true },
        { icon: Cctv, labelAr: 'كاميرات + حارس + بوابات', labelEn: 'Cameras + guard + access gates', included: true },
      ],
    },
  ];

  const pillars = [
    {
      icon: TrendingUp,
      titleAr: 'دخل ثابت',
      titleEn: 'Stable Income',
      descAr: 'عائد مضمون شهرياً دون عناء التشغيل',
      descEn: 'Guaranteed monthly yield without operational headaches',
    },
    {
      icon: ShieldCheck,
      titleAr: 'التزام وتوثيق',
      titleEn: 'Licensed & Compliant',
      descAr: 'تشغيل وفق معايير الدفاع المدني والأمانة',
      descEn: 'Operations per municipality & civil-defense standards',
    },
    {
      icon: Wallet,
      titleAr: 'شفافية مالية',
      titleEn: 'Financial Transparency',
      descAr: 'تقارير شهرية واضحة للإيرادات والمصروفات',
      descEn: 'Monthly reports of revenue and expenses',
    },
    {
      icon: Sparkles,
      titleAr: 'جودة تجربة الساكن',
      titleEn: 'Resident Experience',
      descAr: 'ساكن سعيد = احتفاظ أطول + تقييمات أفضل',
      descEn: 'Happy residents = longer stays + better reviews',
    },
  ];

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#fafafa]">
      {/* Animated orb background */}
      <div className="orb-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="noise" />

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <section className="relative z-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#F15A29]/20 bg-[#F15A29]/5 px-3 py-1 text-[11px] font-medium text-[#F15A29] backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            {isAr ? 'خدمة جديدة لأصحاب العقارات' : 'New service for property owners'}
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1]">
            {isAr ? (
              <>
                <span className="gradient-text-subtle">شغّل عقارك </span>
                <span className="gradient-text">بدون عناء</span>
              </>
            ) : (
              <>
                <span className="gradient-text-subtle">Operate Your Unit </span>
                <span className="gradient-text">Hands-Free</span>
              </>
            )}
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-base text-[#525252] sm:text-lg">
            {isAr
              ? 'لديك عقار؟ نحن ندير التشغيل من الألف إلى الياء — التأثيث، الصيانة، الأمن، النظافة، وإدارة السكان — بينما تجني أنت الدخل.'
              : 'You own the property — we run everything. Furnishing, maintenance, security, cleaning, and resident management. You just collect the income.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-[#F15A29] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-[#F15A29]/30 transition-all hover:bg-[#D94C1E] hover:shadow-2xl"
            >
              {isAr ? 'عرض الباقات' : 'View Pricing'}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/properties/new`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-all hover:border-[#F15A29]/30 hover:text-[#F15A29]"
            >
              {isAr ? 'سجّل عقارك' : 'Register Property'}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3-STEP PROCESS
          ══════════════════════════════════════ */}
      <section className="relative z-10 border-y border-black/5 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F15A29]">
              {isAr ? 'كيف نعمل' : 'How It Works'}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
              {isAr ? 'ثلاث خطوات — ونتولى التشغيل' : 'Three Steps — We Take Over'}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(({ n, icon: Icon, titleAr, titleEn, descAr, descEn }) => (
              <div
                key={n}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-[#fafafa] p-8 transition-all hover:border-[#F15A29]/20 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F15A29] text-white shadow-lg shadow-[#F15A29]/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black text-[#F15A29]/10">{n}</span>
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
          PRICING TIERS
          ══════════════════════════════════════ */}
      <section id="pricing" className="relative z-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F15A29]">
              {isAr ? 'الباقات' : 'Pricing Tiers'}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
              {isAr ? 'اختر مستوى التشغيل' : 'Choose Your Operating Level'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#525252] sm:text-base">
              {isAr
                ? 'السعر شامل لكل ساكن شهرياً — بدون رسوم خفية'
                : 'Price per resident per month — no hidden fees'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className={`relative overflow-hidden rounded-3xl border p-6 lg:p-8 transition-all ${
                  tier.popular
                    ? 'border-[#F15A29] bg-white shadow-[0_30px_60px_-15px_rgba(196,30,58,0.25)]'
                    : 'border-black/5 bg-white hover:shadow-xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 end-0 rounded-bl-2xl bg-[#F15A29] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                  </div>
                )}

                <h3 className="text-2xl font-bold tracking-tight text-[#0a0a0a]">
                  {isAr ? tier.nameAr : tier.nameEn}
                </h3>
                <p className="mt-1 text-sm text-[#737373]">
                  {isAr ? tier.tagAr : tier.tagEn}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-5xl font-black tracking-tight text-[#0a0a0a]">
                    {tier.price}
                  </span>
                  <span className="text-sm font-semibold text-[#F15A29]">
                    {isAr ? 'ر.س' : 'SAR'}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#a3a3a3]">
                  {isAr ? 'لكل ساكن / شهرياً' : 'per resident / month'}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-black/5 pt-5">
                  {tier.features.map((f, i) => {
                    const FIcon = f.icon;
                    return (
                      <li key={i} className="flex items-center gap-2.5 text-sm">
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            f.included === true
                              ? 'bg-[#F15A29]/10 text-[#F15A29]'
                              : f.included === 'partial'
                              ? 'bg-[#fef3c7] text-[#b45309]'
                              : 'bg-[#f5f5f5] text-[#a3a3a3]'
                          }`}
                        >
                          {f.included === true ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : f.included === 'partial' ? (
                            <FIcon className="h-3.5 w-3.5" />
                          ) : (
                            <XIcon className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <span className={f.included === false ? 'text-[#a3a3a3] line-through' : 'text-[#404040]'}>
                          {isAr ? f.labelAr : f.labelEn}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <OperatePricingCta
                  locale={locale}
                  tier={isAr ? tier.nameAr : tier.nameEn}
                  popular={!!tier.popular}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US
          ══════════════════════════════════════ */}
      <section className="relative z-10 border-y border-black/5 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F15A29]">
              {isAr ? 'لماذا مساكن' : 'Why Msakn'}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
              {isAr ? 'إدارة موثوقة — نتائج واضحة' : 'Trusted Management, Clear Results'}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, titleAr, titleEn, descAr, descEn }) => (
              <div key={titleEn} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF0E8]">
                  <Icon className="h-7 w-7 text-[#F15A29]" />
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
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════ */}
      <section className="relative z-10 overflow-hidden bg-[#0a0a0a] py-16 lg:py-24">
        <div className="absolute top-0 end-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-[#F15A29] opacity-20 blur-3xl" />
        <div className="absolute bottom-0 start-0 h-96 w-96 translate-y-1/3 -translate-x-1/3 rounded-full bg-[#91D5FA] opacity-10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {isAr ? 'ابدأ الكسب من عقارك اليوم' : 'Start Earning from Your Property Today'}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
            {isAr
              ? 'تواصل معنا لجدولة زيارة تقييم مجانية — ستتلقى عرضاً مفصلاً خلال 48 ساعة'
              : 'Contact us to schedule a free site assessment — receive a detailed offer within 48 hours'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/properties/new`}
              className="inline-flex items-center gap-2 rounded-full bg-[#F15A29] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-[#F15A29]/30 transition-all hover:bg-[#D94C1E]"
            >
              {isAr ? 'سجّل عقارك الآن' : 'Register Your Property'}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
