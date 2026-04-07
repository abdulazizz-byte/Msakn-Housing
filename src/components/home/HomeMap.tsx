'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyMap, type MapMarker } from '@/components/properties/PropertyMap';
import { sampleProperties } from '@/lib/sample-data';

interface HomeMapProps {
  locale: string;
}

export function HomeMap({ locale }: HomeMapProps) {
  const router = useRouter();

  const markers: MapMarker[] = useMemo(
    () =>
      sampleProperties
        .filter((p) => p.status === 'active' && p.latitude != null && p.longitude != null)
        .map((p) => ({
          id: p.id,
          lat: p.latitude!,
          lng: p.longitude!,
          title: locale === 'ar' && p.title_ar ? p.title_ar : p.title,
          price: p.price_shared ?? p.price_technician ?? p.price_engineer ?? p.price_driver ?? 0,
        })),
    [locale]
  );

  return (
    <div className="h-[500px] lg:h-[600px]">
      <PropertyMap
        markers={markers}
        onMarkerClick={(marker) => {
          if (marker.id) {
            router.push(`/${locale}/property/${marker.id}`);
          }
        }}
      />
    </div>
  );
}
