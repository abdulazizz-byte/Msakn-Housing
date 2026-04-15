'use client';

import Link from 'next/link';
import {
  Building2,
  Users,
  BedDouble,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import type { Property } from '@/types';
import { getAreaLabel, formatPrice } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface PropertyCardProps {
  property: Property;
  locale: string;
}

export function PropertyCard({ property, locale }: PropertyCardProps) {
  const t = useTranslations('property');
  const tc = useTranslations('common');

  const isAr = locale === 'ar';

  const title = isAr && property.title_ar ? property.title_ar : property.title;
  const district = isAr && property.district_ar ? property.district_ar : property.district;
  const areaLabel = getAreaLabel(property.area_direction, locale);

  const lowestPrice =
    property.price_shared ??
    property.price_technician ??
    property.price_engineer ??
    property.price_driver ??
    0;

  const primaryImage = property.images?.find((img) => img.is_primary) ?? property.images?.[0];

  const serviceCount = [
    property.has_catering,
    property.has_cleaning,
    property.has_maintenance,
    property.has_transportation,
  ].filter(Boolean).length;

  const roomTypes: string[] = [];
  if (property.has_shared_rooms) roomTypes.push(isAr ? 'مشترك' : 'Shared');
  if (property.has_technician_rooms) roomTypes.push(isAr ? 'فنيين' : 'Technicians');
  if (property.has_engineer_rooms) roomTypes.push(isAr ? 'مهندسين' : 'Engineers');
  if (property.has_driver_rooms) roomTypes.push(isAr ? 'سائقين' : 'Drivers');

  return (
    <Link
      href={`/${locale}/property/${property.id}`}
      className="group block h-full"
    >
      <article className="relative h-full overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#c41e3a]/20 hover:shadow-[0_20px_40px_-15px_rgba(10,10,10,0.15)]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Building2 className="h-20 w-20 text-[#d4d4d4]" />
            </div>
          )}

          {/* Verified badge — glass */}
          {property.verification_status === 'verified' && (
            <div className="absolute top-4 start-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
              <ShieldCheck className="h-3 w-3" />
              {t('verificationBadge')}
            </div>
          )}

          {/* Price — sharp gradient tag */}
          <div className="absolute bottom-4 end-4 rounded-full bg-[#0a0a0a] px-4 py-2 text-white shadow-xl ring-1 ring-white/10">
            <span className="text-base font-bold">
              {formatPrice(lowestPrice, isAr ? 'ar-SA' : 'en-SA')}
            </span>
            <span className="ms-1 text-[10px] text-white/70">
              /{tc('perMonth')}
            </span>
          </div>

          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title + arrow */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-[#0a0a0a] leading-snug">
              {title}
            </h3>
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/5 bg-[#fafafa] transition-all group-hover:bg-[#c41e3a] group-hover:border-[#c41e3a]">
              <ArrowUpRight className="h-4 w-4 text-[#525252] transition-colors group-hover:text-white" />
            </div>
          </div>

          {/* Location */}
          <div className="mb-4 flex items-center gap-1.5 text-sm text-[#737373]">
            <MapPin className="h-3.5 w-3.5 text-[#c41e3a]" />
            <span className="font-medium text-[#404040]">{district}</span>
            <span className="text-[#d4d4d4]">·</span>
            <span>{areaLabel}</span>
          </div>

          {/* Stats row — minimal dividers */}
          <div className="mb-4 flex items-center gap-4 border-y border-black/5 py-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#c41e3a]" />
              <div>
                <p className="text-sm font-bold tabular-nums text-[#0a0a0a]">
                  {property.available_capacity.toLocaleString()}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-[#a3a3a3]">
                  {isAr ? 'متاح' : 'Available'}
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-black/5" />
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-[#c41e3a]" />
              <div>
                <p className="text-sm font-bold tabular-nums text-[#0a0a0a]">
                  {property.total_rooms}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-[#a3a3a3]">
                  {isAr ? 'غرفة' : 'Rooms'}
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-black/5" />
            <div>
              <p className="text-sm font-bold tabular-nums text-[#0a0a0a]">
                {serviceCount}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-[#a3a3a3]">
                {isAr ? 'خدمات' : 'Services'}
              </p>
            </div>
          </div>

          {/* Room type pills */}
          {roomTypes.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {roomTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-[#fafafa] px-2.5 py-0.5 text-[11px] font-medium text-[#525252]"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
