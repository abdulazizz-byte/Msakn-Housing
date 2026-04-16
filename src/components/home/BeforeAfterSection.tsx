'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

interface Props {
  locale: string;
}

const BAD_IMG = '/bad-room.webp';
const GOOD_IMG = '/good-room.webp';

export function BeforeAfterSection({ locale }: Props) {
  const isAr = locale === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    return () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [dragging]);

  return (
    <section className="relative z-10 overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#c41e3a]">
            <Sparkles className="h-3.5 w-3.5" />
            {isAr ? 'اختبر الفرق' : 'Experience the Difference'}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">
            {isAr ? 'من سكن تقليدي... إلى سكن مساكن' : 'From Traditional Housing to Msakn'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#525252] sm:text-base">
            {isAr
              ? 'اسحب الشريط لترى الفرق بين السكن التقليدي والسكن المفروش بالكامل في مساكن'
              : 'Drag the slider to see the difference between traditional housing and a fully-furnished Msakn unit'}
          </p>
        </div>

        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="group relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl border border-black/5 bg-[#0a0a0a] shadow-2xl select-none"
          style={{ touchAction: 'none', cursor: dragging ? 'ew-resize' : 'grab' }}
        >
          {/* BEFORE image (bad) — full */}
          <img
            src={BAD_IMG}
            alt={isAr ? 'سكن تقليدي' : 'Traditional housing'}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* AFTER image (good) — clipped by slider position */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={GOOD_IMG}
              alt={isAr ? 'مساكن' : 'Msakn'}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </div>

          {/* Labels */}
          <div className="pointer-events-none absolute top-4 start-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {isAr ? 'قبل' : 'Before'}
          </div>
          <div className="pointer-events-none absolute top-4 end-4 rounded-full bg-[#c41e3a] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#c41e3a]/40">
            {isAr ? 'مع مساكن' : 'With Msakn'}
          </div>

          {/* Divider line */}
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            style={{ left: `calc(${pos}% - 1px)` }}
          />

          {/* Handle */}
          <div
            className="pointer-events-none absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#c41e3a] shadow-xl shadow-[#c41e3a]/40 transition-transform group-hover:scale-110"
            style={{ left: `${pos}%` }}
          >
            <ArrowLeftRight className="h-5 w-5 text-white" />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#737373]">
          {isAr ? '↔ اسحب الشريط لليمين أو اليسار' : '↔ Drag the slider left or right'}
        </p>
      </div>
    </section>
  );
}
