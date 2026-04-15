'use client';

import Link from 'next/link';
import {
  Building2,
  Users,
  BedDouble,
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
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
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

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

  // Count enabled services
  const serviceCount = [
    property.has_catering,
    property.has_cleaning,
    property.has_maintenance,
    property.has_transportation,
  ].filter(Boolean).length;

  // Available room types
  const roomTypes: string[] = [];
  if (property.has_shared_rooms) roomTypes.push(isAr ? 'مشترك' : 'Shared');
  if (property.has_technician_rooms) roomTypes.push(isAr ? 'فنيين' : 'Technicians');
  if (property.has_engineer_rooms) roomTypes.push(isAr ? 'مهندسين' : 'Engineers');
  if (property.has_driver_rooms) roomTypes.push(isAr ? 'سائقين' : 'Drivers');

  return (
    <Link href={`/${locale}/property/${property.id}`} className="block h-full">
      <Card hoverable className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          {primaryImage ? (
            <img src={primaryImage.url} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Building2 className="h-16 w-16 text-gray-300" />
            </div>
          )}

          {/* Badges overlay */}
          <div className="absolute top-3 start-3 flex flex-wrap gap-1.5">
            {property.verification_status === 'verified' && (
              <Badge status="verified" className="flex items-center gap-1 shadow-sm">
                <CheckCircle className="h-3 w-3" />
                {t('verificationBadge')}
              </Badge>
            )}
            {property.is_platform_managed && (
              <Badge status="platformManaged" className="shadow-sm">
                {tc('platformManaged')}
              </Badge>
            )}
          </div>

          {/* Price tag overlay */}
          <div className="absolute bottom-3 end-3 rounded-full bg-[#c41e3a] px-3 py-1.5 text-white shadow-lg">
            <span className="text-base font-bold">
              {formatPrice(lowestPrice, isAr ? 'ar-SA' : 'en-SA')}
            </span>
            <span className="text-[10px] opacity-90 ms-1">
              / {tc('perMonth')}
            </span>
          </div>
        </div>

        <CardContent className="flex-1 space-y-3 py-4">
          {/* Title */}
          <h3 className="font-bold text-gray-900 line-clamp-2 text-lg leading-snug">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-[#c41e3a] shrink-0" />
            <span className="font-medium">{district}</span>
            <span className="text-gray-300">·</span>
            <span>{areaLabel} {isAr ? 'الرياض' : 'Riyadh'}</span>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <Users className="h-4 w-4 text-[#c41e3a] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">
                  {property.available_capacity.toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {isAr ? 'متاح' : 'Available'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <BedDouble className="h-4 w-4 text-[#c41e3a] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">
                  {property.total_rooms}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {isAr ? 'غرفة' : 'Rooms'}
                </p>
              </div>
            </div>
          </div>

          {/* Room types */}
          {roomTypes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {roomTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-700"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-gray-100 bg-gray-50/50 py-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <CheckCircle className="h-3.5 w-3.5 text-[#c41e3a]" />
              <span className="font-medium">
                {serviceCount > 0
                  ? (isAr ? `${serviceCount} خدمات متوفرة` : `${serviceCount} services included`)
                  : (isAr ? 'بدون خدمات' : 'No services')}
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-[#c41e3a]">
              {isAr ? 'التفاصيل' : 'Details'}
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
