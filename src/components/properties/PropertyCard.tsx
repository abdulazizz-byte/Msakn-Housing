'use client';

import Link from 'next/link';
import {
  Building2,
  Users,
  UtensilsCrossed,
  SprayCan,
  Wrench,
  Bus,
  CheckCircle,
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

  const title =
    locale === 'ar' && property.title_ar ? property.title_ar : property.title;
  const district =
    locale === 'ar' && property.district_ar
      ? property.district_ar
      : property.district;
  const areaLabel = getAreaLabel(property.area_direction, locale);

  const lowestPrice =
    property.price_shared ??
    property.price_technician ??
    property.price_engineer ??
    0;

  const serviceIcons = [
    { key: 'catering', has: property.has_catering, icon: UtensilsCrossed },
    { key: 'cleaning', has: property.has_cleaning, icon: SprayCan },
    { key: 'maintenance', has: property.has_maintenance, icon: Wrench },
    { key: 'transportation', has: property.has_transportation, icon: Bus },
  ];

  const bgColors: Record<string, string> = {
    north: 'bg-red-100',
    south: 'bg-amber-100',
    east: 'bg-sky-100',
    west: 'bg-purple-100',
    central: 'bg-rose-100',
  };
  const iconColors: Record<string, string> = {
    north: 'text-red-600',
    south: 'text-amber-600',
    east: 'text-sky-600',
    west: 'text-purple-600',
    central: 'text-rose-600',
  };

  return (
    <Link href={`/${locale}/properties/${property.id}`}>
      <Card hoverable className="overflow-hidden h-full flex flex-col">
        {/* Placeholder image */}
        <div
          className={`relative h-48 ${bgColors[property.area_direction] || 'bg-gray-100'} flex items-center justify-center`}
        >
          <Building2
            className={`h-16 w-16 ${iconColors[property.area_direction] || 'text-gray-400'} opacity-60`}
          />
          {/* Badges overlay */}
          <div className="absolute top-3 start-3 flex flex-wrap gap-1.5">
            {property.verification_status === 'verified' && (
              <Badge status="verified" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {t('verificationBadge')}
              </Badge>
            )}
            {property.is_platform_managed && (
              <Badge status="platformManaged">{tc('platformManaged')}</Badge>
            )}
            {property.verification_status === 'pending' && (
              <Badge status="pending">{tc('verified')}</Badge>
            )}
          </div>
        </div>

        <CardContent className="flex-1 space-y-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-base leading-snug">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{district}</span>
            <span className="text-gray-300">|</span>
            <Badge className="text-xs">{areaLabel}</Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" />
              {property.available_capacity} / {property.total_capacity}
            </span>
          </div>

          {/* Services */}
          <div className="flex items-center gap-2">
            {serviceIcons.map(
              ({ key, has, icon: Icon }) =>
                has && (
                  <span
                    key={key}
                    className="text-red-600"
                    title={t(key as 'catering' | 'cleaning' | 'maintenance' | 'transportation')}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ),
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-red-700">
              {formatPrice(lowestPrice, locale === 'ar' ? 'ar-SA' : 'en-SA')}
            </span>
            <span className="text-xs text-gray-500 ms-1">
              / {tc('perWorker')} / {tc('perMonth')}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
