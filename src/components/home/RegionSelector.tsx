'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, X } from 'lucide-react';

const KSA_REGIONS = {
  riyadh: { ar: 'الرياض', en: 'Riyadh', available: true },
  makkah: { ar: 'مكة المكرمة', en: 'Makkah', available: false },
  madinah: { ar: 'المدينة المنورة', en: 'Madinah', available: false },
  eastern: { ar: 'المنطقة الشرقية', en: 'Eastern Province', available: false },
  qassim: { ar: 'القصيم', en: 'Qassim', available: false },
  asir: { ar: 'عسير', en: 'Asir', available: false },
  tabuk: { ar: 'تبوك', en: 'Tabuk', available: false },
  hail: { ar: 'حائل', en: 'Hail', available: false },
  jazan: { ar: 'جازان', en: 'Jazan', available: false },
  najran: { ar: 'نجران', en: 'Najran', available: false },
  baha: { ar: 'الباحة', en: 'Al Baha', available: false },
  jawf: { ar: 'الجوف', en: 'Al Jawf', available: false },
  northernBorders: { ar: 'الحدود الشمالية', en: 'Northern Borders', available: false },
} as const;

interface RegionSelectorProps {
  locale: string;
}

export function RegionSelector({ locale }: RegionSelectorProps) {
  const [toast, setToast] = useState<string | null>(null);
  const isAr = locale === 'ar';
  const router = useRouter();

  const handleClick = (key: string, region: (typeof KSA_REGIONS)[keyof typeof KSA_REGIONS]) => {
    if (region.available) {
      router.push(`/${locale}/search`);
    } else {
      const name = isAr ? region.ar : region.en;
      setToast(
        isAr
          ? `${name} — غير متوفر حالياً، قريباً!`
          : `${name} — Not available yet, coming soon!`
      );
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.entries(KSA_REGIONS).map(([key, region]) => (
          <button
            key={key}
            onClick={() => handleClick(key, region)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors ${
              region.available
                ? 'border-[#F15A29]/30 bg-[#FEF0E8] text-[#F15A29] font-medium hover:bg-[#fce4e4]'
                : 'border-[#ece5dc] bg-[#faf8f5] text-[#999] hover:border-[#ccc]'
            }`}
          >
            <MapPin className={`h-4 w-4 shrink-0 ${region.available ? 'text-[#F15A29]' : 'text-[#ccc]'}`} />
            {isAr ? region.ar : region.en}
            {!region.available && (
              <span className="ms-auto text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">
                {isAr ? 'قريباً' : 'Soon'}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl bg-[#1a1a1a] px-5 py-3 text-sm text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <MapPin className="h-4 w-4 text-[#F15A29] shrink-0" />
          {toast}
          <button onClick={() => setToast(null)} className="ms-2 text-gray-400 hover:text-white">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
