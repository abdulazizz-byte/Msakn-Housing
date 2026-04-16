import { Users2 } from 'lucide-react';

interface Props {
  locale: string;
}

const CATEGORIES = [
  {
    key: 'construction',
    ar: 'عمال البناء',
    en: 'Construction',
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'engineers',
    ar: 'المهندسين',
    en: 'Engineers',
    img: 'https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'technicians',
    ar: 'الفنيين',
    en: 'Technicians',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'drivers',
    ar: 'السائقين',
    en: 'Drivers',
    img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'catering',
    ar: 'الطهاة والإعاشة',
    en: 'Catering Staff',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'hospitality',
    ar: 'الضيافة والنظافة',
    en: 'Hospitality',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'security',
    ar: 'الأمن والحراسة',
    en: 'Security',
    img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'maintenance',
    ar: 'الصيانة',
    en: 'Maintenance',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop',
  },
];

export function WorkerCategories({ locale }: Props) {
  const isAr = locale === 'ar';

  return (
    <section className="relative z-10 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c41e3a]">
              {isAr ? 'من نخدم' : 'Who We Serve'}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
              {isAr ? 'نوفر سكن لجميع فئات العمالة' : 'Housing for Every Workforce'}
            </h2>
            <p className="mt-2 max-w-xl text-base text-[#525252]">
              {isAr
                ? 'من العمالة الإنشائية إلى المتخصصين والمهندسين — سكن يناسب كل احتياج'
                : 'From construction crews to specialists and engineers — housing that fits every need'}
            </p>
          </div>
          <div className="hidden items-center gap-2 text-sm text-[#737373] sm:flex">
            <Users2 className="h-4 w-4 text-[#c41e3a]" />
            <span>8 {isAr ? 'فئات' : 'Categories'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a] cursor-pointer"
            >
              <img
                src={cat.img}
                alt={isAr ? cat.ar : cat.en}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="text-lg font-bold text-white drop-shadow-lg sm:text-xl">
                  {isAr ? cat.ar : cat.en}
                </h3>
                <div className="mt-2 inline-flex h-8 items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 text-xs font-medium text-white backdrop-blur-sm transition-all group-hover:bg-[#c41e3a] group-hover:border-[#c41e3a]">
                  {isAr ? 'احجز الآن' : 'Book Now'}
                </div>
              </div>

              {/* Corner accent on hover */}
              <div className="absolute top-3 end-3 h-2 w-2 rounded-full bg-[#c41e3a] opacity-0 shadow-lg shadow-[#c41e3a]/50 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
