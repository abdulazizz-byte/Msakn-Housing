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
          ? 'bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/30 hover:bg-[#a91b32]'
          : 'border border-black/10 bg-white text-[#0a0a0a] hover:border-[#c41e3a]/30 hover:text-[#c41e3a]'
      }`}
    >
      {isAr ? 'اختر هذه الباقة' : 'Choose this tier'}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
