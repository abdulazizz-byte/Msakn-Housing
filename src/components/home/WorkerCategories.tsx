import { Layers3 } from 'lucide-react';

interface Props {
  locale: string;
}

const SHARED_CATEGORIES = [
  { ar: 'عمال البناء', en: 'Construction' },
  { ar: 'المهندسين', en: 'Engineers' },
  { ar: 'الفنيين', en: 'Technicians' },
  { ar: 'السائقين', en: 'Drivers' },
  { ar: 'الطهاة والإعاشة', en: 'Catering' },
  { ar: 'الضيافة والنظافة', en: 'Hospitality' },
  { ar: 'الأمن والحراسة', en: 'Security' },
  { ar: 'الصيانة', en: 'Maintenance' },
];

const TIERS: {
  key: 'shared' | 'comfortable' | 'premium';
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
  priceAr: string;
  priceEn: string;
  img: string;
}[] = [
  {
    key: 'shared',
    ar: 'مشترك',
    en: 'Shared',
    descAr: 'غرف جماعية بأسرّة طابقية لجميع فئات العمالة',
    descEn: 'Shared bunk-bed rooms for every workforce category',
    priceAr: 'يبدأ من ٥٠٠ ر.س / شهر',
    priceEn: 'From 500 SAR / month',
    img: '/Msakn%20pics/beds.jpg',
  },
  {
    key: 'comfortable',
    ar: 'مريح',
    en: 'Comfortable',
    descAr: 'ستديو خاص أو غرفة مفردة لمن يفضّل الخصوصية',
    descEn: 'Private studio or single room — for those who prefer privacy',
    priceAr: 'يبدأ من ١٢٠٠ ر.س / شهر',
    priceEn: 'From 1,200 SAR / month',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&auto=format&fit=crop',
  },
  {
    key: 'premium',
    ar: 'فخم',
    en: 'Premium',
    descAr: 'وحدات راقية مع تشطيبات وخدمات حصرية',
    descEn: 'High-end units with premium finishes and exclusive services',
    priceAr: 'يبدأ من ٢٥٠٠ ر.س / شهر',
    priceEn: 'From 2,500 SAR / month',
    img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=85&auto=format&fit=crop',
  },
];

export function WorkerCategories({ locale }: Props) {
  const isAr = locale === 'ar';

  return (
    <section className="relative z-10 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F15A29]">
              {isAr ? 'خيارات السكن' : 'Housing Options'}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
              {isAr ? 'سكن مرن يناسب احتياجات الأفراد' : 'Flexible Housing for Every Individual'}
            </h2>
            <p className="mt-2 max-w-xl text-base text-[#525252]">
              {isAr
                ? 'من الغرفة المشتركة إلى الستديو الخاص — وصولاً إلى الخيارات الفخمة'
                : 'From shared rooms to private studios — all the way to premium options'}
            </p>
          </div>
          <div className="hidden items-center gap-2 text-sm text-[#737373] sm:flex">
            <Layers3 className="h-4 w-4 text-[#F15A29]" />
            <span>{isAr ? '٣ مستويات' : '3 Tiers'}</span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.key}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[5/4] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={tier.img}
                  alt={isAr ? tier.ar : tier.en}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Tier badge */}
                <div className="absolute top-4 start-4 inline-flex items-center gap-1.5 rounded-full bg-[#F15A29] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[#F15A29]/30">
                  {isAr ? tier.ar : tier.en}
                </div>

                {/* Title overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">
                    {isAr ? tier.ar : tier.en}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-white/90">
                    {isAr ? tier.priceAr : tier.priceEn}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                <p className="text-sm leading-relaxed text-[#525252]">
                  {isAr ? tier.descAr : tier.descEn}
                </p>

                {/* Categories list (only for shared tier) */}
                {tier.key === 'shared' && (
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#a3a3a3]">
                      {isAr ? 'يناسب جميع الفئات' : 'For all categories'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SHARED_CATEGORIES.map((cat) => (
                        <span
                          key={cat.en}
                          className="rounded-full border border-black/5 bg-[#fafafa] px-2.5 py-1 text-[11px] font-medium text-[#525252]"
                        >
                          {isAr ? cat.ar : cat.en}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto inline-flex items-center justify-between rounded-2xl bg-[#FEF0E8] px-4 py-3 text-sm font-semibold text-[#F15A29] transition-colors group-hover:bg-[#F15A29] group-hover:text-white">
                  <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
                  <span className="text-base">{isAr ? '←' : '→'}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
