'use client';

import { useState } from 'react';
import { CheckCircle, ArrowUpRight, Users2 } from 'lucide-react';
import { RequestWizard } from './RequestWizard';

interface Props {
  locale: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
}

export function LookingForHousingCard({ locale, title, description, bullets, ctaLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 backdrop-blur-xl transition-all hover:border-[#c41e3a]/20 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(196,30,58,0.2)] sm:p-8 lg:p-10 text-start w-full"
      >
        {/* Corner accent */}
        <div className="absolute top-0 end-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-[#c41e3a]/20 to-transparent blur-3xl transition-opacity group-hover:opacity-80" />

        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/30">
            <Users2 className="h-6 w-6" />
          </div>

          <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#0a0a0a] lg:text-4xl">
            {title}
          </h2>

          <p className="mb-5 text-base leading-relaxed text-[#525252]">
            {description}
          </p>

          <ul className="mb-6 space-y-2">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#525252]">
                <CheckCircle className="h-4 w-4 shrink-0 text-[#c41e3a]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-base font-semibold text-[#c41e3a] transition-transform group-hover:gap-3">
            {ctaLabel}
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </button>

      <RequestWizard open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
