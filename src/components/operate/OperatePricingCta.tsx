'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  locale: string;
  tier: string;
  popular: boolean;
}

export function OperatePricingCta({ locale, tier, popular }: Props) {
  const isAr = locale === 'ar';
  return (
    <Link
      href={`/${locale}/properties/new?plan=${encodeURIComponent(tier)}`}
      className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
        popular
          ? 'bg-[#F15A29] text-white shadow-lg shadow-[#F15A29]/30 hover:bg-[#D94C1E]'
          : 'border border-black/10 bg-white text-[#0a0a0a] hover:border-[#F15A29]/30 hover:text-[#F15A29]'
      }`}
    >
      {isAr ? 'اختر هذه الباقة' : 'Choose this tier'}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
